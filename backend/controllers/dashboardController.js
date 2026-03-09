import { getDashboardStats } from '../services/dashboardService.js'
import { asyncHandler } from '../utils/errors.js'

export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await getDashboardStats()
  res.status(200).json({
    success: true,
    data: stats
  })
})
