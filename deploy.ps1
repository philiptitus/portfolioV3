# Google Cloud Run Deployment Script for Portfolio Frontend
# PowerShell version - This script deploys the Next.js application with all environment variables properly configured

gcloud run deploy portfolio-frontend `
  --source ./ `
  --region europe-west1 `
  --min-instances=0 `
  --max-instances=2 `
  --memory=512Mi `
  --cpu=1 `
  --platform=managed `
  --allow-unauthenticated `
  --set-env-vars NEXT_PUBLIC_API_URL=https://pservice.mrphilip.cv/api `
  --set-env-vars NODE_ENV=production

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployment completed successfully!" -ForegroundColor Green
    Write-Host "Your frontend is now live!" -ForegroundColor Cyan
} else {
    Write-Host "Deployment failed with exit code $LASTEXITCODE" -ForegroundColor Red
}
