"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Key, Plus, Copy, Eye, EyeOff, 
  Clock, Calendar, AlertCircle, CheckCircle2,
  RefreshCcw, Trash2, Settings, Lock,
  Globe, Shield, Terminal, Database,
  Code, Zap, Activity, BarChart2,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"


const permissions = [
  { id: "read", name: "Read", description: "Access to read-only endpoints" },
  { id: "write", name: "Write", description: "Access to modify resources" },
  { id: "delete", name: "Delete", description: "Access to delete resources" },
  { id: "admin", name: "Admin", description: "Full administrative access" }
]

// Create Key Modal Component
const CreateKeyModal = ({ isOpen, onClose, onCreateKey }) => {
  const [name, setName] = useState("")
  const [type, setType] = useState("test")
  const [selectedPerms, setSelectedPerms] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      onCreateKey({
        id: `key_${type}_${Date.now()}`,
        name,
        type,
        permissions: selectedPerms,
        created: new Date().toISOString(),
        lastUsed: new Date().toISOString(),
        status: "active",
        requests: { total: 0, successful: 0, failed: 0 },
        limits: {
          rateLimit: type === "live" ? "100/min" : "1000/min",
          monthlyQuota: type === "live" ? "500000" : "unlimited"
        }
      })
      onClose()
    } catch (error) {
      console.error("Error creating key:", error)
    } finally {
      setLoading(false)
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
            <h3 className="text-lg font-semibold mb-4">Create New API Key</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Key Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Key Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={cn(
                    "w-full rounded-lg px-4 py-2",
                    "bg-secondary/50 border border-border/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                  placeholder="e.g., Production API Key"
                  required
                />
              </div>

              {/* Key Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Key Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["test", "live"].map((keyType) => (
                    <button
                      key={keyType}
                      type="button"
                      onClick={() => setType(keyType)}
                      className={cn(
                        "p-3 rounded-lg text-sm font-medium",
                        "border border-border/50 transition-colors",
                        type === keyType ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"
                      )}
                    >
                      {keyType === "live" ? "Production" : "Development"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Permissions</label>
                <div className="grid gap-2">
                  {permissions.map((perm) => (
                    <label
                      key={perm.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg",
                        "border border-border/50 cursor-pointer",
                        "hover:bg-secondary/50 transition-colors"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPerms.includes(perm.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPerms([...selectedPerms, perm.id])
                          } else {
                            setSelectedPerms(selectedPerms.filter(p => p !== perm.id))
                          }
                        }}
                        className="rounded border-border/50 text-primary"
                      />
                      <div>
                        <div className="font-medium">{perm.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {perm.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium",
                    "border border-border/50",
                    "hover:bg-secondary/80 transition-colors"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !name || selectedPerms.length === 0}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium",
                    "bg-primary text-primary-foreground",
                    "hover:opacity-90 transition-opacity",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    "Create Key"
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

// Settings Modal Component
const KeySettingsModal = ({ apiKey, isOpen, onClose, onUpdate, onDelete }) => {
  const [name, setName] = useState(apiKey?.name || "")
  const [selectedPerms, setSelectedPerms] = useState(apiKey?.permissions || [])
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

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
            <h3 className="text-lg font-semibold mb-4">API Key Settings</h3>
            
            {!showDeleteConfirm ? (
              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdate()
              }} className="space-y-4">
                {/* Key Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Key Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(
                      "w-full rounded-lg px-4 py-2",
                      "bg-secondary/50 border border-border/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                    placeholder="e.g., Production API Key"
                    required
                  />
                </div>

                {/* Permissions */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Permissions</label>
                  <div className="grid gap-2">
                    {permissions.map((perm) => (
                      <label
                        key={perm.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg",
                          "border border-border/50 cursor-pointer",
                          "hover:bg-secondary/50 transition-colors"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedPerms.includes(perm.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPerms([...selectedPerms, perm.id])
                            } else {
                              setSelectedPerms(selectedPerms.filter(p => p !== perm.id))
                            }
                          }}
                          className="rounded border-border/50 text-primary"
                        />
                        <div>
                          <div className="font-medium">{perm.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {perm.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Delete Key
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium",
                        "border border-border/50",
                        "hover:bg-secondary/80 transition-colors"
                      )}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !name || selectedPerms.length === 0}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium",
                        "bg-primary text-primary-foreground",
                        "hover:opacity-90 transition-opacity",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Updating...
                        </div>
                      ) : (
                        "Update Key"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-500">
                  <AlertCircle className="h-5 w-5" />
                  <h4 className="font-medium">Delete API Key</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to delete this API key? This action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium",
                      "border border-border/50",
                      "hover:bg-secondary/80 transition-colors"
                    )}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium",
                      "bg-red-500 text-white",
                      "hover:bg-red-600 transition-colors",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Deleting...
                      </div>
                    ) : (
                      "Delete Key"
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// Update the APIKeyDisplay component for better mobile experience
const APIKeyDisplay = ({ apiKey, showKey, onToggleShow, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false)
  const keyRef = useRef(null)

  const handleCopy = async () => {
    try {
      await onCopy(apiKey.key)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">API Key</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none">
            <code className={cn(
              "font-mono text-xs sm:text-sm",
              showKey ? "" : "filter blur-[3px] select-none"
            )}>
              {apiKey.key}
            </code>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleShow()}
            className={cn(
              "p-3 rounded-lg",
              "hover:bg-secondary/80 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "active:bg-secondary/80"
            )}
            aria-label={showKey ? "Hide API key" : "Show API key"}
          >
            {showKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={cn(
              "p-3 rounded-lg relative",
              "hover:bg-secondary/80 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "active:bg-secondary/80"
            )}
            aria-label="Copy API key"
          >
            {isCopied ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}

            <AnimatePresence>
              {isCopied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={cn(
                    "absolute -top-8 left-1/2 -translate-x-1/2",
                    "px-2 py-1 rounded-md text-xs font-medium",
                    "bg-green-500 text-white shadow-sm"
                  )}
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Key Info */}
      <div className="sm:hidden space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-secondary/30">
            <div className="text-xs text-muted-foreground">Type</div>
            <div className="text-sm font-medium">
              {apiKey.type === 'live' ? 'Production' : 'Development'}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-secondary/30">
            <div className="text-xs text-muted-foreground">Created</div>
            <div className="text-sm font-medium">
              {new Date(apiKey.created).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add this component for better mobile stats display
const KeyStats = ({ apiKey }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          "p-3 rounded-lg",
          "bg-secondary/50 hover:bg-secondary/70",
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <div className="text-sm font-medium">
            {apiKey.requests.total.toLocaleString()}
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Total Requests
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          "p-3 rounded-lg",
          "bg-secondary/50 hover:bg-secondary/70",
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <div className="text-sm font-medium text-green-500">
            {((apiKey.requests.successful / apiKey.requests.total) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Success Rate
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          "p-3 rounded-lg",
          "bg-secondary/50 hover:bg-secondary/70",
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-blue-500" />
          <div className="text-sm font-medium">
            {apiKey.limits.rateLimit}
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Rate Limit
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          "p-3 rounded-lg",
          "bg-secondary/50 hover:bg-secondary/70",
          "transition-all duration-200"
        )}
      >
        <div className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-purple-500" />
          <div className="text-sm font-medium">
            {apiKey.limits.monthlyQuota}
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Monthly Quota
        </div>
      </motion.div>
    </div>
  )
}

// Add this component for better mobile key management
const MobileKeyActions = ({ apiKey, onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-2 mt-4 sm:hidden">
      <button
        onClick={() => onEdit(apiKey)}
        className={cn(
          "flex-1 flex items-center justify-center gap-2",
          "px-4 py-2 rounded-lg text-sm font-medium",
          "bg-secondary/80 hover:bg-secondary",
          "transition-colors"
        )}
      >
        <Settings className="h-4 w-4" />
        Settings
      </button>
      
      <button
        onClick={() => onDelete(apiKey)}
        className={cn(
          "flex-1 flex items-center justify-center gap-2",
          "px-4 py-2 rounded-lg text-sm font-medium",
          "text-red-500 hover:bg-red-50",
          "transition-colors"
        )}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
    </div>
  )
}

// Add these helper functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateSuccessRate = (successful, total) => {
  return total === 0 ? 0 : ((successful / total) * 100).toFixed(1)
}

export default function APIKeysPage() {
    // Sample API keys data
const sampleApiKeys = [
    {
      id: "key_live_1",
      name: "Production API Key",
      key: "pk_live_51NxXXXXXXXXXXXXX",
      type: "live",
      created: "2024-03-01T10:00:00Z",
      lastUsed: "2024-03-15T15:30:00Z",
      status: "active",
      permissions: ["read", "write"],
      requests: {
        total: 15420,
        successful: 15200,
        failed: 220
      },
      limits: {
        rateLimit: "100/min",
        monthlyQuota: "500000"
      }
    },
    {
      id: "key_test_1",
      name: "Development API Key",
      key: "pk_test_51NxXXXXXXXXXXXXX",
      type: "test",
      created: "2024-02-15T14:20:00Z",
      lastUsed: "2024-03-15T14:00:00Z",
      status: "active",
      permissions: ["read"],
      requests: {
        total: 5230,
        successful: 5180,
        failed: 50
      },
      limits: {
        rateLimit: "1000/min",
        monthlyQuota: "unlimited"
      }
    }
  ]

  
  const [apiKeys, setApiKeys] = useState(sampleApiKeys)
  const [showKey, setShowKey] = useState({})
  const [selectedKey, setSelectedKey] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast('API key copied to clipboard')
    } catch (err) {
      showToast('Failed to copy API key', 'error')
    }
  }

  const handleCreateKey = (newKey) => {
    setApiKeys(prev => [newKey, ...prev])
    showToast('API key created successfully')
  }

  const handleUpdateKey = (keyId, updates) => {
    setApiKeys(keys => 
      keys.map(key => 
        key.id === keyId ? { ...key, ...updates } : key
      )
    )
    showToast('API key updated successfully')
  }

  const handleDeleteKey = (keyId) => {
    setApiKeys(keys => keys.filter(key => key.id !== keyId))
    showToast('API key deleted successfully')
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground">
              Manage your API keys and access permissions
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className={cn(
              "inline-flex items-center gap-2",
              "rounded-xl bg-primary px-4 py-2",
              "text-sm font-medium text-primary-foreground",
              "hover:opacity-90 transition-opacity"
            )}
          >
            <Plus className="h-4 w-4" />
            Create New Key
          </button>
        </div>

        {/* API Keys List */}
        <div className="grid gap-6">
          {apiKeys.map((apiKey) => (
            <motion.div
              key={apiKey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-xl border bg-card",
                "transition-all duration-200",
                "hover:shadow-lg hover:shadow-primary/5"
              )}
            >
              <div className="p-4 sm:p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2.5">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{apiKey.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          apiKey.type === "live" 
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        )}>
                          {apiKey.type === "live" ? "Production" : "Development"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedKey(apiKey)
                        setIsSettingsOpen(true)
                      }}
                      className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <Settings className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedKey(apiKey)
                        setShowDeleteConfirm(true)
                      }}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* API Key Display */}
                <APIKeyDisplay 
                  apiKey={apiKey}
                  showKey={showKey[apiKey.id]}
                  onToggleShow={() => setShowKey(prev => ({
                    ...prev,
                    [apiKey.id]: !prev[apiKey.id]
                  }))}
                  onCopy={copyToClipboard}
                />

                {/* Stats */}
                <KeyStats apiKey={apiKey} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Documentation Link */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">API Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to integrate our API into your applications
              </p>
              <a
                href="/docs/api"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
              >
                View Documentation
                <Code className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add Create Key Modal */}
      <CreateKeyModal 
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onCreateKey={handleCreateKey}
      />

      {/* Add Settings Modal */}
      {selectedKey && (
        <KeySettingsModal
          apiKey={selectedKey}
          isOpen={isSettingsOpen}
          onClose={() => {
            setIsSettingsOpen(false)
            setSelectedKey(null)
          }}
          onUpdate={handleUpdateKey}
          onDelete={handleDeleteKey}
        />
      )}

      {/* Add Toast Notification */}
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

      {/* Add Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && selectedKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowDeleteConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-xl bg-card p-6 shadow-xl"
            >
              <h3 className="text-lg font-semibold mb-2">Delete API Key</h3>
              <p className="text-muted-foreground mb-4">
                Are you sure you want to delete this API key? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteKey(selectedKey.id)
                    setShowDeleteConfirm(false)
                    setSelectedKey(null)
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
} 