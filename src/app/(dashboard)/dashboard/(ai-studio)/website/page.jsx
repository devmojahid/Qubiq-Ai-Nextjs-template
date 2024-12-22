"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, Wand2, Save, History, Settings, 
  Loader2, Eye, Code2, Layout,
  RefreshCcw, Download, Share2, Browser,
  Sparkles, Clock, Maximize2, Minimize2,
  Palette, Layers, Sliders, MonitorPlay,
  Smartphone, Tablet, Laptop, Desktop,
  FileCode, Image, Type, Box, ChevronDown, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { WebsiteInput } from "@/components/dashboard/ai-studio/website/website-input"
import { WebsitePreview } from "@/components/dashboard/ai-studio/website/website-preview"
import { WebsiteSettings } from "@/components/dashboard/ai-studio/website/settings"
import { WebsiteHistory } from "@/components/dashboard/ai-studio/website/history"
import { WebsiteTemplates } from "@/components/dashboard/ai-studio/website/templates"

const isValidPath = (path) => {
  try {
    return Boolean(path && typeof path === 'string' && path.trim().length > 0);
  } catch (error) {
    return false;
  }
};

const safeIncludes = (str, searchStr) => {
  try {
    if (!str || typeof str !== 'string') return false;
    if (!searchStr || typeof searchStr !== 'string') return false;
    return str.includes(searchStr);
  } catch (error) {
    return false;
  }
};

export default function WebsiteGenerationPage() {
  const [isMobileView, setIsMobileView] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedWebsites, setGeneratedWebsites] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [settings, setSettings] = useState({
    framework: "next-js",
    style: "modern",
    responsive: true,
    darkMode: true,
    animations: true,
    seo: true,
    features: [],
    paths: [],
    components: [],
    integrations: [],
    deployment: {
      platform: "vercel",
      region: "auto"
    }
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedWebsite, setSelectedWebsite] = useState(null)
  const [previewDevice, setPreviewDevice] = useState("desktop")
  const [pathError, setPathError] = useState(false)

  // Enhanced window resize handler
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobileView(width < 1024);
        
        // Auto-adjust preview device based on screen size
        if (width < 640) {
          setPreviewDevice('mobile');
        } else if (width < 1024) {
          setPreviewDevice('tablet');
        } else {
          setPreviewDevice('desktop');
        }

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

  // Enhanced generate handler
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setPathError(false);

    try {
      // Validate paths before generation
      if (!isValidPath(prompt)) {
        throw new Error('Invalid path specified');
      }

      // Simulate API call with better error handling
      setTimeout(() => {
        const newWebsite = {
          id: Date.now(),
          prompt,
          settings,
          preview: "https://source.unsplash.com/random/1920x1080?website",
          timestamp: new Date().toISOString(),
          path: prompt.toLowerCase().replace(/\s+/g, '-'),
          status: 'completed'
        };

        setGeneratedWebsites(prev => [newWebsite, ...prev]);
        setIsGenerating(false);
      }, 5000);
    } catch (error) {
      console.error('Generation error:', error);
      setIsGenerating(false);
      setPathError(true);
    }
  };

  // Add device preview controls
  const handleDeviceChange = (device) => {
    setPreviewDevice(device);
    // Adjust preview size based on device
    if (device === 'mobile') {
      // Mobile preview settings
    } else if (device === 'tablet') {
      // Tablet preview settings
    } else {
      // Desktop preview settings
    }
  };

  // Add safe path check for navigation
  const handleHistorySelect = (website) => {
    try {
      // Ensure website object exists
      if (!website || typeof website !== 'object') {
        console.warn('Invalid website data');
        return;
      }

      // Safely update state
      if (website.prompt) setPrompt(website.prompt);
      if (website.settings) setSettings(prev => ({ ...prev, ...website.settings }));
      setSelectedWebsite(website);
      
      // Close history modal on mobile
      if (isMobileView) setShowHistory(false);
    } catch (error) {
      console.error('Error selecting website:', error);
    }
  };

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
              AI Website Generator
            </h1>
            <p className="text-[13px] sm:text-sm text-muted-foreground">
              Create stunning websites with AI-powered generation
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
                "active:scale-95",
                "relative overflow-hidden"
              )}
            >
              <History className="h-3.5 w-3.5" />
              <span>History</span>
              {!isMobileView && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center"
                >
                  <ChevronDown 
                    className={cn(
                      "h-3 w-3 transition-transform",
                      showHistory && "rotate-180"
                    )} 
                  />
                </motion.span>
              )}
            </button>
            <button
              onClick={() => {
                try {
                  if (isMobileView) {
                    setShowSettings(prev => !prev);
                    if (showHistory) setShowHistory(false);
                  } else {
                    setShowSettings(prev => !prev);
                    if (showHistory) setShowHistory(false);
                  }
                } catch (error) {
                  console.error('Error toggling settings:', error);
                }
              }}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2",
                "bg-primary text-primary-foreground",
                "text-xs sm:text-sm font-medium",
                "transition-all duration-200",
                showSettings && "opacity-90 shadow-sm",
                "active:scale-95",
                "relative overflow-hidden"
              )}
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Settings</span>
              {!isMobileView && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center"
                >
                  <ChevronDown 
                    className={cn(
                      "h-3 w-3 transition-transform",
                      showSettings && "rotate-180"
                    )} 
                  />
                </motion.span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Enhanced Main Content Area */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-[1fr,340px] xl:grid-cols-[1fr,380px]">
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Website Generation with error handling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-xl border bg-card overflow-hidden",
                pathError && "border-red-500/50"
              )}
            >
              <div className="border-b p-3 sm:p-4">
                <h3 className="font-medium sm:font-semibold flex items-center gap-2 text-sm sm:text-base">
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Generate Website
                </h3>
              </div>

              <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
                <WebsiteInput
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  settings={settings}
                  error={pathError}
                  onErrorClear={() => setPathError(false)}
                />

                {/* Enhanced Preview Section */}
                <AnimatePresence mode="wait">
                  {(isGenerating || generatedWebsites.length > 0) && (
                    <WebsitePreview
                      websites={generatedWebsites}
                      isGenerating={isGenerating}
                      selectedWebsite={selectedWebsite}
                      onSelectWebsite={setSelectedWebsite}
                      previewDevice={previewDevice}
                      onDeviceChange={handleDeviceChange}
                      settings={settings}
                      isMobile={isMobileView}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Right Column */}
          <div className={cn(
            "hidden lg:block space-y-6",
            "transition-all duration-300",
            showSettings || showHistory ? "opacity-100" : "opacity-0 pointer-events-none",
            "will-change-transform"
          )}>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <WebsiteSettings 
                  settings={{
                    ...settings,
                    features: settings.features || [],
                    paths: settings.paths || [],
                    components: settings.components || [],
                    integrations: settings.integrations || [],
                    deployment: settings.deployment || { platform: "vercel", region: "auto" }
                  }}
                  onSettingsChange={(newSettings) => {
                    setSettings(prev => ({
                      ...prev,
                      ...newSettings,
                      features: newSettings.features || prev.features || [],
                      paths: newSettings.paths || prev.paths || [],
                      components: newSettings.components || prev.components || [],
                      integrations: newSettings.integrations || prev.integrations || [],
                      deployment: newSettings.deployment || prev.deployment || { platform: "vercel", region: "auto" }
                    }))
                  }}
                  isVisible={true}
                  isMobile={isMobileView}
                  onClose={() => setShowSettings(false)}
                />
              </motion.div>
            )}
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <WebsiteHistory 
                  showHistory={true}
                  onToggleHistory={() => {}}
                  isMobile={false}
                  onSelectWebsite={handleHistorySelect}
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Modals */}
        {isMobileView && (
          <>
            <AnimatePresence mode="wait">
              {showSettings && (
                <div className="fixed inset-0 z-[100]">
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowSettings(false)}
                  />

                  {/* Modal */}
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
                    {/* Modal Handle */}
                    <div className="sticky top-0 z-10 bg-background/95 border-b border-border/50">
                      <div className="flex justify-center py-2">
                        <div className="w-8 h-1 rounded-full bg-border" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Website Settings</h3>
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
                        <WebsiteSettings 
                          settings={{
                            ...settings,
                            features: settings.features || [],
                            paths: settings.paths || [],
                            components: settings.components || [],
                            integrations: settings.integrations || [],
                            deployment: settings.deployment || { platform: "vercel", region: "auto" }
                          }}
                          onSettingsChange={(newSettings) => {
                            setSettings(prev => ({
                              ...prev,
                              ...newSettings,
                              features: newSettings.features || prev.features || [],
                              paths: newSettings.paths || prev.paths || [],
                              components: newSettings.components || prev.components || [],
                              integrations: newSettings.integrations || prev.integrations || [],
                              deployment: newSettings.deployment || prev.deployment || { platform: "vercel", region: "auto" }
                            }))
                          }}
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

            <AnimatePresence mode="wait">
              {showHistory && (
                <div className="fixed inset-0 z-[100]">
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowHistory(false)}
                  />

                  {/* Modal */}
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
                    {/* Modal Handle */}
                    <div className="sticky top-0 z-10 bg-background/95 border-b border-border/50">
                      <div className="flex justify-center py-2">
                        <div className="w-8 h-1 rounded-full bg-border" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Website History</h3>
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
                        <WebsiteHistory 
                          showHistory={showHistory}
                          onToggleHistory={setShowHistory}
                          isMobile={true}
                          onClose={() => setShowHistory(false)}
                          onSelectWebsite={handleHistorySelect}
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