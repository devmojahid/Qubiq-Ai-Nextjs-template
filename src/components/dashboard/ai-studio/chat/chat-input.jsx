"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, Mic, Image as ImageIcon, Paperclip,
  Plus, X, Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ChatInput({ onSendMessage, isTyping }) {
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isTyping) return

    onSendMessage(message, attachments)
    setMessage("")
    setAttachments([])
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setAttachments(prev => [
      ...prev,
      ...files.map(file => ({
        name: file.name,
        type: file.type.split("/")[0],
        file
      }))
    ])
    fileInputRef.current.value = ""
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Attachments Preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {attachments.map((attachment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={cn(
                  "group relative flex items-center gap-2",
                  "rounded-lg bg-secondary/50 px-3 py-1.5"
                )}
              >
                <span className="text-sm">{attachment.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setAttachments(prev => 
                      prev.filter((_, i) => i !== index)
                    )
                  }}
                  className={cn(
                    "rounded-full p-1",
                    "opacity-0 group-hover:opacity-100",
                    "hover:bg-secondary/80",
                    "transition-opacity"
                  )}
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="relative flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className={cn(
              "block w-full resize-none rounded-xl",
              "border-0 bg-secondary/50 p-4 pr-20",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2",
              "focus:ring-primary/20"
            )}
            style={{
              minHeight: "60px",
              maxHeight: "200px"
            }}
          />

          {/* Action Buttons */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <AnimatePresence>
              {showActions && (
                <>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "rounded-lg p-2",
                      "bg-secondary/80 text-muted-foreground",
                      "hover:bg-secondary hover:text-foreground",
                      "transition-colors"
                    )}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "rounded-lg p-2",
                      "bg-secondary/80 text-muted-foreground",
                      "hover:bg-secondary hover:text-foreground",
                      "transition-colors"
                    )}
                  >
                    <Paperclip className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button"
                    onClick={() => setIsRecording(!isRecording)}
                    className={cn(
                      "rounded-lg p-2",
                      isRecording 
                        ? "bg-red-500 text-white"
                        : "bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground",
                      "transition-colors"
                    )}
                  >
                    <Mic className="h-4 w-4" />
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={() => setShowActions(!showActions)}
              className={cn(
                "rounded-lg p-2",
                "bg-secondary/80 text-muted-foreground",
                "hover:bg-secondary hover:text-foreground",
                "transition-colors"
              )}
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isTyping || (!message.trim() && attachments.length === 0)}
          className={cn(
            "flex h-[60px] w-[60px] items-center justify-center",
            "rounded-xl bg-primary text-primary-foreground",
            "hover:opacity-90",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-opacity"
          )}
        >
          {isTyping ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </form>
  )
} 