"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, Sliders, Layout, Code2,
  Smartphone, Laptop, Palette, Layers,
  Settings, Monitor, Sparkles, Zap,
  FileCode, Chrome, Blocks, Box,
  Braces, Cpu, Paintbrush, Eye,
  Search, Share2, Database, Lock,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

const frameworks = [
  {
    id: "next-js",
    name: "Next.js",
    description: "React framework with SSR and routing",
    icon: Zap
  },
  {
    id: "react",
    name: "React",
    description: "Component-based UI library",
    icon: Blocks
  },
  {
    id: "vue",
    name: "Vue.js",
    description: "Progressive JavaScript framework",
    icon: Box
  }
]

const styles = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design",
    icon: Monitor
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant layout",
    icon: Layout
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique and artistic design",
    icon: Paintbrush
  }
]

const features = [
  { id: "responsive", label: "Responsive Design", icon: Smartphone },
  { id: "animations", label: "Smooth Animations", icon: Sparkles },
  { id: "dark-mode", label: "Dark Mode", icon: Eye },
  { id: "seo", label: "SEO Optimization", icon: Search },
  { id: "social", label: "Social Sharing", icon: Share2 },
  { id: "api", label: "API Integration", icon: Database },
  { id: "auth", label: "Authentication", icon: Lock }
]

const components = [
  { id: "header", label: "Header", icon: Chrome },
  { id: "hero", label: "Hero Section", icon: Layout },
  { id: "features", label: "Features Grid", icon: Blocks },
  { id: "gallery", label: "Image Gallery", icon: Palette },
  { id: "pricing", label: "Pricing Table", icon: Database },
  { id: "testimonials", label: "Testimonials", icon: Share2 },
  { id: "contact", label: "Contact Form", icon: Box },
  { id: "footer", label: "Footer", icon: Layout }
]

const presets = {
  performance: {
    minify: true,
    lazyLoad: true,
    compression: "aggressive"
  },
  accessibility: {
    aria: true,
    contrast: "high",
    keyboard: true
  },
  seo: {
    meta: true,
    sitemap: true,
    schema: true
  }
}

const advancedOptions = {
  caching: ["Browser", "CDN", "Service Worker"],
  rendering: ["CSR", "SSR", "SSG", "ISR"],
  deployment: ["Vercel", "Netlify", "Custom"]
}

const performanceBudgets = {
  js: 200 * 1024, // 200KB
  css: 50 * 1024, // 50KB
  images: 500 * 1024 // 500KB
}

export function WebsiteSettings({ settings, onSettingsChange, isVisible }) {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const toggleFeature = (featureId) => {
    const newFeatures = settings.features.includes(featureId)
      ? settings.features.filter(id => id !== featureId)
      : [...settings.features, featureId]
    handleChange("features", newFeatures)
  }

  const toggleComponent = (componentId) => {
    const newComponents = settings.components.includes(componentId)
      ? settings.components.filter(id => id !== componentId)
      : [...settings.components, componentId]
    handleChange("components", newComponents)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="rounded-xl border bg-card overflow-hidden"
        >
          <div className="border-b p-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              Website Settings
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize your website generation
            </p>
          </div>

          <div className="p-4 space-y-6">
            {/* Framework Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Framework</label>
              <div className="grid gap-2">
                {frameworks.map((framework) => (
                  <button
                    key={framework.id}
                    onClick={() => handleChange("framework", framework.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg p-3",
                      "border-2 text-left transition-all duration-200",
                      settings.framework === framework.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <div className={cn(
                      "rounded-lg p-2",
                      "bg-primary/10 text-primary"
                    )}>
                      <framework.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{framework.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {framework.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Design Style</label>
              <div className="grid grid-cols-3 gap-2">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleChange("style", style.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg p-3",
                      "border-2 text-center transition-all duration-200",
                      settings.style === style.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <style.icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{style.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {style.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Features</label>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.features.includes(feature.id)
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Components Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Components</label>
              <div className="grid grid-cols-2 gap-2">
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => toggleComponent(component.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg p-3",
                      "border-2 transition-all duration-200",
                      settings.components.includes(component.id)
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                    )}
                  >
                    <component.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm">{component.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Settings */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Additional Settings</label>
              <div className="space-y-2">
                {/* Theme Toggle */}
                <button
                  onClick={() => handleChange("theme", settings.theme === "light" ? "dark" : "light")}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.theme === "dark"
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Dark Theme</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.theme === "dark" ? "Enabled" : "Disabled"}
                  </div>
                </button>

                {/* Animations Toggle */}
                <button
                  onClick={() => handleChange("animations", !settings.animations)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.animations
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Animations</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.animations ? "Enabled" : "Disabled"}
                  </div>
                </button>

                {/* SEO Toggle */}
                <button
                  onClick={() => handleChange("seo", !settings.seo)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg p-3",
                    "border-2 transition-all duration-200",
                    settings.seo
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span>SEO Optimization</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {settings.seo ? "Enabled" : "Disabled"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MobileSettingsPanel({ settings, onSettingsChange, onClose }) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-background border-t"
      style={{ maxHeight: "80vh" }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Website Settings</h3>
        <button onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto">
        {/* Existing settings content */}
      </div>
    </motion.div>
  )
} 