#########################################################################
## Environment-Scoped Naming
##
## Every environment-scoped resource name is built here so the -dev/-prod
## suffix lives in exactly one place. The live prod service predates
## Terraform and is named "portfolio-frontend" with no suffix — kept as-is
## so import doesn't force a rename/recreate; only dev gets a -dev suffix.
#########################################################################
locals {
  app_name = "portfolio-frontend"

  frontend_service_name = var.environment == "prod" ? "portfolio-frontend" : "portfolio-frontend-dev"
  frontend_sa_account_id = "portfolio-frontend-sa-${var.environment}"

  # Custom domains only exist for the live prod service today.
  manage_domains = var.environment == "prod"
}

#########################################################################
## Required APIs
#########################################################################
resource "google_project_service" "required_apis" {
  for_each = toset([
    "run.googleapis.com",
  ])

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

#########################################################################
## Service Account
#########################################################################
resource "google_service_account" "frontend_sa" {
  account_id   = local.frontend_sa_account_id
  display_name = "Portfolio frontend service account"
}

#########################################################################
## Cloud Run: Next.js frontend
#########################################################################
resource "google_cloud_run_v2_service" "frontend" {
  name                = local.frontend_service_name
  location            = var.region
  deletion_protection = var.deletion_protection

  template {
    service_account = google_service_account.frontend_sa.email

    containers {
      image = var.frontend_image

      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "BACKEND_URL"
        value = var.backend_url
      }
    }
  }

  depends_on = [google_project_service.required_apis]
}

resource "google_cloud_run_v2_service_iam_member" "frontend_public" {
  name     = google_cloud_run_v2_service.frontend.name
  location = google_cloud_run_v2_service.frontend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

#########################################################################
## Custom domain mappings (prod only — the live domains that already
## point at the "portfolio-frontend" service today)
#########################################################################
resource "google_cloud_run_domain_mapping" "frontend_domain_apex" {
  count = local.manage_domains ? 1 : 0

  name     = "filipio.com"
  location = var.region

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.frontend.name
  }
}

resource "google_cloud_run_domain_mapping" "frontend_domain_www" {
  count = local.manage_domains ? 1 : 0

  name     = "www.filipio.com"
  location = var.region

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.frontend.name
  }
}
