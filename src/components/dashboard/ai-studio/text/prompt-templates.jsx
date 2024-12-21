"use client"

import { motion } from "framer-motion"
import { 
  FileText, MessageSquare, Sparkles, BookOpen,
  Mail, PenTool, Presentation, ShoppingBag,
  Newspaper, Megaphone, Code2, ScrollText
} from "lucide-react"
import { cn } from "@/lib/utils"

export const templates = [
  {
    id: "blog",
    name: "Blog Post",
    description: "Generate engaging blog content",
    icon: FileText,
    prompts: [
      "Write a blog post about [topic] focusing on [aspect]",
      "Create a how-to guide for [process]",
      "Explain [complex topic] in simple terms"
    ]
  },
  {
    id: "social",
    name: "Social Media",
    description: "Create viral social posts",
    icon: MessageSquare,
    prompts: [
      "Write a Twitter thread about [topic]",
      "Create an engaging LinkedIn post about [topic]",
      "Generate Instagram captions for [content]"
    ]
  },
  {
    id: "article",
    name: "Article",
    description: "Professional article writing",
    icon: Newspaper,
    prompts: [
      "Write an article about [topic]",
      "Create a news story about [event]",
      "Generate a research summary on [subject]"
    ]
  },
  {
    id: "email",
    name: "Email",
    description: "Professional email writing",
    icon: Mail,
    prompts: [
      "Write a follow-up email for [situation]",
      "Create a sales outreach email",
      "Draft a professional response to [message]"
    ]
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stories and creative writing",
    icon: PenTool,
    prompts: [
      "Write a short story about [theme]",
      "Create a poem about [subject]",
      "Generate creative descriptions of [scene]"
    ]
  },
  {
    id: "business",
    name: "Business",
    description: "Business content creation",
    icon: Presentation,
    prompts: [
      "Write a business proposal for [project]",
      "Create a company profile",
      "Generate a mission statement"
    ]
  },
  {
    id: "product",
    name: "Product",
    description: "Product descriptions & copy",
    icon: ShoppingBag,
    prompts: [
      "Write a product description for [item]",
      "Create compelling sales copy",
      "Generate product features list"
    ]
  },
  {
    id: "academic",
    name: "Academic",
    description: "Academic writing assistance",
    icon: BookOpen,
    prompts: [
      "Write an essay outline about [topic]",
      "Create an abstract for [research]",
      "Generate study notes on [subject]"
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Marketing content creation",
    icon: Megaphone,
    prompts: [
      "Write marketing copy for [product]",
      "Create an ad campaign concept",
      "Generate marketing slogans"
    ]
  },
  {
    id: "technical",
    name: "Technical",
    description: "Technical documentation",
    icon: Code2,
    prompts: [
      "Write technical documentation for [feature]",
      "Create an API description",
      "Generate code comments"
    ]
  },
  {
    id: "seo",
    name: "SEO",
    description: "SEO-optimized content",
    icon: ScrollText,
    prompts: [
      "Write SEO-optimized content about [topic]",
      "Create meta descriptions for [pages]",
      "Generate keyword-rich headlines"
    ]
  }
]

export function PromptTemplates({ selectedTemplate, onSelectTemplate }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {templates.map((template) => (
        <motion.button
          key={template.id}
          onClick={() => onSelectTemplate(template)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "relative rounded-xl p-4 text-left transition-all",
            "border border-border/50",
            "hover:border-primary/50 hover:shadow-md",
            "group focus:outline-none focus:ring-2 focus:ring-primary/20",
            selectedTemplate?.id === template.id && "border-primary bg-primary/5"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "rounded-lg p-2.5 transition-all duration-200",
              "bg-gradient-to-br from-primary/10 to-primary/5",
              "group-hover:from-primary/20 group-hover:to-primary/10"
            )}>
              <template.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
} 