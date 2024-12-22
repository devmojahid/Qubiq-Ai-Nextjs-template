"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, Code2, FileText, 
  Palette, Brain, Sparkles, Lightbulb,
  BookOpen, PenTool, ChevronRight,
  Star, Zap, Rocket, Target, 
  Briefcase, GraduationCap
} from "lucide-react"
import { cn } from "@/lib/utils"

const quickPrompts = [
  {
    id: "code",
    icon: Code2,
    title: "Code Assistant",
    description: "Get help with coding tasks",
    color: "from-blue-500/10 to-indigo-500/10",
    prompts: [
      {
        title: "Code Review",
        description: "Get feedback on your code",
        prompt: "Review this code for potential improvements and best practices:"
      },
      {
        title: "Debug Help",
        description: "Find and fix issues",
        prompt: "Help me debug this code and identify potential issues:"
      },
      {
        title: "Optimization",
        description: "Improve performance",
        prompt: "Suggest ways to optimize this code for better performance:"
      }
    ]
  },
  {
    id: "writing",
    icon: PenTool,
    title: "Writing Helper",
    description: "Enhance your writing",
    color: "from-purple-500/10 to-pink-500/10",
    prompts: [
      {
        title: "Professional Email",
        description: "Craft business emails",
        prompt: "Help me write a professional email about:"
      },
      {
        title: "Content Review",
        description: "Polish your content",
        prompt: "Review and improve this text for clarity and professionalism:"
      },
      {
        title: "Creative Writing",
        description: "Generate creative content",
        prompt: "Help me write a creative piece about:"
      }
    ]
  },
  {
    id: "learning",
    icon: GraduationCap,
    title: "Learning Guide",
    description: "Educational assistance",
    color: "from-green-500/10 to-emerald-500/10",
    prompts: [
      {
        title: "Concept Explanation",
        description: "Understand complex topics",
        prompt: "Explain this concept in simple terms:"
      },
      {
        title: "Study Plan",
        description: "Structured learning",
        prompt: "Create a study plan for learning:"
      },
      {
        title: "Knowledge Quiz",
        description: "Test understanding",
        prompt: "Create a quiz about:"
      }
    ]
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business Tools",
    description: "Professional assistance",
    color: "from-amber-500/10 to-orange-500/10",
    prompts: [
      {
        title: "Meeting Summary",
        description: "Summarize discussions",
        prompt: "Help me summarize this meeting:"
      },
      {
        title: "Project Planning",
        description: "Organize projects",
        prompt: "Help me create a project plan for:"
      },
      {
        title: "Strategy Development",
        description: "Strategic thinking",
        prompt: "Help me develop a strategy for:"
      }
    ]
  }
]

export function ChatPrompts({ onSelectPrompt }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [hoveredPrompt, setHoveredPrompt] = useState(null)

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Quick Prompts
        </h3>
        <p className="text-sm text-muted-foreground">
          Start with expert-crafted templates
        </p>
      </div>

      <div className="p-4">
        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {quickPrompts.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative p-4 rounded-xl text-left group transition-all",
                "border-2",
                selectedCategory === category.id
                  ? "border-primary bg-primary/5"
                  : "border-transparent hover:border-primary/20",
                `bg-gradient-to-br ${category.color}`
              )}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-background/80 p-2.5 backdrop-blur-sm">
                  <category.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{category.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {category.description}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Prompts List */}
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {quickPrompts
                .find(c => c.id === selectedCategory)
                ?.prompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    onMouseEnter={() => setHoveredPrompt(prompt)}
                    onMouseLeave={() => setHoveredPrompt(null)}
                    onClick={() => onSelectPrompt(prompt.prompt)}
                    whileHover={{ x: 4 }}
                    className={cn(
                      "w-full flex items-center justify-between",
                      "rounded-lg p-3 text-sm text-left group",
                      "hover:bg-secondary/80 transition-colors"
                    )}
                  >
                    <div>
                      <div className="font-medium">{prompt.title}</div>
                      {hoveredPrompt === prompt && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-muted-foreground"
                        >
                          {prompt.description}
                        </motion.div>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        {!selectedCategory && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectPrompt("Let's start a new conversation")}
              className={cn(
                "flex items-center gap-2 rounded-lg p-3",
                "bg-secondary/50 hover:bg-secondary/80",
                "text-sm transition-colors"
              )}
            >
              <Zap className="h-4 w-4" />
              <span>Quick Start</span>
            </button>
            <button
              onClick={() => onSelectPrompt("Help me brainstorm ideas")}
              className={cn(
                "flex items-center gap-2 rounded-lg p-3",
                "bg-secondary/50 hover:bg-secondary/80",
                "text-sm transition-colors"
              )}
            >
              <Lightbulb className="h-4 w-4" />
              <span>Brainstorm</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 