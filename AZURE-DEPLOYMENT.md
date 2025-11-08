# Azure Deployment Guide for Bosca-Slingers

## Prerequisites

- Azure account with active subscription
- Azure CLI installed (`az`)
- Node.js 18+ installed locally

## Quick Start with Azure

### 1. Install Azure CLI

```powershell
# Download and install Azure CLI
# https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows

# Login to Azure
az login

# Set your subscription
az account set --subscription "Your Subscription Name"
```

### 2. Create Dedicated Resource Group

**IMPORTANT**: All Bosca-Slingers resources will be created in a single dedicated resource group for easy management and cost tracking.

```powershell
# Create dedicated resource group for Bosca-Slingers
az group create `
  --name bosca-slingers-rg `
  --location eastus `
  --tags project=bosca-slingers environment=production

# Verify resource group
az group show --name bosca-slingers-rg
```

### 3. Create PostgreSQL Database

**All database resources will be in the bosca-slingers-rg resource group**

```powershell
# Create PostgreSQL Flexible Server
az postgres flexible-server create `
  --resource-group bosca-slingers-rg `
  --name bosca-slingers-db `
  --location eastus `
  --admin-user boscaadmin `
  --admin-password "YourSecurePassword123!" `
  --sku-name Standard_B2s `
  --tier Burstable `
  --version 14 `
  --storage-size 32 `
  --tags project=bosca-slingers component=database

# Create database
az postgres flexible-server db create `
  --resource-group bosca-slingers-rg `
  --server-name bosca-slingers-db `
  --database-name boscaslingers

# Configure firewall to allow Azure services
az postgres flexible-server firewall-rule create `
  --resource-group bosca-slingers-rg `
  --name bosca-slingers-db `
  --rule-name AllowAzureServices `
  --start-ip-address 0.0.0.0 `
  --end-ip-address 0.0.0.0

# Get connection string
az postgres flexible-server show-connection-string `
  --server-name bosca-slingers-db `
  --database-name boscaslingers `
  --admin-user boscaadmin
```

### 4. Create App Service Plan

**App Service Plan in the same resource group**

```powershell
az appservice plan create `
  --name bosca-slingers-plan `
  --resource-group bosca-slingers-rg `
  --location eastus `
  --sku B1 `
  --is-linux `
  --tags project=bosca-slingers component=compute
```

### 5. Create API App Service

**API App Service in the same resource group**

```powershell
az webapp create `
  --resource-group bosca-slingers-rg `
  --plan bosca-slingers-plan `
  --name bosca-slingers-api `
  --runtime "NODE:18-lts" `
  --tags project=bosca-slingers component=api

# Configure API settings
az webapp config appsettings set `
  --resource-group bosca-slingers-rg `
  --name bosca-slingers-api `
  --settings `
    DATABASE_URL="postgresql://boscaadmin:YourSecurePassword123!@bosca-slingers-db.postgres.database.azure.com:5432/boscaslingers?sslmode=require" `
    NODE_ENV="production" `
    PORT="8080"

# Enable CORS
az webapp cors add `
  --resource-group bosca-slingers-rg `
  --name bosca-slingers-api `
  --allowed-origins "*"
```

### 6. Create Static Web App (Frontend)

**Static Web App in the same resource group**

```powershell
# Option 1: Using Static Web Apps (Recommended)
az staticwebapp create `
  --name bosca-slingers `
  --resource-group bosca-slingers-rg `
  --source https://github.com/AntonyNeal/devoted-slingers `
  --location eastus `
  --branch main `
  --app-location "/" `
  --output-location "dist" `
  --api-location "api" `
  --tags project=bosca-slingers component=frontend

# Option 2: Using App Service
az webapp create `
  --resource-group bosca-slingers-rg `
  --plan bosca-slingers-plan `
  --name bosca-slingers-web `
  --runtime "NODE:18-lts" `
  --tags project=bosca-slingers component=frontend
```

### 7. Create Storage Account (for uploads)

**Storage Account in the same resource group**

```powershell
az storage account create `
  --name boscaslingersstorage `
  --resource-group bosca-slingers-rg `
  --location eastus `
  --sku Standard_LRS `
  --tags project=bosca-slingers component=storage

# Get storage connection string
az storage account show-connection-string `
  --name boscaslingersstorage `
  --resource-group bosca-slingers-rg `
  --output tsv
```

### 8. Verify All Resources in Resource Group

```powershell
# List all resources in the resource group
az resource list --resource-group bosca-slingers-rg --output table

# View cost analysis for the resource group
az consumption usage list --subscription "Your Subscription" | Where-Object {$_.resourceGroup -eq 'bosca-slingers-rg'}
```

## Deploy Application

### Deploy API

```powershell
cd api
zip -r api.zip .
az webapp deployment source config-zip `
  --resource-group bosca-slingers-rg `
  --name bosca-slingers-api `
  --src api.zip
```

### Deploy Frontend

```powershell
# Build frontend
npm run build

# Deploy to Static Web App (automated via GitHub Actions)
# Or manually deploy to App Service:
az webapp deployment source config-zip `
  --resource-group bosca-slingers-rg `
  --name bosca-slingers-web `
  --src dist.zip
```

## Set Up Database Schema

```powershell
# Connect to PostgreSQL and run schema
psql "postgresql://boscaadmin:YourSecurePassword123!@bosca-slingers-db.postgres.database.azure.com:5432/boscaslingers?sslmode=require" -f db/schema-multi-tenant.sql
```

## GitHub Actions Deployment (Automated)

The repository includes GitHub Actions workflows. Add these secrets to your GitHub repository:

1. Go to GitHub repository → Settings → Secrets
2. Add secrets:
   - `AZURE_WEBAPP_PUBLISH_PROFILE_API` (download from Azure Portal)
   - `AZURE_STATIC_WEB_APPS_API_TOKEN` (if using Static Web Apps)

## Cost Estimation

**Monthly costs (approximate):**
- PostgreSQL Flexible Server (B2s): ~$30
- App Service Plan (B1): ~$13
- Static Web App: Free tier available
- Storage Account: ~$2

**Total: ~$45-50/month** for basic setup

## Next Steps

1. Configure custom domain
2. Enable SSL/HTTPS (automatic with Azure)
3. Set up Application Insights for monitoring
4. Configure SendGrid for emails
5. Set up Stripe for payments
6. Configure Azure AD for coach authentication

## Resource Group Management

### View All Resources

```powershell
# List all resources in the Bosca-Slingers resource group
az resource list --resource-group bosca-slingers-rg --output table

# View resource group details
az group show --name bosca-slingers-rg

# Export resource group template (for backup/replication)
az group export --name bosca-slingers-rg --output json > bosca-slingers-template.json
```

### Cost Management

```powershell
# View current costs for the resource group
az consumption usage list --query "[?resourceGroup=='bosca-slingers-rg']" --output table

# Set up budget alert for the resource group (requires budget name)
az consumption budget create `
  --budget-name bosca-slingers-budget `
  --amount 100 `
  --time-grain Monthly `
  --resource-group bosca-slingers-rg
```

## Useful Commands

```powershell
# View logs (all in same resource group)
az webapp log tail --resource-group bosca-slingers-rg --name bosca-slingers-api

# Restart app
az webapp restart --resource-group bosca-slingers-rg --name bosca-slingers-api

# Get connection info
az webapp show --resource-group bosca-slingers-rg --name bosca-slingers-api

# Scale App Service Plan (in same resource group)
az appservice plan update `
  --resource-group bosca-slingers-rg `
  --name bosca-slingers-plan `
  --sku S1

# Delete entire project (removes all resources in the resource group)
az group delete --name bosca-slingers-rg --yes --no-wait

# Lock resource group to prevent accidental deletion
az lock create `
  --name bosca-slingers-lock `
  --resource-group bosca-slingers-rg `
  --lock-type CanNotDelete
```

## Support

- [Azure App Service Docs](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure Database for PostgreSQL](https://docs.microsoft.com/en-us/azure/postgresql/)
- [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)
