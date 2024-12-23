"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  HelpCircle, Search, ChevronRight, ChevronDown,
  Book, MessageSquare, Mail, Phone, Globe,
  FileText, Video, Headphones, Settings, Shield,
  CreditCard, User, Lock, AlertCircle, CheckCircle,
  Clock, Calendar, Zap, Star, ThumbsUp, PlayCircle,
  BookOpen, LifeBuoy, Newspaper, Gift
} from "lucide-react"
import { cn } from "@/lib/utils"

// FAQ Categories with icons
const categories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    description: "Learn the basics and get up to speed",
    color: "text-blue-500"
  },
  {
    id: "account",
    title: "Account & Billing",
    icon: User,
    description: "Manage your account and subscription",
    color: "text-purple-500"
  },
  {
    id: "features",
    title: "Features & Tools",
    icon: Zap,
    description: "Explore our features and capabilities",
    color: "text-green-500"
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    description: "Learn about our security measures",
    color: "text-red-500"
  }
]

// FAQ Items grouped by category
const faqItems = {
  "getting-started": [
    {
      question: "How do I get started with the platform?",
      answer: "Getting started is easy! First, create an account and choose your subscription plan. Then, explore our AI tools and start generating content. We recommend beginning with our quick-start tutorials.",
      icon: PlayCircle
    },
    {
      question: "What are AI credits and how do they work?",
      answer: "AI credits are our platform's currency for generating content. Different operations consume different amounts of credits. You can monitor your credit usage in your dashboard.",
      icon: Zap
    }
  ],
  "account": [
    {
      question: "How do I manage my subscription?",
      answer: "You can manage your subscription from your account settings. There you can upgrade, downgrade, or cancel your plan. Changes take effect at the start of your next billing cycle.",
      icon: CreditCard
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can change your plan at any time. When upgrading, you'll be prorated for the remainder of your billing period. When downgrading, changes take effect next billing cycle.",
      icon: Calendar
    }
  ],
  "features": [
    {
      question: "What AI models are available?",
      answer: "We offer various AI models optimized for different tasks. This includes GPT-4 for text, DALL-E for images, and Whisper for audio. Each model has specific strengths and use cases.",
      icon: Star
    },
    {
      question: "How accurate is the AI generation?",
      answer: "Our AI models are highly accurate and continuously improving. However, we recommend reviewing and editing AI-generated content to ensure it meets your specific needs.",
      icon: CheckCircle
    }
  ],
  "security": [
    {
      question: "How is my data protected?",
      answer: "We use industry-standard encryption and security measures to protect your data. All transmissions are encrypted, and we regularly perform security audits.",
      icon: Lock
    },
    {
      question: "What is your privacy policy?",
      answer: "Our privacy policy outlines how we collect, use, and protect your data. We never share your personal information with third parties without your consent.",
      icon: Shield
    }
  ]
}

// Support channels
const supportChannels = [
  {
    id: "chat",
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageSquare,
    action: "Start Chat",
    available: true
  },
  {
    id: "email",
    title: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    action: "Send Email",
    available: true
  },
  {
    id: "phone",
    title: "Phone Support",
    description: "Talk to a support specialist",
    icon: Phone,
    action: "Call Now",
    available: true,
    hours: "24/7"
  },
  {
    id: "docs",
    title: "Documentation",
    description: "Browse our detailed guides",
    icon: FileText,
    action: "View Docs",
    available: true
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("getting-started")
  const [expandedItems, setExpandedItems] = useState({})
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleItem = (categoryId, index) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${categoryId}-${index}`]: !prev[`${categoryId}-${index}`]
    }))
  }

  const filteredFAQs = Object.entries(faqItems).reduce((acc, [category, items]) => {
    const filtered = items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (filtered.length > 0) {
      acc[category] = filtered
    }
    return acc
  }, {})

  // Update the animation configurations to be simpler and cleaner
  const pageTransition = {
    type: "tween", // Change from spring to tween for smoother transitions
    duration: 0.2,
    ease: "easeOut"
  }

  const staggerDelay = 0.05 // Reduce delay between staggered items

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} // Reduce y distance
            animate={{ opacity: 1, y: 0 }}
            transition={pageTransition}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            How can we help you?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...pageTransition, delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Search our knowledge base or browse categories below
          </motion.p>

          {/* Simplified search bar animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...pageTransition, delay: 0.2 }}
            className="relative max-w-2xl mx-auto mt-8"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className={cn(
                "w-full rounded-xl px-4 py-3 pl-12",
                "bg-secondary/50 border border-border/50",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                "text-base sm:text-lg transition-all duration-200"
              )}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...pageTransition, delay: index * staggerDelay }}
              whileHover={{ scale: 1.02 }} // Subtle hover effect
              whileTap={{ scale: 0.98 }} // Subtle click effect
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "relative rounded-xl p-6 text-left",
                "border border-border/50 bg-card",
                "transition-all duration-200",
                "hover:shadow-lg hover:shadow-primary/5",
                activeCategory === category.id && "border-primary bg-primary/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "rounded-lg p-2.5",
                  "bg-gradient-to-br from-primary/10 to-primary/5",
                  "ring-1 ring-primary/10"
                )}>
                  <category.icon className={cn("h-5 w-5", category.color)} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
          {/* Category Navigation - Hidden on Mobile */}
          <div className="hidden lg:block space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-xl p-3 text-sm",
                  "transition-all duration-200",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                )}
              >
                <category.icon className="h-4 w-4" />
                <span className="font-medium">{category.title}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {Object.entries(filteredFAQs).map(([categoryId, items]) => (
              <AnimatePresence key={categoryId} mode="wait">
                {activeCategory === categoryId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={pageTransition}
                    className="space-y-4"
                  >
                    {items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ...pageTransition, delay: index * staggerDelay }}
                        className={cn(
                          "rounded-xl border bg-card overflow-hidden",
                          "transition-all duration-200",
                          expandedItems[`${categoryId}-${index}`] && "ring-1 ring-primary/20"
                        )}
                      >
                        <button
                          onClick={() => toggleItem(categoryId, index)}
                          className="w-full flex items-center justify-between p-6"
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "rounded-lg p-2",
                              "bg-primary/10"
                            )}>
                              <item.icon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium text-left">
                              {item.question}
                            </span>
                          </div>
                          <ChevronDown 
                            className={cn(
                              "h-4 w-4 text-muted-foreground transition-transform",
                              expandedItems[`${categoryId}-${index}`] && "rotate-180"
                            )} 
                          />
                        </button>

                        <AnimatePresence>
                          {expandedItems[`${categoryId}-${index}`] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="px-6 pb-6 pt-0"
                            >
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </div>

        {/* Support Channels */}
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
            <p className="text-muted-foreground">
              Get in touch with our support team through any of these channels
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...pageTransition, delay: index * staggerDelay }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className={cn(
                  "rounded-xl border bg-card p-6",
                  "hover:shadow-lg hover:shadow-primary/5",
                  "transition-all duration-200"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "rounded-lg p-2.5",
                    "bg-gradient-to-br from-primary/10 to-primary/5",
                    "ring-1 ring-primary/10"
                  )}>
                    <channel.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{channel.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {channel.description}
                    </p>
                    {channel.hours && (
                      <p className="text-xs text-primary">
                        Available {channel.hours}
                      </p>
                    )}
                    <button
                      className={cn(
                        "mt-4 inline-flex items-center gap-2",
                        "text-sm font-medium text-primary",
                        "hover:underline"
                      )}
                    >
                      {channel.action}
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 