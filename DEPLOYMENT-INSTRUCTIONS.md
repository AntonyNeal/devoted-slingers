# GitHub Deployment Setup

## Add Publish Profile to GitHub Secrets

1. **Go to your GitHub repository**: https://github.com/AntonyNeal/devoted-slingers

2. **Navigate to Settings** → **Secrets and variables** → **Actions**

3. **Click "New repository secret"**

4. **Add the API publish profile**:
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE_API`
   - Value: Copy the contents from `api-publish-profile.xml`

5. **Commit and push your code**:
   ```powershell
   cd c:\BoscasSlingers\devoted-slingers
   git add .
   git commit -m "Configure Azure deployment"
   git push origin main
   ```

6. **GitHub Actions will automatically deploy** to:
   - API: https://bosca-slingers-api.azurewebsites.net

## Manual Deployment (Alternative)

If you prefer to deploy manually right now:

```powershell
# Install Azure App Service extension for VS Code
# Then right-click on the api folder and select "Deploy to Web App"
# Or use the Azure portal's deployment center
```

## Verify Deployment

Once deployed, visit:
- API Health Check: https://bosca-slingers-api.azurewebsites.net/health
- API Docs: https://bosca-slingers-api.azurewebsites.net/api

## Next: Set Up Database Schema

After deployment, you'll need to initialize the database:

```powershell
# Connect to PostgreSQL and run schema
psql "postgresql://boscaadmin:BoscaMTG2025!@bosca-slingers-db.postgres.database.azure.com:5432/boscaslingers?sslmode=require" -f db/schema-multi-tenant.sql
```

Or install a PostgreSQL client like pgAdmin to run the schema visually.
