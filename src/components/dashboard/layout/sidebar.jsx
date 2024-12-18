"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { sidebarNav } from "@/config/navigation"
import { ChevronLeft, ChevronDown, Settings, LogOut } from "lucide-react"

export function DashboardSidebar({ isOpen, setIsOpen, isMobile }) {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState([])
  const [hoveredItem, setHoveredItem] = useState(null)

  // Animation variants with improved timing
  const sidebarVariants = {
    open: {
      width: isMobile ? "100%" : "280px",
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.5
      }
    },
    closed: {
      width: isMobile ? 0 : "80px",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.5
      }
    }
  }

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    closed: {
      x: -15,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    }
  }

  const iconVariants = {
    open: { scale: 1 },
    closed: { scale: 0.9 }
  }

  // Auto expand active group
  useEffect(() => {
    const activeGroup = sidebarNav.find(group => 
      group.items.some(item => item.href === pathname)
    )
    if (activeGroup) {
      setOpenGroups([activeGroup.title])
    }
  }, [pathname])

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className={cn(
        "fixed top-0 left-0 z-30 h-screen",
        "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm",
        "border-r border-gray-200/50 dark:border-gray-800/50",
        "flex flex-col",
        "overflow-hidden shadow-sm",
        isMobile && "w-full max-w-[280px]"
      )}
    >
      {/* Sidebar Header with improved layout */}
      <div className="flex h-16 items-center px-4 border-b border-gray-200/50 dark:border-gray-800/50">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex items-center gap-3 flex-1"
            >
              <motion.div 
                variants={iconVariants}
                className="relative h-8 w-8"
              >
                <Logo className="h-8 w-8" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.5, 0] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.div>
              <motion.span
                variants={itemVariants}
                className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
              >
                Qubiq
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              variants={iconVariants}
              className="relative h-8 w-8 mx-auto"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-bold text-primary"
              >
                Q
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.5, 0] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-full p-2 ml-auto transition-all",
            "hover:bg-primary/10 dark:hover:bg-primary/20",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-primary/50"
          )}
        >
          <ChevronLeft className={cn(
            "h-5 w-5 text-primary transition-transform duration-300",
            !isOpen && "rotate-180"
          )} />
        </motion.button>
      </div>

      {/* Navigation with improved scrollbar and spacing */}
      <nav className={cn(
        "flex-1 overflow-y-auto py-4 px-3 space-y-2",
        "scrollbar-hidden hover-scrollbar"
      )}>
        <AnimatePresence initial={false}>
          {sidebarNav.map((group) => (
            <div key={group.title} className="relative">
              <motion.button
                onClick={() => {
                  setOpenGroups(prev => 
                    prev.includes(group.title)
                      ? prev.filter(t => t !== group.title)
                      : [...prev, group.title]
                  )
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl p-2.5",
                  "text-sm font-medium transition-all duration-200",
                  isOpen ? "justify-between" : "justify-center",
                  openGroups.includes(group.title)
                    ? "bg-gradient-to-r from-primary/10 to-primary/5" 
                    : "hover:bg-primary/5",
                  "group focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-primary/50"
                )}
              >
                {isOpen ? (
                  <>
                    <div className="flex items-center gap-3">
                      <motion.div
                        variants={iconVariants}
                        className={cn(
                          "rounded-xl p-2.5 transition-all duration-200",
                          "bg-gradient-to-br from-primary/10 to-transparent",
                          "group-hover:from-primary/20 group-hover:to-primary/5"
                        )}
                      >
                        <group.icon className={cn(
                          "h-4 w-4 transition-colors",
                          "text-primary/80 group-hover:text-primary"
                        )} />
                      </motion.div>
                      <motion.span
                        variants={itemVariants}
                        className="text-foreground/80 group-hover:text-foreground"
                      >
                        {group.title}
                      </motion.span>
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 text-primary/60 transition-transform duration-300",
                      openGroups.includes(group.title) && "rotate-180"
                    )} />
                  </>
                ) : (
                  <motion.div
                    variants={iconVariants}
                    className={cn(
                      "rounded-xl p-2.5 transition-all duration-200",
                      "bg-gradient-to-br from-primary/10 to-transparent",
                      "group-hover:from-primary/20 group-hover:to-primary/5"
                    )}
                  >
                    <group.icon className={cn(
                      "h-4 w-4 transition-colors",
                      "text-primary/80 group-hover:text-primary"
                    )} />
                  </motion.div>
                )}
              </motion.button>

              {/* Menu Items Dropdown */}
              <AnimatePresence initial={false}>
                {(isOpen && openGroups.includes(group.title)) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: {
                        height: { type: "spring", stiffness: 200, damping: 25 },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { type: "spring", stiffness: 200, damping: 25 },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 space-y-1 px-3">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onMouseEnter={() => setHoveredItem(item.href)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-xl p-2 text-sm",
                            "transition-all duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 dark:focus-visible:ring-indigo-400/50",
                            "focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
                            pathname === item.href 
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg" 
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                          )}
                        >
                          <div className={cn(
                            "rounded-xl p-2 transition-all duration-200",
                            pathname === item.href 
                              ? "bg-white/20" 
                              : "bg-gray-100/80 dark:bg-gray-800/80 group-hover:bg-gray-200/80 dark:group-hover:bg-gray-700/80"
                          )}>
                            <item.icon className={cn(
                              "h-4 w-4 transition-colors",
                              pathname === item.href 
                                ? "text-white" 
                                : "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                            )} />
                          </div>
                          <div className="flex-1 truncate">
                            <span className="block truncate">{item.title}</span>
                            {hoveredItem === item.href && item.description && (
                              <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-gray-400 dark:text-gray-500 truncate"
                              >
                                {item.description}
                              </motion.span>
                            )}
                          </div>
                          {item.badge && (
                            <span className={cn(
                              "flex h-5 items-center rounded-full px-2 text-[10px] font-medium",
                              item.badge === "New" 
                                ? "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400"
                                : item.badge === "Beta"
                                  ? "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-600 dark:text-amber-400"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                            )}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isOpen && openGroups.includes(group.title) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute left-full top-0 ml-2 w-56 rounded-xl border bg-background p-2 shadow-lg"
                >
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                          pathname === item.href 
                            ? "bg-primary text-white" 
                            : "hover:bg-primary/5"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto text-xs font-medium text-primary">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </nav>

      {/* User Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={itemVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="mt-auto p-3"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={cn(
                "flex items-center gap-3 rounded-xl p-3",
                "bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50",
                "dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20",
                "shadow-sm transition-all duration-200"
              )}
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-white font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  JD
                </motion.div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  john@example.com
                </p>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg p-1.5 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all"
                >
                  <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
} 