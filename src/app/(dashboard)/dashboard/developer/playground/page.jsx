"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code2, Play, Copy, Download, Share2,
  Save, History, Settings, RefreshCcw,
  Terminal, Braces, FileJson, Database,
  Server, Globe, Lock, Key, AlertCircle,
  CheckCircle2, X, ChevronDown, ChevronRight,
  Loader2, Info
} from "lucide-react"
import { cn } from "@/lib/utils"

const endpoints = [
  {
    id: "text",
    name: "Text Generation",
    path: "/api/v1/generate/text",
    method: "POST",
    description: "Generate human-like text content",
    params: {
      prompt: "Write a story about...",
      maxTokens: 100,
      temperature: 0.7
    }
  },
  {
    id: "image",
    name: "Image Generation",
    path: "/api/v1/generate/image",
    method: "POST",
    description: "Create AI-generated images",
    params: {
      prompt: "A beautiful sunset...",
      size: "1024x1024",
      style: "realistic"
    }
  },
  {
    id: "chat",
    name: "Chat Completion",
    path: "/api/v1/chat/completion",
    method: "POST",
    description: "Interactive chat responses",
    params: {
      messages: [
        { role: "user", content: "Hello!" }
      ],
      temperature: 0.8
    }
  }
]

// Add sample request history data
const sampleHistory = [
  {
    id: "req_001",
    endpoint: {
      id: "text",
      name: "Text Generation",
      path: "/api/v1/generate/text",
      method: "POST"
    },
    params: {
      prompt: "Write a story about space exploration",
      maxTokens: 150,
      temperature: 0.8
    },
    response: {
      status: 200,
      data: {
        result: "In the year 2157, humanity had finally mastered...",
        timestamp: "2024-03-15T14:30:00Z"
      }
    },
    timestamp: "2024-03-15T14:30:00Z"
  },
  {
    id: "req_002",
    endpoint: {
      id: "image",
      name: "Image Generation",
      path: "/api/v1/generate/image",
      method: "POST"
    },
    params: {
      prompt: "A futuristic cityscape at sunset",
      size: "1024x1024",
      style: "realistic"
    },
    response: {
      status: 200,
      data: {
        imageUrl: "https://example.com/image.jpg",
        timestamp: "2024-03-15T15:45:00Z"
      }
    },
    timestamp: "2024-03-15T15:45:00Z"
  }
]

// Update the RequestHistoryModal component
const RequestHistoryModal = ({ isOpen, onClose, history, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEndpoint, setFilterEndpoint] = useState("all")

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      JSON.stringify(item.params).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEndpoint = filterEndpoint === "all" || item.endpoint.id === filterEndpoint
    return matchesSearch && matchesEndpoint
  })

  return (
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
            className="w-full max-w-2xl bg-card border rounded-xl shadow-lg"
          >
            <div className="border-b p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Request History</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl",
                      "bg-secondary/50 border border-border/50",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20"
                    )}
                  />
                </div>
                <select
                  value={filterEndpoint}
                  onChange={(e) => setFilterEndpoint(e.target.value)}
                  className={cn(
                    "px-3 py-2 rounded-xl",
                    "bg-secondary/50 border border-border/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                >
                  <option value="all">All Endpoints</option>
                  {endpoints.map(endpoint => (
                    <option key={endpoint.id} value={endpoint.id}>
                      {endpoint.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 sm:p-6 max-h-[60vh] overflow-auto">
              {filteredHistory.length > 0 ? (
                <div className="space-y-4">
                  {filteredHistory.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl border bg-secondary/50 cursor-pointer"
                      onClick={() => {
                        onSelect(item)
                        onClose()
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            item.endpoint.id === "text" && "bg-blue-500/10",
                            item.endpoint.id === "image" && "bg-purple-500/10",
                            item.endpoint.id === "chat" && "bg-green-500/10"
                          )}>
                            <Code2 className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{item.endpoint.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(item.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-medium",
                            item.response?.status === 200
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          )}>
                            Status: {item.response?.status || 'N/A'}
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No matching requests found
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function APIPlaygroundPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [params, setParams] = useState(endpoints[0].params)
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const editorRef = useRef(null)
  const [requestHistory, setRequestHistory] = useState(sampleHistory)
  const [showEndpointInfo, setShowEndpointInfo] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleTest = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      const response = {
        status: 200,
        data: {
          result: "Sample response data...",
          timestamp: new Date().toISOString()
        }
      }
      setResponse(response)
      
      // Save to history
      const newHistoryItem = {
        id: `req_${Date.now()}`,
        endpoint: selectedEndpoint,
        params,
        response,
        timestamp: new Date().toISOString()
      }
      setRequestHistory([newHistoryItem, ...requestHistory])
    } catch (error) {
      const errorResponse = {
        status: 500,
        error: "Failed to process request"
      }
      setResponse(errorResponse)
      
      // Save failed request to history
      const newHistoryItem = {
        id: `req_${Date.now()}`,
        endpoint: selectedEndpoint,
        params,
        response: errorResponse,
        timestamp: new Date().toISOString()
      }
      setRequestHistory([newHistoryItem, ...requestHistory])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormatJSON = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(editorRef.current.value), null, 2)
      editorRef.current.value = formatted
      setParams(JSON.parse(formatted))
    } catch (error) {
      // Handle invalid JSON
    }
  }

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleSaveRequest = () => {
    const newHistoryItem = {
      endpoint: selectedEndpoint,
      params,
      timestamp: new Date().toISOString()
    }
    setRequestHistory([newHistoryItem, ...requestHistory])
  }

  const renderEndpointSelection = () => (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Select Endpoint</h2>
          <button
            onClick={() => setShowEndpointInfo(!showEndpointInfo)}
            className="p-2 rounded-lg hover:bg-secondary/80"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {endpoints.map(endpoint => (
            <motion.button
              key={endpoint.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedEndpoint(endpoint)
                setParams(endpoint.params)
              }}
              className={cn(
                "p-4 rounded-xl border text-left",
                "transition-colors duration-200",
                selectedEndpoint.id === endpoint.id
                  ? "bg-primary/10 border-primary"
                  : "bg-card hover:bg-secondary/50"
              )}
            >
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg",
                  endpoint.id === "text" && "bg-blue-500/10",
                  endpoint.id === "image" && "bg-purple-500/10",
                  endpoint.id === "chat" && "bg-green-500/10"
                )}>
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{endpoint.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {endpoint.path}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {showEndpointInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-secondary/50 space-y-2"
          >
            <div className="font-medium">{selectedEndpoint.name}</div>
            <div className="text-sm text-muted-foreground">
              {selectedEndpoint.description}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={cn(
                "px-2 py-1 rounded-md font-mono",
                "bg-primary/10 text-primary"
              )}>
                {selectedEndpoint.method}
              </div>
              <div className="text-muted-foreground">
                {selectedEndpoint.path}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              API Playground
            </h1>
            <p className="text-muted-foreground">
              Test and explore API endpoints interactively
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "p-2 rounded-xl",
                "bg-secondary/50 border border-border/50",
                "hover:bg-secondary/80 transition-colors"
              )}
            >
              <History className="h-4 w-4" />
            </button>
            <button
              onClick={() => {/* Save current request */}}
              className={cn(
                "p-2 rounded-xl",
                "bg-secondary/50 border border-border/50",
                "hover:bg-secondary/80 transition-colors"
              )}
            >
              <Save className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Request Panel */}
          <div className="space-y-6">
            {renderEndpointSelection()}

            {/* Parameters Editor */}
            <div className="rounded-xl border bg-card overflow-hidden">
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Request Parameters</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFormatJSON}
                      className="p-2 rounded-lg hover:bg-secondary/80"
                    >
                      <Braces className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(JSON.stringify(params, null, 2))}
                      className="p-2 rounded-lg hover:bg-secondary/80"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <textarea
                  ref={editorRef}
                  value={JSON.stringify(params, null, 2)}
                  onChange={(e) => {
                    try {
                      setParams(JSON.parse(e.target.value))
                    } catch (error) {
                      // Handle invalid JSON
                    }
                  }}
                  className={cn(
                    "w-full h-[300px] p-4 rounded-xl font-mono text-sm",
                    "bg-secondary/50 border border-border/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20",
                    "resize-none"
                  )}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleTest}
                disabled={isLoading}
                className={cn(
                  "flex-1 px-4 py-2 rounded-xl",
                  "bg-primary text-primary-foreground",
                  "font-medium",
                  "hover:opacity-90 transition-opacity",
                  "flex items-center justify-center gap-2"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Test Endpoint
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Response Panel */}
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Response</h2>
                {response && (
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium",
                      response.status === 200
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    )}>
                      Status: {response.status}
                    </div>
                    <button
                      onClick={() => handleCopy(JSON.stringify(response, null, 2))}
                      className="p-2 rounded-lg hover:bg-secondary/80"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <pre className={cn(
                "w-full h-[400px] p-4 rounded-xl font-mono text-sm",
                "bg-secondary/50 border border-border/50",
                "overflow-auto"
              )}>
                {response ? JSON.stringify(response, null, 2) : "No response yet"}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Add RequestHistoryModal */}
      <RequestHistoryModal 
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={requestHistory}
        onSelect={(item) => {
          setSelectedEndpoint(item.endpoint)
          setParams(item.params)
        }}
      />

      {/* Add copy success toast */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn(
              "fixed bottom-4 right-4 z-50",
              "px-4 py-2 rounded-xl",
              "bg-green-500 text-white",
              "shadow-lg"
            )}
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 