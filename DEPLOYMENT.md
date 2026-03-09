# Gharrpay CRM - Deployment Guide

## Pre-Deployment Checklist

### Code Quality

- [ ] All console logs reviewed and important ones kept
- [ ] No hardcoded credentials
- [ ] Error messages user-friendly
- [ ] API validation complete
- [ ] Database indexes optimized
- [ ] No circular dependencies
- [ ] Environment variables documented

### Testing

- [ ] Manual testing completed
- [ ] API endpoints tested
- [ ] Pagination tested
- [ ] Filtering tested
- [ ] Drag-drop functionality works
- [ ] Error scenarios handled

### Security

- [ ] Environment variables secured
- [ ] No sensitive data in logs
- [ ] CORS configured properly
- [ ] Input validation implemented
- [ ] SQL/NoSQL injection protection (Mongoose handles)
- [ ] XSS protection (React handles)

### Performance

- [ ] Database queries optimized
- [ ] Indexes created
- [ ] No N+1 queries
- [ ] API response times < 500ms
- [ ] Frontend bundle optimized
- [ ] No memory leaks

---

## Deployment Steps

### 1. Database Setup (MongoDB Atlas)

#### Step 1: Create Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Create new project: "gharrpay-crm"
3. Create cluster: M0 free tier (recommended for MVP)
4. Wait for cluster to be ready (5-10 minutes)

#### Step 2: Create Database User

1. Go to Database Access section
2. Create new user
3. Username: `gharrpay_admin`
4. Generate secure password (store safely)
5. Database User Privileges: Read and write to any database

#### Step 3: Configure Network Access

1. Go to Network Access section
2. Add IP Address
3. Choose "Allow access from anywhere" (0.0.0.0/0) for MVP
4. Confirm

#### Step 4: Get Connection String

1. Click "Connect" button on cluster
2. Choose "Connect your application"
3. Copy connection string
4. Format: `mongodb+srv://user:password@cluster.mongodb.net/gharrpay-crm?retryWrites=true&w=majority`

---

### 2. Backend Deployment (Render)

#### Step 1: Prepare Code

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
```

#### Step 2: Push to GitHub

```bash
git remote add origin https://github.com/yourusername/gharrpay-crm-backend.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy on Render

1. Go to https://render.com
2. Sign up (free account)
3. New → Web Service
4. Connect GitHub account
5. Select repository: `gharrpay-crm-backend`
6. Configuration:
   - Name: `gharrpay-crm-backend`
   - Environment: `Node`
   - Region: Select closest to users
   - Build Command: `npm install`
   - Start Command: `npm start`
7. Set environment variables:
   ```
   PORT=10000 (Render-provided)
   MONGO_URI=mongodb+srv://gharrpay_admin:password@cluster...
   NODE_ENV=production
   ```
8. Click Deploy

#### Step 4: Verify Deployment

```bash
curl https://your-app.onrender.com/health
```

Should return:

```json
{ "success": true, "message": "Server is running" }
```

#### Step 5: Seed Production Data

```bash
curl -X POST https://your-app.onrender.com/api/leads
```

---

### 3. Frontend Deployment (Vercel)

#### Step 1: Prepare Code

```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
```

#### Step 2: Push to GitHub

```bash
git remote add origin https://github.com/yourusername/gharrpay-crm-frontend.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy on Vercel

1. Go to https://vercel.com
2. Sign up (free account)
3. New Project
4. Import Git Repository
5. Select: `gharrpay-crm-frontend`
6. Framework: Vite
7. Build Settings: (defaults work)
8. Environment Variables:
   ```
   VITE_API_URL=https://your-app.onrender.com/api
   ```
9. Click Deploy

#### Step 4: Verify Deployment

- Open https://your-app.vercel.app
- Check Network tab in DevTools
- Verify API calls go to Render backend

---

## Post-Deployment

### 1. Database Backup

1. MongoDB Atlas → Backups section
2. Configure hourly backups (free tier: 7 days)
3. Test restore process

### 2. Monitoring Setup

#### Error Tracking (Sentry)

```bash
npm install @sentry/react @sentry/node

# Add to backend server.js
import * as Sentry from '@sentry/node'
Sentry.init({ dsn: 'your-sentry-dsn' })

# Add to frontend main.jsx
import * as Sentry from '@sentry/react'
Sentry.init({ dsn: 'your-sentry-dsn' })
```

#### Logging (Winston)

```bash
npm install winston

# Backend logging setup
import winston from 'winston'
const logger = winston.createLogger({...})
```

### 3. Performance Monitoring

#### Frontend (Google Analytics)

```bash
npm install @react-google-analytics/core

# Track key metrics:
- Page load time
- API call duration
- Error rates
- User interactions
```

#### Backend (New Relic)

```bash
npm install newrelic

# Add to beginning of server.js
require('newrelic')
```

### 4. Setup Alerts

#### Email Alerts

- Database connection failures
- High error rates
- API response time > 2s
- Monthly quota warnings

---

## Troubleshooting Deployment

### Backend Not Starting

```
Check logs:
1. Render dashboard → service logs
2. Verify MONGO_URI connects
3. Check NODE_ENV=production
4. Verify PORT is not hardcoded
```

### Frontend Blank Page

```
Check:
1. Browser console for errors (F12)
2. Network tab for API calls
3. VITE_API_URL environment variable
4. Backend is running and accessible
```

### CORS Errors

```
Solution:
1. Verify backend CORS middleware enabled
2. Check frontend API_BASE_URL matches
3. Backend URL accessible from browser
```

### Slow API Responses

```
Solutions:
1. Add database indexes
2. Implement caching with Redis
3. Use query projections
4. Implement pagination
5. Enable CDN (CloudFlare)
```

---

## Scaling Tips

### For 10K+ Leads

1. **Add Redis Cache**

   ```bash
   npm install redis

   # Cache dashboard stats
   # Cache agent list
   # Cache recent leads
   ```

2. **Add Database Indexes**

   ```javascript
   db.leads.createIndex({ status: 1 });
   db.leads.createIndex({ assignedAgent: 1 });
   db.leads.createIndex({ createdAt: -1 });
   db.leads.createIndex({ phone: 1 }, { unique: true });
   ```

3. **Implement Pagination**
   - Already done
   - Increase limit for advanced users

4. **Add Search Optimization**
   - Use Elasticsearch for text search
   - Index phone numbers for quick lookup

### For 100K+ Leads

1. **Microservices**
   - Lead Service
   - Agent Service
   - Notification Service
   - Analytics Service

2. **Message Queue**

   ```bash
   npm install bull redis

   # Queue tasks:
   - Lead creation
   - Lead updates
   - Notifications
   ```

3. **Database Sharding**
   - Shard by assigned agent
   - Shard by date created

4. **API Gateway**
   - Rate limiting
   - Request routing
   - Load balancing

---

## Monitoring Commands

### Check Backend Status

```bash
curl https://your-app.onrender.com/health
```

### Check Database Connection

```bash
mongosh "mongodb+srv://user:pass@cluster..."
use gharrpay-crm
db.leads.count()
```

### View Logs

**Render Logs:**
Go to dashboard → Logs tab

**Vercel Logs:**
Go to dashboard → Deployments → Logs

**MongoDB Atlas:**
Go to Cluster → Collections → check data

---

## Backup Strategy

### Daily Automated

- MongoDB Atlas automatic backups (free tier)
- Retention: 7 days

### Weekly Manual

```bash
mongodump --uri "mongodb+srv://..." --out /backup
```

### Monthly Archive

- Store dump in S3 or cloud storage
- Retention: 1 year

---

## Update Strategy

### New Feature Deployment

1. **Test Locally**

   ```bash
   npm run dev
   # Test thoroughly
   ```

2. **Push to GitHub**

   ```bash
   git push origin feature-branch
   ```

3. **Create Pull Request**
   - Code review
   - Approval

4. **Merge to Main**
   - Vercel/Render auto-deploys
   - Monitor logs

5. **Verify in Production**
   ```bash
   # Check new functionality
   # Monitor error logs
   ```

---

## Rollback Procedure

If deployment fails:

### Frontend (Vercel)

1. Go to Deployments
2. Click previous successful deployment
3. Click "Promote to Production"

### Backend (Render)

1. Go to Deploys
2. Find last successful deploy
3. Click "Redeploy"

---

## Cost Optimization

### Current Stack (Free Tier)

| Service          | Cost     | Limit           |
| ---------------- | -------- | --------------- |
| MongoDB Atlas M0 | Free     | 512MB           |
| Render           | Free     | 750 hours/month |
| Vercel           | Free     | Unlimited       |
| **Total**        | **Free** | Good for MVP    |

### Growth Stack (Paid)

| Service          | Tier    | Cost/Month |
| ---------------- | ------- | ---------- |
| MongoDB Atlas M2 | Shared  | $10        |
| Render           | Pro     | $7/service |
| Vercel           | Pro     | $20        |
| Redis Cloud      | Starter | Free       |
| Datadog          | Free    | Free       |
| **Total**        |         | ~$37/month |

### Enterprise Stack

- MongoDB Atlas Dedicated: $57+
- Render Standard 2: $12.50
- Vercel Pro: $20
- Additional services: $50+
- **Total**: $150+/month

---

## Production Checklist

### Before Going Live

- [ ] Database backed up
- [ ] Monitoring configured
- [ ] Alerts set up
- [ ] Error tracking enabled
- [ ] SSL certificate valid
- [ ] All APIs tested
- [ ] Performance tested under load
- [ ] Security audit complete
- [ ] Documentation updated
- [ ] Team trained

### During Launch

- [ ] Monitor error logs
- [ ] Check API response times
- [ ] Verify database capacity
- [ ] Monitor user feedback
- [ ] Be ready to rollback

### After Launch

- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Plan next iteration
- [ ] Scale resources if needed
- [ ] Optimize performance

---

## Support Contacts

- **Render Support:** https://support.render.com
- **Vercel Support:** https://vercel.com/support
- **MongoDB Support:** https://docs.mongodb.com/
- **Node.js Docs:** https://nodejs.org/docs

---

## Next Steps

After MVP launch:

1. Add user authentication
2. Implement file uploads
3. Add email/SMS notifications
4. Create mobile app
5. Implement analytics dashboards
6. Add AI-powered lead scoring
7. Expand to multiple regions

---

**Ready for Production! 🚀**

Last Updated: January 2024
