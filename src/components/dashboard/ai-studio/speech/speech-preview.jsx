"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, Copy, Download, Share2, 
  Check, Languages, Clock, FileAudio,
  Play, Pause, Volume2, VolumeX,
  Edit, Save, X, MessageSquare,
  Waves, SpeakerWave, Sparkles,
  Type, Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

export function SpeechPreview({ 
  text, 
  isProcessing, 
  audioBlob,
  settings 
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(text)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isCopied, setIsCopied] = useState(false)
  const [showTimestamps, setShowTimestamps] = useState(true)
  const audioRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    setEditedText(text)
  }, [text])

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleDownload = () => {
    // Create text file
    const blob = new Blob([editedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transcription.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Transcription',
          text: editedText,
          files: [audioBlob].filter(Boolean)
        })
      } else {
        await navigator.clipboard.writeText(editedText)
        alert('Text copied to clipboard!')
      }
    } catch (error) {
      console.error('Failed to share:', error)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  if (isProcessing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border bg-card p-8"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
            <div className="relative rounded-full bg-primary/10 p-4">
              <Waves className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Processing Audio</h3>
            <p className="text-sm text-muted-foreground">
              Converting speech to text using {settings.model}...
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Transcribing audio</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="font-medium">Transcription</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Languages className="h-4 w-4" />
                <span>{settings.language}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={cn(
                "rounded-lg p-2",
                "text-muted-foreground hover:text-foreground",
                "transition-colors"
              )}
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={handleDownload}
              className={cn(
                "rounded-lg p-2",
                "text-muted-foreground hover:text-foreground",
                "transition-colors"
              )}
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={handleShare}
              className={cn(
                "rounded-lg p-2",
                "text-muted-foreground hover:text-foreground",
                "transition-colors"
              )}
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Text Content */}
        <div className="relative">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className={cn(
                "w-full min-h-[200px] rounded-lg p-4",
                "bg-secondary/50 resize-none",
                "focus:outline-none focus:ring-2 focus:ring-primary/20"
              )}
            />
          ) : (
            <div className="relative min-h-[200px] rounded-lg bg-secondary/50 p-4">
              <pre className="whitespace-pre-wrap font-sans">{editedText}</pre>
            </div>
          )}

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
              "absolute top-2 right-2 rounded-lg p-2",
              "bg-secondary/80 text-muted-foreground",
              "hover:bg-secondary hover:text-foreground",
              "transition-colors"
            )}
          >
            {isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <Edit className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Audio Player */}
        {audioBlob && (
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                className={cn(
                  "rounded-lg p-2",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 transition-opacity"
                )}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>

              {/* Progress Bar */}
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const time = parseFloat(e.target.value)
                    if (audioRef.current) {
                      audioRef.current.currentTime = time
                    }
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src={URL.createObjectURL(audioBlob)}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          </div>
        )}

        {/* Additional Features */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowTimestamps(!showTimestamps)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5",
                "bg-secondary/80 hover:bg-secondary",
                "transition-colors"
              )}
            >
              <Clock className="h-4 w-4" />
              {showTimestamps ? "Hide" : "Show"} Timestamps
            </button>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Accuracy: {settings.quality === 'high' ? '98%' : '95%'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 