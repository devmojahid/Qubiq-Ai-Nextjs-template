"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard/layout/sidebar"
import { DashboardHeader } from "@/components/dashboard/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Enhanced mobile detection and state management
  useEffect(() => {
    setMounted(true)
    
    const handleResize = () => {
      const width = window.innerWidth
      const isMobileView = width < 1024

      setIsMobile(isMobileView)
      
      // Handle initial state and breakpoint changes
      if (!mounted || width !== window.innerWidth) {
        setIsSidebarOpen(!isMobileView)
      }

      // Prevent body scroll when sidebar is open on mobile
      if (isMobileView && isSidebarOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = 'auto'
    }
  }, [mounted, isSidebarOpen])

  // Enhanced toggle handler
  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => {
      const newState = !prev
      // Update body scroll when toggling on mobile
      if (isMobile) {
        document.body.style.overflow = newState ? 'hidden' : 'auto'
      }
      return newState
    })
  }

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={cn(
        "relative min-h-screen w-full overflow-x-hidden",
        "bg-gradient-to-b from-background to-background/95"
      )}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none" />
        
        {/* Main Layout */}
        <div className="relative flex min-h-screen max-w-[100vw]">
          {/* Sidebar Container */}
          <div className={cn(
            "fixed inset-y-0 left-0 z-30",
            "w-[280px]", // Fixed width
            "transition-transform duration-300 ease-in-out",
            isMobile && !isSidebarOpen && "-translate-x-full",
            !isMobile && !isSidebarOpen && "-translate-x-[200px]", // Partial hide on desktop
            "lg:translate-x-0" // Reset transform on desktop
          )}>
            <DashboardSidebar 
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
              isMobile={isMobile}
            />
          </div>

          {/* Main Content Area */}
          <div className={cn(
            "flex-1 flex flex-col min-h-screen",
            "w-full max-w-full", // Prevent overflow
            "transition-all duration-300 ease-in-out",
            isSidebarOpen ? "lg:pl-[280px]" : "lg:pl-[80px]",
            isMobile && "pl-0"
          )}>
            {/* Header Container */}
            <div className={cn(
              "sticky top-0 z-40",
              "w-full",
              "backdrop-blur-md"
            )}>
              <DashboardHeader 
                isSidebarOpen={isSidebarOpen}
                onSidebarToggle={handleSidebarToggle}
                isMobile={isMobile}
              />
            </div>
            
            {/* Content Area */}
            <main className={cn(
              "flex-1",
              "relative", // For proper stacking
              "w-full max-w-full", // Prevent overflow
              "px-4 py-6",
              "transition-all duration-300 ease-in-out",
              "sm:px-6 lg:px-8",
              isMobile && isSidebarOpen && "blur-sm pointer-events-none"
            )}>
              <div className={cn(
                "mx-auto w-full",
                "transition-all duration-300",
                "relative", // For dropdown positioning
                isSidebarOpen ? "max-w-full" : "max-w-full"
              )}>
                {children}
              </div>
            </main>
          </div>

          {/* Mobile Overlay */}
          <AnimatePresence>
            {isMobile && isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "fixed inset-0 z-20",
                  "bg-background/80 backdrop-blur-sm",
                  "lg:hidden",
                  "transition-all duration-300"
                )}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  )
} 