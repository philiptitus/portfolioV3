environment = "prod"

# Use the default Cloud Run URL, not the pservice.mrphilip.cv custom domain
# — server-to-server calls from the frontend container hit ENOTFOUND
# against the custom domain's DNS from within Cloud Run's network. The
# *.run.app hostname is already in the backend's ALLOWED_HOSTS.
backend_url = "https://portfolio-yfdoo3vmfq-ew.a.run.app"

# Pins the baseline apply to the currently-live image so importing/adopting
# this already-running service into Terraform doesn't briefly swap it for
# the module's hello-world placeholder before the pipeline's second apply
# (which deploys the freshly-built image) runs. Safe to leave in place
# permanently — the pipeline's -var override always takes precedence.
frontend_image = "europe-west1-docker.pkg.dev/fiona-464509/cloud-run-source-deploy/portfolio-frontend@sha256:81c620ed20eb0544e022f294927d88050122e873a6c6b47e08bfcae1cc64c3f1"
