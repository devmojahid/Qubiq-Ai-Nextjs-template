"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, Upload, Image as ImageIcon, Plus, 
  X, FileCode, Code2, Layout, Browser,
  Sparkles, Wand2, Loader2, Type,
  Palette, Layers, Sliders, MonitorPlay,
  FileImage, FileText, FolderInput, Link
} from "lucide-react"
import { cn } from "@/lib/utils"

export function WebsiteInput({ 
  prompt, 
  onPromptChange, 
  isGenerating, 
  onGenerate,
  assets,
  onAssetsChange,
  settings 
}) {
  const [showAssets, setShowAssets] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

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
    const newAssets = { ...assets }
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        newAssets.images = [...(newAssets.images || []), {
          id: Date.now(),
          file,
          preview: URL.createObjectURL(file),
          name: file.name
        }]
      } else if (file.type === 'application/json') {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const content = JSON.parse(e.target.result)
            newAssets.content = content
          } catch (error) {
            console.error('Error parsing JSON:', error)
          }
        }
        reader.readAsText(file)
      }
    })
    onAssetsChange(newAssets)
  }

  // Add these features to WebsiteInput:

  // 1. AI-powered prompt suggestions
  const promptSuggestions = [
    "Create a modern e-commerce website with...",
    "Design a portfolio website that...",
    "Build a business landing page with..."
  ]

  // 2. Smart asset organization
  const assetCategories = {
    images: {
      label: "Images",
      accept: "image/*",
      icon: ImageIcon,
      maxSize: 5 * 1024 * 1024 // 5MB
    },
    logos: {
      label: "Logos",
      accept: "image/svg+xml,image/png",
      icon: FileImage,
      maxSize: 2 * 1024 * 1024 // 2MB
    },
    content: {
      label: "Content",
      accept: ".json,.md",
      icon: FileText,
      maxSize: 1 * 1024 * 1024 // 1MB
    }
  }

  // 3. Enhanced drag & drop with progress
  const [uploadProgress, setUploadProgress] = useState({})

  const handleFileUpload = async (files) => {
    for (const file of files) {
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
      
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(r => setTimeout(r, 100))
        setUploadProgress(prev => ({ ...prev, [file.name]: i }))
      }
      
      // Process file
      handleFiles([file])
      
      // Clear progress
      setUploadProgress(prev => {
        const newProgress = { ...prev }
        delete newProgress[file.name]
        return newProgress
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Prompt Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Website Description
          </label>
          <button
            onClick={() => setShowAssets(!showAssets)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-1",
              "text-xs font-medium",
              "transition-colors",
              showAssets
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/80 hover:bg-secondary"
            )}
          >
            <Plus className="h-3 w-3" />
            Add Assets
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Describe your website in detail..."
          rows={3}
          className={cn(
            "w-full rounded-lg bg-secondary/50 p-3",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "resize-none"
          )}
        />
      </div>

      {/* Assets Section */}
      <AnimatePresence>
        {showAssets && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Drag & Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative rounded-lg border-2 border-dashed p-8",
                "flex flex-col items-center justify-center gap-2",
                "transition-colors duration-200",
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-secondary hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              <div className="rounded-full bg-secondary/80 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  Drop your assets here
                </p>
                <p className="text-xs text-muted-foreground">
                  Support images, logos, and content files
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "rounded-lg px-4 py-2",
                  "bg-secondary/80 text-sm",
                  "hover:bg-secondary transition-colors"
                )}
              >
                Choose Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,application/json"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
            </div>

            {/* Assets Preview */}
            <div className="space-y-3">
              {/* Images */}
              {assets.images?.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <FileImage className="h-4 w-4 text-primary" />
                    Images
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {assets.images.map((image) => (
                      <div
                        key={image.id}
                        className="group relative aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="h-full w-full object-cover"
                        />
                        <div className={cn(
                          "absolute inset-0 flex items-center justify-center",
                          "bg-black/60 opacity-0 group-hover:opacity-100",
                          "transition-opacity"
                        )}>
                          <button
                            onClick={() => {
                              onAssetsChange({
                                ...assets,
                                images: assets.images.filter(img => img.id !== image.id)
                              })
                            }}
                            className="rounded-full bg-white/20 p-2 hover:bg-white/40"
                          >
                            <X className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              {assets.content && (
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Content
                  </label>
                  <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <FileCode className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        content.json
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onAssetsChange({
                          ...assets,
                          content: null
                        })
                      }}
                      className="rounded-lg p-2 hover:bg-secondary"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
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
          disabled={isGenerating || !prompt.trim()}
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
              Generate Website
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
} 