"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Book, Search, FileText, Code2, 
  Terminal, Cpu, Database, Cloud,
  ArrowRight, ChevronRight, Copy,
  CheckCircle2, ExternalLink, BookOpen,
  Lightbulb, Puzzle, Boxes, Command,
  GitBranch, Webhook, Shield, Lock,
  MessageSquare, HelpCircle, Video,
  Bookmark, Star,
  Users
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  {
    title: "Getting Started",
    icon: Lightbulb,
    color: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Quick Start Guide", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Basic Concepts", href: "#" }
    ]
  },
  {
    title: "API Reference",
    icon: Code2,
    color: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    items: [
      { title: "Authentication", href: "#" },
      { title: "Endpoints", href: "#" },
      { title: "Rate Limits", href: "#" },
      { title: "Error Handling", href: "#" }
    ]
  },
  {
    title: "Integrations",
    icon: Puzzle,
    color: "from-pink-500/20 via-rose-500/20 to-red-500/20",
    items: [
      { title: "REST API", href: "#" },
      { title: "GraphQL", href: "#" },
      { title: "WebSockets", href: "#" },
      { title: "SDKs", href: "#" }
    ]
  },
  {
    title: "Tutorials",
    icon: Video,
    color: "from-amber-500/20 via-orange-500/20 to-red-500/20",
    items: [
      { title: "Basic Tutorial", href: "#" },
      { title: "Advanced Guide", href: "#" },
      { title: "Best Practices", href: "#" },
      { title: "Examples", href: "#" }
    ]
  }
]

const popularDocs = [
  {
    title: "Authentication Guide",
    description: "Learn how to authenticate your API requests",
    icon: Lock,
    href: "#"
  },
  {
    title: "API Integration",
    description: "Step-by-step guide to integrate our API",
    icon: Webhook,
    href: "#"
  },
  {
    title: "Error Handling",
    description: "Best practices for handling API errors",
    icon: Shield,
    href: "#"
  }
]

const codeExamples = {
  authentication: `// Initialize the AI client
const client = new AI.Client({
  apiKey: 'your-api-key',
  version: 'v1'
});

// Make an API request
const response = await client.generate({
  prompt: 'Generate a creative story',
  maxTokens: 100
});

console.log(response.text);`,

  integration: `import { AIClient } from '@ai/sdk';

export function useAI() {
  const client = new AIClient({
    // Configuration options
    endpoint: 'https://api.example.com',
    timeout: 5000
  });

  return {
    generate: async (prompt) => {
      const result = await client.generate(prompt);
      return result;
    }
  };
}`
}

function CategoryCard({ category }) {
  const getIcon = (iconName) => {
    const icons = {
      Lightbulb: Lightbulb,
      Code2: Code2,
      Puzzle: Puzzle,
      Video: Video
      // Add other icons as needed
    }
    return icons[iconName] || Lightbulb
  }

  const Icon = getIcon(category.icon)

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
          `bg-gradient-to-r ${category.color}`,
          "group-hover:opacity-100"
        )}
      />
      <div className={cn(
        "relative rounded-2xl border p-6 backdrop-blur-sm",
        "bg-background/50 hover:bg-background/80",
        "transition-all duration-300"
      )}>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
            <p className="text-muted-foreground">
              {category.items.length} articles
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {category.items.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 4 }}
            >
              <Link
                href={`/docs/${item.slug}`}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-primary" />
                <span>{item.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href={`/docs/category/${category.title.toLowerCase()}`}
          className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <motion.span whileHover={{ x: 5 }}>
            View All
            <ArrowRight className="w-4 h-4 inline ml-1" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  )
}

function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-xl border bg-secondary/30 p-4">
      <button
        onClick={copyCode}
        className="absolute top-4 right-4 p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
      >
        {copied ? (
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <pre className="overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  )
}

function SearchBar() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Search documentation..."
        className={cn(
          "w-full pl-10 pr-4 py-2 rounded-xl",
          "border bg-background/50",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "placeholder:text-muted-foreground"
        )}
      />
    </div>
  )
}

export default function Documentation() {
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
              <BookOpen className="w-4 h-4" />
              Documentation
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6"
            >
              Learn How to Build with{" "}
              <span className="text-primary">AI</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Comprehensive guides and API documentation to help you build
              amazing AI-powered applications.
            </motion.p>

            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Docs */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4" />
              Popular Guides
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Most Read Articles
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Quick access to our most popular documentation
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDocs.map((doc, index) => (
              <motion.a
                key={index}
                href={doc.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="relative p-6 rounded-2xl border bg-background/50 hover:bg-background/80 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <doc.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Terminal className="w-4 h-4" />
              Code Examples
            </motion.div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Quick Start Examples
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Get started quickly with these code snippets
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Authentication Example</h3>
              <CodeBlock code={codeExamples.authentication} />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Integration Example</h3>
              <CodeBlock code={codeExamples.integration} />
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
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
                  <HelpCircle className="w-4 h-4" />
                  Need Help?
                </motion.div>
                
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Can't find what you're looking for?
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Our support team is here to help you with any questions
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Support
                    <MessageSquare className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Community
                    <Users className="w-4 h-4" />
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