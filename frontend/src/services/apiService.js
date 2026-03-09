import axiosInstance from './axiosInstance'

export const leadService = {
  getLeads: (page = 1, limit = 10, filters = {}) =>
    axiosInstance.get('/leads', { params: { page, limit, ...filters } }),
  
  getLeadById: (id) => axiosInstance.get(`/leads/${id}`),
  
  createLead: (leadData) => axiosInstance.post('/leads', leadData),
  
  updateLeadStatus: (id, status) => axiosInstance.patch(`/leads/${id}/status`, { status }),
  
  assignLead: (id, agentId) => axiosInstance.patch(`/leads/${id}/assign`, { agentId }),
  
  getLeadStats: () => axiosInstance.get('/leads/stats')
}

export const agentService = {
  getAgents: () => axiosInstance.get('/agents'),
  
  getAgentById: (id) => axiosInstance.get(`/agents/${id}`),
  
  createAgent: (agentData) => axiosInstance.post('/agents', agentData),
  
  updateAgent: (id, agentData) => axiosInstance.patch(`/agents/${id}`, agentData),
  
  getAgentStats: () => axiosInstance.get('/agents/stats')
}

export const visitService = {
  getVisits: (page = 1, limit = 10, filters = {}) =>
    axiosInstance.get('/visits', { params: { page, limit, ...filters } }),
  
  getVisitById: (id) => axiosInstance.get(`/visits/${id}`),
  
  scheduleVisit: (visitData) => axiosInstance.post('/visits', visitData),
  
  updateVisit: (id, updateData) => axiosInstance.patch(`/visits/${id}`, updateData),
  
  getVisitStats: () => axiosInstance.get('/visits/stats')
}

export const dashboardService = {
  getDashboardStats: () => axiosInstance.get('/dashboard')
}
