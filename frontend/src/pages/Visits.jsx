import { useEffect, useState } from 'react'
import Header from '../components/Header'
import VisitsTable from '../components/VisitsTable'
import { visitService, leadService } from '../services/apiService'

export default function Visits() {
  const [visits, setVisits] = useState([])
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [formData, setFormData] = useState({
    leadId: '',
    propertyName: '',
    visitDate: '',
    notes: ''
  })
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [visitsResponse, leadsResponse] = await Promise.all([
          visitService.getVisits(page, 10),
          leadService.getLeads(1, 100)
        ])
        setVisits(visitsResponse.data.data.visits)
        setTotalPages(visitsResponse.data.data.pages)
        setLeads(leadsResponse.data.data.leads)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [page])
  
  const handleStatusChange = async (visitId, status) => {
    try {
      await visitService.updateVisit(visitId, { status })
      setVisits(visits.map(visit =>
        visit._id === visitId ? { ...visit, status } : visit
      ))
    } catch (err) {
      console.error('Error updating visit:', err)
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await visitService.scheduleVisit(formData)
      setFormData({ leadId: '', propertyName: '', visitDate: '', notes: '' })
      const response = await visitService.getVisits(page, 10)
      setVisits(response.data.data.visits)
    } catch (err) {
      console.error('Error scheduling visit:', err)
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VisitsTable visits={visits} onStatusChange={handleStatusChange} />
            <div className="mt-6 flex justify-between items-center">
              <span className="text-gray-600">Page {page} of {totalPages}</span>
              <div className="space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Visit</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Lead</label>
                <select
                  value={formData.leadId}
                  onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">Select Lead</option>
                  {leads.map(lead => (
                    <option key={lead._id} value={lead._id}>
                      {lead.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Property Name</label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Enter property name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Visit Date</label>
                <input
                  type="datetime-local"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows="3"
                  placeholder="Add notes..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
              >
                Schedule Visit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
