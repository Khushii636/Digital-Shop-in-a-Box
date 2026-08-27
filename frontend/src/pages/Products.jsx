import { useState } from 'react'
import {
  Plus,
  Search,
  AlertTriangle,
  Edit2,
} from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Basmati Rice (Premium)',
    category: 'Grocery',
    stock: 25,
    unit: 'kg',
    price: 60,
    minStock: 10,
  },
  {
    id: 2,
    name: 'Maggi 2-Min Noodle',
    category: 'Snacks',
    stock: 5,
    unit: 'packets',
    price: 15,
    minStock: 10, // Low stock warning!
  },
  {
    id: 3,
    name: 'Amul Butter 500g',
    category: 'Dairy',
    stock: 12,
    unit: 'pcs',
    price: 275,
    minStock: 5,
  },
  {
    id: 4,
    name: 'Tata Iodized Salt 1kg',
    category: 'Grocery',
    stock: 3,
    unit: 'packets',
    price: 28,
    minStock: 8, // Low stock warning!
  },
  {
    id: 5,
    name: 'Aashirvaad Shuddh Atta 5kg',
    category: 'Grocery',
    stock: 18,
    unit: 'bags',
    price: 230,
    minStock: 5,
  },
  {
    id: 6,
    name: 'Fortune Sunflower Oil 1L',
    category: 'Grocery',
    stock: 8,
    unit: 'bottles',
    price: 145,
    minStock: 6,
  },
]

function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Grocery', 'Snacks', 'Dairy', 'Beverages']

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center space-x-2">
              <span>Products</span>
              <span className="text-xs bg-primary/10 text-primary py-1 px-2.5 rounded-full font-bold">
                {INITIAL_PRODUCTS.length} Items
              </span>
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              Manage inventory, pricing, and stock levels.
            </p>
          </div>

          <button
            onClick={() => alert('Add Product modal coming soon!')}
            className="bg-accent text-text-primary font-semibold py-2.5 px-5 rounded-xl shadow-xs flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary bg-card text-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-card border border-black/10 text-text-muted hover:text-text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const isLowStock = product.stock <= product.minStock

            return (
              <div
                key={product.id}
                className={`bg-card p-4 rounded-[20px] shadow-xs border transition-all ${
                  isLowStock
                    ? 'border-danger/30 bg-danger/5'
                    : 'border-black/5 hover:border-black/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-base text-text-primary">
                        {product.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-text-muted">
                      <span className="bg-black/5 px-2 py-0.5 rounded-md font-medium">
                        {product.category}
                      </span>
                      <span>•</span>
                      <span>₹{product.price} / {product.unit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Edit ${product.name}`)}
                    className="p-1.5 rounded-lg text-text-muted hover:bg-black/5 hover:text-text-primary transition-colors cursor-pointer"
                    title="Edit Product"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Stock Footer & Low Stock Alert */}
                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                  <div className="text-xs font-semibold text-text-muted">
                    Available: <span className="font-bold text-text-primary">{product.stock} {product.unit}</span>
                  </div>

                  {isLowStock ? (
                    <div className="flex items-center space-x-1 text-xs font-bold text-danger bg-danger/10 py-1 px-2.5 rounded-lg border border-danger/20">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Low Stock! ({product.stock} left)</span>
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-success bg-success/10 py-1 px-2.5 rounded-lg">
                      In Stock
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Products
