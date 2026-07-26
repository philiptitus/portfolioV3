provider "google" {
  project = var.project_id
  region  = var.region
}

terraform {
  backend "gcs" {
    bucket = "myzer-state"
    prefix = "portfolio-frontend/terraform/state"
  }
}
