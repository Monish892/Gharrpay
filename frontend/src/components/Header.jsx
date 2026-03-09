export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">CRM Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">GC</span>
            </div>
            <span className="text-gray-700 font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}
