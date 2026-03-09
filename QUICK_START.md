# Gharrpay CRM - Quick Start (5 Minutes)

## Prerequisites

- Node.js installed (https://nodejs.org)
- MongoDB (local or MongoDB Atlas)

---

## Step 1: Backend Setup (2 minutes)

```bash
cd backend

cp .env.example .env

echo "PORT=5000" > .env
echo "MONGO_URI=mongodb://localhost:27017/gharrpay-crm" >> .env

npm install

npm run seed

npm run dev
```

Backend runs on: **http://localhost:5000**

Check: `curl http://localhost:5000/health`

---

## Step 2: Frontend Setup (2 minutes)

Open a new terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on: **http://localhost:3000**

---

## Step 3: Open Dashboard (1 minute)

Open browser: **http://localhost:3000**

You should see:

- Dashboard with stats
- 10 leads in database
- 3 agents
- Kanban pipeline board

---

## Testing

### Test Lead Creation

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "phone":"+919999999999",
    "source":"website"
  }'
```

### Test Get Leads

```bash
curl http://localhost:5000/api/leads
```

### Test Dashboard

```bash
curl http://localhost:5000/api/dashboard
```

---

## MongoDB Atlas Setup (Optional - for cloud database)

1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create M0 cluster
4. Create database user
5. Add IP to whitelist
6. Copy connection string
7. Update `.env`:
   ```
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/gharrpay-crm?retryWrites=true&w=majority
   ```

---

## Troubleshooting

### Port Already in Use

```bash
# Change port in backend .env
PORT=5001

# Change port in frontend vite.config.js
server: { port: 3001 }
```

### MongoDB Connection Error

```bash
# Check connection string in .env
# Ensure MongoDB is running (local)
# Ensure IP whitelisted (Atlas)
```

### CORS Errors

```bash
# Ensure backend is running
# Verify API URL in frontend
# Check frontend Network tab
```

### Package Installation Error

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Useful Commands

### Backend

```bash
npm run dev      # Start dev server
npm run seed     # Seed database with sample data
npm start        # Production start
```

### Frontend

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## API Endpoints (Quick Reference)

### Leads

- `POST /api/leads` - Create lead
- `GET /api/leads` - List leads
- `PATCH /api/leads/:id/status` - Update status

### Agents

- `GET /api/agents` - List agents

### Visits

- `POST /api/visits` - Schedule visit
- `GET /api/visits` - List visits

### Dashboard

- `GET /api/dashboard` - Get analytics

---

## Sample Data Included

### Agents

- Rajesh Kumar (rajesh@gharrpay.com)
- Priya Sharma (priya@gharrpay.com)
- Arjun Patel (arjun@gharrpay.com)

### Leads

- 10 leads with various sources and statuses

### Visits

- 3 visits (scheduled and completed)

---

## Production Deployment

### Backend (Render)

```bash
git init
git add .
git commit -m "Deploy"
git push heroku main

# Set env vars on Render dashboard
# MONGO_URI=<your-mongodb-uri>
```

### Frontend (Vercel)

```bash
# Push to GitHub
# Import in Vercel
# Set VITE_API_URL=<your-api-url>
```

---

## Documentation

- **Setup Details:** SETUP.md
- **API Reference:** API.md
- **Deployment:** DEPLOYMENT.md
- **Full Docs:** README.md

---

## Next Steps

1. ✅ Backend running
2. ✅ Frontend running
3. ✅ Sample data loaded
4. **Next:** Test all features
5. **Next:** Customize for your needs
6. **Next:** Deploy to production

---

## Getting Help

### Check Logs

```bash
# Backend logs
# Look at terminal where npm run dev is running

# Frontend logs
# Open browser console (F12)
# Check Network tab for API calls
```

### Verify Connections

```bash
# Backend running?
curl http://localhost:5000/health

# Database connected?
# Check backend logs for "MongoDB connected"

# Frontend connecting to API?
# Open browser DevTools Network tab
# Check API requests
```

---

**You're all set! Dashboard ready at http://localhost:3000 🚀**

Need help? Check the documentation files above.
