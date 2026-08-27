import { useState } from 'react'
import {
  UserPlus,
  Search,
  Phone,
  Clock,
  ChevronRight,
  UserCheck,
  AlertCircle,
} from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'

const DUMMY_CUSTOMERS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    totalSpent: 1200,
    lastPurchase: 'Yesterday',
    khataDue: 0,
    totalOrders: 6,
  },
  {
    id: 2,
    name: 'Priya Verma',
    phone: '+91 91234 56789',
    totalSpent: 3450,
    lastPurchase: '2 days ago',
    khataDue: 450,
    totalOrders: 14,
  },
  {
    id: 3,
    name: 'Amit Kumar',
    phone: '+91 99887 76655',
    totalSpent: 850,
    lastPurchase: '3 days ago',
    khataDue: 0,
    totalOrders: 4,
  },
  {
    id: 4,
    name: 'Sunita Devi',
    phone: '+91 98112 23344',
    totalSpent: 2100,
    lastPurchase: '5 days ago',
    khataDue: 120,
    totalOrders: 9,
  },
]

function Customers() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCustomers = DUMMY_CUSTOMERS.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    )
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center space-x-2">
              <span>Customers</span>
              <span className="text-xs bg-primary/10 text-primary py-1 px-2.5 rounded-full font-bold">
                {DUMMY_CUSTOMERS.length} Registered
              </span>
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              Customer Directory, Khata credit balances, and purchase history.
            </p>
          </div>

          <button
            onClick={() => alert('Add Customer modal coming soon!')}
            className="bg-accent text-text-primary font-semibold py-2.5 px-5 rounded-xl shadow-xs flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity cursor-pointer self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Customer</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-text-muted" />
          <input
            type="text"
            placeholder="Search customer by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary bg-card text-sm"
          />
        </div>

        {/* Customers List */}
        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="bg-card p-5 rounded-[20px] shadow-xs border border-black/5 hover:border-black/10 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-text-primary leading-tight">
                      {customer.name}
                    </h2>
                    <div className="flex items-center space-x-2 text-xs text-text-muted mt-0.5">
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{customer.phone}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Last Purchase: {customer.lastPurchase}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-text-muted pt-1 flex items-center space-x-4">
                  <span>Total Spent: <strong className="text-text-primary">₹{customer.totalSpent.toLocaleString('en-IN')}</strong></span>
                  <span>Orders: <strong className="text-text-primary">{customer.totalOrders}</strong></span>
                </div>
              </div>

              {/* Khata Status & Quick Action */}
              <div className="flex items-center justify-between sm:justify-end space-x-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-black/5">
                {customer.khataDue > 0 ? (
                  <div className="bg-amber-500/10 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-500/20 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>₹{customer.khataDue} Khata Due</span>
                  </div>
                ) : (
                  <div className="bg-success/10 text-success px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>No Khata Due</span>
                  </div>
                )}

                <button
                  onClick={() => alert(`Viewing details for ${customer.name}`)}
                  className="p-2 rounded-xl text-text-muted hover:bg-black/5 hover:text-text-primary transition-colors cursor-pointer"
                  title="View Customer History"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Customers
