"use client"

import { motion } from "framer-motion"
import { 
  History, Star, Clock, Calendar,
  FileText, MessageSquare, Mail, PenTool,
  Presentation, ShoppingBag, BookOpen, Megaphone,
  Code2, ScrollText, Newspaper
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample history data (in a real app, this would come from an API/database)
export const recentHistory = [
  {
    id: 1,
    title: "Marketing Campaign Copy",
    preview: "Create a compelling marketing campaign for our new AI-powered platform that highlights...",
    content: "Create a compelling marketing campaign for our new AI-powered platform that highlights its innovative features, user-friendly interface, and transformative benefits. Focus on how it helps businesses streamline their operations and boost productivity.",
    template: {
      id: "marketing",
      name: "Marketing",
      icon: Megaphone
    },
    timestamp: "2024-02-15T10:30:00Z",
    stats: {
      words: 1250,
      characters: 6800,
      model: "gpt-4"
    },
    starred: true
  },
  {
    id: 2,
    title: "Technical Documentation",
    preview: "Write comprehensive API documentation for the new authentication endpoints...",
    content: "Write comprehensive API documentation for the new authentication endpoints, including request/response formats, error handling, and security considerations. Include practical examples and best practices.",
    template: {
      id: "technical",
      name: "Technical",
      icon: Code2
    },
    timestamp: "2024-02-15T09:15:00Z",
    stats: {
      words: 850,
      characters: 4200,
      model: "gpt-4"
    },
    starred: false
  },
  {
    id: 3,
    title: "Blog Post: AI Trends",
    preview: "Write an engaging blog post about the top AI trends in 2024, focusing on...",
    content: "Write an engaging blog post about the top AI trends in 2024, focusing on practical applications in business, emerging technologies, and their impact on various industries. Include real-world examples and expert insights.",
    template: {
      id: "blog",
      name: "Blog Post",
      icon: FileText
    },
    timestamp: "2024-02-15T08:00:00Z",
    stats: {
      words: 1500,
      characters: 7500,
      model: "gpt-4"
    },
    starred: true
  },
  {
    id: 4,
    title: "Product Description",
    preview: "Create a compelling product description for our new smart home device...",
    content: "Create a compelling product description for our new smart home device that emphasizes its unique features, benefits, and how it integrates seamlessly with existing home automation systems. Focus on both technical specifications and user benefits.",
    template: {
      id: "product",
      name: "Product",
      icon: ShoppingBag
    },
    timestamp: "2024-02-14T16:45:00Z",
    stats: {
      words: 600,
      characters: 3000,
      model: "gpt-3.5"
    },
    starred: false
  },
  {
    id: 5,
    title: "Email Campaign",
    preview: "Draft a series of follow-up emails for our enterprise software launch...",
    content: "Draft a series of follow-up emails for our enterprise software launch, targeting decision-makers in large organizations. Focus on value proposition, ROI, and addressing common pain points in workflow automation.",
    template: {
      id: "email",
      name: "Email",
      icon: Mail
    },
    timestamp: "2024-02-14T15:30:00Z",
    stats: {
      words: 750,
      characters: 3800,
      model: "gpt-4"
    },
    starred: true
  }
]

export function RecentHistory({ onSelectHistory, showHistory, onToggleHistory }) {
  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl border bg-card p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          Recent Generations
        </h3>
        <button
          onClick={() => onToggleHistory(!showHistory)}
          className="text-sm text-primary hover:underline"
        >
          {showHistory ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="space-y-4">
        {(showHistory ? recentHistory : recentHistory.slice(0, 3)).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <motion.button
              onClick={() => onSelectHistory(item)}
              className={cn(
                "w-full rounded-xl p-4 text-left transition-all",
                "border border-border/50",
                "hover:border-primary/50 hover:shadow-md",
                "bg-card/50 hover:bg-card"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "rounded-lg p-2.5",
                  "bg-primary/10"
                )}>
                  {item.template?.icon && (
                    <item.template.icon className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{item.title}</h4>
                    {item.starred && (
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.preview}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatTimeAgo(item.timestamp)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      {item.stats.words} words
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Quick Actions */}
            <div className={cn(
              "absolute right-2 top-2",
              "flex items-center gap-1",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity"
            )}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-lg p-1.5",
                  "bg-secondary/80 hover:bg-secondary",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors"
                )}
              >
                <Star className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button */}
      {!showHistory && recentHistory.length > 3 && (
        <motion.button
          onClick={() => onToggleHistory(true)}
          className={cn(
            "w-full rounded-lg p-3 text-center",
            "border border-dashed border-border/50",
            "text-sm text-muted-foreground",
            "hover:border-primary/50 hover:text-primary",
            "transition-colors"
          )}
        >
          View {recentHistory.length - 3} more items
        </motion.button>
      )}
    </motion.div>
  )
} 