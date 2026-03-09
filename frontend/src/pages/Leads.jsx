import { useEffect, useState, useRef } from 'react'
import Header from '../components/Header'
import LeadsTable from '../components/LeadsTable'
import { leadService } from '../services/apiService'

export default function Leads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const debounceTimer = useRef(null)
  const [debouncedFilters, setDebouncedFilters] = useState({})
  
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true)
        const response = await leadService.getLeads(page, 10, debouncedFilters)
        setLeads(response.data.data.leads)
        setTotalPages(response.data.data.pages)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching leads:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchLeads()
  }, [page, debouncedFilters])
  
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }
    
    debounceTimer.current = setTimeout(() => {
      setDebouncedFilters(filters)
      setPage(1)
    }, 500)
    
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [filters])
  
  const handleStatusChange = async (leadId, status) => {
    try {
      await leadService.updateLeadStatus(leadId, status)
      setLeads(leads.map(lead => 
        lead._id === leadId ? { ...lead, status } : lead
      ))
    } catch (err) {
      console.error('Error updating lead status:', err)
    }
  }
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
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
        <LeadsTable 
          leads={leads} 
          onStatusChange={handleStatusChange}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
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
    </div>
  )
}
