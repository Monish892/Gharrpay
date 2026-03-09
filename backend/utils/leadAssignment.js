import Agent from '../models/Agent.js'

let currentAgentIndex = 0

export const assignLeadToAgent = async () => {
  try {
    const agents = await Agent.find({ status: 'active' }).sort({ createdAt: 1 })
    
    if (agents.length === 0) {
      throw new Error('No active agents available')
    }
    
    const selectedAgent = agents[currentAgentIndex % agents.length]
    currentAgentIndex++
    
    return selectedAgent
  } catch (error) {
    throw error
  }
}

export const getAgentStats = async (agentId) => {
  try {
    const agent = await Agent.findById(agentId)
    return agent
  } catch (error) {
    throw error
  }
}
