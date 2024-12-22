"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, Upload, FileAudio, Plus, 
  X, StopCircle, Wand2, Loader2,
  Volume2, VolumeX, Pause, Play,
  Headphones, Radio, Sparkles, Clock,
  FileText, MessageSquare, Waves
} from "lucide-react"
import { cn } from "@/lib/utils"

const initializeAudioContext = async () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    await audioContext.resume()
    return audioContext
  } catch (error) {
    console.error('Audio context initialization error:', error)
    return null
  }
}

const getAudioDevices = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true }) // Request initial permission
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter(device => device.kind === 'audioinput')
  } catch (error) {
    console.error('Error getting audio devices:', error)
    return []
  }
}

const checkMicrophonePermission = async () => {
  try {
    // Check browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return {
        error: true,
        message: 'Your browser does not support audio recording. Please use a modern browser.'
      }
    }

    // Initialize audio context first
    const audioContext = await initializeAudioContext()
    if (!audioContext) {
      return {
        error: true,
        message: 'Failed to initialize audio system. Please check your browser settings.'
      }
    }

    // Get available audio devices
    const audioDevices = await getAudioDevices()
    
    // No devices found
    if (audioDevices.length === 0) {
      return {
        error: true,
        message: 'No microphone found. Please connect a microphone and try again.',
        devices: []
      }
    }

    // Test microphone access
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: audioDevices[0].deviceId ? { exact: audioDevices[0].deviceId } : undefined,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    })

    // Test audio processing
    const source = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    source.connect(analyser)
    
    // Clean up
    stream.getTracks().forEach(track => track.stop())
    source.disconnect()
    analyser.disconnect()
    
    return {
      error: false,
      devices: audioDevices,
      defaultDevice: audioDevices[0]
    }
  } catch (error) {
    console.error('Microphone permission error:', error)
    
    // Handle specific error cases
    if (error.name === 'NotAllowedError') {
      return {
        error: true,
        message: 'Microphone access denied. Please allow microphone access in your browser settings.',
        code: 'PERMISSION_DENIED'
      }
    }
    
    if (error.name === 'NotFoundError') {
      return {
        error: true,
        message: 'No microphone found. Please connect a microphone and try again.',
        code: 'NO_DEVICE'
      }
    }
    
    if (error.name === 'NotReadableError') {
      return {
        error: true,
        message: 'Microphone is busy or not responding. Please try again or check your settings.',
        code: 'DEVICE_BUSY'
      }
    }

    return {
      error: true,
      message: 'Failed to access microphone. Please check your settings and try again.',
      code: 'UNKNOWN_ERROR',
      originalError: error
    }
  }
}

const setupDeviceMonitoring = (onDeviceChange) => {
  navigator.mediaDevices?.addEventListener('devicechange', async () => {
    const devices = await getAudioDevices()
    onDeviceChange(devices)
  })
}

const checkBrowserSupport = () => {
  const support = {
    mediaDevices: !!navigator.mediaDevices,
    audioContext: typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined',
    mediaRecorder: typeof MediaRecorder !== 'undefined',
    webAudio: typeof AudioWorkletNode !== 'undefined'
  }

  return {
    supported: Object.values(support).every(Boolean),
    features: support
  }
}

export function SpeechInput({ 
  isRecording,
  isProcessing,
  recordingTime,
  onStartRecording,
  onStopRecording,
  settings 
}) {
  const [dragActive, setDragActive] = useState(false)
  const [audioFile, setAudioFile] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const fileInputRef = useRef(null)
  const audioRef = useRef(null)
  const [micPermission, setMicPermission] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [browserSupport, setBrowserSupport] = useState(null)
  const visualizerRef = useRef(null)
  const analyserRef = useRef(null)
  const [availableDevices, setAvailableDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)

  useEffect(() => {
    setupDeviceMonitoring(async (devices) => {
      setAvailableDevices(devices)
      if (devices.length > 0 && !selectedDevice) {
        setSelectedDevice(devices[0])
      }
    })
  }, [])

  useEffect(() => {
    const checkPermission = async () => {
      const result = await checkMicrophonePermission()
      if (!result.error) {
        setAvailableDevices(result.devices)
        setSelectedDevice(result.defaultDevice)
        setMicPermission(true)
      } else {
        setErrorMessage(result.message)
        setMicPermission(false)
      }
    }
    checkPermission()
  }, [])

  useEffect(() => {
    const support = checkBrowserSupport()
    setBrowserSupport(support)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        if (isRecording) {
          onStopRecording()
        } else {
          handleStartRecording()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isRecording])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

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
    const file = files[0]
    const validTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg', 'audio/m4a', 'audio/flac']
    
    if (!file) {
      setErrorMessage('No file selected')
      return
    }

    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid audio file (MP3, WAV, M4A, FLAC, OGG)')
      return
    }

    if (file.size > 500 * 1024 * 1024) { // 500MB limit
      setErrorMessage('File size exceeds 500MB limit')
      return
    }

    try {
      const url = URL.createObjectURL(file)
      const audio = new Audio(url)
      
      audio.onerror = () => {
        setErrorMessage('Failed to load audio file. The file may be corrupted.')
        URL.revokeObjectURL(url)
      }

      audio.oncanplaythrough = () => {
        setAudioFile({
          file,
          name: file.name,
          url,
          duration: audio.duration
        })
        setErrorMessage(null)
      }
    } catch (error) {
      console.error('File handling error:', error)
      setErrorMessage('Failed to process audio file')
    }
  }

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  const handleStartRecording = async () => {
    setErrorMessage(null)
    
    try {
      const permissionResult = await checkMicrophonePermission()
      if (permissionResult.error) {
        setErrorMessage(permissionResult.message)
        return
      }

      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      await audioContext.resume()

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 44100,
          sampleSize: 16
        }
      })

      setupAudioVisualization(stream)

      const options = {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
          ? 'audio/ogg;codecs=opus'
          : 'audio/mp4'
      }

      const mediaRecorder = new MediaRecorder(stream, options)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: options.mimeType })
        setAudioBlob(audioBlob)
        processAudio(audioBlob)
      }

      mediaRecorder.start(1000) // Collect data in 1-second chunks
      setIsRecording(true)

      let time = 0
      timerRef.current = setInterval(() => {
        time += 1
        setRecordingTime(time)
      }, 1000)

    } catch (error) {
      console.error('Recording error:', error)
      setErrorMessage(
        error.name === 'NotFoundError' 
          ? "No microphone found. Please connect a microphone and try again."
          : error.name === 'NotAllowedError'
          ? "Microphone access denied. Please allow microphone access and try again."
          : error.name === 'NotReadableError'
          ? "Microphone is busy or not responding. Please try again."
          : "Failed to start recording. Please check your microphone settings."
      )
    }
  }

  const setupAudioVisualization = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaStreamSource(stream)
    
    analyser.fftSize = 256
    source.connect(analyser)
    analyserRef.current = analyser

    const canvas = visualizerRef.current
    const ctx = canvas.getContext('2d')
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!isRecording) return

      requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = 'rgb(23, 23, 23)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, 'rgb(99, 102, 241)')
        gradient.addColorStop(1, 'rgb(79, 70, 229)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }

    draw()
  }

  const DeviceSelector = () => (
    availableDevices.length > 0 && (
      <div className="mt-4">
        <label className="text-sm font-medium">Select Microphone</label>
        <select
          value={selectedDevice?.deviceId || ''}
          onChange={(e) => {
            const device = availableDevices.find(d => d.deviceId === e.target.value)
            setSelectedDevice(device)
          }}
          className={cn(
            "mt-1 block w-full rounded-lg",
            "bg-secondary/50 border border-secondary",
            "px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-primary/20"
          )}
        >
          {availableDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
            </option>
          ))}
        </select>
      </div>
    )
  )

  return (
    <div className="space-y-4">
      {/* Recording Controls */}
      <div className="flex flex-col items-center gap-4">
        {/* Main Record Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? onStopRecording : handleStartRecording}
          disabled={isProcessing}
          className={cn(
            "relative w-24 h-24 rounded-full",
            "flex items-center justify-center",
            "transition-all duration-200",
            isRecording
              ? "bg-red-500 text-white"
              : "bg-primary text-primary-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isRecording ? (
            <>
              <StopCircle className="h-10 w-10" />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </>
          ) : (
            <Mic className="h-10 w-10" />
          )}
        </motion.button>

        {/* Recording Time */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-500"
          >
            <div className="animate-pulse">●</div>
            <span className="font-mono text-lg">
              {formatTime(recordingTime)}
            </span>
          </motion.div>
        )}

        {/* Status Text */}
        <div className="text-sm text-muted-foreground">
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing audio...
            </span>
          ) : isRecording ? (
            "Recording in progress..."
          ) : (
            "Click to start recording"
          )}
        </div>
      </div>

      {/* Add device selector before the file upload section */}
      <DeviceSelector />

      {/* File Upload Section */}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "rounded-xl border-2 border-dashed p-8",
            "transition-colors duration-200",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20 hover:border-primary/50"
          )}
        >
          {audioFile ? (
            <div className="space-y-4">
              {/* Audio Preview */}
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileAudio className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{audioFile.name}</p>
                  <audio
                    ref={audioRef}
                    src={audioFile.url}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>
                <button
                  onClick={() => setAudioFile(null)}
                  className="rounded-lg p-2 hover:bg-secondary/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="rounded-lg p-2 hover:bg-secondary/80"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
                <div className="flex items-center gap-2 flex-1">
                  <Volume2 className="h-4 w-4" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <FileAudio className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop your audio file here, or{" "}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary hover:underline"
                >
                  browse
                </button>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Supports MP3, WAV, M4A, FLAC (max 500MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Waves className="h-4 w-4" />
            <span>Model: {settings.model}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>Language: {settings.language}</span>
          </div>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-1.5",
            "bg-secondary/80 hover:bg-secondary",
            "transition-colors"
          )}
        >
          <Plus className="h-4 w-4" />
          Add Audio
        </button>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm"
        >
          {errorMessage}
          <button
            onClick={() => setErrorMessage(null)}
            className="ml-2 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      {!browserSupport?.supported && (
        <div className="bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-lg text-sm mb-4">
          <p className="font-medium">Browser Compatibility Warning</p>
          <p className="text-xs mt-1">
            Some features may not work in your current browser. For the best experience, please use a modern browser like Chrome, Firefox, or Edge.
          </p>
        </div>
      )}

      <div className="relative w-full h-16 mt-4">
        <canvas
          ref={visualizerRef}
          className="w-full h-full rounded-lg bg-secondary/20"
        />
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2">
        Press <kbd className="px-2 py-1 rounded bg-secondary">Space</kbd> to start/stop recording
      </p>
    </div>
  )
} 