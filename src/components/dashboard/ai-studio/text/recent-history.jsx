"use client"

import { motion } from "framer-motion"
import { History, Clock, FileText, Trash2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function RecentHistory({ 
  showHistory, 
  onToggleHistory, 
  isMobile, 
  onClose,
  onSelectHistory 
}) {
  // Sample history data - replace with real data
  const history = [
    {
      id: 1,
      title: "Product Description",
      preview: "A sleek and modern smartwatch...",
      timestamp: "2 hours ago",
      template: { name: "Product" }
    },
    {
      id: 2,
      title: "Blog Post",
      preview: "The future of AI technology...",
      timestamp: "3 hours ago",
      template: { name: "Blog" }
    },
    {
      id: 3,
      title: "Marketing Copy",
      preview: "Introducing our revolutionary...",
      timestamp: "5 hours ago",
      template: { name: "Marketing" }
    }
  ]

  const handleToggle = () => {
    if (typeof onToggleHistory === 'function') {
      onToggleHistory(!showHistory);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ 
        opacity: showHistory ? 1 : 0,
        scale: showHistory ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.2,
        ease: "easeInOut"
      }}
      className={cn(
        "rounded-xl border bg-card",
        "transition-all duration-200",
        isMobile ? "h-[calc(100vh-16rem)] overflow-y-auto" : "",
        !showHistory && !isMobile && "hidden"
      )}
    >
      <div className="border-b p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
            <History className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            Recent Generations
          </h3>
          {!isMobile && (
            <button
              onClick={handleToggle}
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
            >
              <span>{showHistory ? "Hide" : "Show"}</span>
              <ChevronDown className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                showHistory && "rotate-180"
              )} />
            </button>
          )}
        </div>
      </div>

      <div className={cn(
        "divide-y",
        isMobile ? "" : "max-h-[calc(100vh-24rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800",
        showHistory ? "opacity-100" : "opacity-0"
      )}>
        {history.map((item) => (
          <div
            key={item.id}
            className="p-3 sm:p-4 hover:bg-muted/50 transition-colors"
          >
            <button
              onClick={() => onSelectHistory(item)}
              className="w-full text-left space-y-1"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium line-clamp-1">
                  {item.title}
                </h4>
                <span className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.timestamp}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {item.preview}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-secondary/50 px-2 py-0.5 rounded-full">
                  {item.template.name}
                </span>
              </div>
            </button>
          </div>
        ))}

        {history.length === 0 && (
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">No history yet</p>
          </div>
        )}
      </div>

      {/* Mobile Close Button */}
      {isMobile && (
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2",
              "bg-primary text-primary-foreground",
              "px-4 py-2 rounded-lg text-sm font-medium",
              "transition-colors hover:bg-primary/90"
            )}
          >
            Close History
          </button>
        </div>
      )}
    </motion.div>
  )
} 