"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  SpeakerWave, Wand2, Mic, Plus, 
  X, FileAudio, Volume2, VolumeX,
  Languages, Type, MessageSquare,
  Upload, Sparkles, Keyboard, Music,
  Headphones, Radio, AudioWaveform, Clock,
  Loader2, Play, Pause
} from "lucide-react"
import { cn } from "@/lib/utils"

export function TextToSpeechInput({ 
  text, 
  onTextChange, 
  isGenerating, 
  onGenerate,
  settings 
}) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showVoiceTest, setShowVoiceTest] = useState(false)
  const [testAudio, setTestAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const textareaRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const timerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const characterLimit = 5000
  const remainingChars = characterLimit - (text?.length || 0)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      const chunks = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' })
        // Convert speech to text using API
        try {
          const formData = new FormData()
          formData.append('audio', audioBlob)
          
          const response = await fetch('/api/speech-to-text', {
            method: 'POST',
            body: formData
          })

          if (!response.ok) throw new Error('Speech to text failed')

          const data = await response.json()
          onTextChange(text + ' ' + data.text)
        } catch (error) {
          console.error('Speech to text failed:', error)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      let time = 0
      timerRef.current = setInterval(() => {
        time += 1
        setRecordingTime(time)
      }, 1000)

    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      clearInterval(timerRef.current)
      setIsRecording(false)
      setRecordingTime(0)
    }
  }

  const createAudioPreview = async (audioBlob) => {
    // Convert blob to proper audio format if needed
    const audioBuffer = await audioBlob.arrayBuffer()
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    try {
      const decodedData = await audioContext.decodeAudioData(audioBuffer)
      const mp3Blob = await convertToMP3(decodedData) // Implement MP3 conversion
      
      const audio = new Audio()
      audio.src = URL.createObjectURL(mp3Blob)
      
      return audio
    } catch (error) {
      console.error('Audio preview creation failed:', error)
      throw error
    } finally {
      audioContext.close()
    }
  }

  const handleTestVoice = async () => {
    if (!text.trim()) return

    try {
      setIsLoading(true)
      setErrorMessage(null)

      // Mock API response for testing
      const mockAudioResponse = await fetch('/sample-audio.mp3')
      const audioBlob = await mockAudioResponse.blob()
      
      const audio = new Audio(URL.createObjectURL(audioBlob))
      
      // Test audio playback before showing
      await new Promise((resolve, reject) => {
        audio.oncanplaythrough = resolve
        audio.onerror = reject
        audio.load()
      })

      setTestAudio(audio)
      setShowVoiceTest(true)

    } catch (error) {
      console.error('Voice test failed:', error)
      setErrorMessage('Failed to generate audio. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayTest = () => {
    if (!testAudio) return

    if (isPlaying) {
      testAudio.pause()
    } else {
      testAudio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const generateAudio = async (text, settings) => {
    try {
      // For testing - return mock audio until API is ready
      const mockAudioResponse = await fetch('/sample-audio.mp3')
      if (!mockAudioResponse.ok) {
        throw new Error('Failed to load audio')
      }
      return await mockAudioResponse.blob()

      // Real API call (commented out until endpoint is ready)
      /*
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, settings })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to generate audio')
      }

      const audioBlob = await response.blob()
      if (audioBlob.size === 0) {
        throw new Error('Generated audio is empty')
      }

      return audioBlob
      */

    } catch (error) {
      console.error('Audio generation failed:', error)
      throw new Error('Failed to generate audio. Please try again.')
    }
  }

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      // Create a simple test audio
      const testAudio = new Audio('/sample-audio.mp3');
      
      // Test if audio can be played
      await new Promise((resolve, reject) => {
        testAudio.oncanplaythrough = resolve;
        testAudio.onerror = reject;
        testAudio.load();
      });

      // Convert the test audio to blob
      const response = await fetch('/sample-audio.mp3');
      const audioBlob = await response.blob();

      onGenerate({
        id: Date.now(),
        blob: audioBlob,
        text,
        settings,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Audio generation failed:', error);
      setErrorMessage('Failed to generate audio. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="rounded-lg bg-red-500/10 p-4 text-red-500"
        >
          <p className="text-sm">{errorMessage}</p>
        </motion.div>
      )}
      {/* Text Input Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4 text-primary" />
              Enter Text
            </label>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Languages className="h-3 w-3" />
              <span>{settings.language}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestVoice}
              disabled={!text.trim() || isGenerating}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5",
                "text-xs font-medium",
                "bg-secondary/80 hover:bg-secondary",
                "transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <Headphones className="h-3 w-3" />
              Test Voice
            </button>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isGenerating}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5",
                "text-xs font-medium",
                isRecording 
                  ? "bg-red-500 text-white"
                  : "bg-secondary/80 hover:bg-secondary",
                "transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isRecording ? (
                <>
                  <span className="animate-pulse">●</span>
                  <span>{formatTime(recordingTime)}</span>
                </>
              ) : (
                <>
                  <Mic className="h-3 w-3" />
                  <span>Record</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              const value = e.target.value
              if (value.length <= characterLimit) {
                onTextChange(value)
              }
            }}
            placeholder="Enter the text you want to convert to speech..."
            rows={6}
            className={cn(
              "w-full rounded-lg bg-secondary/50 p-4",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "resize-none"
            )}
          />
          
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {remainingChars} characters remaining
          </div>
        </div>
      </div>

      {/* Voice Test Preview */}
      <AnimatePresence>
        {showVoiceTest && testAudio && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg bg-secondary/50 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <AudioWaveform className="h-4 w-4 text-primary" />
                Voice Preview
              </h4>
              <button
                onClick={() => setShowVoiceTest(false)}
                className="rounded-lg p-1 hover:bg-secondary/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayTest}
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

              <div className="flex items-center gap-2 flex-1">
                <Volume2 className="h-4 w-4" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value)
                    setVolume(value)
                    if (testAudio) {
                      testAudio.volume = value
                    }
                  }}
                  className="w-full"
                />
              </div>
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
          disabled={isGenerating || !text.trim()}
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
              Generate Speech
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
} 