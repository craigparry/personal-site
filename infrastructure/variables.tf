variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-2"
}

variable "aws_account_id" {
  description = "AWS account ID containing the ECR repositories"
  type        = string
  default     = ""
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "Public subnet CIDR block"
  type        = string
  default     = "10.0.1.0/24"
}

variable "allowed_ssh_cidr" {
  description = "Your public IP in CIDR notation, or empty to disable SSH"
  type        = string
  default     = ""
}

variable "fastapi_image_tag" {
  description = "Tag for the FastAPI ECR image"
  type        = string
  default     = "latest"
}

variable "nextjs_image_tag" {
  description = "Tag for the Next.js ECR image"
  type        = string
  default     = "latest"
}