import { useEffect, useState } from 'react'
import Header from '../components/Header'
import StatCard from '../components/StatCard'
import { dashboardService, leadService, visitService } from '../services/apiService'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await dashboardService.getDashboardStats()
        setStats(response.data.data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching dashboard stats:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])
  
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-900 font-medium">Loading...</div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }
  
  return (
    <div className="flex-1 overflow-auto">
      <Header />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Leads" 
            value={stats?.totalLeads || 0} 
            icon="📊" 
            color="blue"
          />
          <StatCard 
            title="Visits Scheduled" 
            value={stats?.visitsScheduled || 0} 
            icon="📅" 
            color="orange"
          />
          <StatCard 
            title="Bookings Confirmed" 
            value={stats?.bookingsConfirmed || 0} 
            icon="✅" 
            color="green"
          />
          <StatCard 
            title="Active Agents" 
            value={stats?.agentCount || 0} 
            icon="👥" 
            color="purple"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Leads by Pipeline Stage</h3>
            <div className="space-y-3">
              {Object.entries(stats?.leadsByStage || {}).map(([stage, count]) => (
                <div key={stage} className="flex justify-between items-center">
                  <span className="text-gray-700">{stage}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-40 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / (stats?.totalLeads || 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-semibold w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Visit Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Total Visits</span>
                <span className="font-semibold">{stats?.totalVisits || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Completed Visits</span>
                <span className="font-semibold">{stats?.completedVisits || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Positive Outcomes</span>
                <span className="font-semibold text-green-600">{stats?.positiveOutcomes || 0}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <span className="text-gray-700">Conversion Rate</span>
                <span className="font-semibold text-blue-600">{stats?.conversionRate || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
