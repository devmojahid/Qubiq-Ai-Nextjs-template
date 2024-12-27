"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, Clock, Search, Trash2,
  Pin, MoreVertical, ChevronRight,
  Eye, Download, Share2, Browser,
  Clock4, Calendar, Layout, Heart,
  Code2, FileCode, Smartphone, ScreenShare,
  Palette, Layers, Filter, MonitorPlay
} from "lucide-react"
import { cn } from "@/lib/utils"

const sampleHistory = [
  {
    id: 1,
    title: "E-commerce Landing Page",
    prompt: "Create a modern e-commerce landing page with product showcase...",
    preview: {
      desktop: "/images/dashboard/ecommerce-desktop.jpg",
      tablet: "/images/dashboard/ecommerce-tablet.jpg",
      mobile: "/images/dashboard/ecommerce-mobile.jpg"
    },
    framework: "Next.js",
    style: "Modern",
    components: ["Header", "Hero", "Products", "Features", "Footer"],
    timestamp: "2024-03-10T10:30:00Z",
    isPinned: true,
    isFavorite: true
  },
  {
    id: 2,
    title: "Portfolio Website",
    prompt: "Generate a creative portfolio website with project gallery...",
    preview: {
      desktop: "/images/dashboard/portfolio-desktop.jpg",
      tablet: "/images/dashboard/portfolio-tablet.jpg",
      mobile: "/images/dashboard/portfolio-mobile.jpg"
    },
    framework: "React",
    style: "Minimal",
    components: ["Navigation", "About", "Projects", "Contact"],
    timestamp: "2024-03-09T15:20:00Z",
    isPinned: false,
    isFavorite: false
  }
]

export function WebsiteHistory({ showHistory, onToggleHistory, onSelectWebsite }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all") // all, pinned, favorites
  const [hoveredId, setHoveredId] = useState(null)
  const [viewMode, setViewMode] = useState("desktop")

  const filteredHistory = sampleHistory
    .filter(website => {
      if (filter === "pinned") return website.isPinned
      if (filter === "favorites") return website.isFavorite
      return true
    })
    .filter(website => 
      !searchQuery || 
      website.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.framework.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.style.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Website History
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilter(filter === "all" ? "pinned" : "all")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2 py-1",
                    "text-xs font-medium transition-colors",
                    filter !== "all"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/80 hover:bg-secondary"
                  )}
                >
                  <Filter className="h-3 w-3" />
                  {filter === "all" ? "All" : "Pinned"}
                </button>
                <button
                  onClick={() => setViewMode(viewMode === "desktop" ? "mobile" : "desktop")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2 py-1",
                    "text-xs font-medium bg-secondary/80 hover:bg-secondary",
                    "transition-colors"
                  )}
                >
                  {viewMode === "desktop" ? (
                    <ScreenShare className="h-3 w-3" />
                  ) : (
                    <Smartphone className="h-3 w-3" />
                  )}
                  {viewMode === "desktop" ? "Desktop" : "Mobile"}
                </button>
              </div>
            </div>
            <div className="mt-2 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search website history..."
                className={cn(
                  "w-full rounded-lg bg-secondary/50 px-4 py-2 pl-10",
                  "text-sm placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  "transition-all duration-200"
                )}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* History List */}
          <div className="max-h-[600px] overflow-y-auto">
            <div className="grid gap-2 p-2">
              {filteredHistory.map((website) => (
                <motion.div
                  key={website.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setHoveredId(website.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "group relative rounded-lg overflow-hidden",
                    "border bg-card transition-all duration-200",
                    hoveredId === website.id && "border-primary/50"
                  )}
                >
                  {/* Website Preview */}
                  <div className="p-3 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2">
                          {website.title}
                          {website.isPinned && (
                            <Pin className="h-3 w-3 text-primary" />
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {website.prompt}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {}}
                          className={cn(
                            "rounded-lg p-1.5",
                            "text-muted-foreground hover:text-primary",
                            "transition-colors"
                          )}
                        >
                          <Heart 
                            className={cn(
                              "h-4 w-4",
                              website.isFavorite && "fill-current text-primary"
                            )} 
                          />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {}}
                          className="rounded-lg p-1.5 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Preview Image */}
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/20">
                      <img
                        src={website.preview[viewMode]}
                        alt={website.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onSelectWebsite(website)}
                            className="rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Layout className="h-3 w-3" />
                          <span>{website.framework}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Palette className="h-3 w-3" />
                          <span>{website.style}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {}}
                          className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
                        >
                          <Share2 className="h-3 w-3" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {}}
                          className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
                        >
                          <Code2 className="h-3 w-3" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {}}
                          className="rounded-lg p-1.5 hover:bg-secondary transition-colors text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </motion.button>
                      </div>
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