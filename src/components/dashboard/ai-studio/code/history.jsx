"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  History, Star, Clock, Calendar,
  Code2, Download, Share2, Trash2,
  FileCode, Braces, Settings, Maximize2,
  ChevronDown, ChevronUp, Languages,
  CheckCircle2, Archive
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample history data (in a real app, this would come from an API/database)
const historyItems = [
  {
    id: 1,
    title: "React Component Generator",
    prompt: "Create a responsive React card component with Tailwind CSS",
    code: `export function Card({ title, description, image }) {
  return (
    <div className="rounded-xl shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}`,
    language: {
      id: "javascript",
      name: "JavaScript",
      icon: Braces
    },
    timestamp: "2024-02-15T10:30:00Z",
    settings: {
      model: "gpt-4",
      temperature: 0.7
    },
    starred: true
  },
  {
    id: 2,
    title: "Python API Endpoint",
    prompt: "Generate a FastAPI endpoint for user authentication",
    code: `@app.post("/auth/login")
async def login(credentials: UserCredentials):
    user = await authenticate_user(credentials)
    if not user:
        raise HTTPException(status_code=401)
    return {"token": create_access_token(user)}`,
    language: {
      id: "python",
      name: "Python",
      icon: Code2
    },
    timestamp: "2024-02-15T09:15:00Z",
    settings: {
      model: "gpt-4",
      temperature: 0.5
    },
    starred: false
  }
]

export function CodeHistory({ showHistory, onToggleHistory, onSelectCode }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [filter, setFilter] = useState("all") // all, starred
  const [searchQuery, setSearchQuery] = useState("")

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  const filteredHistory = historyItems
    .filter(item => {
      if (filter === "starred") return item.starred
      return true
    })
    .filter(item => {
      if (!searchQuery) return true
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl border bg-card overflow-hidden"
    >
      {/* History Header */}
      <div className="p-6 border-b border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            Recent Generations
          </h3>
          
          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "text-sm px-3 py-1 rounded-lg transition-colors",
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter("starred")}
              className={cn(
                "text-sm px-3 py-1 rounded-lg transition-colors",
                filter === "starred"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Starred
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className={cn(
              "w-full px-4 py-2 rounded-lg",
              "bg-background border border-border/50",
              "focus:border-primary focus:ring-1 focus:ring-primary",
              "placeholder:text-muted-foreground"
            )}
          />
        </div>
      </div>

      {/* History Items */}
      <div className="divide-y divide-border/50">
        <AnimatePresence>
          {filteredHistory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group relative"
            >
              <motion.button
                onClick={() => {
                  setSelectedItem(selectedItem === item.id ? null : item.id)
                  onSelectCode(item)
                }}
                className="w-full p-4 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "rounded-lg p-2.5",
                    "bg-gradient-to-br from-primary/10 to-primary/5"
                  )}>
                    <item.language.icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{item.title}</h4>
                      {item.starred && (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.prompt}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Languages className="h-3.5 w-3.5" />
                        {item.language.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatTimeAgo(item.timestamp)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Settings className="h-3.5 w-3.5" />
                        {item.settings.model}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Quick Actions */}
              <div className={cn(
                "absolute right-4 top-4",
                "flex items-center gap-1",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity"
              )}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "rounded-lg p-1.5",
                    "bg-secondary/80 hover:bg-secondary",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors"
                  )}
                >
                  <Download className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "rounded-lg p-1.5",
                    "bg-secondary/80 hover:bg-secondary",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors"
                  )}
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "rounded-lg p-1.5",
                    "bg-red-500/10 hover:bg-red-500/20",
                    "text-red-500",
                    "transition-colors"
                  )}
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="p-8 text-center">
            <Archive className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h4 className="font-medium text-muted-foreground">No items found</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {filter === "starred" 
                ? "You haven't starred any items yet"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        )}
      </div>

      {/* View More Button */}
      {!showHistory && historyItems.length > 3 && (
        <motion.button
          onClick={() => onToggleHistory(true)}
          className={cn(
            "w-full p-4 text-center",
            "border-t border-border/50",
            "text-sm text-muted-foreground",
            "hover:text-foreground hover:bg-secondary/50",
            "transition-colors"
          )}
        >
          View {historyItems.length - 3} more items
        </motion.button>
      )}
    </motion.div>
  )
} 