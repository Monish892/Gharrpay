import Lead from '../models/Lead.js'
import Visit from '../models/Visit.js'
import Agent from '../models/Agent.js'

export const getDashboardStats = async () => {
  try {
    const totalLeads = await Lead.countDocuments()
    
    const leadsByStage = await Lead.aggregate([
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
    
    const visitsScheduled = await Visit.countDocuments({ status: 'Scheduled' })
    
    const bookingsConfirmed = await Lead.countDocuments({ status: 'Booked' })
    
    const agentCount = await Agent.countDocuments({ status: 'active' })
    
    const totalVisits = await Visit.countDocuments()
    const completedVisits = await Visit.countDocuments({ status: 'Completed' })
    const positiveOutcomes = await Visit.countDocuments({ status: 'Completed', visitOutcome: 'positive' })
    
    const conversionRate = totalVisits > 0 ? ((positiveOutcomes / completedVisits) * 100).toFixed(2) : 0
    
    return {
      totalLeads,
      leadsByStage: leadsByStage.reduce((acc, item) => {
        acc[item._id] = item.count
        return acc
      }, {}),
      visitsScheduled,
      bookingsConfirmed,
      agentCount,
      totalVisits,
      completedVisits,
      conversionRate,
      positiveOutcomes
    }
  } catch (error) {
    throw error
  }
}
