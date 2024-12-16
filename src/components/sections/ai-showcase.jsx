"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { 
  Sparkles, Code2, Image as ImageIcon, 
  MessageSquare, Wand2, Play, Pause, Check, Copy, RefreshCw, Download 
} from "lucide-react"
import { cn } from "@/lib/utils"

const codeSnippets = {
  navbar: `// Responsive Navbar with Dark Mode
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export function Navbar() {
  const [isDark, setIsDark] = useState(false)
  
  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="fixed w-full backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <button onClick={toggleTheme}>
          {isDark ? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  )
}`,
  animation: `// Smooth Animation Component
export function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}`,
  api: `// API Route Handler
export async function POST(req) {
  const { prompt } = await req.json()
  
  try {
    const completion = await openai.createCompletion({
      model: "gpt-4",
      prompt,
      max_tokens: 100
    })
    
    return Response.json({ 
      result: completion.data.choices[0].text 
    })
  } catch (error) {
    return Response.error()
  }
}`
}

const showcaseItems = [
  {
    title: "Code Generation",
    description: "Transform natural language into production-ready code",
    icon: Code2,
    demo: {
      input: "Create a responsive navbar with dark mode",
      output: codeSnippets.navbar,
      language: "jsx",
      type: "code",
      features: [
        "Syntax highlighting",
        "Copy to clipboard",
        "Live preview"
      ]
    },
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
  },
  {
    title: "Image Generation",
    description: "Create stunning visuals from text descriptions",
    icon: ImageIcon,
    demo: {
      input: "A futuristic city with flying cars at sunset",
      output: "/images/showcase/ai-generated-city.jpg",
      type: "image",
      features: [
        "4K resolution",
        "Style variations",
        "Image editing"
      ],
      variations: [
        "/images/showcase/variation-1.jpg",
        "/images/showcase/variation-2.jpg"
      ]
    },
    gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20"
  },
  {
    title: "Chat Completion",
    description: "Natural conversations with AI assistance",
    icon: MessageSquare,
    demo: {
      input: "Explain quantum computing",
      output: "Quantum computing harnesses the principles of quantum mechanics to process information in fundamentally new ways. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously...",
      type: "chat",
      features: [
        "Context awareness",
        "Multi-turn dialogue",
        "Code explanation"
      ],
      conversation: [
        { role: "user", content: "What are the applications?" },
        { role: "assistant", content: "Key applications include cryptography, drug discovery, and optimization problems..." }
      ]
    },
    gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20"
  }
]

// Add these animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Add this animation utility
const typewriterAnimation = (text, speed = 30) => {
  return {
    initial: { text: "" },
    animate: {
      text,
      transition: {
        duration: text.length * speed * 0.001,
        ease: "linear",
      }
    }
  }
}

// Add this component for animated code generation
function AnimatedCode({ code, isPlaying, language = "jsx" }) {
  const [displayedCode, setDisplayedCode] = useState(code)
  const [currentLine, setCurrentLine] = useState(0)
  const [isInitialRun, setIsInitialRun] = useState(true)
  const codeLines = code.split('\n')

  useEffect(() => {
    if (!isPlaying) {
      if (isInitialRun) {
        setDisplayedCode("// Click Run Generation to start...")
        setCurrentLine(0)
      }
      return
    }

    setIsInitialRun(false)
    let currentIndex = 0
    
    // Show first line immediately
    setDisplayedCode(codeLines[0])
    setCurrentLine(1)

    const interval = setInterval(() => {
      if (currentIndex < codeLines.length - 1) {
        currentIndex++
        setDisplayedCode(prev => 
          prev + '\n' + codeLines[currentIndex]
        )
        setCurrentLine(currentIndex + 1)
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isPlaying, code, isInitialRun])

  return (
    <div className="relative rounded-lg overflow-hidden border border-border/50 bg-background/95">
      {/* Enhanced Code Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary/60" />
            <span className="text-xs font-medium text-foreground/80">Code Output</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-2 py-0.5 rounded-md bg-primary/10 font-mono">
            {currentLine}/{codeLines.length}
          </span>
        </div>
      </div>
      
      {/* Enhanced Code Display */}
      <div className="relative">
        <pre className={cn(
          "p-4 overflow-auto max-h-[400px] min-h-[200px]",
          "bg-background/95",
          "transition-colors duration-200"
        )}>
          <code className="text-sm font-mono leading-relaxed">
            {displayedCode}
            {isPlaying && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-primary/50 ml-1 align-middle"
              />
            )}
          </code>
        </pre>

        {/* Enhanced Progress Bar */}
        {isPlaying && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="h-full bg-secondary/30">
              <motion.div
                className="h-full bg-primary/50"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentLine / codeLines.length) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Add this component for animated image generation
function AnimatedImage({ image, variations, isPlaying, isGenerating, progress }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [generationSteps, setGenerationSteps] = useState([])
  const imageRef = useRef(null)

  const steps = [
    { label: "Analyzing prompt...", overlay: "bg-blue-500/20" },
    { label: "Generating composition...", overlay: "bg-purple-500/20" },
    { label: "Adding details...", overlay: "bg-pink-500/20" },
    { label: "Refining image...", overlay: "bg-orange-500/20" },
    { label: "Finalizing...", overlay: "bg-green-500/20" }
  ]

  useEffect(() => {
    if (isPlaying && variations?.length) {
      const interval = setInterval(() => {
        setCurrentImage(prev => (prev + 1) % variations.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, variations])

  useEffect(() => {
    if (isGenerating) {
      setGenerationSteps([])
      steps.forEach((step, index) => {
        setTimeout(() => {
          setGenerationSteps(prev => [...prev, step])
        }, index * 1000)
      })
    }
  }, [isGenerating])

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Image Preview Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/30 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
          <span className="text-[10px] font-medium">Image Preview</span>
        </div>
        {variations?.length > 0 && (
          <span className="text-[10px] text-muted-foreground">
            Variation {currentImage + 1}/{variations.length}
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-video bg-secondary/30">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isGenerating ? 1 : 0 }}
        />

        {/* Generation Steps Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2 p-4 backdrop-blur-sm rounded-lg bg-background/50">
              {generationSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      step.overlay
                    )}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-xs font-medium">{step.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Image Display */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            ref={imageRef}
            src={variations?.[currentImage] || image}
            alt="AI Generated"
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isPlaying && "hover:scale-105"
            )}
          />
        </motion.div>

        {/* Image Controls Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent",
          "opacity-0 hover:opacity-100 transition-opacity duration-200"
        )}>
          <div className="absolute bottom-3 right-3 flex gap-2">
            {variations?.length > 0 && (
              <motion.button
                onClick={() => setCurrentImage((prev) => (prev + 1) % variations.length)}
                className={cn(
                  "p-1.5 rounded-lg",
                  "bg-white/10 hover:bg-white/20",
                  "backdrop-blur-sm transition-colors"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4 text-white" />
              </motion.button>
            )}
            <motion.button
              onClick={() => {/* Add download functionality */}}
              className={cn(
                "p-1.5 rounded-lg",
                "bg-white/10 hover:bg-white/20",
                "backdrop-blur-sm transition-colors"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5 }}
          >
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function DemoCard({ item, isActive, onClick }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVariation, setCurrentVariation] = useState(0)
  const [displayedCode, setDisplayedCode] = useState("// Click Run Generation to start...")
  const cardRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [imageProgress, setImageProgress] = useState(0)
  
  const steps = [
    { label: "Analyzing prompt...", duration: 1000 },
    { label: "Generating code structure...", duration: 1500 },
    { label: "Implementing functionality...", duration: 2000 },
    { label: "Optimizing code...", duration: 1000 }
  ]

  // Reset code when card becomes inactive
  useEffect(() => {
    if (!isActive) {
      setDisplayedCode("// Click Run Generation to start...")
      setIsPlaying(false)
      setIsGenerating(false)
      setGenerationStep(0)
    }
  }, [isActive])

  // Handle code copy
  const handleCopy = async (code) => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Enhanced code generation with better state management
  const handleCodeGeneration = async () => {
    if (isGenerating) return
    
    setIsGenerating(true)
    setIsPlaying(true)
    setDisplayedCode("// Initializing code generation...")
    
    try {
      // Show generation steps
      for (let i = 0; i < steps.length; i++) {
        setGenerationStep(i)
        setDisplayedCode(prev => 
          prev + `\n// ${steps[i].label}`
        )
        await new Promise(resolve => setTimeout(resolve, steps[i].duration))
      }

      // Generate code line by line
      const codeLines = item.demo.output.split('\n')
      for (let i = 0; i < codeLines.length; i++) {
        setDisplayedCode(prev => 
          prev + '\n' + codeLines[i]
        )
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    } catch (error) {
      setDisplayedCode("// An error occurred during generation.\n// Please try again.")
    } finally {
      setGenerationStep(-1)
      setIsGenerating(false)
    }
  }

  // Handle play/pause
  const handlePlayPause = () => {
    if (!isPlaying) {
      handleCodeGeneration()
    } else {
      setIsPlaying(false)
    }
  }

  // Handle image variations
  const handleNextVariation = (e) => {
    e.stopPropagation()
    if (item.demo.variations) {
      setCurrentVariation((prev) => 
        (prev + 1) % item.demo.variations.length
      )
    }
  }

  // Add image generation handler
  const handleImageGeneration = async () => {
    if (isGenerating) return
    
    setIsGenerating(true)
    setIsPlaying(true)
    setImageProgress(0)

    try {
      // Simulate image generation progress
      const duration = 5000 // 5 seconds
      const interval = 50 // Update every 50ms
      const steps = duration / interval
      let progress = 0

      const progressInterval = setInterval(() => {
        progress += (100 / steps)
        setImageProgress(Math.min(progress, 100))
      }, interval)

      await new Promise(resolve => setTimeout(resolve, duration))
      clearInterval(progressInterval)
    } catch (error) {
      console.error('Image generation failed:', error)
    } finally {
      setIsGenerating(false)
      setImageProgress(100)
    }
  }

  // Update the renderOutput function to handle different types
  const renderOutput = () => {
    if (item.demo.type === "image") {
      return (
        <AnimatedImage
          image={item.demo.output}
          variations={item.demo.variations}
          isPlaying={isPlaying}
          isGenerating={isGenerating}
          progress={imageProgress}
        />
      )
    }
    // ... existing code/chat rendering logic ...
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "relative w-full max-w-[calc(100vw-2rem)] mx-auto",
        "rounded-xl border overflow-hidden",
        "bg-background/95 backdrop-blur-none",
        "transition-all duration-300",
        isActive 
          ? "border-primary/50 ring-1 ring-primary/50" 
          : "border-border hover:border-primary/30",
        "sm:rounded-2xl"
      )}
      onClick={onClick}
      layout
    >
      {/* Card Header - Mobile Optimized */}
      <div className="p-3 sm:p-4 md:p-6 space-y-3">
        <div className="flex items-center gap-3">
          <motion.div
            className={cn(
              "p-2 rounded-lg shrink-0",
              "shadow-sm transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "bg-secondary/80 text-foreground"
            )}
            whileHover={{ scale: 1.05 }}
          >
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
          
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold truncate">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
              {item.description}
            </p>
          </div>
        </div>

        {/* Features Tags - Horizontal Scrollable */}
        <div className="flex -mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-1.5 sm:gap-2">
          {item.demo.features.map((feature, idx) => (
            <span 
              key={idx}
              className={cn(
                "shrink-0 px-2 py-1 rounded-md text-xs",
                "bg-secondary/50 text-muted-foreground",
                "whitespace-nowrap"
              )}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Demo Content - Better Mobile Layout */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50"
          >
            {/* Input Section */}
            <div className="p-3 sm:p-4 md:p-6 space-y-3">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium flex items-center gap-2">
                  <Wand2 className="w-3.5 h-3.5 text-primary" />
                  Input Prompt
                </label>
                <div className="p-2.5 rounded-lg bg-secondary/30 text-xs sm:text-sm">
                  {item.demo.input}
                </div>
              </div>

              {/* Output Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    AI Output
                  </label>
                  
                  {/* Generation Progress */}
                  {isGenerating && (
                    <span className="text-xs text-primary animate-pulse">
                      {steps[generationStep]?.label}
                    </span>
                  )}
                </div>

                {/* Code Display */}
                <div className="rounded-lg border border-border/50 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/30 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                      </div>
                      <span className="text-[10px] font-medium">Code Output</span>
                    </div>
                  </div>

                  <div className="relative">
                    <pre className="p-3 overflow-x-auto text-xs">
                      <code className="block whitespace-pre-wrap font-mono">
                        {displayedCode}
                        {isPlaying && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-1.5 h-4 bg-primary/50 ml-0.5 align-middle"
                          />
                        )}
                      </code>
                    </pre>
                    
                    {isGenerating && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/10">
                        <motion.div
                          className="h-full bg-primary"
                          animate={{ width: ["0%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation() // Prevent card click
                      handlePlayPause()
                    }}
                    className={cn(
                      "flex items-center justify-center gap-2",
                      "px-3 py-1.5 rounded-lg",
                      "bg-primary/90 text-primary-foreground",
                      "text-xs font-medium",
                      "disabled:opacity-50",
                      "hover:bg-primary/80 transition-colors"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isGenerating}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Generate Code</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => handleCopy(item.demo.output)}
                    className={cn(
                      "flex items-center justify-center gap-2",
                      "px-3 py-1.5 rounded-lg",
                      "bg-secondary text-foreground",
                      "text-xs font-medium",
                      "border border-border/50"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function AIShowcase() {
  const [activeDemo, setActiveDemo] = useState(0)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/20" />
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
      />

      <div className="container relative">
        <motion.div
          style={{ scale, opacity }}
          className="mx-auto max-w-2xl text-center mb-16 lg:mb-24"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <Wand2 className="h-4 w-4" />
            <span>Live AI Demos</span>
          </motion.div>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Experience AI in Action
          </h2>
          <p className="text-lg text-muted-foreground">
            See our AI capabilities in real-time. Click on any demo to explore more.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcaseItems.map((item, index) => (
            <DemoCard
              key={index}
              item={item}
              isActive={activeDemo === index}
              onClick={() => setActiveDemo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 