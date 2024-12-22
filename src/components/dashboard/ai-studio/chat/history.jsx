"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, Clock, Search, Trash2,
  Pin, MoreVertical, ChevronRight, Bot
} from "lucide-react"
import { cn } from "@/lib/utils"

const sampleHistory = [
  {
    id: 1,
    title: "Project Planning Discussion",
    preview: "Let's discuss the roadmap for Q1 2024...",
    timestamp: "2024-03-10T10:30:00Z",
    isPinned: true,
    messages: []
  },
  {
    id: 2,
    title: "Code Review Assistant",
    preview: "Can you help me review this React component?",
    timestamp: "2024-03-09T15:20:00Z",
    isPinned: false,
    messages: []
  }
]

export function ChatHistory({ showHistory, onToggleHistory, onSelectChat }) {
  return (
    <AnimatePresence>
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-xl border bg-card overflow-hidden"
        >
          {/* Header */}
          <div className="border-b p-4">
            <h3 className="font-semibold">Chat History</h3>
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className={cn(
                  "w-full rounded-lg bg-secondary/50 px-4 py-2 pl-10",
                  "text-sm placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20"
                )}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* History List */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            <div className="space-y-1">
              {sampleHistory.map((chat) => (
                <motion.div
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "w-full flex items-start gap-3 rounded-lg p-3 text-left",
                    "hover:bg-secondary/80 group transition-colors",
                    "cursor-pointer"
                  )}
                >
                  <div className={cn(
                    "mt-1 rounded-lg p-2",
                    "bg-primary/10 text-primary"
                  )}>
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">
                        {chat.title}
                      </span>
                      {chat.isPinned && (
                        <Pin className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.preview}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle delete
                      }}
                      className="rounded-lg p-1 hover:bg-secondary cursor-pointer"
                      role="button"
                      tabIndex={0}
                    >
                      <Trash2 className="h-3 w-3" />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle more options
                      }}
                      className="rounded-lg p-1 hover:bg-secondary cursor-pointer"
                      role="button"
                      tabIndex={0}
                    >
                      <MoreVertical className="h-3 w-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 