"use client"

import { motion } from "framer-motion"
import { Bell, AlertCircle, CheckCircle2, Info, Clock, X } from "lucide-react"

const notifications = [
  {
    title: "New Feature Available",
    message: "Try out our new video generation capabilities!",
    time: "Just now",
    type: "info",
    read: false
  },
  {
    title: "Usage Alert",
    message: "You've used 80% of your monthly quota",
    time: "2 hours ago",
    type: "warning",
    read: false
  },
  {
    title: "Generation Complete",
    message: "Your batch of 10 images has been generated",
    time: "5 hours ago",
    type: "success",
    read: true
  }
]

const typeStyles = {
  info: "text-blue-500 bg-blue-500/10",
  warning: "text-yellow-500 bg-yellow-500/10",
  success: "text-green-500 bg-green-500/10",
  error: "text-red-500 bg-red-500/10"
}

const typeIcons = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle2,
  error: AlertCircle
}

export function NotificationCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Stay updated with AI activities
            </p>
          </div>
        </div>
        <button className="text-sm text-primary hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {notifications.map((notification, index) => {
          const Icon = typeIcons[notification.type]
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex gap-4 rounded-lg border p-4 ${
                !notification.read ? 'bg-secondary/50' : ''
              }`}
            >
              <div className={`rounded-full p-2 ${typeStyles[notification.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                  <button className="rounded-lg p-1 hover:bg-secondary/80 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{notification.time}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <button className="mt-4 w-full rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors">
        View All Notifications
      </button>
    </motion.div>
  )
} 