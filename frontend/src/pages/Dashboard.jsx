import { useNavigate } from 'react-router-dom'

import {
  TrendingUp,
  Receipt,
  Package,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'

function Dashboard() {
  const navigate = useNavigate()

  const handleNewSale = () => {
    alert('Opening New Sale checkout...')
  }

  return (
    <DashboardLayout onNewSaleClick={handleNewSale}>
      <div className="space-y-6">
        {/* Greeting Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              Good morning, Sharma Store 👋
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Here is your shop's performance snapshot for today.
            </p>
          </div>
        </div>

        {/* Needs Attention Alert Card */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-[20px] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Needs Attention
              </div>
              <div className="text-sm font-semibold text-text-primary">
                4 products are running low in stock
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center space-x-1 cursor-pointer hover:underline"
          >
            <span>View Low Stock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Today's Sales */}
          <div className="bg-card p-5 rounded-[20px] shadow-xs border border-black/5 space-y-3">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-sm font-semibold text-primary">Today's Sales</span>
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary">₹4,820</div>
              <div className="text-xs text-success font-medium mt-1">
                +14% from yesterday
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-card p-5 rounded-[20px] shadow-xs border border-black/5 space-y-3">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-sm font-semibold text-primary">Transactions</span>
              <div className="p-2 rounded-xl bg-accent/20 text-text-primary">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary">23</div>
              <div className="text-xs text-text-muted font-medium mt-1">
                Avg order ₹209
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-card p-5 rounded-[20px] shadow-xs border border-black/5 space-y-3">
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-sm font-semibold text-primary">Products</span>
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary">126</div>
              <div className="text-xs text-text-muted font-medium mt-1">
                Across 8 categories
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-card p-6 rounded-[20px] shadow-xs border border-black/5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary">Recent Sales</h2>
            <button
              onClick={() => navigate('/sales')}
              className="text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              View All ➔
            </button>
          </div>

          <div className="divide-y divide-black/5">
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-text-primary">Amul Butter 500g + 2 items</div>
                <div className="text-xs text-text-muted">10 mins ago • Cash</div>
              </div>
              <div className="font-bold text-sm text-text-primary">₹340</div>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-text-primary">Tata Salt 1kg, Fortune Oil</div>
                <div className="text-xs text-text-muted">32 mins ago • UPI</div>
              </div>
              <div className="font-bold text-sm text-text-primary">₹215</div>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-text-primary">Aashirvaad Atta 5kg</div>
                <div className="text-xs text-text-muted">1 hour ago • Credit (Khata)</div>
              </div>
              <div className="font-bold text-sm text-text-primary">₹280</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
