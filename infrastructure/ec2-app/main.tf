terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

locals {
  ecr_registry = "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com"

  fastapi_image = "${local.ecr_registry}/personal-site-fastapi:${var.fastapi_image_tag}"
  nextjs_image  = "${local.ecr_registry}/personal-site-nextjs:${var.nextjs_image_tag}"
}

# --------------------------------------------------
# Networking
# --------------------------------------------------

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "personal-site-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "personal-site-igw"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.subnet_cidr
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "personal-site-public-subnet"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "personal-site-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# --------------------------------------------------
# Security groups
# --------------------------------------------------

resource "aws_security_group" "frontend" {
  name        = "personal-site-frontend-sg"
  description = "Public HTTP/HTTPS access to Nginx"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "EC2 Instance Connect"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["3.16.146.0/29"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  dynamic "ingress" {
    for_each = var.allowed_ssh_cidr == "" ? [] : [var.allowed_ssh_cidr]

    content {
      description = "Restricted SSH"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = [ingress.value]
    }
  }

  egress {
    description = "Outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  

  tags = {
    Name = "personal-site-frontend-sg"
  }
}

resource "aws_security_group" "backend" {
  name        = "personal-site-backend-sg"
  description = "FastAPI access only from frontend"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "FastAPI from frontend Nginx"
    from_port       = 8000
    to_port         = 8000
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend.id]
  }

  ingress {
    description = "EC2 Instance Connect"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["3.16.146.0/29"]
  }

  egress {
    description = "Outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "personal-site-backend-sg"
  }
}

# --------------------------------------------------
# IAM role: EC2 instances can pull images from ECR
# --------------------------------------------------

resource "aws_iam_role" "ec2_ecr" {
  name = "personal-site-ec2-ecr-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecr_read_only" {
  role       = aws_iam_role.ec2_ecr.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_ecr" {
  name = "personal-site-ec2-ecr-profile"
  role = aws_iam_role.ec2_ecr.name
}

# --------------------------------------------------
# Backend EC2
# --------------------------------------------------

resource "aws_instance" "backend" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.backend.id]
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.ec2_ecr.name

  user_data = <<-USERDATA
    #!/bin/bash
    set -euxo pipefail

    dnf update -y
    dnf install -y docker
    systemctl enable --now docker

    aws ecr get-login-password --region ${var.aws_region} \
      | docker login --username AWS --password-stdin ${local.ecr_registry}

    docker pull ${local.fastapi_image}

    docker run -d \
      --name fastapi \
      --restart unless-stopped \
      -p 8000:8000 \
      ${local.fastapi_image}
  USERDATA

  user_data_replace_on_change = true

  depends_on = [
    aws_iam_role_policy_attachment.ecr_read_only,
    aws_route_table_association.public
  ]

  tags = {
    Name = "personal-site-backend"
  }
}

# --------------------------------------------------
# Frontend EC2: Nginx + Next.js
# --------------------------------------------------

resource "aws_instance" "frontend" {
  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.frontend.id]
  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.ec2_ecr.name

  user_data = templatefile("${path.module}/frontend-user-data.sh.tftpl", {
    aws_region   = var.aws_region
    ecr_registry = local.ecr_registry
    nextjs_image = local.nextjs_image

    nginx_conf = templatefile("${path.module}/nginx/default.conf", {
      backend_ip = aws_instance.backend.private_ip
    })
  })

  user_data_replace_on_change = true

  depends_on = [
    aws_iam_role_policy_attachment.ecr_read_only,
    aws_route_table_association.public
  ]

  tags = {
    Name = "personal-site-frontend"
  }
}