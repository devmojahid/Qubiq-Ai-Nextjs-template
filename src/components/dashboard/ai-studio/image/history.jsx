"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  History, Star, Clock, Calendar,
  ImageIcon, Download, Share2, Trash2,
  Paintbrush, Wand2, Settings, Maximize2, X
} from "lucide-react"
import { cn } from "@/lib/utils"

// Sample history data (in a real app, this would come from an API/database)
const historyItems = [
  {
    id: 1,
    prompt: "A futuristic cityscape at sunset with flying cars",
    preview: "/images/dashboard/generated-images/recent/4.jpg",
    style: "Digital Art",
    timestamp: "2024-02-15T10:30:00Z",
    settings: {
      model: "stable-diffusion-xl",
      width: 1024,
      height: 1024,
      steps: 30
    },
    starred: true
  },
  {
    id: 2,
    prompt: "A magical forest with glowing mushrooms and fairies",
    preview: "/images/dashboard/generated-images/recent/5.jpg",
    style: "Fantasy",
    timestamp: "2024-02-15T09:15:00Z",
    settings: {
      model: "stable-diffusion-xl",
      width: 1024,
      height: 768,
      steps: 40
    },
    starred: false
  },
  {
    id: 3,
    prompt: "Abstract fluid art in vibrant colors",
    preview: "/images/dashboard/generated-images/recent/1.jpg",
    style: "Abstract",
    timestamp: "2024-02-15T08:00:00Z",
    settings: {
      model: "stable-diffusion-2.1",
      width: 1024,
      height: 1024,
      steps: 25
    },
    starred: true
  },
  {
    id: 4,
    prompt: "A photorealistic portrait of a cyberpunk character",
    preview: "/images/dashboard/generated-images/recent/2.jpg",
    style: "Photorealistic",
    timestamp: "2024-02-14T16:45:00Z",
    settings: {
      model: "stable-diffusion-xl",
      width: 768,
      height: 1024,
      steps: 35
    },
    starred: false
  },
  {
    id: 5,
    prompt: "Japanese anime style character in a garden",
    preview: "/images/dashboard/generated-images/recent/3.jpg",
    style: "Anime",
    timestamp: "2024-02-14T15:30:00Z",
    settings: {
      model: "stable-diffusion-2.1",
      width: 1024,
      height: 1024,
      steps: 30
    },
    starred: true
  }
]

export function ImageHistory({ showHistory, onToggleHistory, onSelectImage, isMobile }) {
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
      className="rounded-xl p-6 space-y-6"
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
        {(showHistory ? historyItems : historyItems.slice(0, 3)).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <motion.button
              onClick={() => onSelectImage(item)}
              className={cn(
                "w-full rounded-xl p-3 text-left transition-all",
                "border border-border/50",
                "hover:border-primary/50 hover:shadow-md",
                "bg-card/50 hover:bg-card"
              )}
            >
              <div className="flex gap-3">
                {/* Image Preview */}
                <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-border/50">
                  <img
                    src={item.preview}
                    alt={item.prompt}
                    className="h-full w-full object-cover"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent",
                    "opacity-0 group-hover:opacity-100 transition-opacity"
                  )} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{item.prompt}</h4>
                    {item.starred && (
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Paintbrush className="h-3.5 w-3.5" />
                      {item.style}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatTimeAgo(item.timestamp)}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Settings className="h-3.5 w-3.5" />
                      {item.settings.width}×{item.settings.height}
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
                <Download className="h-3.5 w-3.5" />
              </motion.button>
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
                <Share2 className="h-3.5 w-3.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-lg p-1.5",
                  "bg-red-500/10 hover:bg-red-500/20",
                  "text-red-500",
                  "transition-colors"
                )}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button */}
      {!showHistory && historyItems.length > 3 && (
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
          View {historyItems.length - 3} more items
        </motion.button>
      )}

      {isMobile ? (
        <AnimatePresence>
          {showHistory && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[48] lg:hidden bg-black/50 backdrop-blur-sm"
                onClick={() => onToggleHistory(false)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                className="fixed inset-x-0 bottom-0 z-[49] rounded-t-xl bg-background shadow-xl"
                style={{ maxHeight: "85vh" }}
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
                  <h3 className="font-semibold flex items-center gap-2">
                    <History className="h-4 w-4 text-primary" />
                    Generation History
                  </h3>
                  <button
                    onClick={() => onToggleHistory(false)}
                    className="p-2 hover:bg-secondary/80 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(85vh - 64px)" }}>
                  <div className="space-y-4">
                    {historyItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                      >
                        <motion.button
                          onClick={() => onSelectImage(item)}
                          className={cn(
                            "w-full rounded-xl p-3 text-left transition-all",
                            "border border-border/50",
                            "hover:border-primary/50 hover:shadow-md",
                            "bg-card/50 hover:bg-card"
                          )}
                        >
                          <div className="flex gap-3">
                            {/* Image Preview */}
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-border/50">
                              <img
                                src={item.preview}
                                alt={item.prompt}
                                className="h-full w-full object-cover"
                              />
                              <div className={cn(
                                "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent",
                                "opacity-0 group-hover:opacity-100 transition-opacity"
                              )} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium truncate">{item.prompt}</h4>
                                {item.starred && (
                                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                                )}
                              </div>
                              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Paintbrush className="h-3.5 w-3.5" />
                                  {item.style}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5" />
                                  {formatTimeAgo(item.timestamp)}
                                </span>
                                <span className="hidden sm:flex items-center gap-1">
                                  <Settings className="h-3.5 w-3.5" />
                                  {item.settings.width}×{item.settings.height}
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
                            <Download className="h-3.5 w-3.5" />
                          </motion.button>
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
                            <Share2 className="h-3.5 w-3.5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                              "rounded-lg p-1.5",
                              "bg-red-500/10 hover:bg-red-500/20",
                              "text-red-500",
                              "transition-colors"
                            )}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      ) : (
        // Desktop version
        <motion.div className="rounded-xl bg-card">
          {/* ... existing history content ... */}
        </motion.div>
      )}
    </motion.div>
  )
} 