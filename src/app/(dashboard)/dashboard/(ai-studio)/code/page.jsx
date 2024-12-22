"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code2, Wand2, Copy, Download, Share2, 
  Save, History, Sparkles, Settings,
  Terminal, Braces, FileCode, GitBranch,
  RefreshCcw, Loader2, Languages, Blocks,
  Database, Layout, Server, Globe, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CodeEditor } from "@/components/dashboard/ai-studio/code/editor"
import { CodePromptInput } from "@/components/dashboard/ai-studio/code/prompt-input"
import { CodeLanguageSelector } from "@/components/dashboard/ai-studio/code/language-selector"
import { CodeSettings } from "@/components/dashboard/ai-studio/code/settings"
import { CodeHistory } from "@/components/dashboard/ai-studio/code/history"

export default function CodeGenerationPage() {
  const [showSettings, setShowSettings] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [settings, setSettings] = useState({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 2000,
    framework: "none",
    style: "modern"
  })
  const [showHistory, setShowHistory] = useState(false)
  const [viewMode, setViewMode] = useState("split") // split, editor, or preview
  const [isMobileView, setIsMobileView] = useState(false)

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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (isMobileView && showHistory) {
      setShowHistory(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (isMobileView && showSettings) {
      setShowSettings(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedLanguage) return
    
    setIsGenerating(true)
    try {
      setTimeout(() => {
        setGeneratedCode(`// Generated code example
function generateAICode() {
  // Your AI-generated code will appear here
  console.log("Hello from AI!");
}`)
        setIsGenerating(false)
      }, 2000)
    } catch (error) {
      console.error('Generation error:', error)
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="container max-w-[1800px] mx-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Enhanced Header Section with better mobile spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Code Generator
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Generate high-quality code with AI assistance
            </p>
          </div>

          {/* Improved mobile action buttons */}
          <div className="flex items-center gap-2 mt-3 sm:mt-0">
            <button
              onClick={toggleHistory}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2",
                "bg-secondary/80 hover:bg-secondary",
                "text-xs sm:text-sm font-medium transition-all duration-200",
                showHistory && "bg-secondary shadow-sm",
                "active:scale-95"
              )}
            >
              <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>History</span>
            </button>
            <button
              onClick={toggleSettings}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2",
                "bg-primary text-primary-foreground",
                "text-xs sm:text-sm font-medium transition-all duration-200",
                showSettings && "opacity-90 shadow-sm",
                "active:scale-95"
              )}
            >
              <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Settings</span>
            </button>
          </div>
        </motion.div>

        {/* Enhanced Main Content Area */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr,340px] xl:grid-cols-[1fr,380px]">
          {/* Left Column - Main Content with better spacing */}
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Language Selection with improved mobile layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <div className="border-b p-3 sm:p-4">
                <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Select Language
                </h3>
              </div>
              <div className="p-3 sm:p-4 overflow-hidden">
                <CodeLanguageSelector 
                  selectedLanguage={selectedLanguage}
                  onSelectLanguage={setSelectedLanguage}
                />
              </div>
            </motion.div>

            {/* Code Generation with improved mobile spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card overflow-hidden"
            >
              <div className="border-b p-3 sm:p-4">
                <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Generate Code
                </h3>
              </div>

              <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
                <CodePromptInput
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  selectedLanguage={selectedLanguage}
                />

                <AnimatePresence mode="wait">
                  {generatedCode && (
                    <CodeEditor
                      code={generatedCode}
                      language={selectedLanguage?.id || "javascript"}
                      viewMode={viewMode}
                      onViewModeChange={setViewMode}
                      isGenerating={isGenerating}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Column with improved desktop layout */}
          <div className="hidden lg:block space-y-6">
            <CodeSettings 
              settings={settings}
              onSettingsChange={setSettings}
              isVisible={true}
              isMobile={false}
            />
            <CodeHistory 
              showHistory={true}
              onToggleHistory={() => {}}
              isMobile={false}
              onSelectCode={(item) => {
                setPrompt(item.prompt)
                setGeneratedCode(item.code)
                setSelectedLanguage(item.language)
                setSettings(item.settings)
              }}
            />
          </div>
        </div>

        {/* Enhanced Mobile Modals with better animations and interactions */}
        {isMobileView && (
          <>
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/60 lg:hidden"
                  onClick={() => setShowSettings(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 25, 
                      stiffness: 300,
                      mass: 0.8 
                    }}
                    className={cn(
                      "fixed inset-x-0 bottom-0 z-[101]",
                      "rounded-t-2xl bg-background",
                      "overflow-hidden shadow-xl",
                      "border-t border-border/50"
                    )}
                    style={{ maxHeight: "calc(100vh - 2rem)" }}
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Modal Handle */}
                    <div className="absolute top-0 inset-x-0 flex justify-center">
                      <div className="w-12 h-1.5 rounded-full bg-muted my-2" />
                    </div>

                    <div className={cn(
                      "overflow-y-auto overscroll-contain",
                      "pt-6 pb-8 px-4 sm:px-6"
                    )} 
                      style={{ maxHeight: "calc(100vh - 2rem)" }}
                    >
                      <CodeSettings 
                        settings={settings}
                        onSettingsChange={setSettings}
                        isVisible={showSettings}
                        isMobile={true}
                        onClose={() => setShowSettings(false)}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/60 lg:hidden"
                  onClick={() => setShowHistory(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 25, 
                      stiffness: 300,
                      mass: 0.8 
                    }}
                    className={cn(
                      "fixed inset-x-0 bottom-0 z-[101]",
                      "rounded-t-2xl bg-background",
                      "overflow-hidden shadow-xl",
                      "border-t border-border/50"
                    )}
                    style={{ maxHeight: "calc(100vh - 2rem)" }}
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Modal Handle */}
                    <div className="absolute top-0 inset-x-0 flex justify-center">
                      <div className="w-12 h-1.5 rounded-full bg-muted my-2" />
                    </div>

                    <div className={cn(
                      "overflow-y-auto overscroll-contain",
                      "pt-6 pb-8 px-4 sm:px-6"
                    )}
                      style={{ maxHeight: "calc(100vh - 2rem)" }}
                    >
                      <CodeHistory 
                        showHistory={showHistory}
                        onToggleHistory={setShowHistory}
                        isMobile={true}
                        onClose={() => setShowHistory(false)}
                        onSelectCode={(item) => {
                          setPrompt(item.prompt)
                          setGeneratedCode(item.code)
                          setSelectedLanguage(item.language)
                          setSettings(item.settings)
                          setShowHistory(false)
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
} 