"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, Wand2, Save, History, Settings, 
  Loader2, Send, Mic, Image as ImageIcon,
  RefreshCcw, Copy, Download, Share2, Bot,
  Sparkles, BrainCircuit, Code2, FileText,
  Eraser, MoreVertical, PlusCircle, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatInput } from "@/components/dashboard/ai-studio/chat/chat-input"
import { ChatMessage } from "@/components/dashboard/ai-studio/chat/chat-message"
import { ChatSettings } from "@/components/dashboard/ai-studio/chat/settings"
import { ChatHistory } from "@/components/dashboard/ai-studio/chat/history"
import { ChatPrompts } from "@/components/dashboard/ai-studio/chat/prompts"

export default function ChatBotPage() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentChat, setCurrentChat] = useState(null)
  const [settings, setSettings] = useState({
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 2000,
    systemPrompt: "You are a helpful AI assistant.",
    tone: "Professional",
    expertise: "General",
    language: "English"
  })
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const messagesEndRef = useRef(null)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobileView(width < 1024)
      
      if (width >= 1024) {
        setShowSettings(false)
        setShowHistory(false)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content, attachments = []) => {
    if (!content.trim() && attachments.length === 0) return

    const newMessage = {
      id: Date.now(),
      role: "user",
      content,
      attachments,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, newMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant",
        content: "This is a sample AI response. In a real implementation, this would be the response from your AI model.",
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleNewChat = () => {
    setCurrentChat(null)
    setMessages([])
  }

  const handleClearChat = () => {
    if (messages.length > 0) {
      setMessages([])
    }
  }

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      <div className="container max-w-[1800px] mx-auto p-2 sm:p-3 md:p-6 lg:p-8 space-y-3 sm:space-y-4 md:space-y-6">
        {/* Enhanced Header Section with better mobile spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
              AI Chat Bot
            </h1>
            <p className="text-[13px] sm:text-sm text-muted-foreground">
              Have natural conversations with our advanced AI assistant
            </p>
          </div>

          {/* Improved mobile action buttons */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2",
                "bg-secondary/80 hover:bg-secondary",
                "text-xs sm:text-sm font-medium",
                "transition-all duration-200",
                showHistory && "bg-secondary shadow-sm",
                "active:scale-95"
              )}
            >
              <History className="h-3.5 w-3.5" />
              <span>History</span>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5",
                "rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2",
                "bg-primary text-primary-foreground",
                "text-xs sm:text-sm font-medium",
                "transition-all duration-200",
                showSettings && "opacity-90 shadow-sm",
                "active:scale-95"
              )}
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Settings</span>
            </button>
          </div>
        </motion.div>

        {/* Enhanced Main Content Area */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-[1fr,340px] xl:grid-cols-[1fr,380px]">
          {/* Chat Area with improved mobile layout */}
          <div className="flex h-[calc(100vh-12rem)] sm:h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)] flex-col rounded-xl border bg-card">
            {/* Chat Header with better mobile spacing */}
            <div className="flex items-center justify-between border-b p-2 sm:p-3 md:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={cn(
                  "rounded-xl p-1.5 sm:p-2",
                  "bg-primary/10 text-primary"
                )}>
                  <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">
                    {currentChat?.title || "New Chat"}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    {settings.model} • {settings.tone} • {settings.expertise}
                  </p>
                </div>
              </div>
              
              {/* Improved mobile action buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleNewChat}
                  className={cn(
                    "rounded-lg p-1.5 hover:bg-secondary/80",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors active:scale-95"
                  )}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleClearChat}
                  disabled={messages.length === 0}
                  className={cn(
                    "rounded-lg p-1.5 hover:bg-secondary/80",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <Eraser className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {}}
                  className={cn(
                    "rounded-lg p-1.5 hover:bg-secondary/80",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors active:scale-95"
                  )}
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Area with better spacing */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id}
                    message={message}
                    settings={settings}
                  />
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2 rounded-xl bg-secondary/50 p-2 sm:p-3">
                      <Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-spin" />
                      <span className="text-[11px] sm:text-xs text-muted-foreground">
                        AI is typing...
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input with better mobile spacing */}
            <div className="border-t p-2 sm:p-3 md:p-4">
              <ChatInput 
                onSendMessage={handleSendMessage}
                isTyping={isTyping}
              />
            </div>
          </div>

          {/* Right Column - Settings & History */}
          <div className="hidden lg:block space-y-6">
            <ChatPrompts onSelectPrompt={handleSendMessage} />
            <ChatSettings 
              settings={settings}
              onSettingsChange={setSettings}
              isVisible={true}
              isMobile={false}
            />
            <ChatHistory 
              showHistory={true}
              onToggleHistory={() => {}}
              isMobile={false}
              onSelectChat={(chat) => {
                setCurrentChat(chat)
                setMessages(chat.messages)
              }}
            />
          </div>
        </div>

        {/* Simplified Mobile Modals */}
        {isMobileView && (
          <>
            <AnimatePresence>
              {showSettings && (
                <div className="fixed inset-0 z-[100]">
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowSettings(false)}
                  />

                  {/* Modal */}
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 20,
                      stiffness: 300
                    }}
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "bg-background rounded-t-2xl",
                      "shadow-xl border-t border-border/50"
                    )}
                    style={{ maxHeight: "90vh" }}
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Modal Handle */}
                    <div className="sticky top-0 z-10 bg-background/95 border-b border-border/50">
                      <div className="flex justify-center py-2">
                        <div className="w-8 h-1 rounded-full bg-border" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Settings</h3>
                        <button
                          onClick={() => setShowSettings(false)}
                          className="p-1.5 rounded-lg hover:bg-secondary/80 text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-y-auto overscroll-contain">
                      <div className="px-4 py-6">
                        <ChatSettings 
                          settings={settings}
                          onSettingsChange={setSettings}
                          isVisible={showSettings}
                          isMobile={true}
                          onClose={() => setShowSettings(false)}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showHistory && (
                <div className="fixed inset-0 z-[100]">
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setShowHistory(false)}
                  />

                  {/* Modal */}
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ 
                      type: "spring", 
                      damping: 20,
                      stiffness: 300
                    }}
                    className={cn(
                      "absolute inset-x-0 bottom-0",
                      "bg-background rounded-t-2xl",
                      "shadow-xl border-t border-border/50"
                    )}
                    style={{ maxHeight: "90vh" }}
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Modal Handle */}
                    <div className="sticky top-0 z-10 bg-background/95 border-b border-border/50">
                      <div className="flex justify-center py-2">
                        <div className="w-8 h-1 rounded-full bg-border" />
                      </div>
                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium">Chat History</h3>
                        <button
                          onClick={() => setShowHistory(false)}
                          className="p-1.5 rounded-lg hover:bg-secondary/80 text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="overflow-y-auto overscroll-contain">
                      <div className="px-4 py-6">
                        <ChatHistory 
                          showHistory={showHistory}
                          onToggleHistory={setShowHistory}
                          isMobile={true}
                          onClose={() => setShowHistory(false)}
                          onSelectChat={(chat) => {
                            setCurrentChat(chat)
                            setMessages(chat.messages)
                            setShowHistory(false)
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
} 