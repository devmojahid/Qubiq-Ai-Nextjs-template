"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Video, Clock, Search, Trash2,
  Pin, MoreVertical, ChevronRight,
  Play, Download, Share2, Film,
  Clock4, Calendar, MonitorPlay
} from "lucide-react"
import { cn } from "@/lib/utils"

const sampleHistory = [
  {
    id: 1,
    title: "Product Showcase Video",
    prompt: "Create a modern product showcase video with smooth transitions...",
    thumbnail: "https://source.unsplash.com/random/1920x1080?product",
    duration: "00:30",
    resolution: "1080p",
    timestamp: "2024-03-10T10:30:00Z",
    isPinned: true
  },
  {
    id: 2,
    title: "Social Media Ad",
    prompt: "Generate a dynamic social media advertisement with...",
    thumbnail: "https://source.unsplash.com/random/1920x1080?social",
    duration: "00:15",
    resolution: "1080p",
    timestamp: "2024-03-09T15:20:00Z",
    isPinned: false
  }
]

export function VideoHistory({ showHistory, onToggleHistory, onSelectVideo }) {
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
            <h3 className="font-semibold flex items-center gap-2">
              <Film className="h-4 w-4 text-primary" />
              Video History
            </h3>
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="Search videos..."
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
          <div className="max-h-[600px] overflow-y-auto">
            <div className="grid gap-4 p-4">
              {sampleHistory.map((video) => (
                <motion.div
                  key={video.id}
                  onClick={() => onSelectVideo(video)}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "group relative rounded-lg overflow-hidden",
                    "border bg-card cursor-pointer",
                    "hover:border-primary/50 transition-all duration-200"
                  )}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent",
                      "opacity-0 group-hover:opacity-100 transition-opacity"
                    )}>
                      <div className="absolute bottom-2 left-2 flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="rounded-full bg-white/20 p-2 backdrop-blur-sm"
                        >
                          <Play className="h-4 w-4 text-white" />
                        </motion.button>
                      </div>
                      <div className="absolute bottom-2 right-2 flex items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="rounded-full bg-white/20 p-2 backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle download
                          }}
                        >
                          <Download className="h-4 w-4 text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="rounded-full bg-white/20 p-2 backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle share
                          }}
                        >
                          <Share2 className="h-4 w-4 text-white" />
                        </motion.button>
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className={cn(
                      "absolute top-2 right-2",
                      "rounded-full bg-black/60 px-2 py-1",
                      "text-xs text-white backdrop-blur-sm"
                    )}>
                      {video.duration}
                    </div>
                    {/* Resolution Badge */}
                    <div className={cn(
                      "absolute top-2 left-2",
                      "rounded-full bg-black/60 px-2 py-1",
                      "text-xs text-white backdrop-blur-sm"
                    )}>
                      {video.resolution}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-3 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium line-clamp-1">
                        {video.title}
                      </h4>
                      {video.isPinned && (
                        <Pin className="h-3 w-3 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.prompt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock4 className="h-3 w-3" />
                        <span>
                          {new Date(video.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MonitorPlay className="h-3 w-3" />
                        <span>AI Generated</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className={cn(
                    "absolute top-2 right-2",
                    "flex items-center gap-1",
                    "opacity-0 group-hover:opacity-100 transition-opacity"
                  )}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle delete
                      }}
                      className="rounded-full bg-red-500/20 p-2 text-red-500 backdrop-blur-sm
                               hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle more options
                      }}
                      className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </motion.button>
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