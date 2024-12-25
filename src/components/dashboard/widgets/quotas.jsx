"use client"

import { motion } from "framer-motion"
import { Zap, AlertTriangle } from "lucide-react"

const quotas = [
  {
    model: "GPT-4 Turbo",
    used: 75,
    total: 100,
    unit: "K tokens"
  },
  {
    model: "DALL-E 3",
    used: 120,
    total: 150,
    unit: "images"
  },
  {
    model: "Whisper",
    used: 45,
    total: 60,
    unit: "minutes"
  },
  {
    model: "Claude 2",
    used: 25,
    total: 100,
    unit: "K tokens"
  }
]

export function DashboardQuotas() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">AI Model Usage</h3>
          <p className="text-sm text-muted-foreground">
            Monthly quota utilization
          </p>
        </div>
        <button className="rounded-lg p-2 hover:bg-secondary/80 transition-colors">
          <Zap className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {quotas.map((quota) => {
          const percentage = (quota.used / quota.total) * 100
          const isLow = percentage > 80

          return (
            <div key={quota.model} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{quota.model}</span>
                <div className="flex items-center gap-2">
                  {isLow && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                  <span>
                    {quota.used} / {quota.total} {quota.unit}
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-secondary/50">
                <div
                  className={`h-full rounded-full transition-all ${
                    isLow ? 'bg-yellow-500' : 'bg-primary'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <button className="mt-6 w-full rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors">
        Upgrade Plan
      </button>
    </motion.div>
  )
} 