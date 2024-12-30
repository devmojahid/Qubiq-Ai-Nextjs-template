"use client"

import { motion } from "framer-motion"
import { 
  Code2, Braces, FileCode, Globe,
  Database, Layout, Server, Terminal,
  Languages, Blocks, GitBranch
} from "lucide-react"
import { cn } from "@/lib/utils"

const languages = [
  {
    id: "javascript",
    name: "JavaScript",
    description: "Modern JavaScript/ES6+",
    icon: Braces,
    frameworks: ["React", "Vue", "Angular", "Node.js"],
    color: "text-yellow-500"
  },
  {
    id: "html",
    name: "HTML/CSS",
    description: "Modern web markup",
    icon: Layout,
    frameworks: ["TailwindCSS", "Bootstrap", "SASS", "Less"],
    color: "text-orange-500"
  },
  {
    id: "sql",
    name: "SQL",
    description: "Database queries",
    icon: Database,
    frameworks: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"],
    color: "text-green-500"
  },
  {
    id: "php",
    name: "PHP",
    description: "Modern PHP development",
    icon: Server,
    frameworks: ["Laravel", "Symfony", "WordPress", "CodeIgniter"],
    color: "text-purple-500"
  }
]

export function CodeLanguageSelector({ selectedLanguage, onSelectLanguage }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          Select Language
        </h2>
        <button
          onClick={() => onSelectLanguage(null)}
          className="text-sm text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {languages.map((language) => (
          <motion.button
            key={language.id}
            onClick={() => onSelectLanguage(language)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative rounded-xl p-4 text-left transition-all",
              "border border-border/50",
              "hover:border-primary/50 hover:shadow-md",
              "group focus:outline-none focus:ring-2 focus:ring-primary/20",
              selectedLanguage?.id === language.id && "border-primary bg-primary/5"
            )}
          >
            <div className="space-y-3">
              <div className={cn(
                "rounded-lg p-2.5 transition-all duration-200",
                "bg-gradient-to-br from-primary/10 to-primary/5",
                "group-hover:from-primary/20 group-hover:to-primary/10"
              )}>
                <language.icon className={cn("h-6 w-6", language.color)} />
              </div>
              <div>
                <h3 className="font-medium">{language.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {language.description}
                </p>
              </div>
            </div>

            {/* Framework Tags */}
            <div className="mt-3 flex flex-wrap gap-1">
              {language.frameworks.slice(0, 2).map((framework, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                    "bg-secondary/80 text-secondary-foreground"
                  )}
                >
                  {framework}
                </span>
              ))}
              {language.frameworks.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{language.frameworks.length - 2} more
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
} 