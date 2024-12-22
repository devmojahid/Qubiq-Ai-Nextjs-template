"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Copy, Download, Share2, Bot, User,
  Code2, FileText, ImageIcon, Link,
  Check, ExternalLink, MessageSquare,
  ThumbsUp, ThumbsDown
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatMessage({ message, settings }) {
  const [isCopied, setIsCopied] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const isBot = message.role === "assistant"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative flex gap-4 rounded-xl p-4",
        isBot && "bg-secondary/50",
        "hover:bg-secondary/80 transition-colors duration-200"
      )}
    >
      {/* Avatar with Status Indicator */}
      <div className="relative">
        <div className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center",
          "rounded-xl shadow-sm transition-transform duration-200",
          "group-hover:scale-105",
          isBot 
            ? "bg-primary/10 text-primary ring-2 ring-primary/20"
            : "bg-secondary text-foreground"
        )}>
          {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
        </div>
        {isBot && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
          </span>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {isBot ? "AI Assistant" : "You"}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            {isBot && (
              <span className="text-xs text-muted-foreground">
                • {settings.model}
              </span>
            )}
          </div>
        </div>

        {/* Text Content with Better Typography */}
        <div className={cn(
          "prose prose-sm dark:prose-invert max-w-none",
          "rounded-lg transition-colors duration-200"
        )}>
          {message.content}
        </div>

        {/* Attachments with Enhanced Styling */}
        {message.attachments?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.attachments.map((attachment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "group/attachment flex items-center gap-2",
                  "rounded-lg bg-secondary/80 px-3 py-1.5",
                  "ring-1 ring-primary/10",
                  "hover:bg-secondary hover:ring-primary/20",
                  "transition-all duration-200"
                )}
              >
                {getAttachmentIcon(attachment.type)}
                <span className="text-sm">{attachment.name}</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover/attachment:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={cn(
                "rounded-lg p-1.5 text-xs",
                "text-muted-foreground",
                "hover:bg-secondary hover:text-foreground",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/20"
              )}
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </motion.button>
            {isBot && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {}}
                  className={cn(
                    "rounded-lg p-1.5 text-xs",
                    "text-muted-foreground",
                    "hover:bg-secondary hover:text-foreground",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                >
                  <Download className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {}}
                  className={cn(
                    "rounded-lg p-1.5 text-xs",
                    "text-muted-foreground",
                    "hover:bg-secondary hover:text-foreground",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
              </>
            )}
          </div>

          {/* Feedback Buttons for AI Responses */}
          {isBot && (
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowFeedback(true)
                  setFeedback('positive')
                }}
                className={cn(
                  "rounded-lg p-1.5",
                  "text-muted-foreground",
                  "hover:bg-green-500/10 hover:text-green-500",
                  "transition-all duration-200",
                  feedback === 'positive' && "text-green-500 bg-green-500/10",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20"
                )}
              >
                <ThumbsUp className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowFeedback(true)
                  setFeedback('negative')
                }}
                className={cn(
                  "rounded-lg p-1.5",
                  "text-muted-foreground",
                  "hover:bg-red-500/10 hover:text-red-500",
                  "transition-all duration-200",
                  feedback === 'negative' && "text-red-500 bg-red-500/10",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20"
                )}
              >
                <ThumbsDown className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Feedback Form */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                "mt-4 rounded-xl border bg-secondary/30",
                "backdrop-blur-sm shadow-sm"
              )}
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>Share Your Feedback</span>
                </div>
                
                <textarea
                  placeholder="What did you think about this response? Your feedback helps us improve."
                  className={cn(
                    "w-full rounded-lg bg-background/50 p-3",
                    "text-sm placeholder:text-muted-foreground",
                    "border-0 focus:outline-none focus:ring-2 focus:ring-primary/20",
                    "resize-none min-h-[100px]"
                  )}
                  autoFocus
                />

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      Rate this response:
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <motion.button
                          key={rating}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={cn(
                            "rounded-full p-1",
                            "text-muted-foreground hover:text-yellow-500",
                            "transition-colors"
                          )}
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowFeedback(false)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm",
                        "text-muted-foreground hover:text-foreground",
                        "transition-colors"
                      )}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowFeedback(false)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium",
                        "bg-primary text-primary-foreground",
                        "hover:opacity-90 transition-opacity"
                      )}
                    >
                      Submit Feedback
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function getAttachmentIcon(type) {
  switch (type) {
    case "code":
      return <Code2 className="h-4 w-4" />
    case "document":
      return <FileText className="h-4 w-4" />
    case "image":
      return <ImageIcon className="h-4 w-4" />
    case "link":
      return <Link className="h-4 w-4" />
    default:
      return null
  }
} 