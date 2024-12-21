"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code2, Wand2, Copy, Download, Share2, 
  Save, History, Sparkles, Settings,
  Terminal, Braces, FileCode, GitBranch,
  RefreshCcw, Loader2, Languages, Blocks,
  Database, Layout, Server, Globe
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CodeEditor } from "@/components/dashboard/ai-studio/code/editor"
import { CodePromptInput } from "@/components/dashboard/ai-studio/code/prompt-input"
import { CodeLanguageSelector } from "@/components/dashboard/ai-studio/code/language-selector"
import { CodeSettings } from "@/components/dashboard/ai-studio/code/settings"
import { CodeHistory } from "@/components/dashboard/ai-studio/code/history"

export default function CodeGenerationPage() {
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

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedLanguage) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedCode(`// Generated code example
function generateAICode() {
  // Your AI-generated code will appear here
  console.log("Hello from AI!");
}`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="container max-w-7xl space-y-8 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Code Generation</h1>
            <p className="text-muted-foreground">
              Generate high-quality code with AI assistance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-secondary/80 hover:bg-secondary",
                "transition-colors"
              )}
            >
              <History className="h-4 w-4" />
              History
            </button>
            <button
              onClick={() => {}}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-primary text-primary-foreground",
                "hover:opacity-90"
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <CodeLanguageSelector 
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
        />
      </motion.div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        <div className="space-y-6">
          {/* Prompt Input */}
          <CodePromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            selectedLanguage={selectedLanguage}
          />

          {/* Code Editor */}
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

        {/* Right Column - Settings & History */}
        <div className="space-y-6">
          {/* Generation Settings */}
          <CodeSettings 
            settings={settings}
            onSettingsChange={setSettings}
          />

          {/* Recent History */}
          <CodeHistory 
            showHistory={showHistory}
            onToggleHistory={setShowHistory}
            onSelectCode={(item) => {
              setPrompt(item.prompt)
              setGeneratedCode(item.code)
              setSelectedLanguage(item.language)
              setSettings(item.settings)
            }}
          />
        </div>
      </div>
    </div>
  )
} 