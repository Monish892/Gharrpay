import * as visitService from '../services/visitService.js'
import { asyncHandler, AppError } from '../utils/errors.js'

export const scheduleVisit = asyncHandler(async (req, res) => {
  const visit = await visitService.scheduleVisit(req.body)
  res.status(201).json({
    success: true,
    message: 'Visit scheduled successfully',
    data: visit
  })
})

export const getVisits = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const filters = {
    status: req.query.status,
    leadId: req.query.leadId
  }
  
  const result = await visitService.getVisits(page, limit, filters)
  res.status(200).json({
    success: true,
    data: result
  })
})

export const getVisitById = asyncHandler(async (req, res) => {
  const visit = await visitService.getVisitById(req.params.id)
  res.status(200).json({
    success: true,
    data: visit
  })
})

export const updateVisit = asyncHandler(async (req, res) => {
  const visit = await visitService.updateVisit(req.params.id, req.body)
  res.status(200).json({
    success: true,
    message: 'Visit updated successfully',
    data: visit
  })
})

export const getVisitStats = asyncHandler(async (req, res) => {
  const stats = await visitService.getVisitStats()
  res.status(200).json({
    success: true,
    data: stats
  })
})
