import { useEffect, useState } from 'react'
import Header from '../components/Header'
import PipelineBoard from '../components/PipelineBoard'
import { leadService } from '../services/apiService'

export default function Pipeline() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true)
        const response = await leadService.getLeads(1, 100)
        setLeads(response.data.data.leads)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching leads:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchLeads()
  }, [])
  
  const handleDropZone = async (leadId, stage) => {
    try {
      await leadService.updateLeadStatus(leadId, stage)
      setLeads(leads.map(lead =>
        lead._id === leadId ? { ...lead, status: stage } : lead
      ))
    } catch (err) {
      console.error('Error updating lead status:', err)
    }
  }
  
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lead Pipeline</h2>
        <PipelineBoard 
          leads={leads} 
          onDropZone={handleDropZone}
        />
      </div>
    </div>
  )
}
