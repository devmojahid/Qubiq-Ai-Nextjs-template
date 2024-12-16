"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Sparkles, Code2, Image, FileText, 
  Zap, FileEdit, MessageSquare, Settings,
  LayoutDashboard, Users, ShieldCheck, Database,
  Folder, BookOpen, HelpCircle, BarChart,
  ChevronRight
} from "lucide-react"
import { menuItems } from "@/lib/constants"

// Icon mapping
const IconMap = {
  Sparkles, Code2, Image, FileText, Zap, FileEdit, 
  MessageSquare, Settings, LayoutDashboard, Users, 
  ShieldCheck, Database, Folder, BookOpen, HelpCircle, BarChart
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.15,
      duration: 0.3,
      staggerChildren: 0.035
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2
    }
  }
}

export function MegaMenu({ category, onClose }) {
  const [isHovering, setIsHovering] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const menuRef = useRef(null)
  const navRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const items = menuItems[category]

  const handleMouseInRegion = useCallback((e, bounds, padding = 40) => {
    if (!bounds) return false
    const { clientX, clientY } = e
    const { left, right, top, bottom } = bounds

    return (
      clientX >= left - padding &&
      clientX <= right + padding &&
      clientY >= top - padding &&
      clientY <= bottom + padding
    )
  }, [])

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    const menuBounds = menuRef.current?.getBoundingClientRect()
    const navBounds = navRef.current?.getBoundingClientRect()

    if (!menuBounds || !navBounds) return

    const isInMenuArea = handleMouseInRegion(e, menuBounds)
    const isInNavArea = handleMouseInRegion(e, navBounds)

    if (isInMenuArea || isInNavArea) {
      clearCloseTimeout()
      setIsHovering(true)
    } else {
      if (!closeTimeoutRef.current) {
        closeTimeoutRef.current = setTimeout(() => {
          setIsHovering(false)
          onClose()
        }, 200)
      }
    }
  }, [clearCloseTimeout, handleMouseInRegion, onClose])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearCloseTimeout()
    }
  }, [handleMouseMove, clearCloseTimeout])

  useEffect(() => {
    const handleScroll = () => {
      if (isHovering) {
        onClose()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHovering, onClose])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && isHovering) {
        onClose()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isHovering, onClose])

  if (!items) return null

  return (
    <>
      {/* Navigation hover area */}
      <div 
        ref={navRef}
        className="absolute top-0 left-0 right-0 h-16 z-40"
        onMouseEnter={() => {
          clearCloseTimeout()
          setIsHovering(true)
        }}
      />

      {/* Mega Menu Container */}
      <motion.div
        ref={menuRef}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={containerVariants}
        className="absolute top-full left-0 right-0 z-50 w-full"
      >
        <div className="relative w-full bg-background/95 border-b border-border shadow-lg backdrop-blur-xl">
          {/* Desktop Mega Menu */}
          <div className="hidden lg:block">
            <div className="container mx-auto px-4 py-6">
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto"
              >
                {items.map((section, idx) => {
                  const SectionIcon = IconMap[section.icon] || Folder
                  return (
                    <motion.div 
                      key={idx} 
                      variants={itemVariants} 
                      className="space-y-4 relative group"
                      onMouseEnter={() => setActiveSection(idx)}
                      onMouseLeave={() => setActiveSection(null)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-all duration-200">
                          <SectionIcon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                          {section.title}
                        </h3>
                      </div>

                      <div className="grid gap-2">
                        {section.items.map((menuItem, itemIdx) => {
                          const ItemIcon = IconMap[menuItem.icon] || Folder
                          return (
                            <Link
                              key={itemIdx}
                              href={menuItem.href}
                              className="block group/item"
                              onClick={() => onClose()}
                            >
                              <motion.div 
                                className="relative p-3 rounded-xl hover:bg-secondary/80 transition-all duration-200"
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              >
                                <div className="grid grid-cols-[auto,1fr,auto] gap-4 items-center">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 group-hover/item:bg-primary/10 transition-all duration-200">
                                    <ItemIcon className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-foreground group-hover/item:text-primary transition-colors duration-200">
                                      {menuItem.name}
                                    </div>
                                    <p className="text-sm text-muted-foreground group-hover/item:text-muted-foreground/80">
                                      {menuItem.description}
                                    </p>
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover/item:text-primary transition-all duration-200 opacity-0 group-hover/item:opacity-100" />
                                </div>
                              </motion.div>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>

          {/* Mobile Mega Menu */}
          <div className="lg:hidden">
            <div className="container px-4 py-4">
              <motion.div 
                variants={containerVariants}
                className="space-y-6"
              >
                {items.map((section, idx) => {
                  const SectionIcon = IconMap[section.icon] || Folder
                  return (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                          <SectionIcon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground">{section.title}</h3>
                      </div>

                      <div className="grid gap-2">
                        {section.items.map((menuItem, itemIdx) => {
                          const ItemIcon = IconMap[menuItem.icon] || Folder
                          return (
                            <Link
                              key={itemIdx}
                              href={menuItem.href}
                              onClick={onClose}
                              className="active:scale-98 transition-transform"
                            >
                              <motion.div 
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary active:bg-secondary/80 transition-all duration-200"
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5">
                                  <ItemIcon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-foreground">
                                    {menuItem.name}
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {menuItem.description}
                                  </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
                              </motion.div>
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}




// "use client"

// import { useState, useEffect, useRef } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import { 
//   Sparkles, Code2, Image, FileText, 
//   Zap, FileEdit, MessageSquare, Settings,
//   LayoutDashboard, Users, ShieldCheck, Database,
//   Folder, BookOpen, HelpCircle, BarChart
// } from "lucide-react"
// import { menuItems } from "@/lib/constants"

// // Map of icon names to components
// const IconMap = {
//   Sparkles,
//   Code2,
//   Image,
//   FileText,
//   Zap,
//   FileEdit,
//   MessageSquare,
//   Settings,
//   LayoutDashboard,
//   Users,
//   ShieldCheck,
//   Database,
//   Folder,
//   BookOpen,
//   HelpCircle,
//   BarChart
// }

// const container = {
//   hidden: { opacity: 0, y: -8 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       bounce: 0.15,
//       duration: 0.3,
//       staggerChildren: 0.035
//     }
//   },
//   exit: {
//     opacity: 0,
//     y: -8,
//     transition: {
//       duration: 0.2
//     }
//   }
// }

// const item = {
//   hidden: { opacity: 0, y: 8 },
//   show: { 
//     opacity: 1, 
//     y: 0,
//     transition: {
//       type: "spring",
//       bounce: 0.2
//     }
//   }
// }

// export function MegaMenu({ category, onClose }) {
//   const [isHovering, setIsHovering] = useState(false)
//   const [activeNav, setActiveNav] = useState(category)
//   const menuRef = useRef(null)
//   const navRef = useRef(null)
//   const timeoutRef = useRef(null)
//   const items = menuItems[category]
  
//   useEffect(() => {
//     setActiveNav(category)
//   }, [category])

//   useEffect(() => {
//     const handleGlobalMouseMove = (e) => {
//       const menuBounds = menuRef.current?.getBoundingClientRect()
//       const navBounds = navRef.current?.getBoundingClientRect()

//       if (!menuBounds || !navBounds) return

//       const isInMenuArea = isMouseInRegion(e, menuBounds)
//       const isInNavArea = isMouseInRegion(e, navBounds)

//       if (!isInMenuArea && !isInNavArea) {
//         handleMouseLeave(e)
//       }
//     }

//     document.addEventListener('mousemove', handleGlobalMouseMove)
//     return () => {
//       document.removeEventListener('mousemove', handleGlobalMouseMove)
//       if (timeoutRef.current) clearTimeout(timeoutRef.current)
//     }
//   }, [])

//   const isMouseInRegion = (e, bounds, padding = 40) => {
//     if (!bounds) return false
//     const { clientX, clientY } = e
//     const { left, right, top, bottom } = bounds

//     return (
//       clientX >= left - padding &&
//       clientX <= right + padding &&
//       clientY >= top - padding &&
//       clientY <= bottom + padding
//     )
//   }

//   const handleMouseEnter = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current)
//     }
//     setIsHovering(true)
//   }

//   const handleMouseLeave = (e) => {
//     const menuBounds = menuRef.current?.getBoundingClientRect()
//     const navBounds = navRef.current?.getBoundingClientRect()

//     const isMovingToMenu = isMouseInRegion(e, menuBounds)
//     const isMovingToNav = isMouseInRegion(e, navBounds)

//     if (!isMovingToMenu && !isMovingToNav) {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current)
//       timeoutRef.current = setTimeout(() => {
//         setIsHovering(false)
//         onClose()
//       }, 200)
//     }
//   }

//   const handleItemHover = (e) => {
//     e.stopPropagation()
//     handleMouseEnter()
//   }

//   if (!items) return null

//   return (
//     <>
//       {/* Invisible Nav Area */}
//       <div 
//         ref={navRef}
//         className="absolute top-0 left-0 right-0 h-16 z-40"
//         onMouseEnter={handleMouseEnter}
//       />

//       {/* Mega Menu */}
//       <motion.div
//         ref={menuRef}
//         initial="hidden"
//         animate="show"
//         exit="exit"
//         variants={container}
//         className="absolute top-full left-0 right-0 z-50 w-full"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="relative w-full bg-background border-b border-border shadow-lg">
//           {/* Desktop Mega Menu */}
//           <div className="hidden lg:block">
//             <div className="container mx-auto px-4 py-6">
//               <motion.div 
//                 variants={container}
//                 className="grid grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto"
//               >
//                 {items.map((section, idx) => {
//                   const SectionIcon = IconMap[section.icon] || Folder
//                   return (
//                     <motion.div 
//                       key={idx} 
//                       variants={item} 
//                       className="space-y-4 relative group"
//                       onMouseEnter={handleItemHover}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
//                           <SectionIcon className="h-5 w-5 text-primary" />
//                         </div>
//                         <h3 className="font-semibold text-lg text-foreground">{section.title}</h3>
//                       </div>

//                       <div className="grid gap-2">
//                         {section.items.map((menuItem, itemIdx) => {
//                           const ItemIcon = IconMap[menuItem.icon] || Folder
//                           return (
//                             <Link
//                               key={itemIdx}
//                               href={menuItem.href}
//                               className="block group/item"
//                               onMouseEnter={handleItemHover}
//                               onClick={() => {
//                                 if (window.innerWidth < 1024) {
//                                   onClose()
//                                 }
//                               }}
//                             >
//                               <motion.div 
//                                 className="relative p-3 rounded-xl hover:bg-secondary transition-colors duration-200"
//                                 whileHover={{ x: 4 }}
//                                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                               >
//                                 <div className="grid grid-cols-[auto,1fr] gap-4">
//                                   <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 group-hover/item:bg-primary/10 transition-colors duration-200">
//                                     <ItemIcon className="h-5 w-5 text-primary" />
//                                   </div>
//                                   <div>
//                                     <div className="font-medium text-foreground group-hover/item:text-primary transition-colors duration-200">
//                                       {menuItem.name}
//                                     </div>
//                                     <p className="text-sm text-muted-foreground">
//                                       {menuItem.description}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             </Link>
//                           )
//                         })}
//                       </div>
//                     </motion.div>
//                   )
//                 })}
//               </motion.div>
//             </div>
//           </div>

//           {/* Mobile Mega Menu with enhanced touch handling */}
//           <div className="lg:hidden">
//             <div className="container px-4 py-4">
//               {items.map((section, idx) => {
//                 const SectionIcon = IconMap[section.icon] || Folder
//                 return (
//                   <motion.div 
//                     key={idx} 
//                     variants={item}
//                     className="mb-6 last:mb-0"
//                   >
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
//                         <SectionIcon className="h-5 w-5 text-primary" />
//                       </div>
//                       <h3 className="font-medium text-foreground">{section.title}</h3>
//                     </div>

//                     <div className="grid gap-2">
//                       {section.items.map((menuItem, itemIdx) => {
//                         const ItemIcon = IconMap[menuItem.icon] || Folder
//                         return (
//                           <Link
//                             key={itemIdx}
//                             href={menuItem.href}
//                             onClick={onClose}
//                           >
//                             <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary active:bg-secondary/60 transition-colors duration-200">
//                               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5">
//                                 <ItemIcon className="h-5 w-5 text-primary" />
//                               </div>
//                               <div>
//                                 <div className="text-sm font-medium text-foreground">
//                                   {menuItem.name}
//                                 </div>
//                                 <p className="text-xs text-muted-foreground">
//                                   {menuItem.description}
//                                 </p>
//                               </div>
//                             </div>
//                           </Link>
//                         )
//                       })}
//                     </div>
//                   </motion.div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   )
// } 