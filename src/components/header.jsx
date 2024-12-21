"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Search, Command } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./ui/theme-toggle"
import { Logo } from "./ui/logo"
import { MegaMenu } from "./header/mega-menu"
import { CommandMenu } from "./command-menu"

const navigation = [
  { name: "Home", href: "/", hasMega: false, category: "home" },
  { name: "Dashboard", href: "/dashboard", hasMega: true, category: "dashboard" },
  { name: "Pages", href: "/pages", hasMega: true, category: "pages" },
  { name: "Contact", href: "/contact", hasMega: false, category: "contact" },

]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMega, setActiveMega] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuHover = useCallback((category) => {
    if (category) {
      setHoveredItem(category)
      const timer = setTimeout(() => setActiveMega(category), 100)
      return () => clearTimeout(timer)
    }
    setHoveredItem(null)
    setActiveMega(null)
  }, [])

  return (
    <>
      <motion.header 
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "hsl(var(--background)/95%)" : "hsl(var(--background)/50%)",
          borderColor: isScrolled ? "hsl(var(--border)/40%)" : "transparent",
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-[backdrop-filter] duration-300"
      >
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <Logo onMouseEnter={() => handleMenuHover(null)} />
              
              {/* Enhanced Search Command */}
              <div className="hidden lg:block">
                <motion.button
                  onClick={() => setIsCommandOpen(true)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground/90 rounded-full border border-border/40 bg-secondary/30 hover:bg-secondary/50 hover:border-border/60 hover:text-foreground transition-all duration-200"
                >
                  <Search className="w-4 h-4 text-muted-foreground/70 group-hover:text-foreground/70 transition-colors duration-200" />
                  <span className="transition-colors duration-200">Quick search...</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/60 border border-border/40">
                    <span className="text-[10px] font-medium opacity-70">⌘</span>
                    <span className="text-[10px] font-medium opacity-70">K</span>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center">
              <motion.div className="flex items-center gap-1" layout>
                {navigation.map((item) => (
                  <motion.div
                    key={item.href}
                    onMouseEnter={() => handleMenuHover(item.hasMega ? item.category : null)}
                    onMouseLeave={() => handleMenuHover(null)}
                    className="relative px-1"
                    layout
                  >
                    <Link href={item.href}>
                      <motion.div
                        className={`group relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          hoveredItem === item.category
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">
                          {item.name}
                          {hoveredItem === item.category && (
                            <motion.div
                              layoutId="navHighlight"
                              className="absolute inset-0 -z-10 rounded-lg bg-secondary/60"
                              transition={{ 
                                type: "spring", 
                                bounce: 0.15, 
                                duration: 0.5 
                              }}
                            />
                          )}
                        </span>
                        {item.hasMega && (
                          <motion.div
                            animate={{ 
                              rotate: hoveredItem === item.category ? 180 : 0,
                              scale: hoveredItem === item.category ? 1.1 : 1
                            }}
                            transition={{ type: "spring", bounce: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4 text-muted-foreground/70 group-hover:text-foreground/70 transition-colors" />
                          </motion.div>
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/login">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/40 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/get-started">
                  <motion.button 
                    className="relative px-5 py-2.5 text-sm font-medium text-white rounded-full bg-primary hover:opacity-90 transition-all duration-200 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={{ 
                        x: '100%', 
                        opacity: [0, 1, 1, 0],
                        transition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          times: [0, 0.2, 0.8, 1]
                        }
                      }}
                    />
                  </motion.button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden relative p-2.5 rounded-lg hover:bg-secondary/40 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.3 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.3 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMega && (
            <MegaMenu 
              category={activeMega}
              onClose={() => handleMenuHover(null)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
            >
              <div className="container py-4 space-y-4">
                {/* Mobile Search */}
                <button
                  onClick={() => setIsCommandOpen(true)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>Search...</span>
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </button>

                {/* Mobile Navigation */}
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.name}</span>
                      {item.hasMega && <ChevronDown className="h-4 w-4 opacity-50" />}
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-border/40 space-y-2">
                  <Link href="/login" className="block">
                    <button className="w-full p-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/40 transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link href="/get-started" className="block">
                    <button className="w-full p-2 text-sm font-medium text-white rounded-lg bg-primary hover:opacity-90 transition-colors">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CommandMenu 
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  )
} 