"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, Pause, Volume2, VolumeX, 
  Maximize2, Minimize2, Download, Share2,
  RotateCcw, Settings, Film, Clock,
  ChevronLeft, ChevronRight, MoreVertical,
  Loader2, MonitorPlay, Sparkles, Layers, Trash2,
  Search, SearchX
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function VideoPreview({ 
  videos, 
  isGenerating, 
  selectedVideo,
  onSelectVideo,
  settings 
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [touchStartX, setTouchStartX] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState('preview')
  const [isSharing, setIsSharing] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [videoHistory, setVideoHistory] = useLocalStorage("video-history", [])
  const [filteredVideos, setFilteredVideos] = useState(videos)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  const handlePlayPause = async () => {
    if (!videoRef.current) return

    try {
      if (isPlaying) {
        await videoRef.current.pause()
        setIsPlaying(false)
      } else {
        if (videoRef.current.readyState === 0) {
          await new Promise((resolve, reject) => {
            videoRef.current.onloadedmetadata = resolve
            videoRef.current.onerror = reject
            videoRef.current.load()
          })
        }

        await videoRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      handleVideoError(error)
      setIsPlaying(false)
      
      if (error.name === "NotAllowedError") {
        console.log("Autoplay was prevented. Please interact with the video player first.")
      } else if (error.name === "NotSupportedError") {
        console.log("This video format is not supported by your browser.")
      } else {
        console.log("An error occurred while playing the video:", error.message)
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressClick = (e) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }

  const handleProgressHover = (e) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      const previewTime = pos * videoRef.current.duration
      // Show time preview tooltip
      // Implementation here
    }
  }

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
    setShowControls(true)
  }

  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      const diff = e.touches[0].clientX - touchStartX
      if (Math.abs(diff) > 10) {
        setIsDragging(true)
      }
    }
  }

  const handleTouchEnd = () => {
    setTouchStartX(null)
    setIsDragging(false)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleShare = async (video) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title || "Generated Video",
          text: video.description || "Check out this AI-generated video!",
          url: video.url
        })
      } else {
        await navigator.clipboard.writeText(video.url)
        // Show success message
        alert("Video link copied to clipboard!")
      }
    } catch (error) {
      console.error("Error sharing video:", error)
      alert("Failed to share video. Please try again.")
    }
  }

  const [history, setHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("video-history")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  
  // Update history when selecting a video
  const handleVideoSelect = (video) => {
    onSelectVideo(video)
    
    // Add to history if not already present
    const newHistory = [
      video,
      ...history.filter(v => v.id !== video.id)
    ].slice(0, 10) // Keep last 10 items
  
    setHistory(newHistory)
    localStorage.setItem("video-history", JSON.stringify(newHistory))
  }

  const handleDownload = async (video) => {
    try {
      const response = await fetch(video.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${video.title || "generated-video"}-${Date.now()}.mp4`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading video:", error)
      alert("Failed to download video. Please try again.")
    }
  }

  // Handle video deletion
    const handleDelete = (videoId) => {
    const confirmed = window.confirm("Are you sure you want to delete this video?")
    if (!confirmed) return
  
    // Remove from history
    const newHistory = history.filter(v => v.id !== videoId)
    setHistory(newHistory)
    localStorage.setItem("video-history", JSON.stringify(newHistory))
  
    // Remove from filtered videos
    setFilteredVideos(prev => prev.filter(v => v.id !== videoId))
  
    // If current video is deleted, select another one
    if (selectedVideo?.id === videoId) {
      const nextVideo = filteredVideos.find(v => v.id !== videoId)
      if (nextVideo) onSelectVideo(nextVideo)
    }
  }

  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredVideos(videos)
      return
    }

    const searchResults = videos.filter(video => 
      video.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      video.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    setFilteredVideos(searchResults)
  }, [debouncedSearch, videos])

  useEffect(() => {
    if (selectedVideo) {
      const newHistory = [
        selectedVideo,
        ...videoHistory.filter(v => v.id !== selectedVideo.id)
      ].slice(0, 10) // Keep last 10 items
      setVideoHistory(newHistory)
    }
  }, [selectedVideo])

  const tabs = [
    { 
      id: 'preview', 
      label: 'Preview', 
      icon: Play,
      count: null
    },
    { 
      id: 'variations', 
      label: 'Variations', 
      icon: Layers,
      count: filteredVideos.length
    },
    { 
      id: 'history', 
      label: 'History', 
      icon: Clock,
      count: videoHistory.length
    }
  ]

  const handleSearch = (query) => {
    setSearchQuery(query)
    
    if (!query.trim()) {
      setFilteredVideos(videos)
      return
    }

    const searchResults = videos.filter(video => 
      video.title?.toLowerCase().includes(query.toLowerCase()) ||
      video.description?.toLowerCase().includes(query.toLowerCase()) ||
      video.settings?.resolution.toLowerCase().includes(query.toLowerCase()) ||
      video.settings?.style.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredVideos(searchResults)
  }

  const handleVideoError = (error) => {
    console.error("Video error:", error)
    
    let errorMessage = "An error occurred while playing the video."
    
    if (error?.target?.error?.code) {
      switch (error.target.error.code) {
        case 1:
          errorMessage = "Video loading was aborted."
          break
        case 2:
          errorMessage = "Network error occurred while loading video."
          break
        case 3:
          errorMessage = "Error occurred while decoding video."
          break
        case 4:
          errorMessage = "Video format not supported."
          break
        default:
          errorMessage = "Unknown error occurred."
      }
    }

    console.log("Video Error Message:", errorMessage)
  }

  const checkVideoSupport = (videoUrl) => {
    if (!videoUrl) return false
    
    try {
      new URL(videoUrl)
    } catch {
      return false
    }

    const video = document.createElement('video')
    
    const formats = {
      mp4: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      webm: 'video/webm; codecs="vp8, vorbis"',
      ogg: 'video/ogg; codecs="theora, vorbis"'
    }

    return Object.values(formats).some(format => video.canPlayType(format) !== "")
  }

  function getLoadingMessage(progress) {
    if (progress < 0.3) return "Initializing AI model..."
    if (progress < 0.6) return "Generating video frames..."
    if (progress < 0.8) return "Applying effects and transitions..."
    return "Finalizing your video..."
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    setLoadingProgress(0)

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + 0.01
        return next > 0.99 ? 0.99 : next
      })
    }, 100)

    try {
      // Simulate API call with proper video format
      setTimeout(() => {
        const newVideo = {
          id: Date.now(),
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Use a valid video URL
          prompt,
          settings,
          thumbnail: "https://source.unsplash.com/random/1920x1080",
          duration: settings.duration,
          timestamp: new Date().toISOString(),
          title: "Generated Video",
          description: prompt,
          webmUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm", // Provide WebM format
          oggUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.ogv" // Provide OGG format
        }

        setGeneratedVideos([newVideo, ...generatedVideos])
        setLoadingProgress(1)
        setTimeout(() => {
          setIsGenerating(false)
          clearInterval(progressInterval)
        }, 500)
      }, 5000)
    } catch (error) {
      console.error("Generation error:", error)
      setIsGenerating(false)
      clearInterval(progressInterval)
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Tab Navigation */}
      <div className="relative">
        {/* Search Bar for Variations and History */}
        {(activeTab === 'variations' || activeTab === 'history') && (
          <div className="absolute right-0 top-0 w-full max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className={cn(
                "w-full rounded-lg bg-secondary/50 px-4 py-2 pl-10",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                "transition-all duration-200"
              )}
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        )}

        {/* Enhanced Tab Design */}
        <nav className="flex items-center gap-1 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "group relative px-4 py-3",
                "flex items-center gap-2",
                "text-sm font-medium transition-all"
              )}
            >
              {/* Active Tab Indicator */}
              <div
                className={cn(
                  "absolute inset-x-0 -bottom-px h-0.5",
                  "transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-primary"
                    : "bg-transparent group-hover:bg-primary/20"
                )}
              />

              <tab.icon className={cn(
                "h-4 w-4 transition-colors",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-foreground"
              )} />
              
              <span className={cn(
                "transition-colors",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              )}>
                {tab.label}
              </span>

              {/* Count Badge */}
              {tab.count !== null && (
                <span className={cn(
                  "ml-1.5 flex h-5 items-center justify-center",
                  "rounded-full px-2 text-xs",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Enhanced Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'preview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Video Preview Area */}
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video group">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95">
                  <div className="w-full max-w-md space-y-6 text-center p-6">
                    {/* Enhanced Loading Animation */}
                    <div className="relative mx-auto w-24 h-24">
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                      <div 
                        className="absolute inset-0 rounded-full border-4 border-primary border-l-transparent"
                        style={{
                          animation: "spin 1.5s linear infinite",
                          transform: `rotate(${loadingProgress * 360}deg)`
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className="h-8 w-8 text-primary animate-pulse" />
                      </div>
                    </div>

                    {/* Loading Status */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-white">
                        Generating Your Video
                      </h3>
                      <div className="relative w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-primary rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${loadingProgress * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>Processing frames...</span>
                        <span>{Math.round(loadingProgress * 100)}%</span>
                      </div>
                      <p className="text-sm text-white/60">
                        {getLoadingMessage(loadingProgress)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : videos.length > 0 ? (
                <>
                  <video
                    ref={videoRef}
                    src={selectedVideo?.url || videos[0]?.url}
                    poster={selectedVideo?.thumbnail || videos[0]?.thumbnail}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onVolumeChange={(e) => setVolume(e.target.volume)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onError={handleVideoError}
                    onLoadStart={() => {
                      console.log("Video loading started")
                    }}
                    onLoadedData={() => {
                      console.log("Video loaded successfully")
                    }}
                    playsInline
                    preload="metadata"
                    controlsList="nodownload"
                  >
                    <source 
                      src={selectedVideo?.url || videos[0]?.url} 
                      type="video/mp4"
                    />
                    <source 
                      src={selectedVideo?.webmUrl || videos[0]?.webmUrl} 
                      type="video/webm"
                    />
                    <source 
                      src={selectedVideo?.oggUrl || videos[0]?.oggUrl} 
                      type="video/ogg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90">
                      <div className="text-center p-6">
                        <MonitorPlay className="h-12 w-12 mx-auto text-white/40" />
                        <p className="mt-2 text-sm text-white/60">
                          This video format is not supported by your browser.
                          Try downloading the video to play it in your media player.
                        </p>
                      </div>
                    </div>
                  </video>

                  {/* Enhanced Video Controls */}
                  <AnimatePresence>
                    {(showControls || !isPlaying) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          "absolute inset-0 transition-all duration-300",
                          "bg-gradient-to-t from-black/80 via-black/40 to-black/60",
                          "flex flex-col justify-between",
                          "md:opacity-0 md:group-hover:opacity-100"
                        )}
                      >
                        {/* Enhanced Top Controls */}
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <motion.div
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1.5 backdrop-blur-sm"
                            >
                              <Settings className="h-3.5 w-3.5 text-white/80" />
                              <span className="text-sm text-white">
                                {settings.resolution} • {settings.fps}fps
                              </span>
                            </motion.div>
                          </div>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={cn(
                                "rounded-lg bg-black/40 p-2 text-white/80",
                                "backdrop-blur-sm hover:bg-black/60 hover:text-white",
                                "transition-all duration-200"
                              )}
                            >
                              <Share2 className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={cn(
                                "rounded-lg bg-black/40 p-2 text-white/80",
                                "backdrop-blur-sm hover:bg-black/60 hover:text-white",
                                "transition-all duration-200"
                              )}
                            >
                              <Download className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Enhanced Bottom Controls */}
                        <div className="p-4 space-y-2">
                          {/* Progress Bar with Preview */}
                          <div
                            ref={progressRef}
                            onClick={handleProgressClick}
                            onMouseMove={handleProgressHover}
                            className="relative h-1.5 cursor-pointer group/progress"
                          >
                            <div className="absolute inset-0 bg-white/20 rounded-full" />
                            <motion.div
                              className={cn(
                                "absolute inset-y-0 left-0 bg-primary rounded-full",
                                "group-hover/progress:h-2 -translate-y-[2px]",
                                "transition-all duration-200"
                              )}
                              style={{ width: `${(currentTime / duration) * 100}%` }}
                            >
                              <div className={cn(
                                "absolute right-0 top-1/2 -translate-y-1/2",
                                "h-4 w-4 rounded-full bg-primary",
                                "opacity-0 group-hover/progress:opacity-100",
                                "transition-all duration-200",
                                "cursor-grab active:cursor-grabbing"
                              )} />
                            </motion.div>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Enhanced Playback Controls */}
                            <div className="flex items-center gap-4">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePlayPause}
                                className={cn(
                                  "rounded-lg bg-white/20 p-2.5",
                                  "text-white backdrop-blur-sm",
                                  "hover:bg-white/30 transition-all duration-200",
                                  "focus:outline-none focus:ring-2 focus:ring-white/20"
                                )}
                              >
                                {isPlaying ? (
                                  <Pause className="h-5 w-5" />
                                ) : (
                                  <Play className="h-5 w-5" />
                                )}
                              </motion.button>

                              {/* Enhanced Volume Control */}
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setIsMuted(!isMuted)}
                                  className="rounded-lg p-2 text-white hover:bg-white/20"
                                >
                                  {isMuted ? (
                                    <VolumeX className="h-4 w-4" />
                                  ) : (
                                    <Volume2 className="h-4 w-4" />
                                  )}
                                </motion.button>
                                <div className="w-20 group/volume">
                                  <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className={cn(
                                      "w-full h-1 rounded-full appearance-none",
                                      "bg-white/20",
                                      "hover:bg-white/30",
                                      "focus:outline-none focus:ring-2 focus:ring-white/20",
                                      "[&::-webkit-slider-thumb]:appearance-none",
                                      "[&::-webkit-slider-thumb]:w-3",
                                      "[&::-webkit-slider-thumb]:h-3",
                                      "[&::-webkit-slider-thumb]:rounded-full",
                                      "[&::-webkit-slider-thumb]:bg-white",
                                      "[&::-webkit-slider-thumb]:cursor-pointer",
                                      "[&::-webkit-slider-thumb]:opacity-0",
                                      "group-hover/volume:[&::-webkit-slider-thumb]:opacity-100"
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="text-sm text-white">
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </div>
                            </div>

                            {/* Enhanced Fullscreen Button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={toggleFullscreen}
                              className={cn(
                                "rounded-lg p-2 text-white",
                                "hover:bg-white/20 transition-all duration-200",
                                "focus:outline-none focus:ring-2 focus:ring-white/20"
                              )}
                            >
                              {isFullscreen ? (
                                <Minimize2 className="h-4 w-4" />
                              ) : (
                                <Maximize2 className="h-4 w-4" />
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm">
                  <div className="text-center p-6 rounded-xl bg-black/40">
                    <MonitorPlay className="h-12 w-12 mx-auto text-white/40" />
                    <p className="mt-2 text-sm text-white/60">
                      No video generated yet
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'variations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Enhanced Grid Layout */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    className="group relative aspect-video rounded-xl overflow-hidden"
                  >
                    <img
                      src={video.thumbnail}
                      alt={`Variation ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Enhanced Overlay Controls */}
                    <div className={cn(
                      "absolute inset-0 flex flex-col justify-between",
                      "bg-gradient-to-t from-black/80 via-transparent to-black/40",
                      "opacity-0 group-hover:opacity-100 transition-all"
                    )}>
                      {/* Top Controls */}
                      <div className="p-3 flex justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShare(video)
                          }}
                          className="rounded-full bg-black/40 p-2 text-white/80 hover:text-white"
                        >
                          <Share2 className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(video.id)
                          }}
                          className="rounded-full bg-red-500/20 p-2 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>

                      {/* Center Play Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSelectVideo(video)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </motion.button>

                      {/* Bottom Info */}
                      <div className="p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white font-medium">
                            Variation {index + 1}
                          </span>
                          <span className="text-xs text-white/60">
                            {video.duration}s
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Settings className="h-3 w-3" />
                          <span>{video.settings.resolution}</span>
                          <span>•</span>
                          <span>{video.settings.fps}fps</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <SearchX className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No results found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search query
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Enhanced History List */}
            <div className="space-y-4">
              {videoHistory.length > 0 ? (
                videoHistory
                  .filter(video => 
                    !searchQuery || 
                    video.title?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((video, index) => (
                    <motion.div
                      key={video.id}
                      whileHover={{ scale: 1.02 }}
                      className="group relative aspect-video rounded-xl overflow-hidden"
                    >
                      <img
                        src={video.thumbnail}
                        alt={`History ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Enhanced Overlay Controls */}
                      <div className={cn(
                        "absolute inset-0 flex flex-col justify-between",
                        "bg-gradient-to-t from-black/80 via-transparent to-black/40",
                        "opacity-0 group-hover:opacity-100 transition-all"
                      )}>
                        {/* Top Controls */}
                        <div className="p-3 flex justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(video)
                            }}
                            className="rounded-full bg-black/40 p-2 text-white/80 hover:text-white"
                          >
                            <Share2 className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(video.id)
                            }}
                            className="rounded-full bg-red-500/20 p-2 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>

                        {/* Center Play Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onSelectVideo(video)}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </motion.button>

                        {/* Bottom Info */}
                        <div className="p-3 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white font-medium">
                              {video.title}
                            </span>
                            <span className="text-xs text-white/60">
                              {video.duration}s
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/60">
                            <Settings className="h-3 w-3" />
                            <span>{video.settings.resolution}</span>
                            <span>•</span>
                            <span>{video.settings.fps}fps</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No history yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your video history will appear here
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          disabled={isSharing}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl",
            "bg-secondary/80 text-sm font-medium",
            "hover:bg-secondary transition-colors",
            "disabled:opacity-50"
          )}
        >
          <Share2 className="h-4 w-4" />
          Share
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 transition-opacity"
          )}
        >
          <Download className="h-4 w-4" />
          Download
        </motion.button>
      </div>
    </div>
  )
} 