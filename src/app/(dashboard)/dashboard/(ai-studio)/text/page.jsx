"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, Wand2, Copy, Download, Share2, 
  Save, History, Sparkles, Settings,
  MessageSquare, RefreshCcw, Loader2, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PromptTemplates } from "@/components/dashboard/ai-studio/text/prompt-templates"
import { PromptSuggestions } from "@/components/dashboard/ai-studio/text/prompt-suggestions"
import { GenerationSettings } from "@/components/dashboard/ai-studio/text/generation-settings"
import { RecentHistory } from "@/components/dashboard/ai-studio/text/recent-history"

export default function TextGenerationPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [settings, setSettings] = useState({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
  })
  const [tone, setTone] = useState("Professional")
  const [savedPrompts, setSavedPrompts] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Add mobile view state
  const [isMobileView, setIsMobileView] = useState(false)

  // Add resize handler
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobileView(width < 1024);
        
        if (width >= 1024) {
          setShowSettings(false);
          setShowHistory(false);
        }
      }, 100);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedText("This is a sample generated text based on your prompt. In a real implementation, this would be the response from your AI model.")
      setIsGenerating(false)
    }, 2000)
  }

  // Handle template selection with prompt suggestions
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    // Reset prompt if changing templates
    if (selectedTemplate?.id !== template.id) {
      setPrompt("")
    }
  }

  // Handle prompt suggestion selection
  const handlePromptSuggestion = (suggestion) => {
    setPrompt(suggestion)
  }

  // Handle saving generated content
  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSavedPrompts([
      {
        id: Date.now(),
        title: prompt.slice(0, 50) + "...",
        preview: generatedText.slice(0, 100) + "...",
        content: generatedText,
        template: selectedTemplate,
        timestamp: new Date().toISOString()
      },
      ...savedPrompts
    ])
    setIsSaving(false)
  }

  // Handle copying to clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedText)
    // Show success toast
  }

  // Handle downloading as file
  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "generated-text.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="container max-w-[1800px] mx-auto p-2 sm:p-3 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              Text Generation
            </h1>
            <p className="text-[13px] sm:text-sm text-muted-foreground">
              Create high-quality content with AI assistance
            </p>
          </div>

          {/* Mobile-optimized action buttons */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => {
                if (isMobileView) {
                  setShowHistory(!showHistory);
                  if (showSettings) setShowSettings(false);
                } else {
                  setShowHistory(prev => !prev);
                  if (showSettings) setShowSettings(false);
                }
              }}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2",
                "bg-secondary/80 hover:bg-secondary",
                "text-xs sm:text-sm font-medium",
                "transition-all duration-200",
                showHistory && "bg-secondary shadow-sm",
                "active:scale-95"
              )}
            >
              <History className="h-3.5 w-3.5" />
              <span>History</span>
            </button>
            <button
              onClick={() => {
                if (isMobileView) {
                  setShowSettings(!showSettings);
                  if (showHistory) setShowHistory(false);
                } else {
                  setShowSettings(prev => !prev);
                  if (showHistory) setShowHistory(false);
                }
              }}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2",
                "bg-primary text-primary-foreground",
                "text-xs sm:text-sm font-medium",
                "transition-all duration-200",
                showSettings && "opacity-90 shadow-sm",
                "active:scale-95"
              )}
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Settings</span>
            </button>
          </div>
        </motion.div>

        {/* Enhanced Main Content Area */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-[1fr,340px] xl:grid-cols-[1fr,380px]">
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Template Selection */}
            <PromptTemplates 
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleTemplateSelect}
            />

            {/* Enhanced Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="rounded-xl border bg-card p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {selectedTemplate && (
                      <div className={cn(
                        "rounded-lg p-1.5 sm:p-2",
                        "bg-primary/10"
                      )}>
                        <selectedTemplate.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                    )}
                    <h3 className="text-sm sm:text-base font-medium">
                      {selectedTemplate ? `${selectedTemplate.name} Prompt` : "Enter Prompt"}
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {prompt.length} / 4000
                  </div>
                </div>

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={selectedTemplate 
                    ? `Write a ${selectedTemplate.name.toLowerCase()}...`
                    : "Enter your prompt here..."
                  }
                  className={cn(
                    "min-h-[150px] sm:min-h-[200px] w-full resize-none rounded-lg p-3 sm:p-4",
                    "bg-background/50 placeholder:text-muted-foreground text-sm sm:text-base",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                  maxLength={4000}
                />

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Estimated time: ~{settings.model === "gpt-4" ? "20-30" : "5-10"} seconds
                    </span>
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 sm:gap-2",
                      "rounded-xl px-3 py-1.5 sm:px-4 sm:py-2",
                      "bg-primary text-primary-foreground",
                      "text-xs sm:text-sm font-medium",
                      "transition-all duration-200",
                      "hover:opacity-90 hover:shadow-md",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "active:scale-95"
                    )}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>Generate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Enhanced Output Area */}
              <AnimatePresence mode="wait">
                {generatedText && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl border bg-card p-3 sm:p-4 space-y-3 sm:space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-medium">Generated Text</h3>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={handleCopy}
                          className={cn(
                            "rounded-lg p-1.5 hover:bg-secondary/80",
                            "text-muted-foreground hover:text-foreground",
                            "transition-colors"
                          )}
                        >
                          <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={handleDownload}
                          className={cn(
                            "rounded-lg p-1.5 hover:bg-secondary/80",
                            "text-muted-foreground hover:text-foreground",
                            "transition-colors"
                          )}
                        >
                          <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={() => {}}
                          className={cn(
                            "rounded-lg p-1.5 hover:bg-secondary/80",
                            "text-muted-foreground hover:text-foreground",
                            "transition-colors"
                          )}
                        >
                          <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {generatedText}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Generated using {settings.model}
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setGeneratedText("")}
                          className={cn(
                            "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                            "rounded-xl px-3 py-1.5 sm:px-4 sm:py-2",
                            "border border-border/50 hover:bg-secondary/80",
                            "text-xs sm:text-sm transition-colors"
                          )}
                        >
                          <RefreshCcw className="h-3.5 w-3.5" />
                          <span>Regenerate</span>
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving}
                          className={cn(
                            "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                            "rounded-xl px-3 py-1.5 sm:px-4 sm:py-2",
                            "bg-primary text-primary-foreground",
                            "text-xs sm:text-sm font-medium",
                            "transition-all duration-200",
                            "hover:opacity-90 hover:shadow-md",
                            "disabled:opacity-50",
                            "active:scale-95"
                          )}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="h-3.5 w-3.5" />
                              <span>Save</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column - Settings & History */}
          <div className={cn(
            "hidden lg:block space-y-6",
            "transition-all duration-300",
            showSettings || showHistory ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <GenerationSettings 
              settings={settings}
              onSettingsChange={setSettings}
              isVisible={showSettings}
              isMobile={false}
            />
            <RecentHistory 
              showHistory={showHistory}
              onToggleHistory={() => {}}
              isMobile={false}
              onSelectHistory={(item) => {
                setPrompt(item.content)
                setSelectedTemplate(item.template)
              }}
            />
          </div>
        </div>

        {/* Mobile Modals */}
        {isMobileView && (
          <>
            <AnimatePresence>
              {showSettings && (
                <div className="fixed inset-0 z-[100]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowSettings(false)}
                  />

                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 20,
                      stiffness: 300,
                      mass: 0.8
                    }}
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "bg-background rounded-t-2xl",
                      "shadow-xl border-t border-border/50",
                      "will-change-transform"
                    )}
                    style={{ maxHeight: "90vh" }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="sticky top-0 z-10 bg-background/95 border-b border-border/50">
                      <div className="flex justify-center py-2">
                        <div className="w-8 h-1 rounded-full bg-border" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Generation Settings</h3>
                        <button
                          onClick={() => setShowSettings(false)}
                          className="p-1.5 rounded-lg hover:bg-secondary/80 text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-y-auto overscroll-contain">
                      <div className="px-4 py-6">
                        <GenerationSettings 
                          settings={settings}
                          onSettingsChange={setSettings}
                          isVisible={showSettings}
                          isMobile={true}
                          onClose={() => setShowSettings(false)}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showHistory && (
                <div className="fixed inset-0 z-[100]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowHistory(false)}
                  />

                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 20,
                      stiffness: 300,
                      mass: 0.8
                    }}
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "bg-background rounded-t-2xl",
                      "shadow-xl border-t border-border/50",
                      "will-change-transform"
                    )}
                    style={{ maxHeight: "90vh" }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="sticky top-0 z-10 bg-background/95 border-b border-border/50">
                      <div className="flex justify-center py-2">
                        <div className="w-8 h-1 rounded-full bg-border" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Recent Generations</h3>
                        <button
                          onClick={() => setShowHistory(false)}
                          className="p-1.5 rounded-lg hover:bg-secondary/80 text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-y-auto overscroll-contain">
                      <div className="px-4 py-6">
                        <RecentHistory 
                          showHistory={showHistory}
                          onToggleHistory={setShowHistory}
                          isMobile={true}
                          onClose={() => setShowHistory(false)}
                          onSelectHistory={(item) => {
                            setPrompt(item.content)
                            setSelectedTemplate(item.template)
                            setShowHistory(false)
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
} 