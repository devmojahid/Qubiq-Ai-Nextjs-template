"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import {
  LayoutGrid, FileText, MessageSquare, Eye, Image as ImageIcon,
  FileCode, Video, Mic, FolderOpen, Files, Star, Clock,
  LogOut, Search, Settings, ChevronDown, CreditCard, User,
  Shield, HelpCircle, Gift, BarChart2, Menu,
  Music, Languages, MicVocal, DollarSign,
  Bell,Key
} from "lucide-react"

const navigation = {
  user: [
    { 
      id: "dashboard", 
      title: "Dashboard", 
      icon: LayoutGrid, 
      href: "/dashboard",
      badge: { text: "New", variant: "purple" }
    },
    { 
      id: "account-management", 
      title: "Account", 
      icon: FileText, 
      href: "/account-management",
      badge: { text: "3", variant: "gray" },
      subItems: [
        { id: "profile", title: "Profile Settings", href: "/dashboard/profile", icon: User },
        { id: "security", title: "Security", href: "/dashboard/security", icon: Shield },
        { id: "api-keys", title: "API Keys", href: "/dashboard/api-keys", icon: Key },
      ]
    },
  ],
  aiTools: [
    { id: "ai-text", title: "Text Generation", icon: MessageSquare, href: "/dashboard/text"},
    { id: "ai-image", title: "Image Creation", icon: ImageIcon, href: "/dashboard/image" },
    { id: "ai-code", title: "Code Assistant", icon: FileCode, href: "/dashboard/code" },
    { id: "ai-chat", title: "Chat Bot", icon: MessageSquare, href: "/dashboard/chat", badge: { text: "Popular", variant: "yellow" } },
    { id: "ai-video", title: "Video Generator", icon: Video, href: "/dashboard/video" },
    { id: "ai-audio", title: "Audio Studio", icon: Music, href: "/dashboard/audio" },
    { id: "ai-website", title: "Website Builder", icon: Languages, href: "/dashboard/website", badge: { text: "Beta", variant: "purple" } },
    { id: "ai-speech", title: "Speech to Text", icon: Mic, href: "/dashboard/speech" },
    { id: "ai-voice", title: "Text to Speech", icon: MicVocal, href: "/dashboard/text-to-speech" },
  ],
  manage: [

    { id: "help", title: "Help Center", icon: HelpCircle, href: "/dashboard/help" },
    { id: "support", title: "Support", icon: MessageSquare, href: "/dashboard/support" },
    { id: "release-notes", title: "Release Notes", icon: Bell, href: "/dashboard/release-notes" },
  ],
  billing: [
    { id: "analytics", title: "Analytics", icon: BarChart2, href: "/dashboard/analytics/usage" },
    { id: "pricing", title: "Pricing", icon: DollarSign, href: "/dashboard/pricing" },
    { id: "billing-history", title: "Billing History", icon: DollarSign, href: "/dashboard/billing/history" },
    { id: "payment-methods", title: "Payment Methods", icon: CreditCard, href: "/dashboard/billing/payment-methods" },
    { id: "subscription", title: "Subscription", icon: CreditCard, href: "/dashboard/billing/subscription" },
  ],
  developer: [
    { 
      id: "api-playground", 
      title: "API Playground", 
      icon: Star, 
      href: "/dashboard/developer/playground",
      badge: { text: "Hot", variant: "red" }
    },
    { id: "playground", title: "Playground", icon: Clock, href: "/dashboard/developer/testing" },
  ]
}

const userMenuItems = [
  {
    id: "profile",
    title: "Profile Settings",
    icon: User,
    href: "/dashboard/profile",
    description: "Manage your account"
  },
  {
    id: "billing",
    title: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
    description: "Subscription & payments"
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    href: "/dashboard/security",
    description: "Passwords & 2FA"
  },
  {
    id: "help",
    title: "Help Center",
    icon: HelpCircle,
    href: "/dashboard/help",
    description: "Support & documentation"
  }
]

// Add smooth transition config
const transitionConfig = {
  type: "spring",
  stiffness: 260,
  damping: 20
}

// Fixed scrollbar styles using proper syntax
const scrollbarStyles = {
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgb(203 213 225) transparent',
  '&::-webkit-scrollbar': {
    width: '4px',
    display: 'block'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    borderRadius: '8px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgb(203 213 225)',
    borderRadius: '8px',
    border: 'none',
    minHeight: '40px'
  },
  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgb(148 163 184)'
  }
}

// Add these styles to globals.css
const globalStyles = `
  .sidebar-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgb(203 213 225) transparent;
  }
  
  .sidebar-scroll::-webkit-scrollbar {
    width: 4px;
  }
  
  .sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 8px;
  }
  
  .sidebar-scroll::-webkit-scrollbar-thumb {
    background-color: rgb(203 213 225);
    border-radius: 8px;
    min-height: 40px;
  }
  
  .sidebar-scroll:hover::-webkit-scrollbar-thumb {
    background-color: rgb(148 163 184);
  }
`

export function DashboardSidebar({ isOpen, setIsOpen, isMobile }) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)
  const dropdownRefs = useRef({})

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      
      Object.entries(dropdownRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(event.target)) {
          setOpenDropdown(current => current === key ? null : current)
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Add search functionality
  const handleSearch = (query) => {
    setSearchQuery(query)
    // Filter navigation items based on search
    const results = Object.entries(navigation).reduce((acc, [section, items]) => {
      const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      )
      if (filteredItems.length > 0) {
        acc[section] = filteredItems
      }
      return acc
    }, {})
  }

  const NavLink = ({ item, depth = 0 }) => {
    const isActive = pathname === item.href
    const hasSubItems = item.subItems?.length > 0
    const isDropdownOpen = openDropdown === item.id
    const buttonRef = useRef(null)

    // Handle focus when dropdown opens
    useEffect(() => {
      if (isDropdownOpen && buttonRef.current) {
        buttonRef.current.focus()
      }
    }, [isDropdownOpen])

    // Enhanced focus management
    useEffect(() => {
      if (isDropdownOpen && buttonRef.current) {
        // Smooth scroll into view when dropdown opens
        buttonRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest'
        });
        buttonRef.current.focus({ preventScroll: true });
      }
    }, [isDropdownOpen]);

    const LinkContent = () => (
      <>
        <div className={cn(
          "p-1.5 rounded-lg transition-colors",
          isActive 
            ? "bg-purple-100 dark:bg-purple-900/50" 
            : "bg-gray-50 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700"
        )}>
          <item.icon className={cn(
            "h-4 w-4 transition-colors",
            isActive 
              ? "text-purple-600 dark:text-purple-400" 
              : "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
          )} />
        </div>
        <span className="flex-1 text-gray-900 dark:text-gray-100 text-left">{item.title}</span>
        {item.badge && (
          <span className={cn(
            "px-2 py-0.5 text-[10px] rounded-full font-medium",
            "transition-colors duration-200",
            item.badge.variant === "purple" && "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
            item.badge.variant === "yellow" && "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
            item.badge.variant === "red" && "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400",
            item.badge.variant === "gray" && "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          )}>
            {item.badge.text}
          </span>
        )}
        {hasSubItems && (
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-300",
            isDropdownOpen ? "rotate-180 text-purple-500" : "text-gray-400"
          )} />
        )}
      </>
    )

    return (
      <div 
        ref={el => hasSubItems && (dropdownRefs.current[item.id] = el)}
        className={cn(
          "relative",
          isDropdownOpen && "z-10" // Ensure dropdown is above other items
        )}
      >
        {hasSubItems ? (
          <button
            ref={buttonRef}
            onClick={() => setOpenDropdown(isDropdownOpen ? null : item.id)}
            className={cn(
              "group flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm",
              "transition-all duration-200",
              "hover:bg-gray-50/80 active:bg-gray-100/80",
              "focus:outline-none focus:ring-2 focus:ring-purple-500/20",
              "relative", // Added for focus ring
              isActive 
                ? "bg-purple-50 text-purple-600 font-medium shadow-sm" 
                : "text-gray-600",
              depth > 0 && "ml-4"
            )}
          >
            <LinkContent />
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "group flex items-center gap-3 px-3 py-2 rounded-xl text-sm",
              "transition-all duration-200",
              "hover:bg-gray-50 dark:hover:bg-gray-800/50",
              "active:bg-gray-100/80 dark:active:bg-gray-700/50",
              "focus:outline-none focus:ring-2 focus:ring-purple-500/20",
              isActive 
                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium shadow-sm" 
                : "text-gray-600 dark:text-gray-300",
              depth > 0 && "ml-4"
            )}
          >
            <LinkContent />
          </Link>
        )}

        {/* Enhanced SubItems Dropdown */}
        <AnimatePresence initial={false}>
          {hasSubItems && isDropdownOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: {
                  height: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
                  opacity: { duration: 0.15, ease: "easeOut" }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  height: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
                  opacity: { duration: 0.1, ease: "easeIn" }
                }
              }}
              className={cn(
                "overflow-hidden pl-3",
                "relative z-20"
              )}
            >
              <motion.div 
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                exit={{ x: -10 }}
                className={cn(
                  "pt-1 space-y-1",
                  "border-l-2 border-gray-100 dark:border-gray-800",
                  "relative" // Added for proper stacking
                )}
              >
                {item.subItems.map(subItem => (
                  <NavLink key={subItem.id} item={subItem} depth={depth + 1} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const NavSection = ({ title, items }) => (
    <div>
      <div className="mb-2 px-3">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {title}
        </span>
      </div>
      <div className="space-y-1">
        {items
          .filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(item => (
            <NavLink key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  )

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? (isMobile ? "100%" : "280px") : "0px",
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed inset-y-0 left-0 w-[280px] z-30",
        "bg-white dark:bg-gray-900",
        "border-r border-gray-200 dark:border-gray-800",
        "transition-all duration-300 ease-in-out",
        "flex flex-col h-full"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center px-6 h-16 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
        </div>
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="ml-auto p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Enhanced Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className={cn(
              "w-full pl-9 pr-4 py-2 text-sm rounded-lg",
              "bg-gray-50 dark:bg-gray-800",
              "border border-gray-200 dark:border-gray-700",
              "placeholder-gray-500 dark:placeholder-gray-400",
              "text-gray-900 dark:text-gray-100",
              "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500",
              "transition-colors duration-200"
            )}
          />
        </div>
      </div>

      {/* Enhanced User Profile with Dropdown */}
      <div className="px-3 mb-6 hidden" ref={userMenuRef}>
        <button 
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors relative"
        >
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-sm font-medium text-purple-600">JD</span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
          <ChevronDown className={cn(
            "h-4 w-4 text-gray-400 transition-transform",
            showUserMenu && "rotate-180"
          )} />
        </button>

        <AnimatePresence>
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-3 right-3 mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            >
              {userMenuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation with enhanced scrollbar */}
      <div 
        className={cn(
          "flex-1 px-3 space-y-4 overflow-y-auto custom-scrollbar",
          "bg-white dark:bg-gray-900",
          "relative"
        )}
      >
        {Object.entries(navigation).map(([key, items]) => (
          <NavSection
            key={key}
            title={key.toUpperCase()}
            items={items.filter(item => 
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )}
          />
        ))}
      </div>

      {/* Enhanced Credits Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">CREDITS</span>
            <Link
              href="dashboard/analytics/usage" 
              className="text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500/20 rounded-lg px-2 py-1 -mr-2"
            >
              View Details
            </Link>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 hover:border-purple-100 dark:hover:border-purple-800 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-100">
                  <BarChart2 className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-sm text-gray-600">
                  Credits
                </span>
              </div>
              <span className="text-sm font-medium bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg">
                2,874,661
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Affiliate Section */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 via-purple-50/50 to-white border border-purple-100 hidden">
          <Gift className="h-6 w-6 text-purple-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 mb-1">
            Invite your friend
          </p>
          <p className="text-xs text-gray-600 mb-3">
            and get 10% on all their purchases
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-purple-600 bg-white rounded-xl border border-purple-100 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 shadow-sm">
            Invite Now
          </button>
        </div>
      </div>

      {/* Enhanced Logout Button */}
      <div className="p-4 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-white dark:to-gray-900">
        <button
          onClick={() => console.log('Logout')}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 border border-transparent hover:border-red-100 dark:hover:border-red-800 hover:shadow-sm"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  )
} 