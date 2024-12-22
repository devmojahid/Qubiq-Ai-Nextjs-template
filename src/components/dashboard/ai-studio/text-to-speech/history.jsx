"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  SpeakerWave, Clock, Search, Trash2,
  Pin, MoreVertical, ChevronRight,
  Play, Download, Share2, FileAudio,
  Clock4, Calendar, Languages, Type,
  Volume2, VolumeX, Filter, Headphones,
  Music, MessageSquare, AudioWaveform
} from "lucide-react"
import { cn } from "@/lib/utils"

const sampleHistory = [
  {
    id: 1,
    title: "Marketing Script",
    text: "Welcome to our new product launch! We're excited to share...",
    duration: "00:45",
    voice: "alloy",
    language: "English",
    quality: "high",
    timestamp: "2024-03-10T10:30:00Z",
    audioUrl: "/audio/marketing-1.mp3",
    isPinned: true,
    settings: {
      model: "tts-1-hd",
      speed: 1.0,
      pitch: 1.0
    }
  },
  {
    id: 2,
    title: "Product Description",
    text: "Introducing our latest innovation in AI technology...",
    duration: "01:15",
    voice: "echo",
    language: "English",
    quality: "high",
    timestamp: "2024-03-09T15:20:00Z",
    audioUrl: "/audio/product-1.mp3",
    isPinned: false,
    settings: {
      model: "tts-1",
      speed: 1.2,
      pitch: 1.1
    }
  }
]

export function TextToSpeechHistory({ showHistory, onToggleHistory, onSelectAudio }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all") // all, pinned, recent
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  const filteredHistory = sampleHistory
    .filter(item => {
      if (filter === "pinned") return item.isPinned
      return true
    })
    .filter(item => 
      !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handlePlayAudio = (audioUrl, id) => {
    if (currentAudio) {
      currentAudio.pause()
      if (currentAudio.src === audioUrl) {
        setIsPlaying(false)
        setCurrentAudio(null)
        return
      }
    }

    const audio = new Audio(audioUrl)
    audio.onended = () => {
      setIsPlaying(false)
      setCurrentAudio(null)
    }
    audio.play()
    setCurrentAudio(audio)
    setIsPlaying(true)
  }

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
                <FileAudio className="h-4 w-4 text-primary" />
                Generated Audio History
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
              </div>
            </div>

            {/* Search */}
            <div className="mt-2 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search generated audio..."
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
              {filteredHistory.map((item) => (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectAudio(item)}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "group relative rounded-lg overflow-hidden",
                    "border bg-card cursor-pointer",
                    "hover:border-primary/50 transition-all duration-200"
                  )}
                >
                  <div className="p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium flex items-center gap-2">
                          {item.title}
                          {item.isPinned && (
                            <Pin className="h-3 w-3 text-primary" />
                          )}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock4 className="h-3 w-3" />
                            <span>{item.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Languages className="h-3 w-3" />
                            <span>{item.language}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <AudioWaveform className="h-3 w-3" />
                            <span>{item.quality}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlayAudio(item.audioUrl, item.id)
                          }}
                          className={cn(
                            "rounded-lg p-2",
                            "bg-primary/10 text-primary",
                            "hover:bg-primary/20 transition-colors"
                          )}
                        >
                          {currentAudio?.src === item.audioUrl && isPlaying ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Preview Text */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.text}
                    </p>

                    {/* AudioWaveform Visualization */}
                    <div className="relative h-8 bg-secondary/20 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {Array.from({ length: 50 }, (_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-0.5 mx-px bg-primary/40 rounded-full",
                              "transition-all duration-200",
                              currentAudio?.src === item.audioUrl && isPlaying && "animate-pulse"
                            )}
                            style={{ 
                              height: `${Math.random() * 100}%`,
                              animationDelay: `${i * 50}ms`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle download
                          }}
                          className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
                        >
                          <Download className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle share
                          }}
                          className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
                        >
                          <Share2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle delete
                          }}
                          className="rounded-lg p-1.5 hover:bg-secondary transition-colors text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
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