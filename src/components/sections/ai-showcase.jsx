"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { 
  Sparkles, Code2, Image as ImageIcon, 
  MessageSquare, Wand2, Play, Pause, Check, Copy, RefreshCw, Download, User 
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
    y: -5,
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

// Add custom scrollbar styles
const customScrollbar = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'hsl(var(--primary)/50) transparent',
  '&::-webkit-scrollbar': {
    width: '3px',
    height: '3px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'hsl(var(--primary)/50)',
    borderRadius: '6px',
    '&:hover': {
      background: 'hsl(var(--primary)/70)',
    },
  },
}

// Update AnimatedCode component with better scrollbar and UI
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
    <div className="relative rounded-lg overflow-hidden border border-border/50">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/10 border-b border-border/50">
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
      
      <div className="relative">
        <pre 
          className={cn(
            "p-4 overflow-auto max-h-[400px] min-h-[200px]",
            "bg-background/80",
            "transition-colors duration-200"
          )}
          style={customScrollbar}
        >
          <code className="text-sm font-mono leading-relaxed">
            {displayedCode}
            {isPlaying && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-primary/70 ml-1 align-middle"
              />
            )}
          </code>
        </pre>

        {/* Enhanced Progress Bar */}
        {isPlaying && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="h-full bg-primary/10">
              <motion.div
                className="h-full bg-primary/40 backdrop-blur-none"
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

// Update ImageGenerationDemo with better UI
function ImageGenerationDemo({ image, variations, isGenerating, progress, onGenerate }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      <motion.div 
        className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-secondary/5 to-transparent"
        whileHover={{ y: -2 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={variations?.[currentImage] || image}
          alt="AI Generated"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {/* Image Controls - Enhanced without blur */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-4 right-4 flex gap-2">
            {variations?.length > 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImage((prev) => (prev + 1) % variations.length)
                }}
                className="p-2.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4 text-white" />
              </motion.button>
            )}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                const link = document.createElement('a')
                link.href = variations?.[currentImage] || image
                link.download = 'ai-generated-image.jpg'
                link.click()
              }}
              className="p-2.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Generation Progress - Enhanced */}
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-3"
              >
                <RefreshCw className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-sm text-white font-medium">
                Generating Image... {Math.round(progress)}%
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Enhanced Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={variations?.[currentImage] || image}
              alt="AI Generated"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Update ChatCompletionDemo with better UI
function ChatCompletionDemo({ messages, isGenerating, onSendMessage }) {
  const [input, setInput] = useState("")
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="space-y-4">
      <div 
        ref={chatRef}
        className={cn(
          "h-[300px] overflow-y-auto rounded-lg",
          "border border-border/50",
          "bg-gradient-to-b from-secondary/5 to-transparent",
          "p-4 space-y-4"
        )}
        style={customScrollbar}
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-3 p-3 rounded-lg",
              message.role === "user" 
                ? "bg-primary/10 ml-auto max-w-[80%]" 
                : "bg-secondary/20 mr-auto max-w-[80%]"
            )}
          >
            <div className="shrink-0 w-6 h-6">
              {message.role === "user" ? (
                <User className="w-full h-full text-primary/70" />
              ) : (
                <Sparkles className="w-full h-full text-primary/70" />
              )}
            </div>
            <div className="flex-1 text-sm leading-relaxed">
              {message.content}
            </div>
          </motion.div>
        ))}

        {/* Enhanced Loading State */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 p-3 rounded-lg bg-secondary/20 mr-auto max-w-[80%]"
          >
            <div className="shrink-0 w-6 h-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-full h-full text-primary/70" />
              </motion.div>
            </div>
            <div className="flex-1 text-sm">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Generating response...
              </motion.span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat Input - Enhanced with better mobile layout */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim() && !isGenerating) {
            onSendMessage(input.trim())
            setInput("")
          }
        }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className={cn(
            "flex-1 px-4 py-2.5 rounded-lg",
            "bg-secondary/5 border border-border/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "transition-all duration-200",
            "placeholder:text-muted-foreground/50",
            "w-full sm:w-auto" // Added for better mobile width
          )}
          disabled={isGenerating}
        />
        <motion.button
          type="submit"
          className={cn(
            "px-4 py-2.5 rounded-lg",
            "bg-primary/90 hover:bg-primary text-primary-foreground",
            "transition-colors duration-200",
            "disabled:opacity-50",
            "shadow-sm hover:shadow-md",
            "w-full sm:w-auto" // Added for better mobile width
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!input.trim() || isGenerating}
        >
          Send
        </motion.button>
      </form>
    </div>
  )
}

// Update the DemoCard component to use these new components
function DemoCard({ item, demoState, updateDemoState }) {
  const {
    isGenerating,
    isPlaying,
    progress,
    currentVariation,
    messages
  } = demoState

  // Handle generation based on type
  const handleGeneration = async () => {
    if (isGenerating) return

    updateDemoState({ 
      isGenerating: true, 
      isPlaying: true,
      progress: 0 
    })

    try {
      // Simulate generation progress
      const duration = 5000
      const interval = 50
      const steps = duration / interval
      let currentProgress = 0

      const progressInterval = setInterval(() => {
        currentProgress += (100 / steps)
        updateDemoState({ progress: Math.min(currentProgress, 100) })
      }, interval)

      await new Promise(resolve => setTimeout(resolve, duration))
      clearInterval(progressInterval)

      // Add demo-specific completion logic
      if (item.demo.type === "chat") {
        updateDemoState({
          messages: [
            ...messages,
            { role: "assistant", content: item.demo.output }
          ]
        })
      }
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      updateDemoState({ 
        isGenerating: false,
        progress: 100
      })
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50",
        "bg-gradient-to-b from-background via-background/95 to-background/90",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "hover:border-primary/20" // Added for better hover effect
      )}
    >
      {/* Card Header - Enhanced */}
      <div className="p-6 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-lg",
              "bg-gradient-to-br",
              item.gradient,
              "shadow-sm"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold tracking-tight">{item.title}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/90">{item.description}</p>
      </div>

      {/* Demo Content - Enhanced */}
      <div className="p-6 pt-3">
        {item.demo.type === "code" && (
          <AnimatedCode
            code={item.demo.output}
            isPlaying={isPlaying}
            language={item.demo.language}
            progress={progress}
          />
        )}

        {item.demo.type === "image" && (
          <ImageGenerationDemo
            image={item.demo.output}
            variations={item.demo.variations}
            isGenerating={isGenerating}
            progress={progress}
            onGenerate={handleGeneration}
          />
        )}

        {item.demo.type === "chat" && (
          <ChatCompletionDemo
            messages={messages || []}
            isGenerating={isGenerating}
            onSendMessage={(message) => {
              updateDemoState({
                messages: [...(messages || []), { role: "user", content: message }]
              })
              handleGeneration()
            }}
          />
        )}

        {/* Generation Controls - Enhanced */}
        <div className="mt-4 flex flex-wrap gap-2">
          <motion.button
            onClick={handleGeneration}
            className={cn(
              "flex items-center justify-center gap-2",
              "px-4 py-2.5 rounded-lg",
              "bg-primary/90 hover:bg-primary text-primary-foreground",
              "text-sm font-medium",
              "shadow-sm hover:shadow-md",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:hover:bg-primary/90 disabled:shadow-none"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate {item.title}</span>
              </>
            )}
          </motion.button>

          {/* Add type-specific controls */}
        </div>
      </div>

      {/* Generation Progress - Enhanced */}
      {isGenerating && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-full bg-primary/10">
            <motion.div
              className="h-full bg-primary/60"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export function AIShowcase() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  // Add state for tracking generation states of all demos
  const [demoStates, setDemoStates] = useState(
    showcaseItems.reduce((acc, _, index) => ({
      ...acc,
      [index]: {
        isGenerating: false,
        isPlaying: false,
        progress: 0,
        currentVariation: 0,
        messages: []
      }
    }), {})
  )

  // Update demo state handler
  const updateDemoState = (index, updates) => {
    setDemoStates(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        ...updates
      }
    }))
  }

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
              demoState={demoStates[index]}
              updateDemoState={(updates) => updateDemoState(index, updates)}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 