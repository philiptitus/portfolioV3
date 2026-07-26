environment = "prod"
backend_url = "https://pservice.mrphilip.cv"

# Pins the baseline apply to the currently-live image so importing/adopting
# this already-running service into Terraform doesn't briefly swap it for
# the module's hello-world placeholder before the pipeline's second apply
# (which deploys the freshly-built image) runs. Safe to leave in place
# permanently — the pipeline's -var override always takes precedence.
frontend_image = "europe-west1-docker.pkg.dev/fiona-464509/cloud-run-source-deploy/portfolio-frontend@sha256:81c620ed20eb0544e022f294927d88050122e873a6c6b47e08bfcae1cc64c3f1"
