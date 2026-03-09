export default function StatCard({ title, value, icon, color = 'blue' }) {
  const bgColors = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    purple: 'bg-purple-50'
  }
  
  const textColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600'
  }
  
  return (
    <div className={`${bgColors[color]} rounded-lg p-6 border border-gray-200`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`${textColors[color]} text-2xl`}>{icon}</div>
      </div>
    </div>
  )
}
