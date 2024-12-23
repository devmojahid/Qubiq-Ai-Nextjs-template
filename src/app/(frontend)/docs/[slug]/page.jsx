"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { 
  ChevronRight, Copy, CheckCircle2, 
  BookOpen, ArrowLeft, ArrowRight,
  ThumbsUp, ThumbsDown, Share,
  MessageSquare, Clock, Eye,
  FileText, Bookmark, Star,
  Search, Menu, X
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { documentationData } from "@/lib/data/docs"
import { notFound } from "next/navigation"

function getArticleData(slug) {
  const article = documentationData.articles[slug]
  if (!article) {
    return null
  }
  return article
}

function TableOfContents({ items, activeSection }) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm uppercase text-muted-foreground">
        On This Page
      </h4>
      <nav className="space-y-2">
        {items.map((section) => (
          <div key={section.id} className="space-y-2">
            <Link
              href={`#${section.id}`}
              className={cn(
                "block text-sm hover:text-primary transition-colors",
                activeSection === section.id ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {section.title}
            </Link>
            {section.items?.length > 0 && (
              <div className="ml-4 space-y-2 border-l pl-2">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      "block text-sm hover:text-primary transition-colors",
                      activeSection === item.id ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-xl border bg-secondary/30 p-4 my-6">
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

function Pagination({ prev, next }) {
  return (
    <div className="flex items-center justify-between border-t pt-6 mt-12">
      {prev ? (
        <Link
          href={prev.href}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous: {prev.title}
        </Link>
      ) : <div />}
      
      {next && (
        <Link
          href={next.href}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Next: {next.title}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}

function Feedback() {
  return (
    <div className="border-t pt-6 mt-12">
      <h3 className="text-lg font-semibold mb-4">Was this page helpful?</h3>
      <div className="flex items-center gap-4">
        <motion.button
          className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/80 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ThumbsUp className="w-5 h-5" />
          Yes
        </motion.button>
        <motion.button
          className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/80 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ThumbsDown className="w-5 h-5" />
          No
        </motion.button>
      </div>
    </div>
  )
}

function MarkdownContent({ content }) {
  return (
    <div 
      className="prose prose-slate dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default function DocumentationPage({ params }) {
  const { slug } = params
  const article = getArticleData(slug)
  
  if (!article) {
    notFound()
  }

  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState("introduction")
  const [showToc, setShowToc] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -80% 0px"
      }
    )

    const headings = document.querySelectorAll("h2, h3")
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  const allSlugs = Object.keys(documentationData.articles)
  const currentIndex = allSlugs.indexOf(slug)
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null

  return (
    <div ref={containerRef} className="relative">
      {/* Mobile ToC Toggle */}
      <button
        onClick={() => setShowToc(!showToc)}
        className="fixed bottom-6 right-6 z-50 lg:hidden p-4 rounded-full bg-primary text-primary-foreground shadow-lg"
      >
        {showToc ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile ToC Sidebar */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-64 bg-background border-l p-6 transform transition-transform duration-200 ease-in-out lg:hidden",
        showToc ? "translate-x-0" : "translate-x-full"
      )}>
        <TableOfContents items={article.tableOfContents} activeSection={activeSection} />
      </div>

      <div className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="max-w-3xl">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/docs" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span>Authentication</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
              <p className="text-xl text-muted-foreground">{article.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <time dateTime={article.lastUpdated}>
                    Updated {new Date(article.lastUpdated).toLocaleDateString()}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {article.views} views
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-secondary/30 mb-8">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">{article.author.name}</div>
                <div className="text-sm text-muted-foreground">{article.author.role}</div>
              </div>
            </div>

            {/* Documentation Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <MarkdownContent content={article.content} />
            </div>

            <Feedback />
            <Pagination 
              prev={prevSlug ? {
                title: documentationData.articles[prevSlug].title,
                href: `/docs/${prevSlug}`
              } : null}
              next={nextSlug ? {
                title: documentationData.articles[nextSlug].title,
                href: `/docs/${nextSlug}`
              } : null}
            />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-8">
            <div className="sticky top-24">
              <TableOfContents 
                items={article.tableOfContents} 
                activeSection={activeSection}
              />

              {/* Related Docs */}
              <div className="mt-12">
                <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-4">
                  Related Documentation
                </h4>
                <div className="space-y-4">
                  {article.relatedDocs.map((doc, index) => (
                    <Link
                      key={index}
                      href={doc.href}
                      className="block p-4 rounded-xl border hover:bg-secondary/30 transition-colors"
                    >
                      <h5 className="font-medium mb-1">{doc.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 