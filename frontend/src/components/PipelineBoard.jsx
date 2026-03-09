export default function PipelineBoard({ leads, onDragStart, onDropZone }) {
  const stages = ['New Lead', 'Contacted', 'Requirement Collected', 'Property Suggested', 'Visit Scheduled', 'Visit Completed', 'Booked', 'Lost']
  
  const getLeadsByStage = (stage) => leads.filter(lead => lead.status === stage)
  
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4">
        {stages.map((stage) => {
          const stageLeads = getLeadsByStage(stage)
          return (
            <div key={stage} className="flex-shrink-0 w-80 bg-gray-50 rounded-lg">
              <div className="p-4 bg-gray-200 rounded-t-lg sticky top-0">
                <h3 className="font-semibold text-gray-900">{stage}</h3>
                <p className="text-sm text-gray-600">{stageLeads.length} leads</p>
              </div>
              
              <div
                className="p-4 space-y-3"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const leadId = e.dataTransfer.getData('leadId')
                  onDropZone(leadId, stage)
                }}
              >
                {stageLeads.map((lead) => (
                  <div
                    key={lead._id}
                    draggable
                    onDragStart={() => onDragStart(lead._id)}
                    className="bg-white rounded-lg p-3 border border-gray-200 cursor-move hover:shadow-md"
                  >
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.phone}</p>
                    <div className="mt-2 flex justify-between items-center text-xs">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {lead.source}
                      </span>
                      <span className="text-gray-500">
                        {lead.assignedAgent?.name || 'Unassigned'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
