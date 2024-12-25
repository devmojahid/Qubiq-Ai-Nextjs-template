"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { 
  ArrowRight, Sparkles, Star, 
  LayoutGrid, Palette, Shield, 
  Zap, Globe2, Lock, Cpu
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const shimmer = {
  hidden: { backgroundPosition: "200% 0" },
  visible: {
    backgroundPosition: "-200% 0",
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: "linear"
    }
  }
}

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const glowAnimation = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const featureCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
}

const features = [
  { 
    name: "AI Powered", 
    icon: Sparkles,
    description: "Advanced AI algorithms"
  },
  { 
    name: "Responsive", 
    icon: LayoutGrid,
    description: "Works on all devices"
  },
  { 
    name: "Modern UI", 
    icon: Palette,
    description: "Beautiful interface"
  },
  { 
    name: "Fast & Secure", 
    icon: Shield,
    description: "Enterprise security"
  },
  { 
    name: "Real-time", 
    icon: Zap,
    description: "Instant updates"
  },
  { 
    name: "Global CDN", 
    icon: Globe2,
    description: "Lightning fast delivery"
  },
  { 
    name: "Encrypted", 
    icon: Lock,
    description: "End-to-end encryption"
  },
  { 
    name: "Smart API", 
    icon: Cpu,
    description: "Powerful integrations"
  }
]

function FloatingElement({ children, delay = 0 }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={floatAnimation}
      style={{ 
        transition: "all 0.3s ease",
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeFeature, setActiveFeature] = useState(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/20" />
      
      {/* Add floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0}>
          <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </FloatingElement>
        <FloatingElement delay={2}>
          <div className="absolute top-40 right-[15%] w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        </FloatingElement>
      </div>

      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
        animate={shimmer}
        initial="hidden"
        variants={shimmer}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/40" />

      <div className="container relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Enhanced Badge with glow */}
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2.5 rounded-full bg-secondary/80 px-4 py-1.5 mb-8 border border-border/50 shadow-sm relative"
          >
            <motion.span 
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              variants={glowAnimation}
              initial="initial"
              animate="animate"
            />
            <motion.span 
              className="flex h-2 w-2 rounded-full bg-primary relative z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium relative z-10">v1.4.1 - Latest Updates</span>
          </motion.div>

          {/* Enhanced Main Heading */}
          <motion.h1 
            variants={fadeInUp}
            className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl mb-6"
          >
            AI content generator{" "}
            <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent inline-block">
              Dashboard
            </span>{" "}
            and{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent inline-block">
              User App
            </span>{" "}
            React Template
          </motion.h1>

          {/* Enhanced Description */}
          <motion.p 
            variants={fadeInUp}
            className="mt-6 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto"
          >
            Created with Tailwind CSS and React, our template offers a seamless blend of functionality and design.
            Experience the future of content creation with our AI-powered platform.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link href="/try-for-free">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
              >
                <Sparkles className="h-5 w-5" />
                <span>Try it for Free</span>
                <ArrowRight className="h-4 w-4 ml-1" />
                <motion.div
                  className="absolute inset-0 rounded-xl from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </motion.button>
            </Link>
            <Link href="/check-out">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-medium text-foreground hover:bg-secondary/80 transition-all duration-200 border border-border/50"
              >
                Check Out
                <Star className="h-4 w-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div 
            variants={fadeInUp}
            className="mt-16 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureCardVariants}
                whileHover={{ 
                  scale: 1.03,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                className={cn(
                  "flex flex-col items-center gap-2.5 rounded-xl p-4 transition-all duration-200",
                  "bg-secondary/50 dark:bg-secondary/40 hover:bg-secondary/70 dark:hover:bg-secondary/60",
                  "border border-border/50 dark:border-border/40",
                  "cursor-pointer group relative overflow-hidden"
                )}
              >
                <motion.div
                  className="relative z-10 p-2.5 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-200"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </motion.div>

                <span className="text-sm font-medium text-foreground/90 dark:text-foreground/80 relative z-10">
                  {feature.name}
                </span>

                <AnimatePresence mode="wait">
                  {activeFeature === index && (
                    <motion.p
                      key={`feature-${index}`}
                      variants={scaleAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="text-xs text-muted-foreground dark:text-muted-foreground/90 relative z-10"
                    >
                      {feature.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Preview Image */}
          <motion.div 
            variants={fadeInUp}
            className="mt-20 rounded-xl border bg-background/50 shadow-2xl overflow-hidden"
          >
            <Image
              src="/images/hero/ai-code.jpg"
              alt="Dashboard Preview"
              width={1200}
              height={800}
              className="rounded-xl transform hover:scale-[1.02] transition-transform duration-500"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 