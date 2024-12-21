"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Wand2, Sparkles, XCircle, 
  MessageSquare, Lightbulb, ArrowRight,
  ChevronDown, ChevronUp, Code2,
  Braces, FileCode, Database,
  Layout, Server, Terminal,
  Loader2, RefreshCcw
} from "lucide-react"
import { cn } from "@/lib/utils"

const promptSuggestions = {
  javascript: [
    "Create a React component for displaying user profile information",
    "Generate a custom hook for handling form validation",
    "Write a utility function for data formatting and validation"
  ],
  python: [
    "Create a FastAPI endpoint for user authentication",
    "Write a data processing function using pandas",
    "Generate a database model class with SQLAlchemy"
  ],
  typescript: [
    "Create an interface for API response data",
    "Generate a custom type guard function",
    "Write a generic utility type for form handling"
  ],
  html: [
    "Create a responsive navigation menu with Tailwind CSS",
    "Generate a contact form with form validation",
    "Design a hero section with modern layout"
  ],
  sql: [
    "Write a query to analyze user engagement metrics",
    "Create a stored procedure for data aggregation",
    "Generate database migration scripts"
  ],
  php: [
    "Create a Laravel controller for user management",
    "Write a service class for external API integration",
    "Generate a middleware for request validation"
  ]
}

export function CodePromptInput({
  prompt,
  onPromptChange,
  isGenerating,
  onGenerate,
  selectedLanguage
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [height, setHeight] = useState("auto")
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight
      setHeight(`${scrollHeight}px`)
    }
  }, [prompt])

  const handlePromptChange = (e) => {
    onPromptChange(e.target.value)
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight
      setHeight(`${scrollHeight}px`)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    onPromptChange(suggestion)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onGenerate()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Prompt Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="font-semibold flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            Describe Your Code
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedLanguage 
              ? `What ${selectedLanguage.name} code would you like to generate?`
              : "Select a language and describe the code you need"}
          </p>
        </div>

        {selectedLanguage && (
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
              "text-sm text-primary hover:underline",
              "transition-colors"
            )}
          >
            <Lightbulb className="h-4 w-4" />
            View Examples
            {showSuggestions ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Prompt Input */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handlePromptChange}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedLanguage
              ? `Describe the ${selectedLanguage.name} code you want to generate...`
              : "First select a language above..."
          }
          style={{ height }}
          disabled={!selectedLanguage || isGenerating}
          className={cn(
            "w-full px-4 py-3 rounded-xl resize-none",
            "bg-background border border-border/50",
            "focus:border-primary focus:ring-1 focus:ring-primary",
            "placeholder:text-muted-foreground",
            "min-h-[100px] transition-all duration-200",
            (!selectedLanguage || isGenerating) && "opacity-50 cursor-not-allowed"
          )}
        />

        {/* Character Count */}
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {prompt.length} / 500
        </div>
      </div>

      {/* Prompt Suggestions */}
      <AnimatePresence>
        {showSuggestions && selectedLanguage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <div className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Example Prompts
            </div>
            <div className="grid gap-2">
              {promptSuggestions[selectedLanguage.id]?.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    "w-full p-3 text-left rounded-lg",
                    "bg-secondary/50 hover:bg-secondary",
                    "border border-border/50",
                    "transition-all duration-200"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <selectedLanguage.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generate Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={onGenerate}
          disabled={!prompt.trim() || !selectedLanguage || isGenerating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl",
            "bg-primary text-primary-foreground",
            "hover:opacity-90 transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "shadow-lg shadow-primary/20"
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
              Generate Code
            </>
          )}
        </motion.button>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="text-center">
        <span className="text-xs text-muted-foreground">
          Press {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} + Enter to generate
        </span>
      </div>
    </motion.div>
  )
} 