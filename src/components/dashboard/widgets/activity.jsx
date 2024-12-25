"use client"

import { motion } from "framer-motion"
import { FileText, Image as ImageIcon, Code2, MessageSquare, Video, Music, MoreVertical } from "lucide-react"

const activities = [
  {
    type: "text",
    title: "Blog Post Generated",
    description: "AI generated a new blog post about machine learning",
    time: "2 minutes ago",
    icon: FileText,
    status: "completed"
  },
  {
    type: "image",
    title: "Image Created",
    description: "New AI image generated for the marketing campaign",
    time: "15 minutes ago",
    icon: ImageIcon,
    status: "processing"
  },
  {
    type: "video",
    title: "Video Generated",
    description: "AI video creation in progress",
    time: "45 minutes ago",
    icon: Video,
    status: "pending"
  },
  {
    type: "audio",
    title: "Audio Transcription",
    description: "Podcast episode transcribed successfully",
    time: "1 hour ago",
    icon: Music,
    status: "completed"
  }
]

const statusColors = {
  completed: "bg-green-500",
  processing: "bg-blue-500 animate-pulse",
  pending: "bg-yellow-500"
}

export function DashboardActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">
            Your latest AI generations
          </p>
        </div>
        <button className="rounded-lg p-2 hover:bg-secondary/80 transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start gap-4 pb-6 last:pb-0"
          >
            <div className="absolute left-6 top-10 bottom-0 w-px bg-border last:hidden" />
            <div className="rounded-lg bg-primary/10 p-2">
              <activity.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${statusColors[activity.status]}`} />
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 