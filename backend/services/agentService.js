import Agent from '../models/Agent.js'
import { AppError } from '../utils/errors.js'

export const createAgent = async (agentData) => {
  try {
    const existingAgent = await Agent.findOne({ email: agentData.email })
    if (existingAgent) {
      throw new AppError('Agent with this email already exists', 400)
    }
    
    const agent = new Agent(agentData)
    await agent.save()
    return agent
  } catch (error) {
    throw error
  }
}

export const getAgents = async () => {
  try {
    const agents = await Agent.find({ status: 'active' }).sort({ name: 1 })
    return agents
  } catch (error) {
    throw error
  }
}

export const getAgentById = async (agentId) => {
  try {
    const agent = await Agent.findById(agentId)
    if (!agent) {
      throw new AppError('Agent not found', 404)
    }
    return agent
  } catch (error) {
    throw error
  }
}

export const updateAgent = async (agentId, updateData) => {
  try {
    const agent = await Agent.findByIdAndUpdate(agentId, updateData, { new: true })
    if (!agent) {
      throw new AppError('Agent not found', 404)
    }
    return agent
  } catch (error) {
    throw error
  }
}

export const getAgentStats = async () => {
  try {
    const agents = await Agent.find({ status: 'active' })
    const stats = agents.map(agent => ({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      activeLeads: agent.activeLeads,
      totalLeadsAssigned: agent.totalLeadsAssigned,
      successfulBookings: agent.successfulBookings,
      conversionRate: agent.totalLeadsAssigned > 0 
        ? ((agent.successfulBookings / agent.totalLeadsAssigned) * 100).toFixed(2) 
        : 0
    }))
    return stats
  } catch (error) {
    throw error
  }
}
