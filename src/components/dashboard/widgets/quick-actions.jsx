"use client"

import { motion } from "framer-motion"
import { 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  Music, 
  Video,
  Star,
  Clock,
  Folder
} from "lucide-react"
import Link from "next/link"

const actions = [
  {
    name: "Text Generation",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-500",
    description: "Generate blog posts, articles & more",
    href: "/dashboard/text"
  },
  {
    name: "Image Creation",
    icon: ImageIcon,
    color: "bg-green-500/10 text-green-500",
    description: "Create stunning AI-powered images",
    href: "/dashboard/image"
  },
  {
    name: "Chat Assistant",
    icon: MessageSquare,
    color: "bg-purple-500/10 text-purple-500",
    description: "Interactive AI chat assistance",
    href: "/dashboard/chat"
  },
  {
    name: "Audio Processing",
    icon: Music,
    color: "bg-orange-500/10 text-orange-500",
    description: "Convert speech to text & more",
    href: "/dashboard/audio"
  },
  {
    name: "Video Generation",
    icon: Video,
    color: "bg-pink-500/10 text-pink-500",
    description: "Create AI-powered video content",
    href: "/dashboard/video"
  }
]

const recentProjects = [
  {
    name: "Marketing Campaign",
    type: "Multiple",
    date: "2 hours ago",
    status: "In Progress"
  },
  {
    name: "Blog Series",
    type: "Text",
    date: "5 hours ago",
    status: "Completed"
  },
  {
    name: "Product Showcase",
    type: "Video",
    date: "1 day ago",
    status: "In Review"
  }
]

export function QuickActions() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 rounded-xl border bg-card p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">
              Start generating content
            </p>
          </div>
          <button className="text-sm text-primary hover:underline">
            View All
          </button>
        </div>

        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <Link 
              key={action.name}
              href={action.href}
              className="group relative rounded-lg border p-4 hover:shadow-md transition-all duration-200 w-full block"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`rounded-lg p-2.5 w-fit ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-medium">{action.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {action.description}
                </p>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border bg-card p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Recent Projects</h3>
            <p className="text-sm text-muted-foreground">
              Your latest work
            </p>
          </div>
          <button className="rounded-lg p-2 hover:bg-secondary/80 transition-colors">
            <Folder className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.name}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{project.name}</h4>
                  <span className="rounded-full bg-secondary/50 px-2 py-0.5 text-xs">
                    {project.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{project.date}</span>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.status === "Completed" 
                  ? "bg-green-500/10 text-green-500"
                  : project.status === "In Progress"
                  ? "bg-blue-500/10 text-blue-500"
                  : "bg-yellow-500/10 text-yellow-500"
              }`}>
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 