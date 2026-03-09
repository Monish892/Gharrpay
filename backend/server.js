import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { corsMiddleware } from './middleware/cors.js'
import { initializeScheduledJobs } from './utils/scheduler.js'

import leadRoutes from './routes/leadRoutes.js'
import agentRoutes from './routes/agentRoutes.js'
import visitRoutes from './routes/visitRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

dotenv.config()

const app = express()

app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

initializeScheduledJobs()

app.use('/api/leads', leadRoutes)
app.use('/api/agents', agentRoutes)
app.use('/api/visits', visitRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' })
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
