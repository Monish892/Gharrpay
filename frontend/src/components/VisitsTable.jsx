export default function VisitsTable({ visits, onStatusChange }) {
  const visitStatuses = ['Scheduled', 'Completed', 'Cancelled']
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Lead Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Property</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Visit Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Notes</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-3 text-sm text-gray-900">{visit.leadId?.name || 'N/A'}</td>
              <td className="px-6 py-3 text-sm text-gray-900">{visit.propertyName}</td>
              <td className="px-6 py-3 text-sm text-gray-600">
                {new Date(visit.visitDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3 text-sm">
                <select
                  value={visit.status}
                  onChange={(e) => onStatusChange(visit._id, e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {visitStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-3 text-sm text-gray-600">{visit.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
