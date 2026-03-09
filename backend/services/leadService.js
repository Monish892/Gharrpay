import Lead from '../models/Lead.js'
import Agent from '../models/Agent.js'
import { assignLeadToAgent } from '../utils/leadAssignment.js'
import { AppError } from '../utils/errors.js'

export const createLead = async (leadData) => {
  try {
    const existingLead = await Lead.findOne({ phone: leadData.phone })
    if (existingLead) {
      throw new AppError('Lead with this phone number already exists', 400)
    }
    
    const agent = await assignLeadToAgent()
    
    const lead = new Lead({
      ...leadData,
      assignedAgent: agent._id,
      activityLog: [
        {
          type: 'Lead Created',
          description: `Lead created from ${leadData.source}`
        },
        {
          type: 'Agent Assigned',
          description: `Assigned to ${agent.name}`
        }
      ]
    })
    
    await lead.save()
    
    await Agent.findByIdAndUpdate(agent._id, { $inc: { activeLeads: 1, totalLeadsAssigned: 1 } })
    
    return lead.populate('assignedAgent')
  } catch (error) {
    throw error
  }
}

export const getLeads = async (page = 1, limit = 10, filters = {}) => {
  try {
    const skip = (page - 1) * limit
    const query = {}
    
    if (filters.status) query.status = filters.status
    if (filters.source) query.source = filters.source
    if (filters.assignedAgent) query.assignedAgent = filters.assignedAgent
    
    const leads = await Lead.find(query)
      .populate('assignedAgent', 'name email phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    
    const total = await Lead.countDocuments(query)
    
    return {
      leads,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    }
  } catch (error) {
    throw error
  }
}

export const getLeadById = async (leadId) => {
  try {
    const lead = await Lead.findById(leadId).populate('assignedAgent')
    if (!lead) {
      throw new AppError('Lead not found', 404)
    }
    return lead
  } catch (error) {
    throw error
  }
}

export const updateLeadStatus = async (leadId, status) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      leadId,
      {
        status,
        lastActivity: new Date(),
        $push: {
          activityLog: {
            type: 'Status Updated',
            description: `Status changed to ${status}`
          }
        }
      },
      { new: true }
    ).populate('assignedAgent')
    
    if (!lead) {
      throw new AppError('Lead not found', 404)
    }
    
    return lead
  } catch (error) {
    throw error
  }
}

export const assignLeadManually = async (leadId, agentId) => {
  try {
    const lead = await Lead.findById(leadId)
    if (!lead) {
      throw new AppError('Lead not found', 404)
    }
    
    const agent = await Agent.findById(agentId)
    if (!agent) {
      throw new AppError('Agent not found', 404)
    }
    
    if (lead.assignedAgent) {
      await Agent.findByIdAndUpdate(lead.assignedAgent, { $inc: { activeLeads: -1 } })
    }
    
    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      {
        assignedAgent: agentId,
        lastActivity: new Date(),
        $push: {
          activityLog: {
            type: 'Agent Reassigned',
            description: `Reassigned to ${agent.name}`
          }
        }
      },
      { new: true }
    ).populate('assignedAgent')
    
    await Agent.findByIdAndUpdate(agentId, { $inc: { activeLeads: 1 } })
    
    return updatedLead
  } catch (error) {
    throw error
  }
}

export const getLeadStats = async () => {
  try {
    const totalLeads = await Lead.countDocuments()
    const leadsByStatus = await Lead.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])
    
    return {
      totalLeads,
      leadsByStatus: leadsByStatus.reduce((acc, item) => {
        acc[item._id] = item.count
        return acc
      }, {})
    }
  } catch (error) {
    throw error
  }
}
