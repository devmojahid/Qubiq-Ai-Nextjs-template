"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"

// Import base languages first
import "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-markup"
// Then import specific languages
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-php"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
// Import theme last
import "prismjs/themes/prism-tomorrow.css"

// Initialize Prism
if (typeof window !== 'undefined') {
  Prism.manual = true
}

import { 
  Copy, Download, Share2, Maximize2, 
  Minimize2, Code2, Split, Layout,
  CheckCircle2, Terminal, Play,
  RefreshCcw, Loader2, AlertCircle,
  Clipboard, ClipboardCheck,
  Expand, Shrink
} from "lucide-react"
import { cn } from "@/lib/utils"

const languageMap = {
  javascript: {
    name: "javascript",
    prismLanguage: "javascript",
    fileExtension: "js"
  },
  python: {
    name: "python",
    prismLanguage: "python",
    fileExtension: "py"
  },
  typescript: {
    name: "typescript",
    prismLanguage: "typescript",
    fileExtension: "ts"
  },
  jsx: {
    name: "jsx",
    prismLanguage: "jsx",
    fileExtension: "jsx"
  },
  html: {
    name: "html",
    prismLanguage: "markup",
    fileExtension: "html"
  },
  css: {
    name: "css",
    prismLanguage: "css",
    fileExtension: "css"
  },
  sql: {
    name: "sql",
    prismLanguage: "sql",
    fileExtension: "sql"
  },
  php: {
    name: "php",
    prismLanguage: "php",
    fileExtension: "php"
  },
  json: {
    name: "json",
    prismLanguage: "json",
    fileExtension: "json"
  }
}

const highlight = (code, language) => {
  if (!code) return ""
  try {
    const lang = languageMap[language] || languageMap.javascript
    const grammar = Prism.languages[lang.prismLanguage] || Prism.languages.javascript
    return Prism.highlight(code, grammar, lang.prismLanguage)
  } catch (error) {
    console.error("Highlighting error:", error)
    return code
  }
}

// Enhanced editor styles
const editorStyles = {
  editor: {
    fontFamily: '"Fira Code", "JetBrains Mono", monospace',
    fontSize: 14,
    minHeight: "60vh",
    backgroundColor: "transparent",
    lineHeight: 1.6,
    caretColor: "#fff",
    tabSize: 2
  },
  lineNumbers: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "40px",
    backgroundColor: "rgba(0,0,0,0.2)",
    textAlign: "right",
    padding: "20px 8px",
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    userSelect: "none",
    borderRight: "1px solid rgba(255,255,255,0.1)"
  }
}

export function CodeEditor({ 
  code, 
  language, 
  viewMode,
  onViewModeChange,
  isGenerating,
  onChange
}) {
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [editorValue, setEditorValue] = useState(code)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")

  useEffect(() => {
    setEditorValue(code)
  }, [code])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [])

  useEffect(() => {
    const textarea = document.querySelector('.npm__react-simple-code-editor__textarea')
    if (textarea) {
      textarea.style.tabSize = '2'
      textarea.addEventListener('keydown', handleTabKey)
      return () => textarea.removeEventListener('keydown', handleTabKey)
    }
  }, [])

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const spaces = '  ' // 2 spaces
      const value = e.target.value
      e.target.value = value.substring(0, start) + spaces + value.substring(end)
      e.target.selectionStart = e.target.selectionEnd = start + spaces.length
      handleEditorChange(e.target.value)
    }
  }

  const handleEditorChange = (value) => {
    setEditorValue(value)
    onChange?.(value)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleDownload = () => {
    try {
      const blob = new Blob([editorValue], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `generated-code.${language}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download:", error)
    }
  }

  const getLineNumbers = (code) => {
    const lines = code.split('\n').length
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n')
  }

  const executeCode = (code) => {
    const output = []
    try {
      const sandbox = {
        console: {
          log: (...args) => output.push(['log', args.join(' ')]),
          error: (...args) => output.push(['error', args.join(' ')]),
          warn: (...args) => output.push(['warn', args.join(' ')]),
          info: (...args) => output.push(['info', args.join(' ')])
        },
        setTimeout: (fn, ms) => setTimeout(fn, Math.min(ms, 5000)), // Limit timeout
        clearTimeout,
        setInterval: (fn, ms) => setInterval(fn, Math.min(ms, 1000)), // Limit interval
        clearInterval,
        output
      }

      // Create a secure context for code execution
      const secureCode = `
        "use strict";
        try {
          ${code}
        } catch (error) {
          console.error(error.message);
        }
      `

      new Function(...Object.keys(sandbox), secureCode)
        .apply(null, Object.values(sandbox))

      return output.map(([type, msg]) => 
        `[${type.toUpperCase()}] ${msg}`
      ).join('\n')
    } catch (error) {
      return `Error: ${error.message}`
    }
  }

  const handleRun = () => {
    setIsRunning(true)
    setOutput("")
    
    setTimeout(() => {
      try {
        if (language === "javascript") {
          const result = executeCode(editorValue)
          setOutput(result || "Code executed successfully!")
        } else {
          setOutput(`Simulated ${language} code execution completed.
Example output for ${language} code would appear here.
This is a placeholder for actual ${language} execution.`)
        }
      } catch (error) {
        setOutput(`Error: ${error.message}`)
      } finally {
        setIsRunning(false)
      }
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "rounded-xl border bg-card overflow-hidden",
        isFullscreen && "fixed inset-4 z-50 bg-background shadow-2xl"
      )}
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="font-medium">Generated Code</span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 rounded-lg bg-secondary/50 p-1">
            <button
              onClick={() => onViewModeChange("editor")}
              className={cn(
                "rounded-md p-1.5 text-sm transition-colors",
                viewMode === "editor"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              )}
              title="Editor View"
            >
              <Code2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("split")}
              className={cn(
                "rounded-md p-1.5 text-sm transition-colors",
                viewMode === "split"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              )}
              title="Split View"
            >
              <Split className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("output")}
              className={cn(
                "rounded-md p-1.5 text-sm transition-colors",
                viewMode === "output"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              )}
              title="Output View"
            >
              <Terminal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5",
              "bg-secondary/80 hover:bg-secondary",
              "text-sm transition-colors"
            )}
            title="Copy Code"
          >
            {copied ? (
              <ClipboardCheck className="h-4 w-4 text-green-500" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5",
              "bg-secondary/80 hover:bg-secondary",
              "text-sm transition-colors"
            )}
            title="Download Code"
          >
            <Download className="h-4 w-4" />
            Download
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2 py-1.5",
              "bg-secondary/80 hover:bg-secondary",
              "text-sm transition-colors"
            )}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </div>

      <div className={cn(
        "grid",
        viewMode === "split" ? "grid-cols-2 divide-x divide-border/50" : "grid-cols-1"
      )}>
        {/* Code Editor */}
        {(viewMode === "editor" || viewMode === "split") && (
          <div className="relative bg-zinc-900">
            <div style={editorStyles.lineNumbers}>
              {getLineNumbers(editorValue)}
            </div>

            <Editor
              value={editorValue}
              onValueChange={handleEditorChange}
              highlight={code => highlight(code, language)}
              padding={20}
              style={editorStyles.editor}
              className={cn(
                "focus:outline-none pl-12",
                "placeholder:text-muted-foreground",
                isGenerating && "opacity-50 cursor-not-allowed"
              )}
              disabled={isGenerating}
              placeholder="Generated code will appear here..."
              textareaClassName="focus:outline-none"
              preClassName="language-javascript"
            />

            {/* Run Button */}
            <div className="absolute bottom-4 right-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRun}
                disabled={isRunning}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 transition-all",
                  "shadow-lg shadow-primary/20",
                  isRunning && "opacity-50 cursor-not-allowed"
                )}
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isRunning ? "Running..." : "Run Code"}
              </motion.button>
            </div>
          </div>
        )}

        {/* Output Terminal */}
        {(viewMode === "output" || viewMode === "split") && (
          <div className="bg-zinc-900 p-4 font-mono text-sm">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span>Output</span>
              <button
                onClick={() => setOutput("")}
                className="hover:text-zinc-200 transition-colors"
                title="Clear Output"
              >
                <RefreshCcw className="h-4 w-4" />
              </button>
            </div>
            <div className="text-zinc-100 whitespace-pre-wrap">
              {output || "No output yet. Run your code to see results."}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}
    </motion.div>
  )
} 