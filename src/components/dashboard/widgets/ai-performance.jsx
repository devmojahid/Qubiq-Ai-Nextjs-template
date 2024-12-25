"use client"

import { motion } from "framer-motion"
import { Brain, Cpu, Gauge, Zap, BarChart2, Network } from "lucide-react"

const models = [
  {
    name: "GPT-4 Turbo",
    performance: 98,
    latency: "120ms",
    status: "Operational",
    load: 65,
    icon: Brain,
    color: "text-blue-500"
  },
  {
    name: "DALL-E 3",
    performance: 95,
    latency: "450ms",
    status: "High Demand",
    load: 85,
    icon: Cpu,
    color: "text-purple-500"
  },
  {
    name: "Whisper",
    performance: 99,
    latency: "80ms",
    status: "Operational",
    load: 45,
    icon: Network,
    color: "text-green-500"
  }
]

export function AIPerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">AI Model Performance</h3>
          <p className="text-sm text-muted-foreground">
            Real-time model metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            All Systems Normal
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {models.map((model) => (
          <div
            key={model.name}
            className="relative overflow-hidden rounded-lg border p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2.5 bg-card border ${model.color}`}>
                  <model.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{model.name}</h4>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Gauge className="h-3.5 w-3.5" />
                    <span>{model.latency}</span>
                    <span>•</span>
                    <span>{model.status}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{model.performance}%</div>
                <p className="text-sm text-muted-foreground">Performance</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">System Load</span>
                <span className="font-medium">{model.load}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary/50">
                <div
                  className={`h-full rounded-full transition-all ${
                    model.load > 80 
                      ? 'bg-red-500' 
                      : model.load > 60 
                      ? 'bg-yellow-500' 
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${model.load}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Success Rate</p>
                  <p className="font-medium">99.9%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg. Response</p>
                  <p className="font-medium">1.2s</p>
                </div>
              </div>
              <button className="rounded-lg border px-3 py-1 text-sm hover:bg-secondary/80 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
} 