import * as agentService from '../services/agentService.js'
import { asyncHandler, AppError } from '../utils/errors.js'

export const createAgent = asyncHandler(async (req, res) => {
  const agent = await agentService.createAgent(req.body)
  res.status(201).json({
    success: true,
    message: 'Agent created successfully',
    data: agent
  })
})

export const getAgents = asyncHandler(async (req, res) => {
  const agents = await agentService.getAgents()
  res.status(200).json({
    success: true,
    data: agents
  })
})

export const getAgentById = asyncHandler(async (req, res) => {
  const agent = await agentService.getAgentById(req.params.id)
  res.status(200).json({
    success: true,
    data: agent
  })
})

export const updateAgent = asyncHandler(async (req, res) => {
  const agent = await agentService.updateAgent(req.params.id, req.body)
  res.status(200).json({
    success: true,
    message: 'Agent updated successfully',
    data: agent
  })
})

export const getAgentStats = asyncHandler(async (req, res) => {
  const stats = await agentService.getAgentStats()
  res.status(200).json({
    success: true,
    data: stats
  })
})
