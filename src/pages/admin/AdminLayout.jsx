import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../supabaseClient'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Projects', path: '/admin/projects' },
    { name: 'Albums & Media', path: '/admin/albums' },
    { name: 'Site Settings', path: '/admin/settings' },
  ]

  return (
    <div className="h-screen bg-dark flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white">Portfolio CMS</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-400 hover:bg-zinc-800 rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-dark">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
