"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Sparkles, Zap, Shield, Cpu, 
  Layers, Workflow, Code2, GitBranch,
  Boxes, Fingerprint, Gauge, Lock,
  ArrowRight, Mic, Webhook, Settings2, BarChart, Users
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "AI Content Generation",
    description: "Generate high-quality content, articles, and marketing copy using advanced GPT-4 technology",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    image: "/images/features/ai-generation.jpg",
    stats: [
      { label: "Words per minute", value: "1000+" },
      { label: "Languages", value: "50+" }
    ]
  },
  {
    title: "Smart Code Assistant",
    description: "Intelligent code completion, refactoring suggestions, and bug detection powered by AI",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    image: "/images/features/code-assistant.jpg",
    stats: [
      { label: "Languages", value: "20+" },
      { label: "Accuracy", value: "99%" }
    ]
  },
  {
    title: "Image Generation",
    description: "Create stunning visuals, artwork, and designs with state-of-the-art AI image generation",
    icon: Image,
    color: "from-pink-500 to-rose-500",
    image: "/images/features/image-gen.jpg",
    stats: [
      { label: "Styles", value: "100+" },
      { label: "Resolution", value: "4K" }
    ]
  },
  {
    title: "Voice & Speech AI",
    description: "Convert text to natural-sounding speech and transcribe audio with high accuracy",
    icon: Mic,
    color: "from-amber-500 to-orange-500",
    image: "/images/features/voice-ai.jpg",
    stats: [
      { label: "Voices", value: "100+" },
      { label: "Accuracy", value: "98%" }
    ]
  }
]

const subFeatures = [
  { 
    name: "Multi-Model Support", 
    icon: Boxes,
    description: "GPT-4, DALL-E, Stable Diffusion"
  },
  { 
    name: "Real-time Processing", 
    icon: Zap,
    description: "Instant AI responses"
  },
  { 
    name: "API Integration", 
    icon: Webhook,
    description: "Easy third-party integration"
  },
  { 
    name: "Custom Fine-tuning", 
    icon: Settings2,
    description: "Train on your data"
  },
  { 
    name: "Version Control", 
    icon: GitBranch,
    description: "Track AI model versions"
  },
  { 
    name: "Data Security", 
    icon: Shield,
    description: "Enterprise-grade protection"
  },
  { 
    name: "Usage Analytics", 
    icon: BarChart,
    description: "Detailed insights"
  },
  { 
    name: "Team Collaboration", 
    icon: Users,
    description: "Multi-user workspace"
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

const shimmerAnimation = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear"
    }
  }
}

function FeatureCard({ feature, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const Icon = feature.icon

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      variants={cardVariants}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-6 lg:p-8 hover:bg-secondary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        {/* Enhanced shimmer effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
          variants={shimmerAnimation}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
        />

        {/* Feature Header */}
        <div className="flex items-start gap-4 lg:gap-6 relative z-10">
          <motion.div 
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
              "bg-gradient-to-br shadow-lg group-hover:shadow-xl",
              feature.color
            )}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="h-7 w-7 text-white" />
          </motion.div>
          <div className="space-y-2">
            <motion.h3 
              className="text-xl font-semibold tracking-tight"
              animate={{ color: isHovered ? "var(--primary)" : "var(--foreground)" }}
            >
              {feature.title}
            </motion.h3>
            <p className="text-muted-foreground">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Feature Image */}
        <div className="relative mt-6 overflow-hidden rounded-xl group-hover:shadow-lg transition-shadow duration-300">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-10"
            animate={{
              opacity: isHovered ? 0.6 : 0.9
            }}
          />
          <Image
            src={feature.image}
            alt={feature.title}
            width={800}
            height={400}
            className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>

        {/* Feature Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
          {feature.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors duration-200"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
            >
              <span className="text-lg font-semibold text-primary">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function SubFeatureCard({ feature, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-transparent"
        animate={{
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative flex flex-col items-center gap-3 p-4 text-center rounded-xl bg-secondary/50 hover:bg-secondary/70 border border-border/50 transition-all duration-300 hover:shadow-lg">
        <motion.div
          className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
          animate={isHovered ? {
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <feature.icon className="h-6 w-6 text-primary" />
        </motion.div>
        
        <div className="space-y-1">
          <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
            {feature.name}
          </span>
          <p className="text-xs text-muted-foreground">
            {feature.description}
          </p>
        </div>

        {/* Enhanced background pattern */}
        <div className="absolute inset-0 rounded-xl opacity-10 bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] [background-size:12px_12px]" />
      </div>
    </motion.div>
  )
}

export function Features() {
  const containerRef = useRef(null)
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
      {/* Enhanced Background Effects */}
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
            Powerful Features for Modern Development
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines cutting-edge technology with intuitive design to deliver
            an unmatched development experience.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div 
          style={{ opacity }}
          className="mt-16 lg:mt-24"
        >
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h3 className="text-2xl font-semibold tracking-tight mb-4">
              Everything you need to build modern applications
            </h3>
            <p className="text-muted-foreground">
              Comprehensive toolkit for developers who want to build fast, reliable, and scalable applications.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {subFeatures.map((feature, index) => (
              <SubFeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 