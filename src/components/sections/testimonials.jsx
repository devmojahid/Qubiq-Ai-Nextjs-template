"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Star, Quote, Sparkles, Zap, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "AI Content Manager",
    company: "TechCorp",
    image: "/images/testimonials/sarah.jpg",
    content: "This AI platform has revolutionized our content creation process. We're now producing 10x more content with better quality and consistency.",
    rating: 5,
    stats: {
      timeReduced: "75%",
      productivity: "10x",
      accuracy: "98%"
    },
    badge: "Top User 2024",
    useCase: "Content Generation"
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    company: "InnovateLabs",
    image: "/images/testimonials/david.jpg",
    content: "The code generation capabilities are mind-blowing. It's like having a senior developer pair programming with you 24/7.",
    rating: 5,
    stats: {
      codeQuality: "95%",
      devSpeed: "3x",
      bugReduction: "80%"
    },
    badge: "Power User",
    useCase: "Code Generation"
  },
  {
    name: "Emma Wilson",
    role: "Creative Director",
    company: "DesignFlow",
    image: "/images/testimonials/emma.jpg",
    content: "The image generation feature has transformed our design workflow. We can now prototype ideas in minutes instead of hours.",
    rating: 5,
    stats: {
      designTime: "80%",
      iterations: "5x",
      satisfaction: "99%"
    },
    badge: "Featured Client",
    useCase: "Image Generation"
  }
]

// Add these animation variants
const cardVariants = {
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

const glowVariants = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

function TestimonialCard({ testimonial, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      variants={cardVariants}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl blur-xl"
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "animate" : "initial"}
      />

      <div className="relative rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-6 lg:p-8 hover:bg-secondary/40 transition-all duration-300">
        {/* Enhanced Badge Layout for Mobile */}
        <div className="absolute -top-3 left-4 right-4 flex justify-between items-center gap-2 sm:gap-4">
          {/* Badge with improved animation */}
          <motion.div
            className={cn(
              "px-3 py-1 rounded-full border flex items-center gap-2",
              "bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5",
              "hover:from-primary/10 hover:via-primary/15 hover:to-primary/10",
              "transition-colors duration-300"
            )}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: isHovered ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary relative z-10" />
              <motion.div
                className="absolute inset-0 blur-sm bg-primary/20"
                animate={{
                  opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-[10px] sm:text-xs font-medium text-primary relative z-10 whitespace-nowrap">
              {testimonial.badge}
            </span>
          </motion.div>

          {/* Use Case Tag with improved animation */}
          <motion.div
            className={cn(
              "px-3 py-1 rounded-full flex items-center gap-1.5 sm:gap-2",
              "bg-gradient-to-r from-secondary/60 via-secondary/80 to-secondary/60",
              "hover:from-secondary/70 hover:via-secondary/90 hover:to-secondary/70",
              "backdrop-blur-sm transition-colors duration-300"
            )}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: isHovered ? [0, 360] : 0,
              }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary relative z-10" />
              <motion.div
                className="absolute inset-0 blur-sm bg-primary/20"
                animate={{
                  opacity: isHovered ? [0.2, 0.5, 0.2] : 0.2,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">
              {testimonial.useCase}
            </span>
          </motion.div>
        </div>

        {/* Content with Better Mobile Spacing */}
        <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
          {/* Dynamic Rating Animation */}
          <div className="flex gap-1.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                  rotate: isHovered ? [-10, 10, 0] : 0,
                }}
                transition={{ delay: i * 0.1 }}
              >
                <Star className="h-5 w-5 fill-primary text-primary" />
              </motion.div>
            ))}
          </div>

          {/* Enhanced Quote Layout for Mobile */}
          <motion.div 
            className="relative bg-secondary/30 rounded-xl p-4 sm:p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Quote className="absolute -left-2 -top-2 h-6 w-6 sm:h-8 sm:w-8 text-primary/20" />
            <motion.p 
              className="text-base sm:text-lg text-muted-foreground pl-3 sm:pl-4"
              animate={{
                color: isHovered ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              "{testimonial.content}"
            </motion.p>
          </motion.div>

          {/* Responsive Stats Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {Object.entries(testimonial.stats).map(([key, value], idx) => (
              <motion.div
                key={idx}
                className="relative overflow-hidden p-2 sm:p-3 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-all duration-200"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
                  animate={{
                    opacity: isHovered ? [0.2, 0.4, 0.2] : 0.1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="relative z-10"
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Author Info for Mobile */}
          <div className="flex items-center gap-3 sm:gap-4 relative">
            <motion.div 
              className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full ring-2 ring-border"
              whileHover={{ scale: 1.05, rotate: [0, -10, 10, 0] }}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h4 
                className="font-semibold text-foreground text-sm sm:text-base truncate"
                animate={{
                  color: isHovered ? "var(--primary)" : "var(--foreground)",
                }}
              >
                {testimonial.name}
              </motion.h4>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 truncate">
                <span className="truncate">{testimonial.role}</span>
                <span className="inline-block w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                <span className="truncate">{testimonial.company}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/20" />
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/40" />

      <div className="container relative">
        <motion.div
          style={{ scale, opacity }}
          className="mx-auto max-w-2xl text-center mb-16 lg:mb-24"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            See how our AI platform is transforming workflows and boosting productivity
            across different industries.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 