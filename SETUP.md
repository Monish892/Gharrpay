# Gharrpay CRM - Quick Start Guide

## Prerequisites Installation

### 1. Install Node.js

Download from https://nodejs.org/ (LTS version recommended)

Verify installation:

```bash
node --version
npm --version
```

### 2. MongoDB Setup

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project
4. Create a cluster (M0 free tier)
5. Create database user with username and password
6. Add IP to whitelist (or 0.0.0.0 for development)
7. Copy connection string in format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/gharrpay-crm?retryWrites=true&w=majority
   ```

#### Option B: Local MongoDB

1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. Start MongoDB service:
   - Windows: `mongod.exe` or from Services
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
4. Connection string: `mongodb://localhost:27017/gharrpay-crm`

## Installation Steps

### Backend Setup

```bash
cd backend

cp .env.example .env
```

Edit `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gharrpay-crm?retryWrites=true&w=majority
```

Install dependencies:

```bash
npm install
```

Seed sample data:

```bash
npm run seed
```

Start development server:

```bash
npm run dev
```

Backend will be available at: http://localhost:5000

### Frontend Setup

In a new terminal:

```bash
cd frontend

cp .env.example .env
```

Edit `.env` file (optional - defaults work fine for local dev):

```
VITE_API_URL=http://localhost:5000/api
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will be available at: http://localhost:3000

## Verification Checklist

### Backend Running?

```bash
curl http://localhost:5000/health

Expected response:
{"success":true,"message":"Server is running"}
```

### Database Connected?

Check backend logs - should show: "MongoDB connected successfully"

### Sample Data Seeded?

Query MongoDB to verify:

```bash
mongosh
use gharrpay-crm
db.agents.find()
db.leads.find()
db.visits.find()
```

### Frontend Running?

- Open http://localhost:3000 in browser
- Should see Gharrpay CRM dashboard
- Check browser console for any errors (F12)

## Testing the System

### 1. Dashboard

- http://localhost:3000/
- Should show statistics cards and charts
- Numbers should match seeded data

### 2. Leads Page

- http://localhost:3000/leads
- Should show 10 seeded leads in table
- Test filters by source/status
- Test pagination

### 3. Pipeline Board

- http://localhost:3000/pipeline
- Should show 8 kanban columns
- Drag a lead card to change status
- Check backend logs for update

### 4. Visits

- http://localhost:3000/visits
- Should show 3 seeded visits
- Test scheduling new visit
- Test status updates

### 5. API Testing with cURL

Create a new lead:

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "phone": "+918765432199",
    "email": "test@example.com",
    "source": "website",
    "budget": 15000,
    "requirements": "2BHK, South Delhi"
  }'
```

Get all leads:

```bash
curl http://localhost:5000/api/leads?page=1&limit=10
```

Update lead status:

```bash
curl -X PATCH http://localhost:5000/api/leads/{leadId}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Contacted"}'
```

Get dashboard analytics:

```bash
curl http://localhost:5000/api/dashboard
```

## Troubleshooting

### Error: "Cannot find module 'mongoose'"

```
Solution: Run npm install in backend directory
```

### Error: "MongoDB connection error"

```
Solution:
1. Check MONGO_URI in .env
2. Verify MongoDB Atlas IP whitelist
3. Test connection with: mongosh "mongodb+srv://..."
```

### Error: "Port 5000 already in use"

```
Solution:
1. Change PORT in backend .env
2. Or kill process: lsof -ti:5000 | xargs kill -9 (Mac/Linux)
3. Or change port in Task Manager (Windows)
```

### Error: "Port 3000 already in use"

```
Solution:
1. Change port in frontend vite.config.js
2. Or kill process using port 3000
```

### Error: "CORS error" or "GET http://localhost:5000/api/leads 404"

```
Solution:
1. Ensure backend is running on http://localhost:5000
2. Check VITE_API_URL in frontend .env
3. Verify API routes match exactly
4. Check browser Network tab for actual URL
```

### Error: "Module not found" or "Cannot find module"

````
Solution: Clean and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
````

```

### Database Operations Not Persisting
```

Solution:

1. Check MongoDB connection is active
2. Verify collection names in code match database
3. Check user/password correct in MONGO_URI

````

## Development Workflow

### Making Code Changes

#### Backend Changes
1. Edit file in `backend/` directory
2. Server auto-restarts with nodemon
3. Refresh browser to test

#### Frontend Changes
1. Edit file in `frontend/src/` directory
2. Vite hot-reloads automatically
3. Check browser console for errors

### Adding a New Lead Route

1. Add controller in `backend/controllers/leadController.js`
2. Add route in `backend/routes/leadRoutes.js`
3. Call from frontend service in `frontend/src/services/apiService.js`
4. Use in component via `leadService.functionName()`

### Adding a New Frontend Page

1. Create page component in `frontend/src/pages/YourPage.jsx`
2. Import in `frontend/src/App.jsx`
3. Add route: `<Route path="/your-page" element={<YourPage />} />`
4. Add navigation link in `frontend/src/components/Sidebar.jsx`

## Performance Tips

### Backend Optimization
- Use indexes on frequently queried fields
- Implement caching for dashboard stats
- Use projection to return only needed fields
- Implement pagination for large datasets

### Frontend Optimization
- Implement React.memo for components
- Use lazy loading for pages
- Minimize API calls
- Cache API responses locally

## Security Hardening

### Before Production Deployment

1. Add authentication (JWT tokens)
2. Implement RBAC (role-based access control)
3. Add input validation
4. Implement rate limiting
5. Use environment variables for secrets
6. Enable HTTPS
7. Add request/response logging
8. Implement API versioning

## Database Backup

### MongoDB Atlas Automatic Backups
- Enabled by default (free plan: 7-day retention)
- Access in Atlas console → Backups

### Manual Backup (Local MongoDB)
```bash
mongodump --uri "mongodb://localhost:27017/gharrpay-crm" --out ./backup
````

### Restore

```bash
mongorestore --uri "mongodb://localhost:27017/gharrpay-crm" ./backup/gharrpay-crm
```

## Environment Variables Reference

### Backend (.env)

```
PORT=5000                          # Server port
MONGO_URI=mongodb+srv://...        # Database connection
NODE_ENV=development               # Environment
LOG_LEVEL=info                     # Logging level
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api    # API endpoint
VITE_ENVIRONMENT=development               # Environment
```

## Useful Commands

### Backend

```bash
npm run dev          # Start dev server
npm start            # Start production server
npm run seed         # Seed sample data
npm test             # Run tests (when implemented)
npm run lint         # Check code style
```

### Frontend

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests (when implemented)
```

## Next Steps

1. ✅ System running locally
2. ✅ APIs working
3. ✅ Frontend displaying data
4. Next: Add authentication
5. Next: Implement file uploads
6. Next: Add email/SMS notifications
7. Next: Deploy to Render + Vercel
8. Next: Set up monitoring
9. Next: Add automated tests
10. Next: Implement advanced features

## Support Resources

- Backend Repository: Backend code in `/backend`
- Frontend Repository: Frontend code in `/frontend`
- API Documentation: Available in README.md
- Issue Tracking: Add issues in project board
- Deployment Guides: See README.md Deployment section

## Quick Reference

| Component   | Port  | URL                   | Tech         |
| ----------- | ----- | --------------------- | ------------ |
| Frontend    | 3000  | http://localhost:3000 | React + Vite |
| Backend API | 5000  | http://localhost:5000 | Express.js   |
| Database    | 27017 | localhost or Atlas    | MongoDB      |
| Database UI | 8081  | http://localhost:8081 | (Optional)   |

---

**Happy coding! 🚀**

For production deployment, refer to the Deployment section in README.md
