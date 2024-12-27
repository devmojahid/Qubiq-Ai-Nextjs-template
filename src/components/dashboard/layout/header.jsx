"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Bell, MessageSquare, Plus, Command,
  Settings, LogOut, Menu, X, ChevronDown,
  User, CreditCard, LifeBuoy, Shield, Star,
  Sparkles, Zap, History, Filter, Sun, Moon, ImageIcon, Code, ChevronLeft, ChevronRight
} from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { cn } from "@/lib/utils"

// Enhanced notifications with categories
const notifications = {
  today: [
    {
      id: 1,
      title: "New AI Model Available",
      description: "GPT-4 Turbo is now available for all projects",
      time: "2 minutes ago",
      unread: true,
      icon: Star,
      color: "text-yellow-500",
      link: "/dashboard/ai-models"
    }
  ],
  yesterday: [
    {
      id: 2,
      title: "Security Alert",
      description: "Unusual activity detected in your account",
      time: "1 hour ago",
      unread: true,
      icon: Shield,
      color: "text-red-500",
      link: "/dashboard/security"
    }
  ]
}

// Add user menu items
const userMenuItems = [
  {
    id: "profile",
    title: "Profile",
    description: "View and edit your profile",
    icon: User,
    href: "/dashboard/profile"
  },
  {
    id: "settings",
    title: "Settings",
    description: "Manage your preferences",
    icon: Settings,
    href: "/dashboard/settings"
  },
  {
    id: "billing",
    title: "Billing",
    description: "Manage your subscription",
    icon: CreditCard,
    href: "/dashboard/billing/history",
    badge: "Pro"
  }
]

// Add quick actions
const quickActions = [
  {
    id: "new-chat",
    title: "New Chat",
    description: "Start a new AI conversation",
    icon: MessageSquare,
    shortcut: "N",
    href: "/dashboard/chat"
  },
  {
    id: "new-image",
    title: "Generate Image",
    description: "Create AI-powered images",
    icon: ImageIcon,
    shortcut: "I",
    href: "/dashboard/image"
  },
  {
    id: "new-code",
    title: "Code Generator",
    description: "Generate code with AI",
    icon: Code,
    shortcut: "C",
    href: "/dashboard/code"
  }
]

// Add notification categories
const notificationCategories = {
  today: "Today",
  yesterday: "Yesterday",
  earlier: "Earlier this week"
}

// Add SidebarToggle component
const SidebarToggle = ({ isOpen, onToggle }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className={cn(
      "hidden lg:flex items-center justify-center",
      "p-2 rounded-xl",
      "hover:bg-gray-100 dark:hover:bg-gray-800",
      "transition-all duration-300",
      "focus:outline-none focus:ring-2 focus:ring-purple-500/20",
      "mr-2"
    )}
    title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
  >
    <motion.div
      animate={{ 
        rotate: isOpen ? 0 : 180,
        x: isOpen ? 0 : 2
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      {isOpen ? (
        <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      )}
    </motion.div>
  </motion.button>
)

// Add search functionality
const handleSearch = (query) => {
  setIsSearchOpen(true)
  // Implement search logic
  const searchResults = Object.entries(navigation).reduce((acc, [section, items]) => {
    const filteredItems = items.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
    )
    if (filteredItems.length > 0) {
      acc[section] = filteredItems
    }
    return acc
  }, {})

  // Update search results state
  setSearchResults(searchResults)
  console.log('Search Results:', searchResults)
}

// Enhanced Quick Actions for Mobile
const MobileQuickActions = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    className={cn(
      "fixed inset-x-4 top-20", // Position below header
      "bg-white dark:bg-gray-800 rounded-xl",
      "border border-gray-200 dark:border-gray-700",
      "shadow-lg z-50",
      "max-h-[calc(100vh-6rem)] overflow-auto"
    )}
  >
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">Quick Actions</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="p-2 space-y-1">
      {quickActions.map((action) => (
        <Link
          key={action.id}
          href={action.href}
          className={cn(
            "flex items-center gap-3 w-full p-3 rounded-lg",
            "text-sm text-gray-700 dark:text-gray-200",
            "hover:bg-gray-100 dark:hover:bg-gray-700/50",
            "transition-all duration-200"
          )}
        >
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <action.icon className="h-5 w-5" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">{action.title}</p>
            <p className="text-xs text-gray-500">{action.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </motion.div>
)

// Enhanced Search Modal for Mobile
const SearchModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="fixed inset-x-4 top-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search anything..."
                autoFocus
                className={cn(
                  "w-full pl-10 pr-4 py-3",
                  "bg-gray-50 dark:bg-gray-900",
                  "rounded-lg border border-gray-200 dark:border-gray-700",
                  "text-gray-900 dark:text-gray-100",
                  "placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/20",
                  "transition-all duration-200"
                )}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Quick Actions Button Component
const QuickActionsButton = ({ quickActionsRef, showQuickActions, setShowQuickActions }) => (
  <div ref={quickActionsRef} className="relative">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setShowQuickActions(!showQuickActions)}
      className={cn(
        "hidden sm:inline-flex items-center gap-2 rounded-xl",
        "bg-gradient-to-r from-purple-600 to-purple-500",
        "hover:from-purple-700 hover:to-purple-600",
        "text-white px-4 py-2 text-sm font-medium",
        "shadow-sm hover:shadow-md",
        "transition-all duration-200",
        "border border-purple-500/20",
        "group"
      )}
    >
      <Plus className="h-4 w-4" />
      <span>New Project</span>
      <ChevronDown className={cn(
        "h-4 w-4 ml-1 transition-transform duration-200",
        showQuickActions && "rotate-180"
      )} />
    </motion.button>

    {/* Quick Actions Dropdown */}
    <AnimatePresence>
      {showQuickActions && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className={cn(
            "absolute top-full right-0 mt-2 w-72",
            "bg-white dark:bg-gray-800 rounded-xl",
            "border border-gray-200 dark:border-gray-700",
            "shadow-lg divide-y divide-gray-200 dark:divide-gray-700",
            "z-50 overflow-hidden"
          )}
        >
          {/* Quick Actions Header */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Quick Actions
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Create new content or start a project
            </p>
          </div>

          {/* Quick Actions List */}
          <div className="p-2 space-y-1">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className={cn(
                  "flex items-start gap-3 w-full p-3 rounded-lg",
                  "text-sm text-gray-700 dark:text-gray-200",
                  "hover:bg-gray-100 dark:hover:bg-gray-700/50",
                  "transition-all duration-200 group"
                )}
              >
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {action.description}
                  </p>
                </div>
                <kbd className={cn(
                  "px-2 py-1 text-xs",
                  "bg-gray-100 dark:bg-gray-800 rounded-lg",
                  "text-gray-500 dark:text-gray-400",
                  "border border-gray-200 dark:border-gray-700",
                  "self-center"
                )}>
                  ⌥{action.shortcut}
                </kbd>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export function DashboardHeader({ isSidebarOpen, onSidebarToggle, isMobile }) {
  const [showSubHeader, setShowSubHeader] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  
  const quickActionsRef = useRef(null)
  const searchRef = useRef(null)
  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)
  const headerRef = useRef(null)

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Add search modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isMobileActionsOpen, setIsMobileActionsOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const count = Object.values(notifications).flat()
      .filter(n => n.unread).length
    setUnreadCount(count)
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      const updateHeaderPadding = () => {
        const sidebarWidth = isSidebarOpen ? 10 : 25
        headerRef.current.style.paddingLeft = 
          window.innerWidth >= 1024 ? `${sidebarWidth}px` : '1rem'
      }
      updateHeaderPadding()
      window.addEventListener('resize', updateHeaderPadding)
      return () => window.removeEventListener('resize', updateHeaderPadding)
    }
  }, [isSidebarOpen])

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false)
        setShowNotifications(false)
        setShowUserMenu(false)
      }
      if (e.altKey) {
        switch(e.key.toLowerCase()) {
          case 'n':
            e.preventDefault();
            quickActions[0].action();
            break;
          case 'i':
            e.preventDefault();
            quickActions[1].action();
            break;
        }
      }
      if (e.altKey && e.key === 'h') {
        e.preventDefault()
        setShowSubHeader(prev => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Enhanced click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickActionsRef.current && !quickActionsRef.current.contains(event.target)) {
        setShowQuickActions(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Update the mobile search button click handler
  const handleMobileSearchClick = () => {
    setIsSearchModalOpen(true)
  }

  // Update the mobile quick actions button click handler
  const handleMobileQuickActionsClick = () => {
    setIsMobileActionsOpen(true)
  }

  // Add this function near the top with other state
  const handleHeaderSearch = (query) => {
    setIsSearchOpen(true)
    // You can implement your search logic here
    console.log('Searching:', query)
  }

  return (
    <>
      <header className={cn(
        "sticky top-0 z-40 w-full",
        "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md",
        "border-b border-gray-200 dark:border-gray-800",
        "transition-all duration-300"
      )}>
        <div className="flex h-16 items-center gap-2 px-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {isMobile ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSidebarToggle}
                className={cn(
                  "lg:hidden p-2 rounded-xl",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                )}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isSidebarOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isSidebarOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            ) : (
              <SidebarToggle 
                isOpen={isSidebarOpen} 
                onToggle={onSidebarToggle}
              />
            )}

            {/* Mobile Quick Action */}
            {isMobile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMobileQuickActionsClick}
                className={cn(
                  "p-2 rounded-xl",
                  "bg-purple-600 text-white",
                  "hover:bg-purple-700",
                  "transition-all duration-200",
                  "shadow-sm"
                )}
              >
                <Plus className="h-5 w-5" />
              </motion.button>
            )}
          </div>

          {/* Desktop Quick Actions */}
          {!isMobile && (
            <QuickActionsButton 
              quickActionsRef={quickActionsRef}
              showQuickActions={showQuickActions}
              setShowQuickActions={setShowQuickActions}
            />
          )}

          {/* Search Bar - Hidden on Mobile */}
          <div className={cn(
            "flex-1 max-w-2xl mx-auto",
            isMobile && "hidden" // Hide on mobile
          )}>
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "flex w-full items-center gap-2 rounded-xl",
                "bg-gray-50/50 dark:bg-gray-800/50",
                "border border-gray-200 dark:border-gray-700",
                "px-4 py-2.5 text-sm",
                "text-gray-500 dark:text-gray-400",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "hover:border-purple-500/30",
                "transition-all duration-200",
                "group focus:outline-none focus:ring-2 focus:ring-purple-500/20",
                "shadow-sm"
              )}
            >
              <Search className="h-4 w-4 group-hover:text-purple-500 transition-colors" />
              <span className="flex-1 text-left truncate dark:text-gray-300">Search anything...</span>
              <kbd className="hidden sm:inline-flex h-5 items-center px-2 text-[10px] font-mono rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile Search Button */}
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMobileSearchClick}
              className={cn(
                "p-2 rounded-xl",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "transition-colors"
              )}
            >
              <Search className="h-5 w-5 text-gray-500" />
            </motion.button>
          )}

          {/* Right Section with Improved Mobile Layout */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={cn(
                  "p-2 rounded-xl relative overflow-hidden",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                )}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.4, 0.0, 0.2, 1]
                    }}
                    className="relative z-10"
                  >
                    {theme === 'dark' ? (
                      <Moon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Sun className="h-5 w-5 text-gray-500" />
                    )}
                  </motion.div>
                </AnimatePresence>
                <motion.div
                  initial={false}
                  animate={{
                    scale: theme === 'dark' ? 1.5 : 0,
                    opacity: theme === 'dark' ? 0.2 : 0
                  }}
                  className="absolute inset-0 bg-purple-500 rounded-full"
                />
              </motion.button>
            )}

            {/* Notifications - Adjusted for Mobile */}
            <div ref={notificationsRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className={cn(
                  "p-2 rounded-xl relative",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "transition-colors"
                )}
              >
                <Bell className="h-5 w-5 text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500 items-center justify-center">
                      <span className="text-[10px] font-medium text-white">
                        {unreadCount}
                      </span>
                    </span>
                  </span>
                )}
              </motion.button>

              {/* Mobile-Optimized Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={cn(
                      "absolute right-0 mt-2",
                      "w-[calc(100vw-2rem)] sm:w-[380px]", // Responsive width
                      "max-h-[calc(100vh-6rem)]",
                      "bg-white dark:bg-gray-800 rounded-xl",
                      "border border-gray-200 dark:border-gray-700",
                      "shadow-lg overflow-hidden",
                      isMobile && "fixed left-4 right-4 w-auto" // Full width on mobile
                    )}
                  >
                    {/* Notifications Header */}
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            Notifications
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            You have {notifications.today.length + notifications.yesterday.length} unread notifications
                          </p>
                        </div>
                        <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                          Mark all as read
                        </button>
                      </div>
                    </div>

                    {/* Notifications List with Categories */}
                    <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
                      {Object.entries(notifications).map(([category, items]) => (
                        <div key={category}>
                          <div className="sticky top-0 z-10 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2">
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {notificationCategories[category]}
                            </h4>
                          </div>
                          <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {items.map((notification) => (
                              <Link
                                key={notification.id}
                                href={notification.link}
                                className={cn(
                                  "flex items-start gap-3 p-4",
                                  "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                                  "transition-colors",
                                  notification.unread && "bg-purple-50 dark:bg-purple-900/10"
                                )}
                              >
                                <div className={cn(
                                  "rounded-xl p-2",
                                  notification.unread ? "bg-purple-100 dark:bg-purple-900/20" : "bg-gray-100 dark:bg-gray-800"
                                )}>
                                  <notification.icon className={cn("h-4 w-4", notification.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    {notification.description}
                                  </p>
                                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                                {notification.unread && (
                                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu - Adjusted for Mobile */}
            <div ref={userMenuRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={cn(
                  "flex items-center gap-2 p-1.5 rounded-xl",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                )}
              >
                <div className="relative h-7 w-7 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    JD
                  </span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-gray-500",
                  "transition-transform duration-200",
                  showUserMenu && "rotate-180"
                )} />
              </motion.button>

              {/* User Menu Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={cn(
                      "absolute right-0 mt-2",
                      "w-[calc(100vw-2rem)] sm:w-64", // Responsive width
                      "bg-white dark:bg-gray-800 rounded-xl",
                      "border border-gray-200 dark:border-gray-700",
                      "shadow-lg overflow-hidden",
                      isMobile && "fixed left-4 right-4 w-auto" // Full width on mobile
                    )}
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                          <span className="flex h-full w-full items-center justify-center text-sm font-medium text-white">
                            JD
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            John Doe
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            john@example.com
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2",
                            "text-sm text-gray-700 dark:text-gray-200",
                            "hover:bg-gray-100 dark:hover:bg-gray-700/50",
                            "transition-colors"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <div className="flex-1">
                            <p>{item.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Logout Button */}
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        href="/login"
                        className={cn(
                          "flex items-center gap-3 w-full px-4 py-2 rounded-lg",
                          "text-sm text-red-600 dark:text-red-400",
                          "hover:bg-red-50 dark:hover:bg-red-900/20",
                          "transition-colors"
                        )}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Add Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />

      {/* Add Mobile Quick Actions */}
      <AnimatePresence>
        {isMobileActionsOpen && (
          <MobileQuickActions 
            onClose={() => setIsMobileActionsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  )
} 