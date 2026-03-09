import cron from 'node-cron'
import Lead from '../models/Lead.js'

export const initializeScheduledJobs = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      
      const leadsNeedingFollowUp = await Lead.find({
        lastActivity: { $lt: twentyFourHoursAgo },
        status: { $ne: 'Booked', $ne: 'Lost' }
      })
      
      if (leadsNeedingFollowUp.length > 0) {
        console.log(`FOLLOW UP REQUIRED: ${leadsNeedingFollowUp.length} leads need follow-up`)
        leadsNeedingFollowUp.forEach(lead => {
          console.log(`  - ${lead.name} (${lead.phone}) - Last activity: ${lead.lastActivity}`)
        })
      }
    } catch (error) {
      console.error('Error in follow-up cron job:', error.message)
    }
  })
  
  console.log('Scheduled jobs initialized')
}
