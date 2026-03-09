# Gharrpay CRM - API Documentation

## Base URL

```
http://localhost:5000/api
```

## Response Format

All API responses follow this standard format:

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "status": 400,
  "message": "Error description",
  "data": null
}
```

---

## Leads API

### Create Lead

**Endpoint:** `POST /api/leads`

**Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Aditya Singh",
  "phone": "+918765432101",
  "email": "aditya@example.com",
  "source": "website",
  "budget": 15000,
  "requirements": "1BHK, Near Metro, South Delhi"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Aditya Singh",
    "phone": "+918765432101",
    "email": "aditya@example.com",
    "source": "website",
    "status": "New Lead",
    "budget": 15000,
    "requirements": "1BHK, Near Metro, South Delhi",
    "assignedAgent": {
      "_id": "507f1f77bcf86cd799439001",
      "name": "Rajesh Kumar",
      "email": "rajesh@gharrpay.com"
    },
    "lastActivity": "2024-01-10T10:30:00Z",
    "activityLog": [
      {
        "type": "Lead Created",
        "description": "Lead created from website",
        "timestamp": "2024-01-10T10:30:00Z"
      }
    ],
    "createdAt": "2024-01-10T10:30:00Z",
    "updatedAt": "2024-01-10T10:30:00Z"
  }
}
```

### Get All Leads

**Endpoint:** `GET /api/leads`

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Records per page (default: 10)
- `status` (string): Filter by status
- `source` (string): Filter by source
- `assignedAgent` (string): Filter by agent ID

**Example:**

```
GET /api/leads?page=1&limit=10&source=website&status=Contacted
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "leads": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Aditya Singh",
        "phone": "+918765432101",
        "source": "website",
        "status": "New Lead",
        "assignedAgent": {
          "_id": "507f1f77bcf86cd799439001",
          "name": "Rajesh Kumar",
          "email": "rajesh@gharrpay.com"
        },
        "lastActivity": "2024-01-10T10:30:00Z",
        "createdAt": "2024-01-10T10:30:00Z"
      }
    ],
    "total": 10,
    "pages": 1,
    "currentPage": 1
  }
}
```

### Get Lead Details

**Endpoint:** `GET /api/leads/:id`

**Example:**

```
GET /api/leads/507f1f77bcf86cd799439011
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Aditya Singh",
    "phone": "+918765432101",
    "email": "aditya@example.com",
    "source": "website",
    "status": "New Lead",
    "budget": 15000,
    "requirements": "1BHK, Near Metro, South Delhi",
    "notes": "Interested in properties near metro",
    "assignedAgent": {
      "_id": "507f1f77bcf86cd799439001",
      "name": "Rajesh Kumar",
      "email": "rajesh@gharrpay.com",
      "phone": "+919876543210"
    },
    "lastActivity": "2024-01-10T10:30:00Z",
    "activityLog": [
      {
        "type": "Lead Created",
        "description": "Lead created from website",
        "timestamp": "2024-01-10T10:30:00Z"
      },
      {
        "type": "Agent Assigned",
        "description": "Assigned to Rajesh Kumar",
        "timestamp": "2024-01-10T10:30:00Z"
      }
    ],
    "createdAt": "2024-01-10T10:30:00Z",
    "updatedAt": "2024-01-10T10:30:00Z"
  }
}
```

### Update Lead Status

**Endpoint:** `PATCH /api/leads/:id/status`

**Request Body:**

```json
{
  "status": "Contacted"
}
```

**Valid Status Values:**

- New Lead
- Contacted
- Requirement Collected
- Property Suggested
- Visit Scheduled
- Visit Completed
- Booked
- Lost

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Lead status updated",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "status": "Contacted",
    "lastActivity": "2024-01-10T11:00:00Z",
    "activityLog": [
      {
        "type": "Status Updated",
        "description": "Status changed to Contacted",
        "timestamp": "2024-01-10T11:00:00Z"
      }
    ]
  }
}
```

### Assign Lead to Agent

**Endpoint:** `PATCH /api/leads/:id/assign`

**Request Body:**

```json
{
  "agentId": "507f1f77bcf86cd799439001"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Lead assigned successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Aditya Singh",
    "assignedAgent": {
      "_id": "507f1f77bcf86cd799439001",
      "name": "Priya Sharma",
      "email": "priya@gharrpay.com"
    },
    "activityLog": [
      {
        "type": "Agent Reassigned",
        "description": "Reassigned to Priya Sharma",
        "timestamp": "2024-01-10T11:00:00Z"
      }
    ]
  }
}
```

### Get Lead Statistics

**Endpoint:** `GET /api/leads/stats`

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalLeads": 10,
    "leadsByStatus": {
      "New Lead": 2,
      "Contacted": 3,
      "Requirement Collected": 1,
      "Property Suggested": 1,
      "Visit Scheduled": 1,
      "Visit Completed": 1,
      "Booked": 1,
      "Lost": 0
    }
  }
}
```

---

## Agents API

### Create Agent

**Endpoint:** `POST /api/agents`

**Request Body:**

```json
{
  "name": "Vikram Singh",
  "email": "vikram@gharrpay.com",
  "phone": "+919876543213",
  "status": "active"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Agent created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Vikram Singh",
    "email": "vikram@gharrpay.com",
    "phone": "+919876543213",
    "activeLeads": 0,
    "totalLeadsAssigned": 0,
    "successfulBookings": 0,
    "status": "active",
    "createdAt": "2024-01-10T10:30:00Z"
  }
}
```

### Get All Agents

**Endpoint:** `GET /api/agents`

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439001",
      "name": "Rajesh Kumar",
      "email": "rajesh@gharrpay.com",
      "phone": "+919876543210",
      "activeLeads": 3,
      "totalLeadsAssigned": 4,
      "successfulBookings": 1,
      "status": "active"
    },
    {
      "_id": "507f1f77bcf86cd799439002",
      "name": "Priya Sharma",
      "email": "priya@gharrpay.com",
      "phone": "+919876543211",
      "activeLeads": 3,
      "totalLeadsAssigned": 3,
      "successfulBookings": 1,
      "status": "active"
    }
  ]
}
```

### Get Agent Statistics

**Endpoint:** `GET /api/agents/stats`

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439001",
      "name": "Rajesh Kumar",
      "email": "rajesh@gharrpay.com",
      "activeLeads": 3,
      "totalLeadsAssigned": 4,
      "successfulBookings": 1,
      "conversionRate": "25.00"
    },
    {
      "_id": "507f1f77bcf86cd799439002",
      "name": "Priya Sharma",
      "email": "priya@gharrpay.com",
      "activeLeads": 3,
      "totalLeadsAssigned": 3,
      "successfulBookings": 1,
      "conversionRate": "33.33"
    }
  ]
}
```

### Update Agent

**Endpoint:** `PATCH /api/agents/:id`

**Request Body:**

```json
{
  "phone": "+919999999999",
  "status": "inactive"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Agent updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439001",
    "name": "Rajesh Kumar",
    "email": "rajesh@gharrpay.com",
    "phone": "+919999999999",
    "status": "inactive"
  }
}
```

---

## Visits API

### Schedule Visit

**Endpoint:** `POST /api/visits`

**Request Body:**

```json
{
  "leadId": "507f1f77bcf86cd799439011",
  "propertyName": "Green Garden Residency",
  "visitDate": "2024-01-15T14:30:00Z",
  "notes": "Customer wants to see 2BHK unit"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Visit scheduled successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    "leadId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Aditya Singh",
      "phone": "+918765432101",
      "email": "aditya@example.com"
    },
    "propertyName": "Green Garden Residency",
    "visitDate": "2024-01-15T14:30:00Z",
    "status": "Scheduled",
    "notes": "Customer wants to see 2BHK unit",
    "visitOutcome": null,
    "createdAt": "2024-01-10T10:30:00Z"
  }
}
```

### Get All Visits

**Endpoint:** `GET /api/visits`

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Records per page (default: 10)
- `status` (string): Filter by status
- `leadId` (string): Filter by lead ID

**Example:**

```
GET /api/visits?page=1&limit=10&status=Scheduled
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "visits": [
      {
        "_id": "507f1f77bcf86cd799439021",
        "leadId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Aditya Singh",
          "phone": "+918765432101"
        },
        "propertyName": "Green Garden Residency",
        "visitDate": "2024-01-15T14:30:00Z",
        "status": "Scheduled",
        "notes": "Customer wants to see 2BHK unit",
        "createdAt": "2024-01-10T10:30:00Z"
      }
    ],
    "total": 1,
    "pages": 1,
    "currentPage": 1
  }
}
```

### Update Visit

**Endpoint:** `PATCH /api/visits/:id`

**Request Body:**

```json
{
  "status": "Completed",
  "visitOutcome": "positive",
  "agentNotes": "Customer very interested, follow up with quotation"
}
```

**Valid Visit Status Values:**

- Scheduled
- Completed
- Cancelled

**Valid Visit Outcome Values:**

- positive
- negative
- followup
- null

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Visit updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    "status": "Completed",
    "visitOutcome": "positive",
    "agentNotes": "Customer very interested, follow up with quotation",
    "completedAt": "2024-01-15T15:00:00Z",
    "leadId": {
      "_id": "507f1f77bcf86cd799439011",
      "status": "Visit Completed"
    }
  }
}
```

### Get Visit Statistics

**Endpoint:** `GET /api/visits/stats`

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalVisits": 10,
    "scheduledVisits": 3,
    "completedVisits": 6,
    "cancelledVisits": 1,
    "positiveOutcomes": 5
  }
}
```

---

## Dashboard API

### Get Dashboard Analytics

**Endpoint:** `GET /api/dashboard`

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalLeads": 10,
    "leadsByStage": {
      "New Lead": 2,
      "Contacted": 3,
      "Requirement Collected": 1,
      "Property Suggested": 1,
      "Visit Scheduled": 1,
      "Visit Completed": 1,
      "Booked": 1,
      "Lost": 0
    },
    "visitsScheduled": 3,
    "bookingsConfirmed": 1,
    "agentCount": 3,
    "totalVisits": 10,
    "completedVisits": 6,
    "conversionRate": "50.00",
    "positiveOutcomes": 5
  }
}
```

---

## Health Check

### Server Health

**Endpoint:** `GET /health`

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Error Handling

### Common Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "status": 400,
  "message": "Status is required",
  "data": null
}
```

#### 404 Not Found

```json
{
  "success": false,
  "status": 404,
  "message": "Lead not found",
  "data": null
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "status": 500,
  "message": "Internal Server Error",
  "data": null
}
```

---

## Rate Limiting

Currently not implemented. Add before production deployment.

Recommended: 100 requests per minute per IP

---

## Authentication

Currently not implemented. Add before production deployment.

Recommended: JWT tokens with 24-hour expiration

---

## Pagination

All list endpoints support pagination:

- `page`: Current page (1-indexed)
- `limit`: Records per page (default: 10, max: 100)

**Example:** `GET /api/leads?page=2&limit=20`

Returns:

```json
{
  "success": true,
  "data": {
    "leads": [...],
    "total": 50,
    "pages": 3,
    "currentPage": 2
  }
}
```

---

## Filtering

Lead and Visit endpoints support filtering via query parameters:

**Leads:**

- `status`: Pipeline stage
- `source`: Lead source
- `assignedAgent`: Agent ID

**Visits:**

- `status`: Visit status
- `leadId`: Lead ID

**Example:** `GET /api/leads?status=Contacted&source=website`

---

## Testing with cURL

### Create Lead

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+919999999999",
    "source": "website",
    "budget": 20000,
    "email": "john@example.com"
  }'
```

### Get Leads

```bash
curl http://localhost:5000/api/leads?page=1&limit=10
```

### Update Lead Status

```bash
curl -X PATCH http://localhost:5000/api/leads/{leadId}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Contacted"}'
```

### Get Dashboard

```bash
curl http://localhost:5000/api/dashboard
```

---

## API Versioning

Current version: v1 (base URL: `/api`)

Recommended for future: `/api/v1`, `/api/v2`, etc.

---

Last Updated: January 2024
