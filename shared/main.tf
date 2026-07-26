#########################################################################
## Required APIs
##
## artifactregistry.googleapis.com is a build-time concern shared by every
## environment, not something either dev or prod owns — it lives here,
## enabled once, independent of the per-environment workspaced config.
#########################################################################
resource "google_project_service" "artifact_registry_api" {
  project            = var.project_id
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

#########################################################################
## Artifact Registry
##
## Shared across dev and prod (images tagged dev-<sha> / prod-<sha>, not
## held in separate repos). Managed here, outside the per-environment
## Terraform workspaces, so destroying either environment can never take
## this out from under the other.
#########################################################################
resource "google_artifact_registry_repository" "frontend" {
  location      = var.region
  repository_id = var.artifact_repo
  format        = "DOCKER"

  depends_on = [google_project_service.artifact_registry_api]
}
