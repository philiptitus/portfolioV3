variable "project_id" {
  type        = string
  description = "GCP project ID"
}

variable "region" {
  type        = string
  description = "GCP region for resources"
}

variable "frontend_image" {
  type        = string
  description = "Full image URI for the Next.js frontend Cloud Run service"
  default     = "us-docker.pkg.dev/cloudrun/container/hello:latest"
}

variable "environment" {
  type        = string
  description = "Deployment environment. Drives the name suffix on every environment-scoped resource."

  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "environment must be either \"dev\" or \"prod\"."
  }
}

variable "backend_url" {
  type        = string
  description = "Base URL of the Django backend this frontend proxies /api/* to (no trailing slash)"
}
