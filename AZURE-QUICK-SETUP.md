# Quick Azure Setup for Bosca-Slingers

## One Resource Group - All Resources

This script creates all Azure resources in a single dedicated resource group: **bosca-slingers-rg**

### Prerequisites

```powershell
# Login to Azure
az login

# Set your subscription
az account set --subscription "Your Subscription Name"

# Set variables
$RESOURCE_GROUP = "bosca-slingers-rg"
$LOCATION = "eastus"
$DB_PASSWORD = "YourSecurePassword123!"  # Change this!
```

### Create All Resources

```powershell
# 1. Create resource group with tags
az group create `
  --name $RESOURCE_GROUP `
  --location $LOCATION `
  --tags project=bosca-slingers environment=production

# 2. Create PostgreSQL database
az postgres flexible-server create `
  --resource-group $RESOURCE_GROUP `
  --name bosca-slingers-db `
  --location $LOCATION `
  --admin-user boscaadmin `
  --admin-password $DB_PASSWORD `
  --sku-name Standard_B2s `
  --tier Burstable `
  --version 14 `
  --storage-size 32 `
  --tags project=bosca-slingers component=database

# 3. Create database
az postgres flexible-server db create `
  --resource-group $RESOURCE_GROUP `
  --server-name bosca-slingers-db `
  --database-name boscaslingers

# 4. Configure firewall
az postgres flexible-server firewall-rule create `
  --resource-group $RESOURCE_GROUP `
  --name bosca-slingers-db `
  --rule-name AllowAzureServices `
  --start-ip-address 0.0.0.0 `
  --end-ip-address 0.0.0.0

# 5. Create App Service Plan
az appservice plan create `
  --name bosca-slingers-plan `
  --resource-group $RESOURCE_GROUP `
  --location $LOCATION `
  --sku B1 `
  --is-linux `
  --tags project=bosca-slingers component=compute

# 6. Create API App Service
az webapp create `
  --resource-group $RESOURCE_GROUP `
  --plan bosca-slingers-plan `
  --name bosca-slingers-api `
  --runtime "NODE:18-lts" `
  --tags project=bosca-slingers component=api

# 7. Create Storage Account
az storage account create `
  --name boscaslingersstorage `
  --resource-group $RESOURCE_GROUP `
  --location $LOCATION `
  --sku Standard_LRS `
  --tags project=bosca-slingers component=storage

# 8. Create Static Web App for frontend
az staticwebapp create `
  --name bosca-slingers `
  --resource-group $RESOURCE_GROUP `
  --location $LOCATION `
  --tags project=bosca-slingers component=frontend

# 9. View all resources in the resource group
az resource list --resource-group $RESOURCE_GROUP --output table
```

### Verify Everything is in One Resource Group

```powershell
# List all resources
az resource list --resource-group bosca-slingers-rg --output table

# Should show:
# - bosca-slingers-db (PostgreSQL)
# - bosca-slingers-plan (App Service Plan)
# - bosca-slingers-api (App Service)
# - boscaslingersstorage (Storage Account)
# - bosca-slingers (Static Web App)
```

### Get Connection Strings

```powershell
# Database connection string
az postgres flexible-server show-connection-string `
  --server-name bosca-slingers-db `
  --database-name boscaslingers `
  --admin-user boscaadmin

# Storage connection string
az storage account show-connection-string `
  --name boscaslingersstorage `
  --resource-group bosca-slingers-rg

# API URL
az webapp show --resource-group bosca-slingers-rg --name bosca-slingers-api --query defaultHostName
```

### Clean Up (Delete Everything)

```powershell
# Delete the entire resource group and all resources in it
az group delete --name bosca-slingers-rg --yes --no-wait

# This removes:
# ✓ PostgreSQL database
# ✓ App Service Plan
# ✓ API App Service
# ✓ Storage Account
# ✓ Static Web App
# ✓ All other resources in the group
```

### Resource Group Lock (Prevent Accidental Deletion)

```powershell
# Add lock to prevent deletion
az lock create `
  --name bosca-slingers-lock `
  --resource-group bosca-slingers-rg `
  --lock-type CanNotDelete `
  --notes "Prevents accidental deletion of Bosca-Slingers resources"

# Remove lock (if needed)
az lock delete --name bosca-slingers-lock --resource-group bosca-slingers-rg
```

### Cost Tracking

All resources are tagged with `project=bosca-slingers` for easy cost tracking:

```powershell
# View costs for this resource group
az consumption usage list --query "[?resourceGroup=='bosca-slingers-rg']"

# In Azure Portal: Cost Management + Billing > Cost Analysis
# Filter by: Resource Group = bosca-slingers-rg
```

## Summary

✅ **Single Resource Group**: bosca-slingers-rg  
✅ **Easy Management**: All resources in one place  
✅ **Cost Tracking**: Tagged for cost analysis  
✅ **Simple Cleanup**: One command deletes everything  
✅ **Protection**: Optional lock prevents accidents
