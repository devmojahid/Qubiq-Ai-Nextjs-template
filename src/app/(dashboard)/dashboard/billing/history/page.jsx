"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CreditCard, Calendar, Download, Filter,
  CheckCircle2, XCircle, AlertCircle, Receipt,
  DollarSign, Clock, ArrowUpDown, Search,
  FileText, Printer, Mail, ExternalLink,
  ChevronDown, ChevronRight, Plus, MoreVertical,
  ShieldCheck, Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const transactions = [
  {
    id: "INV-2024-001",
    date: "2024-03-15",
    amount: 29.99,
    status: "successful",
    description: "Monthly Pro Plan Subscription",
    paymentMethod: {
      type: "card",
      last4: "4242",
      brand: "visa"
    },
    invoice: "/invoices/INV-2024-001.pdf"
  },
  {
    id: "INV-2024-002",
    date: "2024-02-15",
    amount: 29.99,
    status: "successful",
    description: "Monthly Pro Plan Subscription",
    paymentMethod: {
      type: "card",
      last4: "4242",
      brand: "visa"
    },
    invoice: "/invoices/INV-2024-002.pdf"
  },
  {
    id: "INV-2024-003",
    date: "2024-01-15",
    amount: 29.99,
    status: "failed",
    description: "Monthly Pro Plan Subscription",
    paymentMethod: {
      type: "card",
      last4: "4242",
      brand: "visa"
    },
    invoice: "/invoices/INV-2024-003.pdf"
  }
]

const statusStyles = {
  successful: {
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-500/10",
    text: "Successful"
  },
  failed: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    text: "Failed"
  },
  pending: {
    icon: Clock,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    text: "Pending"
  },
  refunded: {
    icon: AlertCircle,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    text: "Refunded"
  }
}

const filters = [
  { id: "all", label: "All Transactions" },
  { id: "successful", label: "Successful" },
  { id: "failed", label: "Failed" },
  { id: "pending", label: "Pending" },
  { id: "refunded", label: "Refunded" }
]

const dateRanges = [
  { id: "30days", label: "Last 30 Days" },
  { id: "6months", label: "Last 6 Months" },
  { id: "12months", label: "Last 12 Months" },
  { id: "custom", label: "Custom Range" }
]

// Enhanced Dropdown Component
const FilterDropdown = ({ value, onChange, options, icon: Icon, label }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between",
          "px-4 py-2.5 rounded-xl",
          "bg-secondary/50 border border-border/50",
          "text-sm font-medium",
          "hover:bg-secondary/70 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary/20"
        )}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <span>{options.find(opt => opt.id === value)?.label || label}</span>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "absolute z-50 w-full mt-2",
              "rounded-xl border bg-card shadow-lg",
              "py-1 overflow-hidden"
            )}
          >
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-2",
                  "text-sm hover:bg-secondary/50 transition-colors",
                  value === option.id && "bg-primary/10 text-primary"
                )}
              >
                {option.icon && <option.icon className="h-4 w-4" />}
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Add these helper functions at the top of the component
const downloadPDF = async (url) => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = objectUrl
    link.download = url.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(objectUrl)
    return true
  } catch (error) {
    console.error('Download failed:', error)
    return false
  }
}

// Transaction Actions Menu
const TransactionActions = ({ 
  transaction, 
  onDownload, 
  onEmail, 
  onViewDetails,
  isLoading 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const [dropdownPosition, setDropdownPosition] = useState('bottom')

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      setDropdownPosition(spaceBelow < 200 ? 'top' : 'bottom')
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const actions = [
    { 
      label: "Download Invoice", 
      icon: Download, 
      onClick: () => onDownload(transaction.invoice),
      loading: isLoading.download
    },
    { 
      label: "Email Invoice", 
      icon: Mail, 
      onClick: () => onEmail(transaction.invoice),
      loading: isLoading.email
    },
    { 
      label: "View Details", 
      icon: ExternalLink, 
      onClick: () => onViewDetails(transaction.id)
    }
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-lg",
          "hover:bg-secondary transition-colors",
          isOpen && "bg-secondary"
        )}
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "absolute z-50",
              "w-48 rounded-xl border bg-card shadow-lg",
              "py-1 overflow-hidden",
              dropdownPosition === 'top' 
                ? "bottom-full mb-2" 
                : "top-full mt-2",
              "right-0"
            )}
          >
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick()
                  setIsOpen(false)
                }}
                disabled={action.loading}
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-2",
                  "text-sm hover:bg-secondary/50 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {action.loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <action.icon className="h-4 w-4" />
                )}
                {action.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Add this custom debounce function at the top of the file
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function BillingHistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("30days")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isExporting, setIsExporting] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const [isLoading, setIsLoading] = useState({
    download: false,
    email: false,
    payment: false
  })
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  // Enhanced download invoice handler
  const handleDownloadInvoice = async (invoice) => {
    setIsLoading(prev => ({ ...prev, download: true }))
    try {
      const success = await downloadPDF(invoice)
      if (success) {
        showToast('Invoice downloaded successfully', 'success')
      } else {
        throw new Error('Download failed')
      }
    } catch (error) {
      showToast('Failed to download invoice', 'error')
    } finally {
      setIsLoading(prev => ({ ...prev, download: false }))
    }
  }

  // Enhanced email invoice handler
  const handleEmailInvoice = async (invoice) => {
    setIsLoading(prev => ({ ...prev, email: true }))
    try {
      // Simulate API call to email invoice
      await new Promise(resolve => setTimeout(resolve, 1000))
      showToast('Invoice sent to your email', 'success')
    } catch (error) {
      showToast('Failed to send invoice', 'error')
    } finally {
      setIsLoading(prev => ({ ...prev, email: false }))
    }
  }

  // Enhanced view details handler
  const handleViewDetails = (transactionId) => {
    try {
      // Open transaction details in a new tab or modal
      window.open(`/dashboard/billing/transactions/${transactionId}`, '_blank')
    } catch (error) {
      showToast('Failed to open transaction details', 'error')
    }
  }

  // Enhanced add payment method handler
  const handleAddPaymentMethod = async () => {
    setIsLoading(prev => ({ ...prev, payment: true }))
    try {
      // Redirect to payment method page
      window.location.href = '/dashboard/billing/payment-methods/add'
    } catch (error) {
      showToast('Failed to navigate', 'error')
      setIsLoading(prev => ({ ...prev, payment: false }))
    }
  }

  // Enhanced search functionality with our custom debounce
  const handleSearch = useCallback((query) => {
    const searchValue = query.toLowerCase().trim()
    
    if (!searchValue) {
      setFilteredTransactions(transactions)
      return
    }

    const filtered = transactions.filter(transaction => 
      transaction.description.toLowerCase().includes(searchValue) ||
      transaction.id.toLowerCase().includes(searchValue) ||
      transaction.amount.toString().includes(searchValue) ||
      new Date(transaction.date).toLocaleDateString().includes(searchValue)
    )
    
    setFilteredTransactions(filtered)
  }, [])

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 300),
    [handleSearch]
  )

  const handleExport = async () => {
    if (isExporting) return
    
    setIsExporting(true)
    try {
      // Filter transactions based on current filters
      const filteredTransactions = transactions.filter(transaction => {
        const matchesFilter = selectedFilter === 'all' || transaction.status === selectedFilter
        const matchesSearch = searchQuery === '' || 
          transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
      })

      // Create CSV content
      const headers = ['Date', 'Description', 'Amount', 'Status', 'Invoice ID']
      const rows = filteredTransactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.description,
        `$${t.amount}`,
        t.status,
        t.id
      ])
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')

      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', `billing-history-${new Date().toISOString()}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      showToast('Export completed successfully', 'success')
    } catch (error) {
      console.error('Export failed:', error)
      showToast('Failed to export data. Please try again.', 'error')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Billing History
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage your billing history and invoices
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExport}
              disabled={isExporting}
              className={cn(
                "inline-flex items-center gap-2",
                "px-4 py-2 rounded-xl text-sm font-medium",
                "bg-secondary/80 hover:bg-secondary",
                "transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Exporting...</span>
                </>
              ) : (
                <>
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </>
              )}
            </motion.button>
            
            {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddPaymentMethod}
              disabled={isLoading.payment}
              className={cn(
                "inline-flex items-center gap-2",
                "px-4 py-2 rounded-xl text-sm font-medium",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 transition-opacity",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading.payment ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Payment Method</span>
                </>
              )}
            </motion.button> */}
            <Link
              href="/dashboard/billing/payment-methods/add"
              className={cn(
                "inline-flex items-center gap-2",
                "px-4 py-2 rounded-xl text-sm font-medium",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 transition-opacity",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <Plus className="h-4 w-4" />
              Add Payment Method
            </Link>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr,1fr,2fr]">
          <FilterDropdown
            value={selectedFilter}
            onChange={setSelectedFilter}
            options={filters}
            icon={Filter}
            label="Filter Transactions"
          />

          <FilterDropdown
            value={selectedDateRange}
            onChange={setSelectedDateRange}
            options={dateRanges}
            icon={Calendar}
            label="Select Date Range"
          />

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                debouncedSearch(e.target.value)
              }}
              placeholder="Search transactions..."
              className={cn(
                "w-full pl-10 pr-4 py-2.5",
                "rounded-xl bg-secondary/50",
                "border border-border/50",
                "text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/20"
              )}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-xl border bg-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr,auto] sm:grid-cols-[1fr,1fr,auto,auto] gap-4 p-4 border-b">
            <button
              onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2 text-sm font-medium"
            >
              Date
              <ArrowUpDown className="h-4 w-4" />
            </button>
            <div className="hidden sm:block text-sm font-medium">Amount</div>
            <div className="hidden sm:block text-sm font-medium">Status</div>
            <div className="text-sm font-medium text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y">
            {filteredTransactions.map((transaction) => {
              const status = statusStyles[transaction.status]
              const StatusIcon = status.icon

              return (
                <div
                  key={transaction.id}
                  className={cn(
                    "grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto,auto]",
                    "gap-4 p-4 hover:bg-secondary/50 transition-colors"
                  )}
                >
                  {/* Mobile-optimized layout */}
                  <div className="space-y-2 sm:space-y-1">
                    <div className="flex items-center justify-between sm:justify-start gap-4">
                      <div className="font-medium">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                      <div className="sm:hidden">
                        <TransactionActions
                          transaction={transaction}
                          onDownload={handleDownloadInvoice}
                          onEmail={handleEmailInvoice}
                          onViewDetails={handleViewDetails}
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.description}
                    </div>
                    <div className="flex items-center justify-between sm:hidden">
                      <div className="text-sm font-medium">
                        ${transaction.amount}
                      </div>
                      <ShieldCheck status={transaction.status} />
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden sm:block font-medium">
                    ${transaction.amount}
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <ShieldCheck status={transaction.status} />
                  </div>
                  <div className="hidden sm:flex items-center justify-end gap-2">
                    <TransactionActions
                      transaction={transaction}
                      onDownload={handleDownloadInvoice}
                      onEmail={handleEmailInvoice}
                      onViewDetails={handleViewDetails}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              )
            })}

            {/* No Results State */}
            {filteredTransactions.length === 0 && (
              <div className="p-8 text-center">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No transactions found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border bg-card space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="font-medium">Total Spent</div>
            </div>
            <div className="text-2xl font-bold">
              ${filteredTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {selectedDateRange === "30days" ? "Last 30 days" : 
               selectedDateRange === "6months" ? "Last 6 months" : 
               selectedDateRange === "12months" ? "Last 12 months" : 
               "Custom range"}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border bg-card space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Receipt className="h-4 w-4 text-green-500" />
              </div>
              <div className="font-medium">Successful</div>
            </div>
            <div className="text-2xl font-bold text-green-500">
              {filteredTransactions.filter(t => t.status === "successful").length}
            </div>
            <div className="text-xs text-muted-foreground">
              Transactions
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border bg-card space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
              <div className="font-medium">Failed</div>
            </div>
            <div className="text-2xl font-bold text-red-500">
              {filteredTransactions.filter(t => t.status === "failed").length}
            </div>
            <div className="text-xs text-muted-foreground">
              Transactions
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border bg-card space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <CreditCard className="h-4 w-4 text-blue-500" />
              </div>
              <div className="font-medium">Active Cards</div>
            </div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-muted-foreground">
              Payment methods
            </div>
          </motion.div>
        </div>
      </div>

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
    </div>
  )
} 