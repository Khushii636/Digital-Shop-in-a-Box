import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Store,
  CheckCircle,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { createShop } from '../api/shop'

const BUSINESS_TYPES = [
  { id: 'Grocery', label: 'Grocery / Kirana Store', desc: 'Daily essentials, packaged food & produce' },
  { id: 'General Store', label: 'General Store', desc: 'FMCG goods, household items & stationery' },
  { id: 'Clothing', label: 'Apparel & Fashion', desc: 'Garments, footwear & accessories' },
  { id: 'Electronics', label: 'Electronics & Mobile', desc: 'Gadgets, appliances & repair services' },
  { id: 'Services', label: 'Service / Consulting', desc: 'Professional services, salon & repairs' },
  { id: 'Pharmacy', label: 'Pharmacy & Medical', desc: 'Medicines & healthcare products' },
]

function Onboarding() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [businessType, setBusinessType] = useState('General Store')
  const [features, setFeatures] = useState({
    inventory: true,
    sales: true,
    customers: true,
    reports: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [createdShop, setCreatedShop] = useState(null)

  const { token } = useAuth()
  const navigate = useNavigate()

  // Pre-check feature recommendations based on business type
  const handleBusinessTypeChange = (typeId) => {
    setBusinessType(typeId)
    if (typeId === 'Services') {
      setFeatures({ inventory: false, sales: true, customers: true, reports: true })
    } else {
      setFeatures({ inventory: true, sales: true, customers: true, reports: true })
    }
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter a shop name.')
      return
    }
    setError('')
    setStep(2)
  }

  const handlePrevStep = () => {
    setError('')
    setStep(1)
  }

  const handleFeatureToggle = (featureKey) => {
    setFeatures((prev) => ({
      ...prev,
      [featureKey]: !prev[featureKey],
    }))
  }

  const handleFinalSubmit = async () => {
    setError('')
    setLoading(true)

    try {
      const payload = {
        name,
        business_type: businessType,
        ...features,
      }
      const data = await createShop(payload, token)
      setCreatedShop(data)
      setStep(3)
    } catch (err) {
      setError(err.message || 'Failed to create shop. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="bg-card p-8 rounded-[20px] shadow-sm border border-black/5 max-w-xl w-full">
        {/* Header & Step Indicator */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary mb-3">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-primary">Setup Your Shop</h1>
          <p className="text-sm text-text-muted mt-1">
            Let’s get your digital storefront ready in a few steps.
          </p>

          {/* Progress bar */}
          <div className="flex items-center justify-between mt-6 px-4">
            <div className="flex items-center space-x-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-black/10 text-text-muted'}`}>
                1
              </span>
              <span className="text-xs font-medium text-text-primary hidden sm:inline">Details</span>
            </div>
            <div className={`flex-1 h-1 mx-3 rounded ${step >= 2 ? 'bg-primary' : 'bg-black/10'}`} />
            <div className="flex items-center space-x-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-black/10 text-text-muted'}`}>
                2
              </span>
              <span className="text-xs font-medium text-text-primary hidden sm:inline">Features</span>
            </div>
            <div className={`flex-1 h-1 mx-3 rounded ${step >= 3 ? 'bg-primary' : 'bg-black/10'}`} />
            <div className="flex items-center space-x-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-success text-white' : 'bg-black/10 text-text-muted'}`}>
                3
              </span>
              <span className="text-xs font-medium text-text-primary hidden sm:inline">Done</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-danger/10 text-danger p-3 rounded-xl mb-6 text-sm font-medium border border-danger/20">
            {error}
          </div>
        )}

        {/* STEP 1: Shop Name & Business Type */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Shop Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sharma Kirana Store"
                className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Business Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUSINESS_TYPES.map((bt) => (
                  <button
                    type="button"
                    key={bt.id}
                    onClick={() => handleBusinessTypeChange(bt.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      businessType === bt.id
                        ? 'border-primary bg-primary-light/50 ring-2 ring-primary/20'
                        : 'border-black/10 bg-white hover:border-black/20'
                    }`}
                  >
                    <div className="font-semibold text-sm text-text-primary">{bt.label}</div>
                    <div className="text-xs text-text-muted mt-0.5">{bt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-accent text-text-primary font-semibold py-3 px-6 rounded-xl w-full flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span>Continue to Features</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Feature Toggles */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-1">Select Features</h2>
              <p className="text-xs text-text-muted mb-4">
                We've pre-configured options based on <strong>{businessType}</strong>. Customize them anytime.
              </p>

              <div className="space-y-3">
                {/* Inventory toggle */}
                <div
                  onClick={() => handleFeatureToggle('inventory')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    features.inventory ? 'border-primary bg-primary-light/30' : 'border-black/10 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary">Inventory Management</div>
                      <div className="text-xs text-text-muted">Track stock levels, low-stock alerts & products</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={features.inventory}
                    onChange={() => {}}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>

                {/* Sales toggle */}
                <div
                  onClick={() => handleFeatureToggle('sales')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    features.sales ? 'border-primary bg-primary-light/30' : 'border-black/10 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary">Sales & Billing</div>
                      <div className="text-xs text-text-muted">Quick POS checkout, invoices & digital receipts</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={features.sales}
                    onChange={() => {}}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>

                {/* Customers toggle */}
                <div
                  onClick={() => handleFeatureToggle('customers')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    features.customers ? 'border-primary bg-primary-light/30' : 'border-black/10 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary">Customer Ledger (Khata)</div>
                      <div className="text-xs text-text-muted">Manage credit accounts, payment reminders & history</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={features.customers}
                    onChange={() => {}}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>

                {/* Reports toggle */}
                <div
                  onClick={() => handleFeatureToggle('reports')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    features.reports ? 'border-primary bg-primary-light/30' : 'border-black/10 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-text-primary">Analytics & Reports</div>
                      <div className="text-xs text-text-muted">Daily profit, sales trends & business insights</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={features.reports}
                    onChange={() => {}}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3 px-5 rounded-xl border border-black/10 font-semibold text-sm text-text-primary hover:bg-black/5 flex items-center space-x-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={loading}
                className="flex-1 bg-accent text-text-primary font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Creating Shop...' : 'Finalize & Create Shop'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Success Screen */}
        {step === 3 && (
          <div className="text-center py-4 space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/15 text-success rounded-full">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">
                Your digital shop is ready 🎉
              </h2>
              <p className="text-sm text-text-muted mt-1">
                Congratulations! <strong>{createdShop?.name || name}</strong> has been created.
              </p>
            </div>

            {createdShop && (
              <div className="bg-primary-light/40 border border-primary/10 p-4 rounded-xl text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Shop ID:</span>
                  <span className="font-mono font-bold text-primary">{createdShop.shop_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Business Type:</span>
                  <span className="font-semibold text-text-primary">{createdShop.business_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Owner:</span>
                  <span className="font-medium text-text-primary">{createdShop.owner}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => navigate('/')}
              className="bg-accent text-text-primary font-semibold py-3 px-6 rounded-xl w-full block text-center hover:opacity-90 transition-opacity cursor-pointer"
            >
              Go to Shop Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Onboarding
