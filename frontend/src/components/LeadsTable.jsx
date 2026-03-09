export default function LeadsTable({ leads, onStatusChange, onAssignChange, filters, onFilterChange }) {
  const sources = ['website', 'whatsapp', 'social', 'call', 'form']
  const statuses = ['New Lead', 'Contacted', 'Requirement Collected', 'Property Suggested', 'Visit Scheduled', 'Visit Completed', 'Booked', 'Lost']
  
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads</h3>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="px-3 py-2 border border-gray-300 rounded-lg"
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          />
          <select
            value={filters.source || ''}
            onChange={(e) => onFilterChange({ ...filters, source: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Sources</option>
            {sources.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Assigned Agent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-900">{lead.name}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{lead.phone}</td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {lead.source}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm">
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead._id, e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {lead.assignedAgent?.name || 'Unassigned'}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
