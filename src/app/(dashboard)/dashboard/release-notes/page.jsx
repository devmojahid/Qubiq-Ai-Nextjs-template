"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Rocket, Star, Bug, Zap, Gift, 
  Sparkles, Clock, Calendar, Tag,
  FileText, Code2, Layout, Palette,
  Shield, Cpu, Wrench, MessageSquare,
  CheckCircle2, AlertCircle, InfoIcon,
  ArrowRight, ChevronDown, ChevronUp,
  BookOpen, GitBranch, GitCommit,
  Eye, X, SearchX, Plus, Minus, FileEdit,
  ChevronLeft, ChevronRight, Brain, Globe,
  Moon, Smartphone, Activity, Database,
  Building, Users, Lock, Archive, AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

// Release data structure
const releases = [
  {
    version: "v2.1.0",
    date: "2024-03-15",
    type: "major",
    title: "AI Model Upgrades & New Features",
    description: "Major improvements to AI models and new creative tools",
    badge: { text: "Latest", variant: "purple" },
    changes: [
      {
        type: "feature",
        title: "GPT-4 Turbo Integration",
        description: "Upgraded to the latest GPT-4 Turbo model for better text generation",
        icon: Sparkles,
        technical: true
      },
      {
        type: "improvement",
        title: "Enhanced Image Generation",
        description: "Improved image quality and generation speed with optimized DALL-E models",
        icon: Zap
      },
      {
        type: "bugfix",
        title: "Fixed Memory Leak",
        description: "Resolved memory usage issues in long-running sessions",
        icon: Bug,
        technical: true
      }
    ]
  },
  {
    version: "v2.0.5",
    date: "2024-03-01",
    type: "patch",
    title: "Performance Optimizations",
    description: "Various performance improvements and bug fixes",
    changes: [
      {
        type: "improvement",
        title: "Faster Response Times",
        description: "Optimized API response times by 40%",
        icon: Zap,
        technical: true
      },
      {
        type: "bugfix",
        title: "UI Fixes",
        description: "Fixed various UI inconsistencies in dark mode",
        icon: Bug
      }
    ]
  },
  {
    version: "v2.0.4",
    date: "2024-02-15",
    type: "feature",
    title: "AI Assistant Improvements",
    description: "Enhanced AI capabilities and new assistant features",
    changes: [
      {
        type: "feature",
        title: "Context-Aware Responses",
        description: "AI assistant now maintains conversation context for more natural interactions",
        icon: Brain,
        technical: true
      },
      {
        type: "improvement",
        title: "Response Speed",
        description: "Optimized response generation for faster conversations",
        icon: Zap
      },
      {
        type: "feature",
        title: "Multi-Language Support",
        description: "Added support for 10 new languages",
        icon: Globe
      }
    ]
  },
  {
    version: "v2.0.3",
    date: "2024-02-01",
    type: "security",
    title: "Security Updates & Performance",
    description: "Critical security patches and performance improvements",
    changes: [
      {
        type: "improvement",
        title: "Enhanced Encryption",
        description: "Upgraded encryption protocols for better data security",
        icon: Shield,
        technical: true
      },
      {
        type: "bugfix",
        title: "Memory Optimization",
        description: "Fixed memory leaks in long-running processes",
        icon: Cpu,
        technical: true
      }
    ]
  },
  {
    version: "v2.0.2",
    date: "2024-01-15",
    type: "feature",
    title: "New UI Components",
    description: "Added new UI components and improved existing ones",
    changes: [
      {
        type: "feature",
        title: "Dark Mode Improvements",
        description: "Enhanced dark mode with better contrast and accessibility",
        icon: Moon
      },
      {
        type: "improvement",
        title: "Component Library",
        description: "Added 15 new reusable components",
        icon: Layout
      },
      {
        type: "bugfix",
        title: "Mobile Responsiveness",
        description: "Fixed various mobile layout issues",
        icon: Smartphone
      }
    ]
  },
  {
    version: "v2.0.1",
    date: "2024-01-01",
    type: "patch",
    title: "Bug Fixes & Optimizations",
    description: "Various bug fixes and performance optimizations",
    changes: [
      {
        type: "bugfix",
        title: "API Rate Limiting",
        description: "Fixed issues with API rate limiting",
        icon: Activity,
        technical: true
      },
      {
        type: "improvement",
        title: "Cache Management",
        description: "Improved cache management for better performance",
        icon: Database,
        technical: true
      }
    ]
  },
  {
    version: "v2.0.0",
    date: "2023-12-15",
    type: "major",
    title: "Major Platform Update",
    description: "Complete platform overhaul with new features",
    changes: [
      {
        type: "feature",
        title: "New Architecture",
        description: "Completely rebuilt architecture for better scalability",
        icon: Building,
        technical: true
      },
      {
        type: "feature",
        title: "Real-time Collaboration",
        description: "Added real-time collaboration features",
        icon: Users
      },
      {
        type: "improvement",
        title: "Authentication System",
        description: "Enhanced authentication with multi-factor support",
        icon: Lock,
        technical: true
      }
    ]
  }
]

// Change type configurations
const changeTypes = {
  feature: {
    icon: Star,
    color: "text-green-500",
    badge: "New Feature",
    bgColor: "bg-green-500/10"
  },
  improvement: {
    icon: Zap,
    color: "text-blue-500",
    badge: "Enhancement",
    bgColor: "bg-blue-500/10"
  },
  bugfix: {
    icon: Bug,
    color: "text-red-500",
    badge: "Bug Fix",
    bgColor: "bg-red-500/10"
  },
  security: {
    icon: Shield,
    color: "text-orange-500",
    badge: "Security",
    bgColor: "bg-orange-500/10"
  },
  breaking: {
    icon: AlertTriangle,
    color: "text-red-500",
    badge: "Breaking Change",
    bgColor: "bg-red-500/10"
  },
  deprecated: {
    icon: Archive,
    color: "text-yellow-500",
    badge: "Deprecated",
    bgColor: "bg-yellow-500/10"
  }
}

const ReleaseStats = ({ release }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-secondary/50 mt-4">
    <div className="space-y-1 text-center">
      <div className="text-2xl font-bold text-primary">{release.changes.filter(c => c.type === 'feature').length}</div>
      <div className="text-xs text-muted-foreground">New Features</div>
    </div>
    <div className="space-y-1 text-center">
      <div className="text-2xl font-bold text-blue-500">{release.changes.filter(c => c.type === 'improvement').length}</div>
      <div className="text-xs text-muted-foreground">Improvements</div>
    </div>
    <div className="space-y-1 text-center">
      <div className="text-2xl font-bold text-red-500">{release.changes.filter(c => c.type === 'bugfix').length}</div>
      <div className="text-xs text-muted-foreground">Bug Fixes</div>
    </div>
    <div className="space-y-1 text-center">
      <div className="text-2xl font-bold text-purple-500">{release.changes.filter(c => c.technical).length}</div>
      <div className="text-xs text-muted-foreground">Technical Updates</div>
    </div>
  </div>
)

// Add these animation configurations
const pageTransition = {
  type: "tween",
  duration: 0.2,
  ease: "easeOut"
}

const staggerDelay = 0.05

// Add this component for better version comparison
const VersionComparison = ({ currentVersion, previousVersion }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="rounded-xl border bg-card p-4 mt-4"
  >
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-medium">Changes from {previousVersion}</h4>
      <button className="text-xs text-primary hover:underline">View Full Diff</button>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <Plus className="h-4 w-4 text-green-500" />
        <span>12 additions</span>
      </div>
      <div className="flex items-center gap-2">
        <Minus className="h-4 w-4 text-red-500" />
        <span>5 removals</span>
      </div>
      <div className="flex items-center gap-2">
        <FileEdit className="h-4 w-4 text-blue-500" />
        <span>8 files changed</span>
      </div>
    </div>
  </motion.div>
)

// Add this component for better version navigation
const VersionNavigation = ({ versions, currentVersion, onVersionChange }) => (
  <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 rounded-xl mb-6">
    <button
      onClick={() => onVersionChange(versions[versions.indexOf(currentVersion) + 1])}
      disabled={versions.indexOf(currentVersion) === versions.length - 1}
      className={cn(
        "flex items-center gap-1 text-sm",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    >
      <ChevronLeft className="h-4 w-4" />
      Older
    </button>
    <select
      value={currentVersion}
      onChange={(e) => onVersionChange(e.target.value)}
      className="text-sm bg-transparent"
    >
      {versions.map(v => (
        <option key={v} value={v}>{v}</option>
      ))}
    </select>
    <button
      onClick={() => onVersionChange(versions[versions.indexOf(currentVersion) - 1])}
      disabled={versions.indexOf(currentVersion) === 0}
      className={cn(
        "flex items-center gap-1 text-sm",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    >
      Newer
      <ChevronRight className="h-4 w-4" />
    </button>
  </div>
)

// Add this helper function for version comparison
const compareVersions = (v1, v2) => {
  const normalize = v => v.replace('v', '').split('.').map(Number)
  const [major1, minor1, patch1] = normalize(v1)
  const [major2, minor2, patch2] = normalize(v2)
  
  if (major1 !== major2) return major2 - major1
  if (minor1 !== minor2) return minor2 - minor1
  return patch2 - patch1
}

// Add this function to get version type color
const getVersionTypeColor = (type) => {
  const types = {
    major: "text-purple-500",
    feature: "text-green-500",
    patch: "text-blue-500",
    security: "text-orange-500"
  }
  return types[type] || "text-muted-foreground"
}

// Update the version stats to include more metrics
const VersionStats = ({ release }) => {
  const stats = [
    {
      label: "Features",
      count: release.changes.filter(c => c.type === 'feature').length,
      icon: Star,
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      label: "Improvements",
      count: release.changes.filter(c => c.type === 'improvement').length,
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      label: "Bug Fixes",
      count: release.changes.filter(c => c.type === 'bugfix').length,
      icon: Bug,
      color: "text-red-500",
      bg: "bg-red-500/10"
    },
    {
      label: "Technical",
      count: release.changes.filter(c => c.technical).length,
      icon: Code2,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg",
            stat.bg,
            "transition-all duration-200 hover:shadow-sm"
          )}
        >
          <stat.icon className={cn("h-4 w-4", stat.color)} />
          <div>
            <div className="text-sm font-medium">{stat.count}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ReleaseNotesPage() {
  const [filter, setFilter] = useState("all") // all, features, improvements, bugfixes
  const [expandedVersions, setExpandedVersions] = useState({})
  const [showTechnical, setShowTechnical] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [showFilters, setShowFilters] = useState(true)

  const pageTransition = {
    type: "tween",
    duration: 0.2,
    ease: "easeOut"
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleVersion = (version) => {
    setExpandedVersions(prev => ({
      ...prev,
      [version]: !prev[version]
    }))
  }

  const filteredReleases = releases.map(release => ({
    ...release,
    changes: release.changes.filter(change => {
      if (!showTechnical && change.technical) return false
      if (filter === "all") return true
      return change.type === filter
    })
  })).filter(release => release.changes.length > 0)

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={pageTransition}
            className="flex items-center justify-center gap-2 text-primary"
          >
            <Rocket className="h-6 w-6" />
            <span className="text-sm font-medium">Release Notes</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={pageTransition}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            What's New
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...pageTransition, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Stay up to date with the latest features, improvements, and bug fixes
          </motion.p>
        </div>

        {/* Enhanced Filters Section */}
        <div className="relative">
          <motion.div
            animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4">
              {/* Existing filters */}
              
              {/* Filter Tags */}
              <div className="flex flex-wrap items-center gap-2 justify-center">
                {selectedVersion && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    <GitBranch className="h-3 w-3" />
                    {selectedVersion}
                    <button 
                      onClick={() => setSelectedVersion(null)}
                      className="ml-1 hover:text-primary-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                    {filter}
                    <button 
                      onClick={() => setFilter('all')}
                      className="ml-1 hover:text-primary"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full p-1 bg-background border shadow-sm"
          >
            <ChevronDown className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              !showFilters && "rotate-180"
            )} />
          </button>
        </div>

        {/* Timeline with Enhanced Mobile View */}
        <div className="relative space-y-8 mt-8">
          {filteredReleases.map((release, index) => (
            <div
              key={release.version}
              className={cn(
                "relative grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-4",
                "before:absolute before:inset-0 before:left-4 sm:before:left-1/2",
                "before:-translate-x-1/2 before:w-px before:bg-border/50",
                "before:hidden sm:before:block"
              )}
            >
              {/* Version Info */}
              <div className={cn(
                "relative rounded-xl border bg-card p-6",
                "transition-all duration-200",
                "hover:shadow-md hover:border-primary/20",
                selectedVersion === release.version && "ring-1 ring-primary"
              )}>
                {/* Timeline Dot */}
                <div className="absolute left-4 sm:left-auto sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-1/2">
                  <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                </div>

                {/* Version Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-primary">{release.version}</span>
                    {release.badge && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary font-medium">
                        {release.badge.text}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold">{release.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{release.description}</p>
                  </div>

                  <VersionStats release={release} />

                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(release.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-3.5 w-3.5" />
                      {release.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date Marker - Visible on Desktop */}
              <div className="hidden sm:flex items-center justify-center text-xs text-muted-foreground">
                {new Date(release.date).toLocaleDateString()}
              </div>

              {/* Changes List */}
              <div className="space-y-3">
                {release.changes.map((change, changeIndex) => (
                  <motion.div
                    key={changeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: changeIndex * 0.05 }}
                    className={cn(
                      "rounded-xl border bg-card p-4",
                      "transition-all duration-200",
                      "hover:shadow-sm hover:border-primary/20",
                      change.technical && "border-primary/10"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "rounded-lg p-2",
                        changeTypes[change.type].bgColor
                      )}>
                        <change.icon className={cn(
                          "h-4 w-4",
                          changeTypes[change.type].color
                        )} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium truncate">{change.title}</h4>
                          <span className={cn(
                            "shrink-0 text-xs px-2 py-0.5 rounded-full",
                            changeTypes[change.type].bgColor,
                            changeTypes[change.type].color
                          )}>
                            {changeTypes[change.type].badge}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {change.description}
                        </p>
                        {change.technical && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                            <Code2 className="h-3.5 w-3.5" />
                            <span>Technical Change</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReleases.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SearchX className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No changes found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or showing technical changes
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
} 