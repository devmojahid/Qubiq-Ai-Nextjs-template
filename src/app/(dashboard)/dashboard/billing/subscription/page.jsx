"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CreditCard, Shield, Clock, Calendar,
  CheckCircle2, AlertCircle, Settings, Download,
  RefreshCcw, ChevronRight, ChevronsUpDown,
  Zap, Crown, Star, Gift, Receipt, History,
  ArrowUpRight, Wallet, Building2, Users
} from "lucide-react"
import { cn } from "@/lib/utils"

const subscriptionPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    interval: "month",
    features: [
      "5,000 API Calls/month",
      "Basic AI Models",
      "Standard Support",
      "1 Team Member",
      "Basic Analytics"
    ],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    icon: Zap
  },
  {
    id: "pro",
    name: "Professional",
    price: 99,
    interval: "month",
    features: [
      "25,000 API Calls/month",
      "Advanced AI Models",
      "Priority Support",
      "5 Team Members",
      "Advanced Analytics",
      "Custom Branding"
    ],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    icon: Crown,
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 299,
    interval: "month",
    features: [
      "100,000 API Calls/month",
      "All AI Models",
      "24/7 Support",
      "Unlimited Team Members",
      "Custom Analytics",
      "White Labeling",
      "SLA Agreement"
    ],
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    icon: Building2
  }
]

const billingHistory = [
  {
    id: "inv_001",
    date: "2024-03-15",
    amount: 99,
    status: "paid",
    description: "Professional Plan - Monthly"
  },
  {
    id: "inv_002",
    date: "2024-02-15",
    amount: 99,
    status: "paid",
    description: "Professional Plan - Monthly"
  }
]

// Add Cancel Modal Component
const CancelSubscriptionModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-card border rounded-xl shadow-lg"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Cancel Subscription</h3>
            </div>
            <p className="text-muted-foreground">
              Are you sure you want to cancel your subscription? You'll lose access to:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Advanced AI Models
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Priority Support
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Team Collaboration Features
              </li>
            </ul>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-secondary/80"
              >
                Keep Subscription
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState("pro")
  const [billingInterval, setBillingInterval] = useState("month")
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [downloadingInvoiceId, setDownloadingInvoiceId] = useState(null)

  const handleUpgrade = async (planId) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCurrentPlan(planId)
    } catch (error) {
      console.error('Error upgrading plan:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadInvoice = async (invoiceId) => {
    if (downloadingInvoiceId) return // Prevent multiple downloads

    setDownloadingInvoiceId(invoiceId)
    try {
      // Simulate API call to generate invoice PDF
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create a fake blob for demonstration
      const blob = new Blob(['Invoice data'], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${invoiceId}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading invoice:', error)
    } finally {
      setDownloadingInvoiceId(null)
    }
  }

  const renderRecentInvoices = () => (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Invoices</h2>
          <button
            onClick={() => handleDownloadInvoice('all')}
            className={cn(
              "hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm",
              "bg-secondary/50 border border-border/50",
              "hover:bg-secondary/80 transition-colors"
            )}
          >
            <Download className="h-4 w-4" />
            <span>Download All</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {billingHistory.map((invoice) => (
            <motion.div
              key={invoice.id}
              whileHover={{ scale: 1.01 }}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between",
                "p-4 rounded-xl bg-secondary/50 gap-4"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2 rounded-xl bg-primary/10",
                  "hidden sm:block" // Hide icon on mobile to save space
                )}>
                  <Receipt className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-[200px]">
                  <div className="font-medium">{invoice.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="flex flex-col sm:items-end">
                  <div className="font-medium">
                    ${invoice.amount.toFixed(2)}
                  </div>
                  <div className={cn(
                    "text-xs font-medium rounded-full px-2.5 py-1",
                    "inline-flex items-center gap-1",
                    invoice.status === "paid" 
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  )}>
                    {invoice.status === "paid" && (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownloadInvoice(invoice.id)}
                  disabled={downloadingInvoiceId === invoice.id}
                  className={cn(
                    "p-2 rounded-xl",
                    "bg-secondary/50 border border-border/50",
                    "hover:bg-secondary/80 transition-colors",
                    "group relative",
                    downloadingInvoiceId === invoice.id && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Download className={cn(
                    "h-4 w-4",
                    downloadingInvoiceId === invoice.id && "animate-spin"
                  )} />
                  
                  {/* Tooltip */}
                  <span className={cn(
                    "absolute -top-8 left-1/2 -translate-x-1/2",
                    "px-2 py-1 rounded-md text-xs",
                    "bg-secondary text-foreground",
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-200",
                    "whitespace-nowrap",
                    "hidden sm:block"
                  )}>
                    {downloadingInvoiceId === invoice.id ? 'Downloading...' : 'Download Invoice'}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Download All Button */}
        <button
          onClick={() => handleDownloadInvoice('all')}
          disabled={downloadingInvoiceId === 'all'}
          className={cn(
            "w-full mt-4 px-4 py-2 rounded-xl text-sm",
            "bg-secondary/50 border border-border/50",
            "hover:bg-secondary/80 transition-colors",
            "flex items-center justify-center gap-2",
            "sm:hidden",
            downloadingInvoiceId === 'all' && "opacity-50 cursor-not-allowed"
          )}
        >
          <Download className={cn(
            "h-4 w-4",
            downloadingInvoiceId === 'all' && "animate-spin"
          )} />
          <span>{downloadingInvoiceId === 'all' ? 'Downloading...' : 'Download All Invoices'}</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Subscription Management
            </h1>
            <p className="text-muted-foreground">
              Manage your subscription and billing preferences
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className={cn(
                "p-2 rounded-xl",
                "bg-secondary/50 border border-border/50",
                "hover:bg-secondary/80 transition-colors"
              )}
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Current Plan Overview */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="border-b p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Current Plan</h2>
                <p className="text-sm text-muted-foreground">
                  Your subscription renews on April 15, 2024
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-medium",
                  "bg-green-500/10 text-green-500"
                )}>
                  Active
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Usage Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-purple-500" />
                  <span className="font-medium">Professional Plan</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">API Calls Used</span>
                    <span className="font-medium">15,280 / 25,000</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: '61%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Billing Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                  <span className="font-medium">Billing Info</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Next Payment</span>
                    <span className="font-medium">$99.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Billing Cycle</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  <span className="font-medium">Quick Actions</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className={cn(
                      "w-full px-4 py-2 rounded-xl text-sm",
                      "border border-border/50 hover:bg-secondary/80",
                      "transition-colors duration-200"
                    )}
                  >
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "rounded-xl border bg-card p-6 space-y-4",
                plan.popular && "ring-2 ring-primary"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("p-2 rounded-lg", plan.bgColor)}>
                    <plan.icon className={cn("h-5 w-5", plan.color)} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.features[0]}
                    </p>
                  </div>
                </div>
                {plan.popular && (
                  <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Popular
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  ${plan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{plan.interval}
                  </span>
                </div>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={currentPlan === plan.id || isLoading}
                className={cn(
                  "w-full px-4 py-2 rounded-xl text-sm font-medium",
                  "transition-colors duration-200",
                  currentPlan === plan.id
                    ? "bg-primary/10 text-primary cursor-default"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                )}
              >
                {isLoading ? (
                  <RefreshCcw className="h-4 w-4 animate-spin mx-auto" />
                ) : currentPlan === plan.id ? (
                  "Current Plan"
                ) : (
                  "Upgrade Plan"
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Recent Invoices */}
        {renderRecentInvoices()}
      </div>

      <CancelSubscriptionModal 
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
      />
    </div>
  )
} 