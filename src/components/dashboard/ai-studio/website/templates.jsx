"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, Layout, Code2, Eye,
  Smartphone, Laptop, Palette, Layers,
  Monitor, Sparkles, Zap, Box,
  Browser, Blocks, FileCode, Search,
  Share2, ShoppingCart, Briefcase,
  Camera, Book, Newspaper, Coffee,
  Store, Rocket, Heart, Star
} from "lucide-react"
import { cn } from "@/lib/utils"

const templates = [
  {
    id: "ecommerce",
    category: "Business",
    title: "E-commerce Store",
    description: "Modern online store with product showcase and cart",
    preview: {
      desktop: "/previews/ecommerce-desktop.png",
      tablet: "/previews/ecommerce-tablet.png",
      mobile: "/previews/ecommerce-mobile.png"
    },
    icon: ShoppingCart,
    prompt: "Create a modern e-commerce website with product grid, cart, and checkout",
    settings: {
      framework: "next-js",
      style: "modern",
      features: ["responsive", "dark-mode", "animations"],
      components: ["header", "hero", "products", "cart", "footer"]
    }
  },
  {
    id: "portfolio",
    category: "Personal",
    title: "Portfolio",
    description: "Showcase your work with style",
    preview: {
      desktop: "/previews/portfolio-desktop.png",
      tablet: "/previews/portfolio-tablet.png",
      mobile: "/previews/portfolio-mobile.png"
    },
    icon: Briefcase,
    prompt: "Generate a creative portfolio website with project gallery and about section",
    settings: {
      framework: "react",
      style: "minimal",
      features: ["animations", "dark-mode"],
      components: ["header", "about", "projects", "contact"]
    }
  },
  {
    id: "blog",
    category: "Content",
    title: "Blog Platform",
    description: "Share your stories and articles",
    preview: {
      desktop: "/previews/blog-desktop.png",
      tablet: "/previews/blog-tablet.png",
      mobile: "/previews/blog-mobile.png"
    },
    icon: Newspaper,
    prompt: "Design a blog website with article grid and reading experience",
    settings: {
      framework: "next-js",
      style: "minimal",
      features: ["seo", "dark-mode"],
      components: ["header", "posts", "sidebar", "newsletter"]
    }
  },
  {
    id: "startup",
    category: "Business",
    title: "Startup Landing",
    description: "Launch your product or service",
    preview: {
      desktop: "/previews/startup-desktop.png",
      tablet: "/previews/startup-tablet.png",
      mobile: "/previews/startup-mobile.png"
    },
    icon: Rocket,
    prompt: "Create a startup landing page with features and pricing",
    settings: {
      framework: "next-js",
      style: "modern",
      features: ["animations", "seo"],
      components: ["header", "hero", "features", "pricing"]
    }
  }
]

const categories = [
  { id: "all", label: "All Templates", icon: Sparkles },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "personal", label: "Personal", icon: Heart },
  { id: "content", label: "Content", icon: Newspaper },
  { id: "creative", label: "Creative", icon: Palette }
]

// Add these features to WebsiteTemplates:

// 1. Advanced filtering
const filterOptions = {
  industry: ["E-commerce", "Portfolio", "Business", "Blog"],
  complexity: ["Simple", "Moderate", "Complex"],
  purpose: ["Lead Generation", "Sales", "Information", "Personal"]
}

// 2. Template combinations
const generateTemplateCombinations = (template) => {
  return {
    light: { ...template, theme: "light" },
    dark: { ...template, theme: "dark" },
    minimal: { ...template, style: "minimal" },
    modern: { ...template, style: "modern" }
  }
}

// 3. Template preview modes
const previewModes = {
  static: "Static Preview",
  interactive: "Interactive Demo",
  code: "Source Code"
}

export function WebsiteTemplates({ selectedTemplate, onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredTemplate, setHoveredTemplate] = useState(null)
  const [viewMode, setViewMode] = useState("desktop")

  const filteredTemplates = templates.filter(template => 
    selectedCategory === "all" || 
    template.category.toLowerCase() === selectedCategory.toLowerCase()
  )

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          Website Templates
        </h3>
        <p className="text-sm text-muted-foreground">
          Start with a pre-designed template
        </p>
      </div>

      {/* Category Selection */}
      <div className="border-b overflow-x-auto">
        <div className="flex p-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                "transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
              )}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="border-b p-2">
        <div className="flex justify-end gap-1">
          {[
            { id: "mobile", icon: Smartphone },
            { id: "tablet", icon: Laptop },
            { id: "desktop", icon: Monitor }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === mode.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
            >
              <mode.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "group relative rounded-lg overflow-hidden",
              "border bg-card transition-all duration-200",
              selectedTemplate?.id === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "hover:border-primary/50"
            )}
          >
            {/* Template Preview */}
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "rounded-lg p-2",
                    "bg-primary/10 text-primary"
                  )}>
                    <template.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{template.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSelectTemplate(template)}
                    className={cn(
                      "rounded-lg p-2",
                      "bg-primary/10 text-primary",
                      "hover:bg-primary/20 transition-colors"
                    )}
                  >
                    <Eye className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Preview Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary/20">
                <img
                  src={template.preview[viewMode]}
                  alt={template.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className={cn(
                        "rounded-lg px-4 py-2",
                        "bg-primary text-primary-foreground",
                        "hover:opacity-90 transition-opacity"
                      )}
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {template.settings.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-full bg-secondary/50 px-2 py-1 text-xs"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 