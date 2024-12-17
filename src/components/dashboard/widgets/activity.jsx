"use client"

import { motion } from "framer-motion"
import { FileText, Image as ImageIcon, Code2, MessageSquare } from "lucide-react"

const activities = [
  {
    type: "text",
    title: "Blog Post Generated",
    description: "AI generated a new blog post about machine learning",
    time: "2 minutes ago",
    icon: FileText
  },
  {
    type: "image",
    title: "Image Created",
    description: "New AI image generated for the marketing campaign",
    time: "15 minutes ago",
    icon: ImageIcon
  },
  {
    type: "code",
    title: "Code Snippet Generated",
    description: "React component generated with AI assistance",
    time: "1 hour ago",
    icon: Code2
  },
  {
    type: "chat",
    title: "Chat Session",
    description: "Completed chat session with AI assistant",
    time: "2 hours ago",
    icon: MessageSquare
  }
]

export function DashboardActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      <h3 className="font-semibold">Recent Activity</h3>

      <div className="mt-4 space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="rounded-lg bg-primary/10 p-2">
              <activity.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 