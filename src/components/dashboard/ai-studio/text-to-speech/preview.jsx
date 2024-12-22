"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, Pause, Volume2, VolumeX, 
  Download, Share2, RotateCcw, 
  AudioWaveform, Clock, Waveform, Loader2,
  Forward, Rewind, Settings, List,
  Repeat, Shuffle, Heart, MoreVertical,
  FileAudio, Languages, Type, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const getAudioUrl = (blob) => {
  if (!blob) return null;
  
  try {
    // Create a new blob with the correct audio type
    const audioBlob = new Blob([blob], { 
      type: `audio/${settings.format || 'mp3'}` 
    });
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error creating audio URL:', error);
    return null;
  }
};

const createAudioWithFallback = async (blob) => {
  const formats = [
    { type: 'audio/mpeg', ext: 'mp3' },
    { type: 'audio/wav', ext: 'wav' },
    { type: 'audio/ogg', ext: 'ogg' }
  ]

  // Convert blob to supported formats
  const audioBlobs = await Promise.all(formats.map(async format => {
    try {
      const converted = await convertAudioFormat(blob, format.type)
      return {
        blob: converted,
        type: format.type,
        url: URL.createObjectURL(converted)
      }
    } catch (error) {
      console.warn(`Failed to convert to ${format.type}:`, error)
      return null
    }
  }))

  const validBlobs = audioBlobs.filter(Boolean)
  if (!validBlobs.length) {
    throw new Error('No supported audio format found')
  }

  return validBlobs[0]
}

// Update animation variants for smoother transitions
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 1,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

const controlsVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
}

// Add smooth waveform animation
const drawWaveform = () => {
  if (!canvasRef.current || !analyserRef.current) return

  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')
  const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
  let previousData = new Array(dataArray.length).fill(0)
  let animationSpeed = 0.15 // Adjust for smoother transitions

  const draw = () => {
    animationRef.current = requestAnimationFrame(draw)
    analyserRef.current.getByteFrequencyData(dataArray)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const barWidth = (canvas.width / dataArray.length) * 2.5
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
      // Smooth transition between values
      previousData[i] += (dataArray[i] - previousData[i]) * animationSpeed
      const barHeight = (previousData[i] / 255) * canvas.height

      // Create smooth gradient
      const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.6)')
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.8)')
      gradient.addColorStop(1, 'rgba(126, 34, 206, 0.9)')

      ctx.beginPath()
      ctx.moveTo(x, canvas.height)
      
      // Create smooth curve
      const cp1x = x + barWidth / 4
      const cp1y = canvas.height - barHeight * 0.9
      const cp2x = x + barWidth * 0.75
      const cp2y = canvas.height - barHeight * 0.9
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x + barWidth, canvas.height)
      ctx.lineTo(x + barWidth, canvas.height)
      ctx.fillStyle = gradient
      ctx.fill()

      x += barWidth + 1
    }
  }

  draw()
}

export function TextToSpeechPreview({ 
  audio, 
  isGenerating,
  settings 
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const sourceNodeRef = useRef(null)

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

  useEffect(() => {
    if (!audio?.blob || !audioRef.current) return;

    let isActive = true;
    
    const initAudio = async () => {
      try {
        // Create audio context only if it doesn't exist
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
        }

        // Set audio source
        audioRef.current.src = getAudioUrl(audio.blob);
        await audioRef.current.load();

        // Create source node only if it doesn't exist
        if (!sourceNodeRef.current && audioRef.current) {
          sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          sourceNodeRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }
      } catch (error) {
        console.error('Audio initialization failed:', error);
      }
    };

    initAudio();

    return () => {
      isActive = false;
      // Don't disconnect or close anything here
    };
  }, [audio]);

  // Add cleanup effect for unmount
  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (analyserRef.current) {
        analyserRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      drawWaveform()
    } else {
      cancelAnimationFrame(animationRef.current)
    }

    return () => cancelAnimationFrame(animationRef.current)
  }, [isPlaying])

  // Add error recovery and retry logic
  const handlePlayPause = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        await audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Reset audio context if needed
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume()
        }

        // Retry logic for play
        const playAttempt = async (retries = 3) => {
          try {
            await audioRef.current.play()
            setIsPlaying(true)
          } catch (error) {
            if (retries > 0) {
              console.warn(`Play attempt failed, retrying... (${retries} attempts left)`)
              await new Promise(resolve => setTimeout(resolve, 100))
              return playAttempt(retries - 1)
            }
            throw error
          }
        }

        await playAttempt()
      }
    } catch (error) {
      console.error('Playback error:', error)
      setErrorMessage('Failed to play audio. Please try again.')
    }
  }

  const handleSeek = (e) => {
    if (!audioRef.current || !progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = pos * audioRef.current.duration
  }

  const handleSkip = (seconds) => {
    if (!audioRef.current) return
    audioRef.current.currentTime += seconds
  }

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  const handleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Add these functions for download and share
  const handleDownload = async () => {
    if (!audio?.blob) {
      setErrorMessage('No audio available to download');
      return;
    }

    try {
      const url = getAudioUrl(audio.blob);
      if (!url) throw new Error('Failed to create download URL');

      // Create download link
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `generated-audio-${Date.now()}.${settings.format || 'mp3'}`;
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Download failed:', error);
      setErrorMessage('Failed to download audio. Please try again.');
    }
  };

  const handleShare = async () => {
    if (!audio?.blob) {
      setErrorMessage('No audio available to share');
      return;
    }

    try {
      if (navigator.share) {
        // Create a proper audio file with correct type
        const file = new File(
          [audio.blob],
          `generated-audio.${settings.format || 'mp3'}`,
          { 
            type: `audio/${settings.format || 'mp3'}`,
            lastModified: Date.now()
          }
        );

        await navigator.share({
          title: 'Generated Audio',
          text: 'Check out this AI-generated audio!',
          files: [file]
        });
      } else {
        // Fallback: Create a shareable URL
        const url = getAudioUrl(audio.blob);
        if (!url) throw new Error('Failed to create share URL');
        
        await navigator.clipboard.writeText(url);
        alert('Audio URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      setErrorMessage(
        error.name === 'AbortError' 
          ? 'Share cancelled' 
          : 'Failed to share audio. Please try again.'
      );
    }
  };

  if (isGenerating) {
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
              <AudioWaveform className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Generating Audio</h3>
            <p className="text-sm text-muted-foreground">
              Converting text to speech using {settings.voice}...
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Processing audio</span>
          </div>
        </div>
      </motion.div>
    )
  }

  if (!audio) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="rounded-xl border bg-card overflow-hidden"
    >
      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="p-4 bg-red-500/10 text-red-500"
          >
            <p className="text-sm">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileAudio className="h-4 w-4 text-primary" />
              <span className="font-medium">Generated Audio</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Languages className="h-4 w-4" />
                <span>{settings.language}</span>
              </div>
              <div className="flex items-center gap-1">
                <Type className="h-4 w-4" />
                <span>{settings.voice}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={cn(
                "rounded-lg p-2",
                "text-muted-foreground hover:text-foreground",
                "transition-colors"
              )}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => {}}
              className={cn(
                "rounded-lg p-2",
                "text-muted-foreground hover:text-foreground",
                "transition-colors"
              )}
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="relative aspect-[2/1] bg-secondary/20">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          width={1024}
          height={256}
        />
      </div>

      {/* Audio Controls */}
      <motion.div variants={controlsVariants} className="p-4">
        {/* Progress Bar */}
        <div
          ref={progressRef}
          onClick={handleSeek}
          className="relative h-1.5 cursor-pointer group"
        >
          <div className="absolute inset-0 bg-secondary/50 rounded-full" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
              <div className="h-3 w-3 -translate-y-1/2 bg-primary rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Time Display */}
            <div className="text-sm text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLooping(!isLooping)}
                className={cn(
                  "rounded-lg p-2",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors",
                  isLooping && "text-primary"
                )}
              >
                <Repeat className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleSkip(-10)}
                className="rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Rewind className="h-4 w-4" />
              </button>
              <button
                onClick={handlePlayPause}
                className={cn(
                  "rounded-lg p-3",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 transition-opacity"
                )}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={() => handleSkip(10)}
                className="rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Forward className="h-4 w-4" />
              </button>
              <button
                onClick={() => {}}
                className="rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMute}
              className="rounded-lg p-2 text-muted-foreground hover:text-foreground transition-colors"
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
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleShare}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-1.5",
              "text-sm text-muted-foreground",
              "hover:bg-secondary/80 transition-colors"
            )}
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button
            onClick={handleDownload}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-1.5",
              "text-sm font-medium",
              "bg-primary text-primary-foreground",
              "hover:opacity-90 transition-opacity"
            )}
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </motion.div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        className="hidden"
        preload="metadata"
        crossOrigin="anonymous"
      >
        <source 
          src={getAudioUrl(audio?.blob)} 
          type="audio/mpeg"
        />
        <source 
          src={getAudioUrl(audio?.blob)} 
          type="audio/wav"
        />
        Your browser does not support the audio element.
      </audio>
    </motion.div>
  )
} 