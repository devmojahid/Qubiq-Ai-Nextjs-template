"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search,
  Bell,
  MessageSquare,
  Plus,
  Command,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  User,
  CreditCard,
  LifeBuoy,
  Shield,
  Star,
  Sparkles,
  Zap
} from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    title: "New AI Model Available",
    description: "GPT-4 Turbo is now available for all projects",
    time: "2 minutes ago",
    unread: true,
    icon: Star,
    color: "text-yellow-500"
  },
  {
    id: 2,
    title: "Security Alert",
    description: "Unusual activity detected in your account",
    time: "1 hour ago",
    unread: true,
    icon: Shield,
    color: "text-red-500"
  }
]

const userNavigation = [
  {
    title: "Profile",
    description: "Manage your account settings",
    href: "/dashboard/profile",
    icon: User
  },
  {
    title: "Billing",
    description: "Manage your subscription and payments",
    href: "/dashboard/billing",
    icon: CreditCard
  },
  {
    title: "Settings",
    description: "Configure your preferences",
    href: "/dashboard/settings",
    icon: Settings
  },
  {
    title: "Help & Support",
    description: "Get help and documentation",
    href: "/dashboard/support",
    icon: LifeBuoy
  }
]

export function DashboardHeader({ isSidebarOpen, onSidebarToggle, isMobile }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const searchRef = useRef(null)
  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4">
        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSidebarToggle}
            className="lg:hidden rounded-xl p-2 hover:bg-accent/80 transition-colors"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        )}

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-all shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">New Project</span>
          </motion.button>
        </div>

        {/* Search */}
        <div ref={searchRef} className="relative flex-1 max-w-md">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex w-full items-center gap-2 rounded-xl border border-border/50 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all group hover:border-primary/50 hover:bg-accent/50"
          >
            <Search className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span className="hidden sm:inline flex-1 text-left">Search anything...</span>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded-lg border bg-muted px-1.5 font-mono text-[10px] font-medium">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Notifications */}
          <div ref={notificationsRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-xl p-2 hover:bg-accent/80 transition-all"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 rounded-xl border bg-background p-2 shadow-lg"
                >
                  <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                    <h3 className="font-medium">Notifications</h3>
                    <button className="text-xs text-primary hover:underline">
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Messages */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl p-2 hover:bg-accent/80 transition-all relative"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </motion.button>

          {/* User Menu */}
          <div ref={userMenuRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-xl p-2 hover:bg-accent/80 transition-all"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-primary font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  JD
                </motion.div>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                showUserMenu && "rotate-180"
              )} />
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 rounded-xl border bg-background p-2 shadow-lg"
                >
                  <UserMenuContent />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <CommandMenu isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}

function NotificationItem({ notification }) {
  return (
    <motion.button
      whileHover={{ x: 2 }}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left text-sm hover:bg-accent/80 transition-all",
        notification.unread && "bg-primary/5"
      )}
    >
      <div className={cn(
        "rounded-xl p-2 bg-gradient-to-br",
        notification.unread && "from-primary/20 to-primary/10"
      )}>
        <notification.icon className={cn("h-4 w-4", notification.color)} />
      </div>
      <div className="flex-1">
        <p className="font-medium">{notification.title}</p>
        <p className="text-xs text-muted-foreground">
          {notification.description}
        </p>
        <p className="mt-1 text-xs text-primary">
          {notification.time}
        </p>
      </div>
      {notification.unread && (
        <span className="mt-1 flex h-2 w-2 rounded-full bg-primary" />
      )}
    </motion.button>
  )
}

function UserMenuContent() {
  return (
    <>
      <div className="px-2 py-1.5 mb-2">
        <div className="font-medium">John Doe</div>
        <div className="text-sm text-muted-foreground">john@example.com</div>
      </div>
      
      <div className="h-px bg-border my-1" />
      
      <div className="space-y-1">
        {userNavigation.map((item) => (
          <motion.button
            key={item.title}
            whileHover={{ x: 2 }}
            className="flex w-full items-start gap-3 rounded-xl px-2 py-1.5 text-sm hover:bg-accent/80 transition-all"
          >
            <div className="rounded-lg p-2 bg-secondary/80">
              <item.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="h-px bg-border my-1" />
      
      <motion.button
        whileHover={{ x: 2 }}
        className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-red-500 hover:bg-red-500/10 transition-all"
      >
        <div className="rounded-lg p-2 bg-red-500/10">
          <LogOut className="h-4 w-4" />
        </div>
        <span>Log out</span>
      </motion.button>
    </>
  )
} 