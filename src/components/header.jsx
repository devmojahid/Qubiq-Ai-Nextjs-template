"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./ui/theme-toggle"
import { Logo } from "./ui/logo"
import { CommandMenu } from "./command-menu"
import { MegaMenu } from "./header/mega-menu"
import { DropdownMenu } from "./header/dropdown-menu"

const navigation = [
  { name: "Home", href: "/", hasMega: false, category: "home" },
  { name: "Dashboard", href: "/dashboard", hasMega: true, category: "dashboard" },
  { name: "Pages", href: "#", hasDropdown: true, category: "pages" },
  { name: "Contact", href: "/contact", hasMega: false, category: "contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMega, setActiveMega] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const [isMenuAreaHovered, setIsMenuAreaHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial size

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMenuHover = useCallback((category) => {
    if (windowSize.width >= 1024) {
      if (category) {
        setHoveredItem(category)
        setIsMenuHovered(true)
        setIsMenuAreaHovered(true)
        const timer = setTimeout(() => {
          setActiveMega(category)
        }, 100)
        return () => clearTimeout(timer)
      }
      if (!isMenuHovered && !isMenuAreaHovered) {
        setHoveredItem(null)
        setActiveMega(null)
      }
    }
  }, [windowSize.width, isMenuHovered, isMenuAreaHovered])

  const handleMouseLeave = useCallback(() => {
    setIsMenuAreaHovered(false)
    const timer = setTimeout(() => {
      if (!isMenuHovered && !isMenuAreaHovered) {
        setHoveredItem(null)
        setActiveMega(null)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [isMenuHovered, isMenuAreaHovered])

  const handleMenuMouseEnter = useCallback(() => {
    setIsMenuHovered(true)
    setIsMenuAreaHovered(true)
  }, [])

  const handleMenuMouseLeave = useCallback(() => {
    setIsMenuHovered(false)
    setIsMenuAreaHovered(false)
    const timer = setTimeout(() => {
      if (!hoveredItem && !isMenuAreaHovered) {
        setActiveMega(null)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [hoveredItem, isMenuAreaHovered])

  const handleMobileItemClick = (item) => {
    if (item.hasMega || item.hasDropdown) {
      if (activeMega === item.category) {
        setActiveMega(null)
      } else {
        setActiveMega(item.category)
      }
    } else {
      window.location.href = item.href
      setIsOpen(false)
    }
  }

  const handleNavItemClick = (item) => {
    if (!item.hasMega && !item.hasDropdown) {
      window.location.href = item.href
    }
  }

  useEffect(() => {
    const handleDocumentClick = (e) => {
      const header = document.querySelector('header')
      if (header && !header.contains(e.target)) {
        setHoveredItem(null)
        setActiveMega(null)
        setIsMenuHovered(false)
        setIsMenuAreaHovered(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
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
        onMouseLeave={() => {
          if (!isMenuHovered) {
            setIsMenuAreaHovered(false)
            handleMouseLeave()
          }
        }}
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
                    onMouseEnter={() => handleMenuHover(item.category)}
                    onMouseLeave={handleMouseLeave}
                    className="relative px-1"
                    layout
                  >
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        hoveredItem === item.category
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {(item.hasMega || item.hasDropdown) && (
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
                      {hoveredItem === item.category && (
                        <motion.div
                          layoutId="navHighlight"
                          className="absolute inset-0 -z-10 rounded-lg bg-secondary/60"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
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
                <Link href="/contact">
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

        {/* Mega Menu - Only render for desktop */}
        <AnimatePresence>
          {activeMega && !isOpen && windowSize.width >= 1024 && (
            <div 
              className="absolute left-0 right-0 z-50"
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              {navigation.find(item => item.category === activeMega)?.hasMega ? (
                <MegaMenu 
                  category={activeMega} 
                  onClose={() => {
                    if (!isMenuHovered && !isMenuAreaHovered && !hoveredItem) {
                      setActiveMega(null)
                      setHoveredItem(null)
                      setIsMenuHovered(false)
                      setIsMenuAreaHovered(false)
                    }
                  }}
                />
              ) : navigation.find(item => item.category === activeMega)?.hasDropdown ? (
                <DropdownMenu 
                  category={activeMega}
                  onClose={() => {
                    if (!isMenuHovered && !isMenuAreaHovered && !hoveredItem) {
                      setActiveMega(null)
                      setHoveredItem(null)
                      setIsMenuHovered(false)
                      setIsMenuAreaHovered(false)
                    }
                  }}
                />
              ) : null}
            </div>
          )}
        </AnimatePresence>

        {/* Mobile Menu - Updated */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-16 z-50 bg-background"
              style={{
                height: windowSize.height - 64,
                maxHeight: windowSize.height - 64,
              }}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary/50 scrollbar-track-transparent">
                  <div className="container min-h-full py-4 flex flex-col">
                    {/* Mobile Search - Enhanced */}
                    <div className="relative">
                      <button
                        onClick={() => setIsCommandOpen(true)}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                      >
                        <Search className="w-4 h-4" />
                        <span>Search...</span>
                        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted/60 px-1.5 font-mono text-[10px] font-medium">
                          <span className="text-xs">⌘</span>K
                        </kbd>
                      </button>
                    </div>

                    {/* Mobile Navigation - Enhanced */}
                    <div className="flex-1 mt-6">
                      <div className="space-y-2">
                        {navigation.map((item) => (
                          <div key={item.href} className="rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleMobileItemClick(item)}
                              className="flex w-full items-center justify-between p-3 text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-all"
                            >
                              <span className="font-medium">{item.name}</span>
                              {(item.hasMega || item.hasDropdown) && (
                                <motion.div
                                  animate={{ 
                                    rotate: activeMega === item.category ? 180 : 0 
                                  }}
                                  transition={{ type: "spring", bounce: 0.3 }}
                                >
                                  <ChevronDown className="h-4 w-4 opacity-50" />
                                </motion.div>
                              )}
                            </button>
                            
                            <AnimatePresence mode="wait">
                              {activeMega === item.category && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ type: "spring", bounce: 0.15 }}
                                  className="overflow-hidden bg-secondary/10"
                                >
                                  {item.hasMega ? (
                                    <MegaMenu 
                                      category={item.category} 
                                      onClose={() => {
                                        setActiveMega(null)
                                      }}
                                      isMobile={true}
                                    />
                                  ) : item.hasDropdown ? (
                                    <DropdownMenu 
                                      category={item.category}
                                      onClose={() => {
                                        setActiveMega(null)
                                      }}
                                      isMobile={true}
                                    />
                                  ) : null}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Auth Buttons - Enhanced */}
                    <div className="mt-auto pt-6 border-t border-border/40 space-y-3">
                      <Link href="/login" className="block">
                        <button className="w-full p-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/20 transition-colors">
                          Login
                        </button>
                      </Link>
                      <Link href="/contact" className="block">
                        <button className="w-full p-3 text-sm font-medium text-white rounded-lg bg-primary hover:opacity-90 transition-colors">
                          Get Started
                        </button>
                      </Link>
                    </div>
                  </div>
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