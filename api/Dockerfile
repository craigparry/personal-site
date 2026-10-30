# ── Stage 1: Build dependencies ──
FROM python:3.12-alpine AS builder

# Install temporary tools needed for C-extensions/wheels
RUN apk add --no-cache --virtual .build-deps \
    build-base \
    libffi-dev \
    openssl-dev \
    musl-dev

WORKDIR /

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt


# ── Stage 2: Runtime image ──
FROM python:3.12-alpine

WORKDIR /

# Copy installed Python packages from builder stage
COPY --from=builder /install /usr/local

# Copy application code
COPY ./ /

# Expose the application port
EXPOSE 8000

# Run FastAPI via Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
