"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, Wand2, Copy, Download, Share2, 
  Save, History, Sparkles, Settings,
  MessageSquare, RefreshCcw, Loader2
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
    <div className="max-w-full space-y-8 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Text Generation</h1>
          <p className="text-muted-foreground">
            Create high-quality content with AI assistance
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {}}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl",
              "bg-secondary/80 px-4 py-2 text-sm font-medium",
              "hover:bg-secondary transition-colors"
            )}
          >
            <History className="h-4 w-4" />
            History
          </button>
          <button
            onClick={() => {}}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl",
              "bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </motion.div>

      {/* Template Selection */}
      <PromptTemplates 
        selectedTemplate={selectedTemplate}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Main Content Area */}
      <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
        <div className="space-y-6">
          {/* Prompt Suggestions */}
          {selectedTemplate && (
            <PromptSuggestions
              template={selectedTemplate}
              onSelectPrompt={handlePromptSuggestion}
            />
          )}

          {/* Enhanced Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {selectedTemplate && (
                    <div className={cn(
                      "rounded-lg p-2",
                      "bg-primary/10"
                    )}>
                      <selectedTemplate.icon className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <h3 className="font-medium">
                    {selectedTemplate ? `${selectedTemplate.name} Prompt` : "Enter Prompt"}
                  </h3>
                </div>
                <div className="text-sm text-muted-foreground">
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
                  "min-h-[200px] w-full resize-none rounded-lg p-4",
                  "bg-background/50 placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20"
                )}
                maxLength={4000}
              />

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Estimated time: ~{settings.model === "gpt-4" ? "20-30" : "5-10"} seconds
                  </span>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl",
                    "bg-primary px-4 py-2 text-sm font-medium",
                    "text-primary-foreground shadow-sm",
                    "transition-all duration-200",
                    "hover:opacity-90 hover:shadow-md",
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
                      Generate
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
                  className="rounded-xl border bg-card p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Generated Text</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className={cn(
                          "rounded-lg p-2 hover:bg-secondary/80",
                          "text-muted-foreground hover:text-foreground",
                          "transition-colors"
                        )}
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleDownload}
                        className={cn(
                          "rounded-lg p-2 hover:bg-secondary/80",
                          "text-muted-foreground hover:text-foreground",
                          "transition-colors"
                        )}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {}}
                        className={cn(
                          "rounded-lg p-2 hover:bg-secondary/80",
                          "text-muted-foreground hover:text-foreground",
                          "transition-colors"
                        )}
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {generatedText}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Generated using {settings.model}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setGeneratedText("")}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl",
                          "border border-border/50 px-4 py-2 text-sm",
                          "hover:bg-secondary/80 transition-colors"
                        )}
                      >
                        <RefreshCcw className="h-4 w-4" />
                        Regenerate
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl",
                          "bg-primary px-4 py-2 text-sm font-medium",
                          "text-primary-foreground shadow-sm",
                          "hover:opacity-90 hover:shadow-md",
                          "disabled:opacity-50"
                        )}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save
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
        <div className="space-y-6">
          {/* Generation Settings */}
          <GenerationSettings 
            settings={settings}
            onSettingsChange={setSettings}
          />

          {/* Recent History */}
          <RecentHistory 
            onSelectHistory={(item) => {
              setPrompt(item.content)
              setSelectedTemplate(item.template)
            }}
            showHistory={showHistory}
            onToggleHistory={setShowHistory}
          />
        </div>
      </div>
    </div>
  )
} 