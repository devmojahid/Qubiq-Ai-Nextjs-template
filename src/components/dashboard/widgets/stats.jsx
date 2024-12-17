"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Users, 
  FileText,
  Image as ImageIcon,
  Code2,
  MessageSquare
} from "lucide-react"

const stats = [
  {
    name: "Total Projects",
    value: "2,345",
    change: "+12.5%",
    icon: TrendingUp,
    trend: "up"
  },
  {
    name: "Active Users",
    value: "1,234",
    change: "+8.2%",
    icon: Users,
    trend: "up"
  },
  {
    name: "Text Generated",
    value: "45.2K",
    change: "+23.1%",
    icon: FileText,
    trend: "up"
  },
  {
    name: "Images Created",
    value: "12.5K",
    change: "+15.3%",
    icon: ImageIcon,
    trend: "up"
  }
]

export function DashboardStats() {
  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl border bg-card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{stat.name}</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <span className={`text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  )
} 