"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CreditCard, Plus, Trash2, Edit2, CheckCircle2,
  AlertCircle, Lock, Shield, Copy, Eye, EyeOff,
  Calendar, Bank, Wallet, CreditCardIcon, PaypalIcon,
  DollarSign, Settings, MoreVertical, Star,
  Loader2, ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const paymentMethods = [
  {
    id: "card-1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
    billingDetails: {
      name: "John Doe",
      address: {
        line1: "123 Main St",
        city: "San Francisco",
        state: "CA",
        postal_code: "94111",
        country: "US"
      }
    }
  },
  {
    id: "card-2",
    type: "card",
    brand: "mastercard",
    last4: "8888",
    expMonth: 3,
    expYear: 2025,
    isDefault: false,
    billingDetails: {
      name: "John Doe",
      address: {
        line1: "456 Market St",
        city: "San Francisco",
        state: "CA",
        postal_code: "94111",
        country: "US"
      }
    }
  }
]

// Card Brand Icons Component
const CardBrandIcon = ({ brand }) => {
  const iconClasses = "h-6 w-6 sm:h-8 sm:w-8"
  
  switch (brand.toLowerCase()) {
    case 'visa':
      return <CreditCard className={cn(iconClasses, "text-blue-500")} />
    case 'mastercard':
      return <CreditCard className={cn(iconClasses, "text-red-500")} />
    case 'amex':
      return <CreditCard className={cn(iconClasses, "text-green-500")} />
    default:
      return <CreditCard className={iconClasses} />
  }
}

// Payment Method Card Component
const PaymentMethodCard = ({ method, onEdit, onDelete, onSetDefault }) => {
  const [showActions, setShowActions] = useState(false)
  const actionsRef = useRef(null)

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        "relative p-6 rounded-xl border bg-card",
        "transition-all duration-200",
        method.isDefault && "ring-2 ring-primary/20"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <CardBrandIcon brand={method.brand} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium capitalize">
                {method.brand}
              </span>
              <span className="text-sm text-muted-foreground">
                •••• {method.last4}
              </span>
              {method.isDefault && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs",
                  "bg-primary/10 text-primary"
                )}>
                  Default
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Expires {method.expMonth}/{method.expYear}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className={cn(
              "p-2 rounded-lg",
              "hover:bg-secondary/80 transition-colors"
            )}
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                ref={actionsRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "absolute right-0 top-full mt-2 z-50",
                  "w-48 rounded-xl border bg-card shadow-lg",
                  "py-1 overflow-hidden"
                )}
              >
                <button
                  onClick={() => {
                    onEdit(method)
                    setShowActions(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Details
                </button>
                {!method.isDefault && (
                  <button
                    onClick={() => {
                      onSetDefault(method.id)
                      setShowActions(false)
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50"
                  >
                    <Star className="h-4 w-4" />
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => {
                    onDelete(method.id)
                    setShowActions(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Billing Details Preview */}
      <div className="mt-4 pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          <div>{method.billingDetails.name}</div>
          <div>{method.billingDetails.address.line1}</div>
          <div>
            {method.billingDetails.address.city}, {method.billingDetails.address.state} {method.billingDetails.address.postal_code}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Add this EditPaymentMethodModal component
const EditPaymentMethodModal = ({ method, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: method?.billingDetails?.name || '',
    line1: method?.billingDetails?.address?.line1 || '',
    city: method?.billingDetails?.address?.city || '',
    state: method?.billingDetails?.address?.state || '',
    postalCode: method?.billingDetails?.address?.postal_code || '',
    country: method?.billingDetails?.address?.country || 'US'
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSave(method.id, formData)
      onClose()
    } catch (error) {
      console.error('Failed to update payment method:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg rounded-xl bg-card p-6 shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Payment Method</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Cardholder Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={cn(
                    "w-full mt-1 px-4 py-2 rounded-lg",
                    "bg-secondary/50 border border-border/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Street Address</label>
                <input
                  type="text"
                  value={formData.line1}
                  onChange={(e) => setFormData(prev => ({ ...prev, line1: e.target.value }))}
                  className={cn(
                    "w-full mt-1 px-4 py-2 rounded-lg",
                    "bg-secondary/50 border border-border/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className={cn(
                      "w-full mt-1 px-4 py-2 rounded-lg",
                      "bg-secondary/50 border border-border/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    className={cn(
                      "w-full mt-1 px-4 py-2 rounded-lg",
                      "bg-secondary/50 border border-border/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                    className={cn(
                      "w-full mt-1 px-4 py-2 rounded-lg",
                      "bg-secondary/50 border border-border/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className={cn(
                      "w-full mt-1 px-4 py-2 rounded-lg",
                      "bg-secondary/50 border border-border/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                    required
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "px-4 py-2 rounded-lg",
                    "text-sm font-medium",
                    "hover:bg-secondary/80 transition-colors"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "px-4 py-2 rounded-lg",
                    "bg-primary text-primary-foreground",
                    "text-sm font-medium",
                    "hover:opacity-90 transition-opacity",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState(paymentMethods)
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const [editingMethod, setEditingMethod] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  const handleSetDefault = async (id) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMethods(prev => prev.map(method => ({
        ...method,
        isDefault: method.id === id
      })))
      
      showToast('Default payment method updated')
    } catch (error) {
      showToast('Failed to update default method', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (methods.find(m => m.id === id)?.isDefault) {
      showToast('Cannot delete default payment method', 'error')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMethods(prev => prev.filter(method => method.id !== id))
      showToast('Payment method removed')
    } catch (error) {
      showToast('Failed to remove payment method', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Add handleEdit function
  const handleEdit = (method) => {
    setEditingMethod(method)
  }

  // Add handleSaveEdit function
  const handleSaveEdit = async (id, formData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMethods(prev => prev.map(method => {
        if (method.id === id) {
          return {
            ...method,
            billingDetails: {
              name: formData.name,
              address: {
                line1: formData.line1,
                city: formData.city,
                state: formData.state,
                postal_code: formData.postalCode,
                country: formData.country
              }
            }
          }
        }
        return method
      }))
      
      showToast('Payment method updated successfully')
    } catch (error) {
      showToast('Failed to update payment method', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Payment Methods
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your payment methods and billing details
            </p>
          </div>
          
          <Link href="/dashboard/billing/payment-methods/add" 
            className={cn(
              "inline-flex items-center gap-2",
              "px-4 py-2 rounded-xl",
              "bg-primary text-primary-foreground",
              "text-sm font-medium",
              "hover:opacity-90 transition-all"
            )}
          >
            Add Payment Method
          </Link>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {methods.map(method => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>

        {/* Empty State */}
        {methods.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No payment methods</h3>
            <p className="text-sm text-muted-foreground">
              Add a payment method to start managing your subscriptions
            </p>
          </motion.div>
        )}

        {/* Toast Notification */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={cn(
                "fixed bottom-4 right-4 z-50",
                "px-4 py-2 rounded-lg shadow-lg",
                "text-sm font-medium",
                toast.type === 'error' 
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              )}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add EditPaymentMethodModal */}
        <EditPaymentMethodModal
          method={editingMethod}
          isOpen={!!editingMethod}
          onClose={() => setEditingMethod(null)}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  )
} 