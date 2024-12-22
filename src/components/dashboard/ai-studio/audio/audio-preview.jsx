"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, Pause, Volume2, VolumeX, 
  Download, Share2, RotateCcw, 
  Music2, Clock, Waveform, Loader2,
  Forward, Rewind, Settings, List,
  Repeat, Shuffle, Heart, MoreVertical
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AudioPreview({ 
  audios, 
  isGenerating, 
  selectedAudio,
  onSelectAudio,
  settings 
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLooping, setIsLooping] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current
    audio.volume = volume
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      if (!isSeeking) {
        setCurrentTime(audio.currentTime)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (isLooping) {
        audio.currentTime = 0
        audio.play()
      }
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [volume, isLooping, isSeeking])

  // Initialize Audio Context and Analyser
  useEffect(() => {
    if (!audioRef.current) return

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 256

    const source = audioContextRef.current.createMediaElementSource(audioRef.current)
    source.connect(analyserRef.current)
    analyserRef.current.connect(audioContextRef.current.destination)

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [selectedAudio])

  // Waveform Visualization
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)
      analyserRef.current.getByteFrequencyData(dataArray)

      ctx.fillStyle = 'rgb(23, 23, 23)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / dataArray.length) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, 'rgb(147, 51, 234)') // Purple
        gradient.addColorStop(1, 'rgb(126, 34, 206)') // Darker Purple

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }

    draw()
  }

  useEffect(() => {
    if (isPlaying) {
      drawWaveform()
    } else {
      cancelAnimationFrame(animationRef.current)
    }

    return () => cancelAnimationFrame(animationRef.current)
  }, [isPlaying])

  const handlePlayPause = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        await audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error('Playback error:', error)
    }
  }

  const handleSeek = (e) => {
    if (!audioRef.current || !progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = pos * audioRef.current.duration
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      {/* Audio Preview Area */}
      <div className="relative rounded-xl overflow-hidden bg-card">
        {isGenerating ? (
          <div className="aspect-[2/1] flex items-center justify-center bg-secondary/20">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
                <div className="relative rounded-full bg-primary/10 p-4">
                  <Music2 className="h-8 w-8 text-primary animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">Generating Audio</h3>
                <p className="text-sm text-muted-foreground">
                  Processing your request...
                </p>
              </div>
            </div>
          </div>
        ) : audios.length > 0 ? (
          <div className="p-4 space-y-4">
            {/* Waveform Visualization */}
            <div className="relative aspect-[2/1] bg-background rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                width={1024}
                height={256}
              />
              
              {/* Audio Element */}
              <audio
                ref={audioRef}
                src={selectedAudio?.url || audios[0].url}
                className="hidden"
              />

              {/* Playback Controls Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                {/* Progress Bar */}
                <div
                  ref={progressRef}
                  onClick={handleSeek}
                  className="relative h-1 mb-4 cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full" />
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                      <div className="h-3 w-3 -translate-y-1/2 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Time Display */}
                    <div className="text-sm text-white">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>

                    {/* Main Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsLooping(!isLooping)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          isLooping 
                            ? "text-primary bg-primary/10" 
                            : "text-white/80 hover:bg-white/10"
                        )}
                      >
                        <Repeat className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.currentTime -= 10
                          }
                        }}
                        className="p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
                      >
                        <Rewind className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handlePlayPause}
                        className="p-3 rounded-full bg-primary text-white hover:opacity-90 transition-opacity"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.currentTime += 10
                          }
                        }}
                        className="p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
                      >
                        <Forward className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          showPlaylist 
                            ? "text-primary bg-primary/10" 
                            : "text-white/80 hover:bg-white/10"
                        )}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Info */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Generated Audio</h3>
                <p className="text-sm text-muted-foreground">
                  {settings.duration}s • {settings.format.toUpperCase()} • {settings.sampleRate}Hz
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {}}
                  className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {}}
                  className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {}}
                  className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-[2/1] flex items-center justify-center bg-secondary/20">
            <div className="text-center">
              <Music2 className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No audio generated yet
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Generated Variations */}
      {audios.length > 1 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Generated Variations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {audios.map((audio, index) => (
              <motion.button
                key={audio.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAudio(audio)}
                className={cn(
                  "relative aspect-[2/1] rounded-lg overflow-hidden",
                  "border-2 transition-all duration-200",
                  selectedAudio?.id === audio.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-primary/50"
                )}
              >
                {/* Waveform Preview */}
                <div className="absolute inset-0 bg-secondary/20">
                  {/* Add mini waveform visualization here */}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/40 p-2 backdrop-blur-sm">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                {/* Info */}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-xs text-white">Variation {index + 1}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 