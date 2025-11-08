# Deployment Guide

This guide covers deploying the Devoted Slingers application to production.

## Prerequisites

- Node.js 18+ runtime environment
- PostgreSQL 14+ database
- Domain name (optional but recommended)
- SSL certificate (recommended for production)

## Environment Setup

### Backend Environment Variables

Create a `.env` file in `apps/backend/`:

```bash
# Server
PORT=3001
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:5432/devoted_slingers

# Security
JWT_SECRET=your-secure-random-secret-here

# CORS
CORS_ORIGIN=https://yourdomain.com
```

### Frontend Environment Variables

Create a `.env.production` file in `apps/frontend/`:

```bash
VITE_API_URL=https://api.yourdomain.com/api
VITE_SOCKET_URL=https://api.yourdomain.com
```

## Build for Production

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build all packages:
   ```bash
   npm run build
   ```

This will create production builds:
- SDK: `packages/matchmaking-sdk/dist/`
- Backend: `apps/backend/dist/`
- Frontend: `apps/frontend/dist/`

## Database Setup

1. Create production database:
   ```bash
   createdb devoted_slingers_prod
   ```

2. The backend will automatically create tables on first run

3. For production, consider using a migration tool:
   - Flyway
   - Liquibase
   - Knex migrations
   - Sequelize migrations

## Deployment Options

### Option 1: Traditional Server (VPS)

#### Backend Deployment

1. Copy backend files to server:
   ```bash
   scp -r apps/backend/dist user@server:/var/www/devoted-slingers/backend
   scp -r apps/backend/node_modules user@server:/var/www/devoted-slingers/backend
   scp apps/backend/.env user@server:/var/www/devoted-slingers/backend
   ```

2. Install PM2 for process management:
   ```bash
   npm install -g pm2
   ```

3. Start backend with PM2:
   ```bash
   cd /var/www/devoted-slingers/backend
   pm2 start dist/index.js --name devoted-slingers-api
   pm2 save
   pm2 startup
   ```

4. Setup Nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### Frontend Deployment

1. Copy frontend build to server:
   ```bash
   scp -r apps/frontend/dist/* user@server:/var/www/devoted-slingers/frontend
   ```

2. Setup Nginx for frontend:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/devoted-slingers/frontend;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. Setup SSL with Let's Encrypt:
   ```bash
   certbot --nginx -d yourdomain.com -d api.yourdomain.com
   ```

### Option 2: Docker Deployment

#### Create Dockerfiles

**Backend Dockerfile** (`apps/backend/Dockerfile`):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

**Frontend Dockerfile** (`apps/frontend/Dockerfile`):
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: devoted_slingers
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./apps/backend
    environment:
      DATABASE_URL: postgresql://postgres:${DB_PASSWORD}@postgres:5432/devoted_slingers
      JWT_SECRET: ${JWT_SECRET}
      CORS_ORIGIN: ${FRONTEND_URL}
    depends_on:
      - postgres
    ports:
      - "3001:3001"

  frontend:
    build: ./apps/frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

Deploy:
```bash
docker-compose up -d
```

### Option 3: Cloud Platforms

#### Heroku

**Backend:**
```bash
cd apps/backend
heroku create devoted-slingers-api
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

**Frontend (Netlify/Vercel):**
```bash
cd apps/frontend
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### AWS

**Backend (Elastic Beanstalk):**
1. Create Node.js environment
2. Configure RDS PostgreSQL
3. Deploy backend code

**Frontend (S3 + CloudFront):**
```bash
aws s3 sync apps/frontend/dist s3://your-bucket
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

#### Google Cloud Platform

**Backend (Cloud Run):**
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/devoted-slingers-api apps/backend
gcloud run deploy devoted-slingers-api --image gcr.io/PROJECT_ID/devoted-slingers-api
```

**Frontend (Firebase Hosting):**
```bash
cd apps/frontend
firebase init hosting
firebase deploy
```

## Production Considerations

### Database

1. **Connection Pooling**: Adjust pool size based on traffic
2. **Backups**: Setup automated daily backups
3. **Indexes**: Monitor and optimize based on query patterns
4. **SSL**: Use SSL connection to database

### Security

1. **JWT Secret**: Use strong, random secret (256 bits)
2. **CORS**: Configure appropriate origins
3. **Rate Limiting**: Add rate limiting middleware
4. **Helmet**: Already configured for security headers
5. **HTTPS**: Use SSL certificates for all traffic
6. **Environment Variables**: Never commit secrets

### Monitoring

1. **Application Monitoring**: 
   - New Relic
   - Datadog
   - Application Insights

2. **Error Tracking**:
   - Sentry
   - Rollbar
   - Bugsnag

3. **Logging**:
   - Winston
   - Bunyan
   - ELK Stack

### Performance

1. **CDN**: Use CDN for frontend assets
2. **Caching**: Implement Redis for caching
3. **Database**: Setup read replicas for scaling
4. **Load Balancing**: Use load balancer for high traffic

### Scaling

**Horizontal Scaling:**
- Multiple backend instances behind load balancer
- Socket.IO with Redis adapter for multi-server support
- Database read replicas

**Vertical Scaling:**
- Increase server resources
- Optimize database queries
- Add database indexes

## Post-Deployment

1. **Verify deployment**:
   ```bash
   curl https://api.yourdomain.com/health
   ```

2. **Monitor logs**:
   ```bash
   pm2 logs devoted-slingers-api
   ```

3. **Setup monitoring alerts**

4. **Test all features**:
   - User registration/login
   - Swipe matching
   - Real-time chat
   - Deck building
   - Profile updates

## Rollback Plan

1. Keep previous builds:
   ```bash
   pm2 save --force
   ```

2. Quick rollback:
   ```bash
   pm2 delete devoted-slingers-api
   pm2 start previous-version/dist/index.js
   ```

## Maintenance

### Regular Tasks

- **Weekly**: Review logs and error rates
- **Monthly**: Database backup verification
- **Quarterly**: Security updates and dependency updates
- **Continuous**: Monitor performance metrics

### Updates

1. Test in staging environment first
2. Schedule maintenance window
3. Deploy new version
4. Verify functionality
5. Monitor for issues

## Support

For deployment issues:
- Check logs: `pm2 logs`
- Review environment variables
- Verify database connection
- Check firewall/security groups
- Consult deployment platform docs

## Costs Estimation

**Low Traffic (< 1000 users):**
- VPS: $20-50/month
- Database: $15-25/month
- Domain: $10-15/year

**Medium Traffic (1000-10,000 users):**
- VPS/Container: $100-200/month
- Database: $50-100/month
- CDN: $10-30/month

**High Traffic (10,000+ users):**
- Kubernetes cluster: $500+/month
- Database cluster: $200+/month
- CDN: $100+/month
- Monitoring: $50+/month

---

For specific deployment platform guides, consult their official documentation.
