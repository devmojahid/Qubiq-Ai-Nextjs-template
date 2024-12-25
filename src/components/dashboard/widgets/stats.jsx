"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Users, 
  FileText,
  Image as ImageIcon,
  Code2,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

const stats = [
  {
    name: "Total Credits",
    value: "2,345",
    change: "+12.5%",
    icon: TrendingUp,
    trend: "up",
    description: "Available AI credits"
  },
  {
    name: "Text Generated",
    value: "45.2K",
    change: "+23.1%",
    icon: FileText,
    trend: "up",
    description: "Words generated"
  },
  {
    name: "Images Created",
    value: "12.5K",
    change: "+15.3%",
    icon: ImageIcon,
    trend: "up",
    description: "AI images created"
  },
  {
    name: "Audio Minutes",
    value: "325",
    change: "-5.2%",
    icon: MessageSquare,
    trend: "down",
    description: "Minutes processed"
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
          className="rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.change}
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {stat.name}
              </p>
            </div>
            
            <div className="h-[2px] bg-secondary/50 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  stat.trend === "up" ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: `${Math.abs(parseFloat(stat.change))}%` }}
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </div>
        </motion.div>
      ))}
    </>
  )
} 