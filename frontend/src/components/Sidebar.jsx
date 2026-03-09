import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Gharrpay CRM</h1>
      </div>
      
      <nav className="space-y-2 p-4">
        <Link to="/" className={`block px-4 py-2 rounded-lg ${isActive('/')}`}>
          Dashboard
        </Link>
        <Link to="/leads" className={`block px-4 py-2 rounded-lg ${isActive('/leads')}`}>
          Leads
        </Link>
        <Link to="/pipeline" className={`block px-4 py-2 rounded-lg ${isActive('/pipeline')}`}>
          Pipeline
        </Link>
        <Link to="/visits" className={`block px-4 py-2 rounded-lg ${isActive('/visits')}`}>
          Visits
        </Link>
      </nav>
    </div>
  )
}
