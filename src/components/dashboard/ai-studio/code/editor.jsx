"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { 
  Copy, Download, Share2, Check,
  Maximize2, Minimize2, Terminal, 
  Split, Columns, Code2
} from "lucide-react"
import { cn } from "@/lib/utils"

export function CodeEditor({ 
  code = "", 
  language, 
  onChange,
  viewMode = "split", // split, editor, preview
  onViewModeChange,
  theme = "dark",
  readOnly = false
}) {
  const editorRef = useRef(null)
  const previewRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [editorHeight, setEditorHeight] = useState("500px")

  // Handle mobile view
  const [isMobileView, setIsMobileView] = useState(false)
  
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768)
      if (window.innerWidth < 768 && viewMode === "split") {
        onViewModeChange("editor")
      }
    }
    
    checkMobileView()
    window.addEventListener("resize", checkMobileView)
    return () => window.removeEventListener("resize", checkMobileView)
  }, [])

  // Editor toolbar with responsive design
  const EditorToolbar = () => (
    <div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="hidden sm:flex items-center gap-2 ml-4">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {language || "Plain Text"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {!isMobileView && (
          <button
            onClick={() => onViewModeChange(
              viewMode === "split" ? "editor" : 
              viewMode === "editor" ? "preview" : "split"
            )}
            className="p-1.5 rounded-md hover:bg-secondary/80"
          >
            {viewMode === "split" ? (
              <Columns className="h-4 w-4" />
            ) : viewMode === "editor" ? (
              <Terminal className="h-4 w-4" />
            ) : (
              <Split className="h-4 w-4" />
            )}
          </button>
        )}

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 rounded-md hover:bg-secondary/80"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>

        <button
          onClick={async () => {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          className="p-1.5 rounded-md hover:bg-secondary/80"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>

        <button
          onClick={() => {
            const blob = new Blob([code], { type: "text/plain" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `code.${language || 'txt'}`
            a.click()
            URL.revokeObjectURL(url)
          }}
          className="p-1.5 rounded-md hover:bg-secondary/80"
        >
          <Download className="h-4 w-4" />
        </button>

        <button
          onClick={() => {
            // Implement share functionality
          }}
          className="p-1.5 rounded-md hover:bg-secondary/80"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )

  return (
    <motion.div
      layout
      className={cn(
        "relative rounded-xl border bg-background/50 backdrop-blur-sm overflow-hidden",
        isFullscreen && "fixed inset-4 z-50"
      )}
    >
      <EditorToolbar />

      <div 
        className={cn(
          "grid transition-all duration-300",
          viewMode === "split" ? "grid-cols-2" : "grid-cols-1",
          isMobileView && "grid-cols-1"
        )}
        style={{ height: editorHeight }}
      >
        {/* Editor */}
        {(viewMode === "editor" || viewMode === "split") && (
          <div className="relative border-r">
            {/* Add your preferred code editor component here */}
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                "w-full h-full p-4 font-mono text-sm",
                "bg-background resize-none",
                "focus:outline-none focus:ring-0",
                readOnly && "cursor-default"
              )}
              readOnly={readOnly}
              spellCheck={false}
            />
          </div>
        )}

        {/* Preview */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div 
            ref={previewRef}
            className="overflow-auto bg-background p-4"
          >
            <pre className="text-sm">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </motion.div>
  )
} 