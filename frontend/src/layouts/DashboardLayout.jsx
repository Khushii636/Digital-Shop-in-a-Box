import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  ShoppingBag,
  Package,
  Users,
  Plus,
  LogOut,
  Store,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function DashboardLayout({ children, onNewSaleClick }) {
  const location = useLocation()
  const { logout } = useAuth()

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Sales', icon: ShoppingBag, path: '/sales' },
    { label: 'Products', icon: Package, path: '/products' },
    { label: 'Customers', icon: Users, path: '/customers' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-card border-b border-black/5 px-4 py-3 sticky top-0 z-40 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base text-primary leading-tight">
              Sharma General Store
            </h1>
            <span className="text-[11px] text-text-muted font-medium">Digital Shop-in-a-Box</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={logout}
            title="Logout"
            className="p-2 rounded-xl text-text-muted hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 pb-24 max-w-4xl w-full mx-auto">
        {children}
      </main>

      {/* Sticky Bottom Navigation Bar for Mobile & Quick Reach */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-black/5 px-2 py-2 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around relative">
          {/* Home */}
          <Link
            to={navItems[0].path}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              isActive(navItems[0].path)
                ? 'text-primary font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[11px]">{navItems[0].label}</span>
          </Link>

          {/* Sales */}
          <Link
            to={navItems[1].path}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              isActive(navItems[1].path)
                ? 'text-primary font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            <span className="text-[11px]">{navItems[1].label}</span>
          </Link>

          {/* Prominent Floating Action Button (+ New Sale) */}
          <div className="relative -top-5 flex flex-col items-center">
            <Link
              to="/sale"
              onClick={onNewSaleClick}
              className="bg-accent text-text-primary font-bold p-3.5 rounded-full shadow-lg border-4 border-background hover:scale-105 active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
              title="New Sale"
            >
              <Plus className="w-6 h-6 stroke-[3]" />
            </Link>
            <span className="text-[10px] font-bold text-primary mt-0.5">New Sale</span>
          </div>


          {/* Products */}
          <Link
            to={navItems[2].path}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              isActive(navItems[2].path)
                ? 'text-primary font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Package className="w-5 h-5 mb-0.5" />
            <span className="text-[11px]">{navItems[2].label}</span>
          </Link>

          {/* Customers */}
          <Link
            to={navItems[3].path}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
              isActive(navItems[3].path)
                ? 'text-primary font-bold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[11px]">{navItems[3].label}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
