"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  Sparkles, Zap, Shield, Cpu, 
  Layers, Code2, GitBranch, Boxes,
  Fingerprint, Gauge, Lock, ArrowRight,
  Mic, Webhook, Settings2, BarChart,
  Users, Brain, Bot, Wand2, 
  MessageSquare, Image as ImageIcon,
  FileCode, Database, Cloud, Globe2,
  Check, ArrowUpRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const mainFeatures = [
  {
    title: "AI Content Generation",
    description: "Create high-quality content in seconds with advanced AI models",
    icon: Brain,
    color: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    image: "/images/features/ai-generation.jpg",
    features: [
      "GPT-4 powered text generation",
      "Multi-language support",
      "Content optimization",
      "SEO-friendly output"
    ]
  },
  {
    title: "Smart Code Assistant",
    description: "Intelligent code completion and suggestions powered by AI",
    icon: Code2,
    color: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    image: "/images/features/code-assistant.jpg",
    features: [
      "Real-time code suggestions",
      "Bug detection",
      "Code refactoring",
      "Multiple language support"
    ]
  },
  {
    title: "Image Generation",
    description: "Generate stunning visuals with state-of-the-art AI models",
    icon: ImageIcon,
    color: "from-pink-500/20 via-rose-500/20 to-red-500/20",
    image: "/images/features/image-gen.jpg",
    features: [
      "DALL-E integration",
      "Style customization",
      "Batch processing",
      "High resolution output"
    ]
  },
  {
    title: "Voice & Speech AI",
    description: "Convert text to natural speech and transcribe audio",
    icon: Mic,
    color: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    image: "/images/features/voice-ai.jpg",
    features: [
      "Natural voice synthesis",
      "Multi-voice options",
      "Real-time transcription",
      "Accent customization"
    ]
  }
]

const technicalFeatures = [
  {
    title: "API Integration",
    description: "Seamlessly integrate AI capabilities into your applications",
    icon: Webhook,
    features: [
      "RESTful API",
      "GraphQL support",
      "WebSocket connections",
      "Rate limiting",
      "Authentication"
    ]
  },
  {
    title: "Security",
    description: "Enterprise-grade security for your AI operations",
    icon: Shield,
    features: [
      "End-to-end encryption",
      "Data privacy",
      "Access control",
      "Audit logging",
      "Compliance"
    ]
  },
  {
    title: "Scalability",
    description: "Infrastructure that grows with your needs",
    icon: Database,
    features: [
      "Auto-scaling",
      "Load balancing",
      "Global CDN",
      "High availability",
      "Redundancy"
    ]
  }
]

const useCases = [
  {
    title: "Content Creation",
    description: "Generate blog posts, articles, and marketing copy with AI",
    icon: MessageSquare,
    image: "/images/use-cases/content.jpg",
    features: [
      "AI-powered content generation",
      "SEO optimization",
      "Multi-language support",
      "Brand voice customization"
    ],
    stats: "Used by 50k+ creators"
  },
  {
    title: "Development",
    description: "Accelerate coding with intelligent AI assistance",
    icon: FileCode,
    image: "/images/use-cases/development.jpg",
    features: [
      "Code completion",
      "Bug detection",
      "Code refactoring",
      "Documentation generation"
    ],
    stats: "10M+ lines optimized"
  },
  {
    title: "Design",
    description: "Create stunning visuals and designs with AI",
    icon: Wand2,
    image: "/images/use-cases/design.jpg",
    features: [
      "Image generation",
      "Style transfer",
      "Layout suggestions",
      "Brand consistency"
    ],
    stats: "1M+ designs created"
  }
]

function FeatureCard({ feature }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div
        className={cn(
          "absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500",
          `bg-gradient-to-r ${feature.color}`,
          "group-hover:opacity-100"
        )}
      />
      <div className={cn(
        "relative rounded-2xl border p-6 backdrop-blur-sm",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <div className="relative aspect-video mb-6 rounded-xl overflow-hidden">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <div className="p-2.5 rounded-xl bg-primary/10 backdrop-blur-sm text-primary">
              <feature.icon className="w-6 h-6" />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
        <p className="text-muted-foreground mb-4">{feature.description}</p>

        <div className="space-y-2">
          {feature.features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="p-1 rounded-full bg-primary/10 text-primary">
                <Check className="w-3 h-3" />
              </div>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="mt-6 inline-flex items-center gap-2 text-primary"
          whileHover={{ x: 5 }}
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

function TechnicalFeatureCard({ feature }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className={cn(
        "relative rounded-2xl border p-6",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <feature.icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          {feature.features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 text-sm"
            >
              <div className="p-1 rounded-full bg-primary/10 text-primary">
                <Check className="w-3 h-3" />
              </div>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function UseCaseCard({ useCase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div
        className={cn(
          "absolute -inset-px rounded-2xl opacity-0",
          "bg-gradient-to-r from-primary/20 via-transparent to-primary/20",
          "group-hover:opacity-100 transition-opacity duration-300"
        )}
      />
      <div className={cn(
        "relative rounded-2xl border overflow-hidden",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300 h-full"
      )}>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={useCase.image}
            alt={useCase.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content Container */}
        <div className="relative p-6">
          {/* Icon and Title */}
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              className="p-3 rounded-xl bg-primary/10 text-primary backdrop-blur-sm"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <useCase.icon className="w-6 h-6" />
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground mt-1">
                {useCase.description}
              </p>
            </div>
          </div>

          {/* Features List */}
          {useCase.features && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3 mt-4"
            >
              {useCase.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className="p-1 rounded-full bg-primary/10 text-primary">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Learn More Link */}
          <motion.div
            className="mt-6 flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="inline-flex items-center gap-2 text-primary text-sm font-medium"
              whileHover={{ x: 5 }}
            >
            {useCase.title.toLowerCase()}
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {useCase.stats && (
              <span className="text-sm text-muted-foreground">
                {useCase.stats}
              </span>
            )}
          </motion.div>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm">
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-grid-slate-800/20" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
          style={{ opacity }}
        />

        <div className="container relative">
          <motion.div
            style={{ scale, opacity }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Powerful Features
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            >
              Everything You Need for{" "}
              <span className="text-primary">AI Development</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Discover our comprehensive suite of AI tools and features designed to
              help you build the future of technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Cpu className="w-4 h-4" />
              Technical Features
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Built for Developers
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Powerful tools and APIs to integrate AI into your applications
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalFeatures.map((feature, index) => (
              <TechnicalFeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Layers className="w-4 h-4" />
              Use Cases
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Endless Possibilities
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Explore how our AI features can transform your workflow
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} useCase={useCase} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="relative rounded-3xl border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 opacity-50" />
            
            <div className="relative p-8 lg:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="w-4 h-4" />
                  Get Started
                </motion.div>
                
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Ready to Build with AI?
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Start building amazing AI-powered applications today.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Documentation
                    <FileCode className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 