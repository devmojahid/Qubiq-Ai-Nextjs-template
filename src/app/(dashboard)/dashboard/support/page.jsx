"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, Mail, Phone, Globe, 
  Clock, Calendar, Send, PaperclipIcon,
  HelpCircle, FileText, Video, Book,
  CheckCircle2, AlertCircle, Info, Link, PhoneCall, MailQuestion,
  User, Loader2, X,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

const supportChannels = [
  {
    id: "chat",
    name: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageSquare,
    status: "Available",
    waitTime: "< 5 mins",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "#chat"
  },
  {
    id: "phone",
    name: "Phone Support",
    description: "Talk to a support specialist",
    icon: PhoneCall,
    status: "Available 24/7",
    waitTime: "No wait time",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "tel:+1234567890"
  },
  {
    id: "email",
    name: "Email Support",
    description: "Send us a detailed message",
    icon: MailQuestion,
    status: "24h response time",
    waitTime: "1 business day",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "mailto:support@example.com"
  }
]

const quickLinks = [
  {
    title: "Documentation",
    description: "Browse our detailed guides",
    icon: FileText,
    href: "/docs"
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step guides",
    icon: Video,
    href: "/tutorials"
  },
  {
    title: "Knowledge Base",
    description: "Find answers to common questions",
    icon: Book,
    href: "/knowledge-base"
  },
  {
    title: "API Reference",
    description: "Technical documentation",
    icon: Link,
    href: "/api-docs"
  }
]

const commonQuestions = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll send you an email with instructions."
  },
  {
    question: "How do I upgrade my plan?",
    answer: "Go to Billing in your dashboard settings. Click 'Upgrade Plan' and choose your new subscription level."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can pay by wire transfer."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription anytime from the Billing section. Your access will continue until the end of your billing period."
  }
]

export default function SupportPage() {
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState([])
  const [isSending, setIsSending] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSending(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setMessage("")
      setAttachments([])
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSending(false)
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachments(prev => [...prev, ...files])
  }

  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How can we help?
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our support team through any of these channels
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportChannels.map((channel) => (
            <motion.a
              key={channel.id}
              href={channel.href}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative p-6 rounded-xl border bg-card",
                "transition-all duration-200",
                "hover:shadow-lg hover:shadow-primary/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "rounded-lg p-2.5",
                  channel.bgColor
                )}>
                  <channel.icon className={cn(
                    "h-5 w-5",
                    channel.color
                  )} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{channel.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {channel.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn(
                      "inline-flex items-center gap-1",
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      channel.bgColor,
                      channel.color
                    )}>
                      <span className="relative flex h-2 w-2">
                        <span className={cn(
                          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                          channel.color
                        )} />
                        <span className={cn(
                          "relative inline-flex rounded-full h-2 w-2",
                          channel.color.replace("text-", "bg-")
                        )} />
                      </span>
                      {channel.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {channel.waitTime}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  How can we help you?
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue..."
                  className={cn(
                    "w-full min-h-[200px] rounded-lg p-4",
                    "bg-secondary/50 border border-border/50",
                    "placeholder:text-muted-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20",
                    "resize-none"
                  )}
                />
              </div>

              {/* Attachments */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Attachments
                  </label>
                  <div className="grid gap-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
                      >
                        <div className="flex items-center gap-2">
                          <PaperclipIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="p-1 rounded-lg hover:bg-secondary"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "flex items-center gap-2",
                    "px-4 py-2 rounded-lg text-sm",
                    "border border-border/50",
                    "hover:bg-secondary/80 transition-colors"
                  )}
                >
                  <PaperclipIcon className="h-4 w-4" />
                  Attach Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />

                <button
                  type="submit"
                  disabled={isSending || !message.trim()}
                  className={cn(
                    "flex items-center gap-2",
                    "px-4 py-2 rounded-lg text-sm",
                    "bg-primary text-primary-foreground",
                    "hover:opacity-90 transition-opacity",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick Links & FAQ */}
          <div className="space-y-6">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border bg-card p-6"
            >
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="grid gap-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      "bg-secondary/50 hover:bg-secondary/80",
                      "transition-colors"
                    )}
                  >
                    <link.icon className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">{link.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {link.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border bg-card p-6"
            >
              <h3 className="font-semibold mb-4">Common Questions</h3>
              <div className="space-y-3">
                {commonQuestions.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <button
                      onClick={() => setSelectedQuestion(
                        selectedQuestion === index ? null : index
                      )}
                      className={cn(
                        "flex items-center justify-between w-full",
                        "p-3 rounded-lg text-left",
                        "bg-secondary/50 hover:bg-secondary/80",
                        "transition-colors"
                      )}
                    >
                      <span className="font-medium">{item.question}</span>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        selectedQuestion === index && "rotate-180"
                      )} />
                    </button>
                    <AnimatePresence>
                      {selectedQuestion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 text-sm text-muted-foreground">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 