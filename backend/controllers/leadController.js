import * as leadService from '../services/leadService.js'
import { asyncHandler, AppError } from '../utils/errors.js'

export const createLead = asyncHandler(async (req, res) => {
  const lead = await leadService.createLead(req.body)
  res.status(201).json({
    success: true,
    message: 'Lead created successfully',
    data: lead
  })
})

export const getLeads = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const filters = {
    status: req.query.status,
    source: req.query.source,
    assignedAgent: req.query.assignedAgent
  }
  
  const result = await leadService.getLeads(page, limit, filters)
  res.status(200).json({
    success: true,
    data: result
  })
})

export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await leadService.getLeadById(req.params.id)
  res.status(200).json({
    success: true,
    data: lead
  })
})

export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  if (!status) {
    throw new AppError('Status is required', 400)
  }
  
  const lead = await leadService.updateLeadStatus(req.params.id, status)
  res.status(200).json({
    success: true,
    message: 'Lead status updated',
    data: lead
  })
})

export const assignLead = asyncHandler(async (req, res) => {
  const { agentId } = req.body
  if (!agentId) {
    throw new AppError('Agent ID is required', 400)
  }
  
  const lead = await leadService.assignLeadManually(req.params.id, agentId)
  res.status(200).json({
    success: true,
    message: 'Lead assigned successfully',
    data: lead
  })
})

export const getLeadStats = asyncHandler(async (req, res) => {
  const stats = await leadService.getLeadStats()
  res.status(200).json({
    success: true,
    data: stats
  })
})
