"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Music, Upload, Mic, Plus, X, 
  FileMusic, Volume2, VolumeX, Trash2,
  Sparkles, Wand2, Loader2, Type,
  Headphones, Radio, Waveform
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AudioInput({ 
  prompt, 
  onPromptChange, 
  isGenerating, 
  onGenerate,
  assets,
  onAssetsChange,
  settings 
}) {
  const [showAssets, setShowAssets] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const fileInputRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const recordingTimerRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    const newAssets = { ...assets }
    Array.from(files).forEach(file => {
      if (file.type.startsWith('audio/')) {
        // Determine the type of audio (reference, vocals, instruments)
        const audioType = determineAudioType(file)
        newAssets[audioType] = {
          file,
          name: file.name,
          url: URL.createObjectURL(file)
        }
      }
    })
    onAssetsChange(newAssets)
  }

  const determineAudioType = (file) => {
    // Logic to determine audio type based on file name or user selection
    if (file.name.toLowerCase().includes('vocal')) return 'vocals'
    if (file.name.toLowerCase().includes('instrument')) return 'instruments'
    return 'reference'
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks = []

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        const file = new File([blob], `recording-${Date.now()}.wav`, { type: 'audio/wav' })
        handleFiles([file])
      }

      mediaRecorder.start()
      mediaRecorderRef.current = mediaRecorder
      setIsRecording(true)

      // Start recording timer
      let time = 0
      recordingTimerRef.current = setInterval(() => {
        time += 1
        setRecordingTime(time)
      }, 1000)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      clearInterval(recordingTimerRef.current)
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      {/* Prompt Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Music className="h-4 w-4 text-primary" />
            Audio Description
          </label>
          <button
            onClick={() => setShowAssets(!showAssets)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-1",
              "text-xs font-medium",
              "transition-colors",
              showAssets
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/80 hover:bg-secondary"
            )}
          >
            <Plus className="h-3 w-3" />
            Add Reference
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Describe the audio you want to generate..."
          rows={3}
          className={cn(
            "w-full rounded-lg bg-secondary/50 p-3",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "resize-none"
          )}
        />
      </div>

      {/* Assets Section */}
      <AnimatePresence>
        {showAssets && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Drag & Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative rounded-lg border-2 border-dashed p-8",
                "flex flex-col items-center justify-center gap-2",
                "transition-colors duration-200",
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-secondary hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              <div className="rounded-full bg-secondary/80 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  Drop your reference audio here
                </p>
                <p className="text-xs text-muted-foreground">
                  Support WAV, MP3, and OGG files
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "rounded-lg px-4 py-2",
                    "bg-secondary/80 text-sm",
                    "hover:bg-secondary transition-colors"
                  )}
                >
                  Choose Files
                </button>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2",
                    "bg-secondary/80 text-sm",
                    isRecording ? "text-red-500" : "text-primary",
                    "hover:bg-secondary transition-colors"
                  )}
                >
                  {isRecording ? (
                    <>
                      <span className="animate-pulse">●</span>
                      <span>{formatTime(recordingTime)}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      <span>Record</span>
                    </>
                  )}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
            </div>

            {/* Assets Preview */}
            <div className="space-y-3">
              {Object.entries(assets).map(([type, asset]) => asset && (
                <div key={type} className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    {type === 'reference' && <Headphones className="h-4 w-4 text-primary" />}
                    {type === 'vocals' && <Mic className="h-4 w-4 text-primary" />}
                    {type === 'instruments' && <FileMusic className="h-4 w-4 text-primary" />}
                    {type.charAt(0).toUpperCase() + type.slice(1)} Audio
                  </label>
                  <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Volume2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {asset.name}
                      </p>
                      <audio src={asset.url} controls className="w-full mt-2" />
                    </div>
                    <button
                      onClick={() => {
                        onAssetsChange({
                          ...assets,
                          [type]: null
                        })
                      }}
                      className="rounded-lg p-2 hover:bg-secondary"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generate Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGenerate}
          disabled={isGenerating || !prompt.trim()}
          className={cn(
            "flex items-center gap-2 rounded-xl px-6 py-2",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              Generate Audio
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
} 