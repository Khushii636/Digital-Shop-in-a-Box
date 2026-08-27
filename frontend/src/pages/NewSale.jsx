import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  CreditCard,
  Banknote,
  UserCheck,
  Sparkles,
} from 'lucide-react'
import DashboardLayout from '../layouts/DashboardLayout'

const MOCK_PRODUCTS = [
  { id: 1, name: 'Aashirvaad Shuddh Atta 5kg', price: 230, unit: 'bag', stock: 18 },
  { id: 2, name: 'Amul Butter 500g', price: 275, unit: 'pc', stock: 12 },
  { id: 3, name: 'Basmati Rice (Premium)', price: 60, unit: 'kg', stock: 25 },
  { id: 4, name: 'Fortune Sunflower Oil 1L', price: 145, unit: 'bottle', stock: 8 },
  { id: 5, name: 'Maggi 2-Min Noodle', price: 15, unit: 'pkt', stock: 5 },
]

function NewSale() {
  const [selectedProductId, setSelectedProductId] = useState(1)
  const [quantity, setQuantity] = useState(2)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [saleSuccess, setSaleSuccess] = useState(false)
  const navigate = useNavigate()

  const selectedProduct =
    MOCK_PRODUCTS.find((p) => p.id === Number(selectedProductId)) || MOCK_PRODUCTS[0]

  const calculatedTotal = selectedProduct ? selectedProduct.price * quantity : 0

  const handleConfirmSale = () => {
    setSaleSuccess(true)
  }

  const handleResetSale = () => {
    setSaleSuccess(false)
    setQuantity(1)
  }

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center space-x-2">
              <ShoppingCart className="w-7 h-7" />
              <span>New Sale</span>
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              Quick Point-of-Sale (POS) checkout.
            </p>
          </div>
        </div>

        {saleSuccess ? (
          /* Sale Success Screen */
          <div className="bg-card p-8 rounded-[20px] shadow-sm border border-black/5 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/15 text-success rounded-full">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">Sale Confirmed! 🎉</h2>
              <p className="text-sm text-text-muted mt-1">
                Receipt generated and inventory updated automatically.
              </p>
            </div>

            {/* Receipt Breakdown */}
            <div className="bg-background p-4 rounded-xl text-left space-y-2 text-sm border border-black/5 font-sans">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-text-muted">Item:</span>
                <span className="font-bold text-text-primary">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Quantity:</span>
                <span className="font-semibold">{quantity} {selectedProduct.unit}(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Payment Mode:</span>
                <span className="font-semibold uppercase text-primary">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-black/5 pt-2 text-base">
                <span className="font-bold text-text-primary">Total Amount Paid:</span>
                <span className="font-extrabold text-primary">₹{calculatedTotal}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleResetSale}
                className="flex-1 bg-accent text-text-primary font-bold py-3.5 px-6 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                + Next Sale
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="py-3.5 px-5 rounded-xl border border-black/10 font-semibold text-sm text-text-primary hover:bg-black/5 cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Sale Form */
          <div className="bg-card p-6 sm:p-8 rounded-[20px] shadow-xs border border-black/5 space-y-6">
            {/* Product Selector */}
            <div>
              <label className="block text-sm font-bold text-text-primary mb-2">
                Select Product <span className="text-danger">*</span>
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(Number(e.target.value))}
                className="w-full px-4 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-primary text-text-primary bg-white text-base font-medium cursor-pointer"
              >
                {MOCK_PRODUCTS.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} — ₹{product.price}/{product.unit} ({product.stock} available)
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector with Large Touch Targets */}
            <div>
              <label className="block text-sm font-bold text-text-primary mb-2">
                Quantity
              </label>
              <div className="flex items-center justify-between bg-background p-3 rounded-2xl border border-black/5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 bg-white rounded-xl border border-black/10 flex items-center justify-center font-bold text-xl text-primary shadow-xs hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
                >
                  <Minus className="w-5 h-5 stroke-[2.5]" />
                </button>

                <div className="text-center px-4">
                  <span className="text-3xl font-extrabold text-text-primary">
                    {quantity}
                  </span>
                  <span className="text-xs text-text-muted block mt-0.5 font-medium">
                    {selectedProduct.unit}(s)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))}
                  className="w-12 h-12 bg-white rounded-xl border border-black/10 flex items-center justify-center font-bold text-xl text-primary shadow-xs hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-sm font-bold text-text-primary mb-2">
                Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`py-3 px-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'border-primary bg-primary-light/50 text-primary ring-2 ring-primary/20'
                      : 'border-black/10 bg-white text-text-muted hover:border-black/20'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span>Cash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`py-3 px-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-primary bg-primary-light/50 text-primary ring-2 ring-primary/20'
                      : 'border-black/10 bg-white text-text-muted hover:border-black/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>UPI / Online</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('khata')}
                  className={`py-3 px-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                    paymentMethod === 'khata'
                      ? 'border-primary bg-primary-light/50 text-primary ring-2 ring-primary/20'
                      : 'border-black/10 bg-white text-text-muted hover:border-black/20'
                  }`}
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Khata Credit</span>
                </button>
              </div>
            </div>

            {/* Large Total Display */}
            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-text-muted">
                  Grand Total
                </span>
                <div className="text-xs text-text-muted">
                  {quantity} x ₹{selectedProduct.price}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">
                Total: ₹{calculatedTotal}
              </div>
            </div>

            {/* Large Prominent Confirm Sale Button */}
            <button
              type="button"
              onClick={handleConfirmSale}
              className="bg-accent text-text-primary font-extrabold text-lg py-4 px-6 rounded-2xl shadow-lg w-full flex items-center justify-center space-x-2 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Confirm Sale</span>
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default NewSale
