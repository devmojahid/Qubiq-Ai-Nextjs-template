"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code2, Play, Copy, Download, Share2,
  Save, History, Settings, RefreshCcw,
  Terminal, Braces, FileJson, Database,
  Server, Globe, Lock, Key, AlertCircle,
  CheckCircle2, X, ChevronDown, ChevronRight,
  Loader2, Info, Zap, Image as ImageIcon,
  MessageSquare, Brain, Wand2, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const testingFeatures = [
  {
    id: "ai-models",
    name: "AI Models",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    tests: [
      {
        id: "text-generation",
        name: "Text Generation",
        description: "Test text generation capabilities",
        inputs: {
          prompt: "Write a story about...",
          length: "medium",
          creativity: 0.7
        }
      },
      {
        id: "image-analysis",
        name: "Image Analysis",
        description: "Test image recognition and analysis",
        inputs: {
          imageUrl: "https://example.com/image.jpg",
          analysisType: "objects,faces,text"
        }
      }
    ]
  },
  {
    id: "integrations",
    name: "Integrations",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    tests: [
      {
        id: "webhook-test",
        name: "Webhook Testing",
        description: "Test webhook endpoints and callbacks",
        inputs: {
          url: "https://api.example.com/webhook",
          method: "POST",
          headers: {},
          payload: {}
        }
      }
    ]
  },
  {
    id: "performance",
    name: "Performance",
    icon: Sparkles,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    tests: [
      {
        id: "load-test",
        name: "Load Testing",
        description: "Test system performance under load",
        inputs: {
          endpoint: "/api/v1/test",
          concurrent: 10,
          duration: 30
        }
      }
    ]
  }
]

const TestResultsPanel = ({ results }) => (
  <div className="rounded-xl border bg-card overflow-hidden">
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Test Results</h2>
        <div className="flex items-center gap-2">
          {results?.status && (
            <div className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-medium",
              results.status === "success"
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            )}>
              {results.status.toUpperCase()}
            </div>
          )}
          <button
            onClick={() => {/* Export results */}}
            className="p-2 rounded-lg hover:bg-secondary/80"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    <div className="p-4">
      <pre className={cn(
        "w-full h-[400px] p-4 rounded-xl font-mono text-sm",
        "bg-secondary/50 border border-border/50",
        "overflow-auto"
      )}>
        {results ? JSON.stringify(results, null, 2) : "No test results yet"}
      </pre>
    </div>
  </div>
)

export default function PlaygroundPage() {
  const [selectedFeature, setSelectedFeature] = useState(testingFeatures[0])
  const [selectedTest, setSelectedTest] = useState(testingFeatures[0].tests[0])
  const [testInputs, setTestInputs] = useState(testingFeatures[0].tests[0].inputs)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRunTest = async () => {
    setIsLoading(true)
    try {
      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, 2000))
      setResults({
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          metrics: {
            duration: "1.2s",
            memory: "128MB",
            cpu: "45%"
          },
          output: "Test completed successfully"
        }
      })
    } catch (error) {
      setResults({
        status: "error",
        timestamp: new Date().toISOString(),
        error: "Test execution failed"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="container max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Testing Playground
            </h1>
            <p className="text-muted-foreground">
              Test and validate application features
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {/* Save test configuration */}}
              className={cn(
                "p-2 rounded-xl",
                "bg-secondary/50 border border-border/50",
                "hover:bg-secondary/80 transition-colors"
              )}
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={() => {/* View test history */}}
              className={cn(
                "p-2 rounded-xl",
                "bg-secondary/50 border border-border/50",
                "hover:bg-secondary/80 transition-colors"
              )}
            >
              <History className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Test Configuration Panel */}
          <div className="space-y-6">
            {/* Feature Selection */}
            <div className="rounded-xl border bg-card overflow-hidden">
              <div className="border-b p-4">
                <h2 className="font-semibold">Select Feature</h2>
              </div>
              <div className="p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {testingFeatures.map(feature => (
                    <motion.button
                      key={feature.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedFeature(feature)
                        setSelectedTest(feature.tests[0])
                        setTestInputs(feature.tests[0].inputs)
                      }}
                      className={cn(
                        "p-4 rounded-xl border text-left",
                        "transition-colors duration-200",
                        selectedFeature.id === feature.id
                          ? "bg-primary/10 border-primary"
                          : "bg-card hover:bg-secondary/50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn("p-2 rounded-lg", feature.bgColor)}>
                          <feature.icon className={cn("h-4 w-4", feature.color)} />
                        </div>
                        <span className="font-medium">{feature.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Test Selection and Configuration */}
            <div className="rounded-xl border bg-card overflow-hidden">
              <div className="border-b p-4">
                <h2 className="font-semibold">Configure Test</h2>
              </div>
              <div className="p-4 space-y-4">
                {/* Test Selection */}
                <select
                  value={selectedTest.id}
                  onChange={(e) => {
                    const test = selectedFeature.tests.find(t => t.id === e.target.value)
                    setSelectedTest(test)
                    setTestInputs(test.inputs)
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl",
                    "bg-secondary/50 border border-border/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                >
                  {selectedFeature.tests.map(test => (
                    <option key={test.id} value={test.id}>
                      {test.name}
                    </option>
                  ))}
                </select>

                {/* Test Description */}
                <div className="text-sm text-muted-foreground">
                  {selectedTest.description}
                </div>

                {/* Test Inputs */}
                <div className="space-y-4">
                  {Object.entries(testInputs).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-sm font-medium">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setTestInputs({
                          ...testInputs,
                          [key]: e.target.value
                        })}
                        className={cn(
                          "w-full px-3 py-2 rounded-xl",
                          "bg-secondary/50 border border-border/50",
                          "focus:outline-none focus:ring-2 focus:ring-primary/20"
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Run Test Button */}
            <button
              onClick={handleRunTest}
              disabled={isLoading}
              className={cn(
                "w-full px-4 py-2 rounded-xl",
                "bg-primary text-primary-foreground",
                "font-medium",
                "hover:opacity-90 transition-opacity",
                "flex items-center justify-center gap-2"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running Test...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Run Test
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <TestResultsPanel results={results} />
        </div>
      </div>
    </div>
  )
} 