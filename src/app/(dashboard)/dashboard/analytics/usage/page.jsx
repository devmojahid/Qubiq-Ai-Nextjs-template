"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart2, TrendingUp, TrendingDown, Clock,
  Zap, Users, CreditCard, Activity,
  Calendar, ChevronDown, Filter, Download,
  RefreshCcw, Settings, HelpCircle, Maximize2,
  PieChart, LineChart, ArrowUpRight, ArrowDownRight,
  Brain, Image as ImageIcon, MessageSquare, Code2,
  CheckCircle2, AlertCircle, X
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data - replace with real data
const usageMetrics = {
  totalCredits: {
    used: 75000,
    total: 100000,
    trend: +15.2
  },
  activeUsers: {
    count: 1250,
    trend: +8.5
  },
  apiCalls: {
    count: 250000,
    trend: +12.3
  },
  successRate: {
    rate: 99.2,
    trend: -0.3
  }
}

const usageByService = [
  {
    id: "text",
    name: "Text Generation",
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    usage: 35,
    trend: +12.5
  },
  {
    id: "image",
    name: "Image Creation",
    icon: ImageIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    usage: 25,
    trend: +18.2
  },
  {
    id: "code",
    name: "Code Generation",
    icon: Code2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    usage: 20,
    trend: +5.8
  },
  {
    id: "ai",
    name: "AI Models",
    icon: Brain,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    usage: 20,
    trend: +15.3
  }
]

const timeRanges = [
  { id: "24h", label: "Last 24 hours" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" }
]

// Add these additional metrics
const additionalMetrics = {
  topRequests: [
    { path: "/api/v1/generate/text", count: 45280, change: +12.5 },
    { path: "/api/v1/analyze/image", count: 32150, change: +8.2 },
    { path: "/api/v1/chat/completion", count: 28900, change: +15.8 },
    { path: "/api/v1/code/generate", count: 25600, change: -2.3 }
  ],
  errorRates: [
    { type: "Rate Limit Exceeded", count: 1250, percentage: 0.5 },
    { type: "Invalid Parameters", count: 850, percentage: 0.3 },
    { type: "Authentication Failed", count: 420, percentage: 0.2 },
    { type: "Server Errors", count: 180, percentage: 0.1 }
  ],
  dailyUsage: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "API Calls",
        data: [28500, 32400, 35200, 30100, 42300, 38200, 40100]
      }
    ]
  }
}

// Add these new components and functionality
const FilterModal = ({ isOpen, onClose, filters, onApplyFilters }) => (
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
          className={cn(
            "w-full max-w-lg bg-card border shadow-xl",
            "rounded-xl overflow-hidden",
            "relative transform transition-all"
          )}
        >
          {/* Modal Header */}
          <div className="border-b p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Filter Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Customize your analytics view
                </p>
              </div>
              <button
                onClick={onClose}
                className={cn(
                  "p-2 rounded-lg hover:bg-secondary/80",
                  "transition-colors duration-200"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Service Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Services</label>
              <div className="grid grid-cols-2 gap-3">
                {usageByService.map(service => (
                  <label
                    key={service.id}
                    className={cn(
                      "flex items-center gap-3 p-3",
                      "rounded-xl border transition-all duration-200",
                      "hover:bg-secondary/50 cursor-pointer",
                      filters.services.includes(service.id) && "border-primary bg-primary/5"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={filters.services.includes(service.id)}
                      onChange={(e) => {
                        const newServices = e.target.checked
                          ? [...filters.services, service.id]
                          : filters.services.filter(id => id !== service.id)
                        onApplyFilters({ ...filters, services: newServices })
                      }}
                      className={cn(
                        "rounded-md border-2",
                        "focus:ring-2 focus:ring-primary/20",
                        "checked:bg-primary checked:border-primary"
                      )}
                    />
                    <div className="flex items-center gap-2">
                      <div className={cn("p-2 rounded-lg", service.bgColor)}>
                        <service.icon className={cn("h-4 w-4", service.color)} />
                      </div>
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range with better styling */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Custom Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Start Date</label>
                  <input
                    type="date"
                    value={filters.dateRange.start || ''}
                    onChange={(e) => onApplyFilters({
                      ...filters,
                      dateRange: { ...filters.dateRange, start: e.target.value }
                    })}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-sm",
                      "bg-secondary/50 border border-border/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20",
                      "hover:border-primary/20 transition-colors"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">End Date</label>
                  <input
                    type="date"
                    value={filters.dateRange.end || ''}
                    onChange={(e) => onApplyFilters({
                      ...filters,
                      dateRange: { ...filters.dateRange, end: e.target.value }
                    })}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-sm",
                      "bg-secondary/50 border border-border/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20",
                      "hover:border-primary/20 transition-colors"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Minimum Request Count with better styling */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Minimum Requests</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={filters.minRequests}
                  onChange={(e) => onApplyFilters({
                    ...filters,
                    minRequests: parseInt(e.target.value) || 0
                  })}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-sm",
                    "bg-secondary/50 border border-border/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20",
                    "hover:border-primary/20 transition-colors",
                    "pr-12" // Space for the suffix
                  )}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  reqs
                </span>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className={cn(
            "border-t p-4 sm:p-6",
            "flex flex-col sm:flex-row justify-end gap-3"
          )}>
            <button
              onClick={() => {
                onApplyFilters({
                  services: [],
                  dateRange: { start: null, end: null },
                  minRequests: 0
                })
                onClose()
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium",
                "border border-border/50 hover:bg-secondary/80",
                "transition-colors duration-200"
              )}
            >
              Reset Filters
            </button>
            <button
              onClick={onClose}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 transition-opacity"
              )}
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default function UsageAnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const [showExportModal, setShowExportModal] = useState(false)

  // Add these new states
  const [filters, setFilters] = useState({
    services: [],
    dateRange: { start: null, end: null },
    minRequests: 0
  })

  const refreshData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Update data here
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      // Create CSV content
      const csvContent = [
        ['Date', 'Service', 'Requests', 'Success Rate'],
        // Add your data rows here
      ].map(row => row.join(',')).join('\n')

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `usage-analytics-${selectedRange}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Add the remaining metric cards
  const renderMetricCards = () => (
    <>
      {/* Active Users Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-xl border bg-card space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Users className="h-4 w-4 text-green-500" />
            </div>
            <span className="font-medium">Active Users</span>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm",
            usageMetrics.activeUsers.trend > 0 ? "text-green-500" : "text-red-500"
          )}>
            {usageMetrics.activeUsers.trend > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(usageMetrics.activeUsers.trend)}%
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold">
            {usageMetrics.activeUsers.count.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Active this month
          </div>
        </div>
      </motion.div>

      {/* API Calls Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-xl border bg-card space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Activity className="h-4 w-4 text-purple-500" />
            </div>
            <span className="font-medium">API Calls</span>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm",
            usageMetrics.apiCalls.trend > 0 ? "text-green-500" : "text-red-500"
          )}>
            {usageMetrics.apiCalls.trend > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(usageMetrics.apiCalls.trend)}%
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold">
            {usageMetrics.apiCalls.count.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Total API calls
          </div>
        </div>
      </motion.div>

      {/* Success Rate Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-xl border bg-card space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <CheckCircle2 className="h-4 w-4 text-orange-500" />
            </div>
            <span className="font-medium">Success Rate</span>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm",
            usageMetrics.successRate.trend > 0 ? "text-green-500" : "text-red-500"
          )}>
            {usageMetrics.successRate.trend > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(usageMetrics.successRate.trend)}%
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-2xl font-bold">
            {usageMetrics.successRate.rate}%
          </div>
          <div className="text-sm text-muted-foreground">
            Request success rate
          </div>
        </div>
      </motion.div>
    </>
  )

  // Add Top Requests Section
  const renderTopRequests = () => (
    <motion.div
      className="rounded-xl border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="border-b p-6">
        <h3 className="font-semibold">Top API Requests</h3>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {additionalMetrics.topRequests.map((request, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{request.path}</div>
                  <div className="text-sm text-muted-foreground">
                    {request.count.toLocaleString()} requests
                  </div>
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm",
                request.change > 0 ? "text-green-500" : "text-red-500"
              )}>
                {request.change > 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {Math.abs(request.change)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  // Add Error Rates Section
  const renderErrorRates = () => (
    <motion.div
      className="rounded-xl border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="border-b p-6">
        <h3 className="font-semibold">Error Distribution</h3>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {additionalMetrics.errorRates.map((error, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="font-medium">{error.type}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {error.count.toLocaleString()} occurrences
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${error.percentage * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Usage Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor your API usage and resource consumption
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Time Range Selector */}
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm",
                "bg-secondary/50 border border-border/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/20"
              )}
            >
              {timeRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={refreshData}
                disabled={isLoading}
                className={cn(
                  "p-2 rounded-xl",
                  "bg-secondary/50 border border-border/50",
                  "hover:bg-secondary/80 transition-colors"
                )}
              >
                <RefreshCcw className={cn(
                  "h-4 w-4",
                  isLoading && "animate-spin"
                )} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "p-2 rounded-xl",
                  "bg-secondary/50 border border-border/50",
                  "hover:bg-secondary/80 transition-colors"
                )}
              >
                <Filter className="h-4 w-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className={cn(
                  "p-2 rounded-xl",
                  "bg-secondary/50 border border-border/50",
                  "hover:bg-secondary/80 transition-colors"
                )}
              >
                <Download className={cn(
                  "h-4 w-4",
                  isLoading && "animate-spin"
                )} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Grid with all metric cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Credits Usage Card (previous) */}
          {renderMetricCards()}
        </div>

        {/* Extended Analytics Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Usage by Service (previous) */}
          {renderTopRequests()}
          {renderErrorRates()}
        </div>
      </div>

      {/* Add FilterModal */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </div>
  )
} 