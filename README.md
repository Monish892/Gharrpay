# Gharrpay CRM - Lead Management System

A production-quality MVP Lead Management CRM system for Gharrpay, helping students and professionals find PG accommodations. The system captures leads, assigns agents, manages pipelines, schedules visits, sends follow-up reminders, and displays comprehensive analytics.

## Project Overview

Gharrpay CRM solves critical business problems:

- Centralized lead capture from multiple sources (WhatsApp, website, social media, phone calls, forms)
- Automatic agent assignment with round-robin distribution
- Clear lead ownership and accountability
- Automated follow-up reminders for inactive leads
- Visual pipeline tracking through Kanban board
- Comprehensive analytics and agent performance metrics

## System Architecture

### 3-Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│          Frontend (React + Vite + Tailwind)             │
├─────────────────────────────────────────────────────────┤
│          API Gateway (Express.js Routes)                │
├─────────────────────────────────────────────────────────┤
│    Database Layer (MongoDB + Mongoose)                  │
└─────────────────────────────────────────────────────────┘
```

### Backend Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Task Scheduling**: node-cron for hourly follow-up reminders
- **Code Style**: ES modules, no semicolons, clean architecture

### Frontend Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6

### Database: MongoDB

#### Lead Model

```
{
  name: String (required),
  phone: String (required, unique),
  email: String,
  source: Enum ['website', 'whatsapp', 'social', 'call', 'form'],
  status: Enum [
    'New Lead', 'Contacted', 'Requirement Collected',
    'Property Suggested', 'Visit Scheduled', 'Visit Completed',
    'Booked', 'Lost'
  ],
  assignedAgent: ObjectId (ref: Agent),
  lastActivity: Date,
  budget: Number,
  requirements: String,
  notes: String,
  activityLog: Array [{ type, description, timestamp }],
  timestamps: true
}
```

#### Agent Model

```
{
  name: String (required),
  email: String (required, unique),
  phone: String,
  activeLeads: Number (default: 0),
  totalLeadsAssigned: Number (default: 0),
  successfulBookings: Number (default: 0),
  status: Enum ['active', 'inactive'],
  timestamps: true
}
```

#### Visit Model

```
{
  leadId: ObjectId (ref: Lead, required),
  propertyName: String (required),
  visitDate: Date (required),
  status: Enum ['Scheduled', 'Completed', 'Cancelled'],
  notes: String,
  visitOutcome: Enum ['positive', 'negative', 'followup', null],
  agentNotes: String,
  completedAt: Date,
  timestamps: true
}
```

## Lead Flow

```
1. Lead Capture
   ├── Website Form
   ├── WhatsApp Message
   ├── Social Media
   ├── Phone Call
   └── Form Submission

2. Lead Creation
   └── POST /api/leads

3. Automatic Assignment
   └── Round-robin agent assignment
   └── activeLeads counter updated

4. Pipeline Management
   ├── Status progression through 8 stages
   ├── Drag-drop Kanban board
   └── PATCH /api/leads/:id/status

5. Visit Scheduling
   ├── Lead requirement matching
   ├── Property assignment
   ├── Date scheduling
   └── POST /api/visits

6. Follow-up Logic
   ├── Hourly cron job
   ├── Check lastActivity > 24 hours
   ├── Log follow-up reminders
   └── Manual follow-up triggering

7. Analytics
   └── GET /api/dashboard returns:
       ├── totalLeads
       ├── leadsByStage distribution
       ├── visitsScheduled
       ├── bookingsConfirmed
       └── conversionRate
```

## API Routes

### Lead Routes

- `POST /api/leads` - Create lead
- `GET /api/leads` - List leads (paginated, filterable)
- `GET /api/leads/:id` - Get lead details
- `PATCH /api/leads/:id/status` - Update pipeline stage
- `PATCH /api/leads/:id/assign` - Assign to agent
- `GET /api/leads/stats` - Get lead statistics

### Agent Routes

- `POST /api/agents` - Create agent
- `GET /api/agents` - List active agents
- `GET /api/agents/:id` - Get agent details
- `PATCH /api/agents/:id` - Update agent
- `GET /api/agents/stats` - Get agent performance stats

### Visit Routes

- `POST /api/visits` - Schedule visit
- `GET /api/visits` - List visits (paginated, filterable)
- `GET /api/visits/:id` - Get visit details
- `PATCH /api/visits/:id` - Update visit status/outcome
- `GET /api/visits/stats` - Get visit statistics

### Dashboard Routes

- `GET /api/dashboard` - Get dashboard analytics

## Frontend Pages

### Dashboard

- Real-time statistics cards (Total Leads, Visits Scheduled, Bookings, Agents)
- Lead distribution by pipeline stage (bar chart)
- Visit statistics and conversion rates

### Leads Management

- Searchable leads table with pagination
- Filter by source, status, agent
- Inline status updates
- Quick lead view and assignment

### Pipeline Board

- Kanban-style drag-and-drop interface
- 8 pipeline columns
- Real-time status updates on drop
- Lead count per stage
- Visual lead cards with key info

### Visit Scheduler

- Lead selection dropdown
- Property name input
- Visit date-time picker
- Notes for agents
- Integrated visit list with status tracking

## Lead Assignment Logic

### Round-Robin Assignment

```javascript
Agents: [Rajesh (A), Priya (B), Arjun (C)]

Lead 1 → Agent A
Lead 2 → Agent B
Lead 3 → Agent C
Lead 4 → Agent A
...
```

Features:

- Automatic on lead creation
- Manual reassignment available
- Active leads counter updated
- Total assignments tracked for analytics
- Conversion rate calculated per agent

## Follow-up Reminder System

### Scheduled Job (Node-cron)

- **Schedule**: Every hour (0 \* \* \* \*)
- **Check**: Leads where lastActivity > 24 hours ago
- **Exclude**: Booked and Lost status leads
- **Action**: Console logging with lead details
- **Extension**: Can integrate with SMS/Email/WhatsApp APIs

Example log output:

```
FOLLOW UP REQUIRED: 3 leads need follow-up
  - Aditya Singh (+918765432101) - Last activity: 2024-01-05
  - Neha Gupta (+918765432102) - Last activity: 2024-01-04
  - Rohan Verma (+918765432103) - Last activity: 2024-01-03
```

## Installation & Setup

### Prerequisites

- Node.js 14+
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend

cp .env.example .env

npm install

npm run seed

npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on http://localhost:3000

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/gharrpay-crm?retryWrites=true&w=majority
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## Features Implemented

✅ Lead capture from multiple sources
✅ Centralized lead database
✅ Automatic round-robin agent assignment
✅ Manual agent reassignment
✅ 8-stage pipeline management
✅ Kanban-style drag-and-drop board
✅ Visit scheduling with property matching
✅ Visit status tracking (Scheduled, Completed, Cancelled)
✅ Hourly follow-up reminders
✅ Activity logging for each lead
✅ Agent performance analytics
✅ Comprehensive dashboard analytics
✅ Paginated lead/visit lists
✅ Advanced filtering by source/status/agent
✅ Real-time status updates
✅ Responsive Tailwind UI
✅ Error handling and validation
✅ Clean modular architecture

## Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Connect Render to repository
3. Set environment variables in Render
4. Deploy from main branch
5. Backend URL: `https://your-app.onrender.com`

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Connect Vercel to repository
3. Set VITE_API_URL environment variable
4. Auto-deploys on push
5. Frontend URL: `https://your-app.vercel.app`

## Scaling Strategy

### Phase 1: Current State

- **Database**: MongoDB Atlas free tier (512MB)
- **Backend**: Single Render instance
- **Frontend**: Vercel static hosting
- **Capacity**: ~1K active leads, 100 users

### Phase 2: Growth Stage (5K+ leads)

#### 1. Caching Layer

```
Redis Cache:
├── Dashboard stats (5min TTL)
├── Lead search results (1min TTL)
├── Agent performance (10min TTL)
└── Visit schedules (2min TTL)
```

#### 2. Message Queue

```
Task Queue (Bull/RabbitMQ):
├── Lead ingestion pipeline
├── SMS/Email notifications
├── Batch analytics processing
└── Image/document uploads
```

#### 3. Database Optimization

```
MongoDB Indices:
├── phone (unique)
├── assignedAgent
├── status
├── createdAt
├── lastActivity
└── Compound: (status, assignedAgent)
```

### Phase 3: Enterprise Scale (100K+ leads)

#### 1. Microservices Architecture

```
API Gateway
├── Lead Service
├── Agent Service
├── Visit Service
├── Analytics Service
└── Notification Service
```

#### 2. Database Sharding

```
Sharded Collections:
├── Shard by assignedAgent for leads
├── Shard by status for analytics
└── Time-series database for activity logs
```

#### 3. Horizontal Scaling

```
Load Balancing:
├── Multiple backend instances
├── Auto-scaling based on CPU/Memory
├── CDN for static assets
└── Database replicas
```

#### 4. Advanced Features

```
Webhook Integrations:
├── WhatsApp Business API
├── Twilio for SMS
├── SendGrid for Email
├── Slack notifications
└── Calendar integrations
```

### Phase 4: Advanced Optimizations

#### 1. Real-time Features

```
WebSockets:
├── Live lead updates
├── Agent status synchronization
├── Activity notifications
└── Pipeline updates
```

#### 2. Analytics Engine

```
Data Warehouse:
├── Elasticsearch for search
├── Data Lake for analytics
├── Machine learning for predictions
└── Conversion trend analysis
```

#### 3. AI/ML Integration

```
Machine Learning:
├── Lead scoring model
├── Optimal agent assignment
├── Churn prediction
└── Property recommendations
```

## Performance Metrics

### Current Targets

- Page Load: < 2 seconds
- API Response: < 500ms
- Database Query: < 100ms
- CRM Uptime: 99.5%

### Monitoring Setup

```
Recommended Tools:
├── Sentry for error tracking
├── New Relic for APM
├── Datadog for infrastructure
├── LogRocket for session replay
└── Firebase Analytics
```

## Security Best Practices

### Implemented

- Input validation and sanitization
- Error handling without exposing internals
- CORS configuration
- No sensitive data in logs

### Recommended Additions

- JWT authentication
- Role-based access control (RBAC)
- API rate limiting
- Data encryption at rest
- HTTPS enforcement
- Regular security audits

## Testing Strategy

### Backend Tests

```bash
Unit Tests:
├── Services (business logic)
├── Controllers (request handling)
└── Models (validation)

Integration Tests:
├── API routes
├── Database operations
└── Third-party integrations

Test Framework: Jest or Mocha
```

### Frontend Tests

```bash
Unit Tests:
├── Components
├── Hooks
└── Services

Integration Tests:
├── User flows
├── API integration
└── Error handling

Test Framework: Vitest or Jest
```

## Code Quality

### Standards

- No semicolons (Prettier config)
- ES modules throughout
- Async/await for async operations
- Modular file structure
- Named exports
- Clear function documentation

### Linting

```bash
ESLint configuration:
- Airbnb style guide
- Unused variable detection
- Import sorting
```

## File Structure

```
gharrpay-crm/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── leadController.js
│   │   ├── agentController.js
│   │   ├── visitController.js
│   │   └── dashboardController.js
│   ├── models/
│   │   ├── Lead.js
│   │   ├── Agent.js
│   │   └── Visit.js
│   ├── routes/
│   │   ├── leadRoutes.js
│   │   ├── agentRoutes.js
│   │   ├── visitRoutes.js
│   │   └── dashboardRoutes.js
│   ├── services/
│   │   ├── leadService.js
│   │   ├── agentService.js
│   │   ├── visitService.js
│   │   └── dashboardService.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── cors.js
│   ├── utils/
│   │   ├── leadAssignment.js
│   │   ├── scheduler.js
│   │   └── errors.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── LeadsTable.jsx
│   │   │   ├── PipelineBoard.jsx
│   │   │   └── VisitsTable.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Leads.jsx
│   │   │   ├── Pipeline.jsx
│   │   │   └── Visits.jsx
│   │   ├── services/
│   │   │   ├── axiosInstance.js
│   │   │   └── apiService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## Sample Data

The project includes seed data:

- **3 Agents**: Rajesh Kumar, Priya Sharma, Arjun Patel
- **10 Leads**: Various sources and pipeline stages
- **3 Visits**: Scheduled, completed, and outcomes tracked

Run `npm run seed` in backend to populate initial data.

## Troubleshooting

### MongoDB Connection Issues

```
Solution:
1. Verify MongoDB URI in .env
2. Check IP whitelist in MongoDB Atlas
3. Ensure cluster is not paused
4. Test connection with mongo shell
```

### CORS Errors

```
Solution:
1. Verify frontend URL in backend CORS config
2. Ensure proxy configuration in vite.config.js
3. Check API_BASE_URL in frontend
```

### API Not Found Errors

```
Solution:
1. Verify backend is running on port 5000
2. Check route paths match exactly
3. Inspect Network tab in browser DevTools
4. Check API endpoint implementation
```

## Future Enhancements

- SMS/Email/WhatsApp notifications
- Calendar integration
- Document management
- Photo/video support
- Lead import/export
- Custom field definitions
- Templates for follow-ups
- Advanced reporting
- Mobile app (React Native)
- AI-powered lead scoring

## Contributing

This is a MVP suitable for Gharrpay's current needs. As the system grows:

1. Implement automated tests
2. Add authentication and authorization
3. Set up CI/CD pipeline
4. Implement monitoring and alerts
5. Plan microservices migration
6. Add API versioning

## License

Proprietary - Gharrpay

## Support

For technical support or feature requests, contact the development team.

---

**Built with MERN Stack for Production-Ready Lead Management**
