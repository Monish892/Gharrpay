import Visit from '../models/Visit.js'
import Lead from '../models/Lead.js'
import { AppError } from '../utils/errors.js'

export const scheduleVisit = async (visitData) => {
  try {
    const lead = await Lead.findById(visitData.leadId)
    if (!lead) {
      throw new AppError('Lead not found', 404)
    }
    
    const visit = new Visit(visitData)
    await visit.save()
    
    await Lead.findByIdAndUpdate(
      visitData.leadId,
      {
        status: 'Visit Scheduled',
        lastActivity: new Date(),
        $push: {
          activityLog: {
            type: 'Visit Scheduled',
            description: `Visit scheduled for ${new Date(visitData.visitDate).toLocaleDateString()}`
          }
        }
      }
    )
    
    return visit.populate('leadId')
  } catch (error) {
    throw error
  }
}

export const getVisits = async (page = 1, limit = 10, filters = {}) => {
  try {
    const skip = (page - 1) * limit
    const query = {}
    
    if (filters.status) query.status = filters.status
    if (filters.leadId) query.leadId = filters.leadId
    
    const visits = await Visit.find(query)
      .populate('leadId', 'name phone email')
      .sort({ visitDate: 1 })
      .skip(skip)
      .limit(limit)
    
    const total = await Visit.countDocuments(query)
    
    return {
      visits,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    }
  } catch (error) {
    throw error
  }
}

export const getVisitById = async (visitId) => {
  try {
    const visit = await Visit.findById(visitId).populate('leadId')
    if (!visit) {
      throw new AppError('Visit not found', 404)
    }
    return visit
  } catch (error) {
    throw error
  }
}

export const updateVisit = async (visitId, updateData) => {
  try {
    const visit = await Visit.findByIdAndUpdate(visitId, updateData, { new: true }).populate('leadId')
    
    if (!visit) {
      throw new AppError('Visit not found', 404)
    }
    
    if (updateData.status === 'Completed' && updateData.visitOutcome === 'positive') {
      await Lead.findByIdAndUpdate(
        visit.leadId._id,
        {
          status: 'Visit Completed',
          lastActivity: new Date(),
          $push: {
            activityLog: {
              type: 'Visit Completed',
              description: `Visit completed with positive outcome`
            }
          }
        }
      )
    }
    
    return visit
  } catch (error) {
    throw error
  }
}

export const getVisitStats = async () => {
  try {
    const totalVisits = await Visit.countDocuments()
    const scheduledVisits = await Visit.countDocuments({ status: 'Scheduled' })
    const completedVisits = await Visit.countDocuments({ status: 'Completed' })
    const cancelledVisits = await Visit.countDocuments({ status: 'Cancelled' })
    
    const positiveOutcomes = await Visit.countDocuments({ status: 'Completed', visitOutcome: 'positive' })
    
    return {
      totalVisits,
      scheduledVisits,
      completedVisits,
      cancelledVisits,
      positiveOutcomes
    }
  } catch (error) {
    throw error
  }
}
