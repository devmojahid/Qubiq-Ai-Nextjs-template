"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Music, Clock, Search, Trash2,
  Pin, MoreVertical, ChevronRight,
  Play, Download, Share2, Music2,
  Clock4, Calendar, AudioWaveform, Heart,
  Volume2, VolumeX, Pause, Filter,
  Settings,
  FileMusic,
  Headphones,
  Radio
} from "lucide-react"
import { cn } from "@/lib/utils"

const sampleHistory = [
  {
    id: 1,
    title: "Ambient Background Music",
    prompt: "Create a calming ambient background music with soft synths...",
    thumbnail: generateWaveformThumbnail(),
    duration: "02:30",
    format: "WAV",
    sampleRate: "44.1kHz",
    timestamp: "2024-03-10T10:30:00Z",
    isPinned: true,
    isPlaying: false,
    isFavorite: true
  },
  {
    id: 2,
    title: "Upbeat Electronic Track",
    prompt: "Generate an energetic electronic music track with...",
    thumbnail: generateWaveformThumbnail(),
    duration: "01:45",
    format: "MP3",
    sampleRate: "48kHz",
    timestamp: "2024-03-09T15:20:00Z",
    isPinned: false,
    isPlaying: false,
    isFavorite: false
  }
]

function generateWaveformThumbnail() {
  // Generate a simple waveform pattern for thumbnails
  return Array.from({ length: 50 }, () => Math.random() * 100)
}

export function AudioHistory({ showHistory, onToggleHistory, onSelectAudio }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all") // all, pinned, favorites
  const [playingId, setPlayingId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const audioRef = useRef(null)

  const filteredHistory = sampleHistory
    .filter(audio => {
      if (filter === "pinned") return audio.isPinned
      if (filter === "favorites") return audio.isFavorite
      return true
    })
    .filter(audio => 
      !searchQuery || 
      audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const handlePlay = async (audioId) => {
    try {
      if (playingId === audioId) {
        audioRef.current?.pause()
        setPlayingId(null)
      } else {
        const audio = sampleHistory.find(a => a.id === audioId)
        if (audioRef.current && audio) {
          // Add multiple audio sources for better compatibility
          const sources = [
            { src: `/audio/${audio.id}.mp3`, type: 'audio/mp3' },
            { src: `/audio/${audio.id}.ogg`, type: 'audio/ogg' },
            { src: `/audio/${audio.id}.wav`, type: 'audio/wav' }
          ]

          // Try loading each source until one works
          for (const source of sources) {
            try {
              audioRef.current.src = source.src
              await audioRef.current.play()
              setPlayingId(audioId)
              break
            } catch (error) {
              console.log(`Failed to load source: ${source.src}`)
              continue
            }
          }
        }
      }
    } catch (error) {
      console.error('Audio playback error:', error)
      // Show user-friendly error message
      alert('Unable to play audio. Please try another format.')
    }
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
                <Music2 className="h-4 w-4 text-primary" />
                Audio History
              </h3>
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
            <div className="mt-2 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audio history..."
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
              {filteredHistory.map((audio) => (
                <motion.div
                  key={audio.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setHoveredId(audio.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    "group relative rounded-lg overflow-hidden",
                    "border bg-card transition-all duration-200",
                    hoveredId === audio.id && "border-primary/50"
                  )}
                >
                  {/* Audio Preview */}
                  <div className="p-3 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2">
                          {audio.title}
                          {audio.isPinned && (
                            <Pin className="h-3 w-3 text-primary" />
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {audio.prompt}
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
                              audio.isFavorite && "fill-current text-primary"
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

                    {/* Waveform */}
                    <div className="relative h-12 bg-secondary/20 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {audio.thumbnail.map((value, index) => (
                          <div
                            key={index}
                            className="w-0.5 mx-px bg-primary/40 rounded-full"
                            style={{ height: `${value}%` }}
                          />
                        ))}
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handlePlay(audio.id)}
                          className="rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {playingId === audio.id ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Clock4 className="h-3 w-3" />
                          <span>{audio.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AudioWaveform className="h-3 w-3" />
                          <span>{audio.format}</span>
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
                          <Download className="h-3 w-3" />
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
          <audio
            ref={audioRef}
            className="hidden"
            onEnded={() => setPlayingId(null)}
            onError={(e) => {
              console.error('Audio error:', e)
              setPlayingId(null)
            }}
          >
            {/* Sources will be set dynamically */}
            Your browser does not support the audio element.
          </audio>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 