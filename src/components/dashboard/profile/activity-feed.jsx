import { motion, AnimatePresence } from "framer-motion"
import { 
  Activity, CheckCircle2, XCircle, AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border p-6 space-y-6"
    >
      <h3 className="font-semibold flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        Recent Activity
      </h3>
      <div className="space-y-6">
        {activityItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4"
          >
            <div className={cn(
              "rounded-full p-2",
              item.type === "success" && "bg-green-500/10 text-green-500",
              item.type === "error" && "bg-red-500/10 text-red-500",
              item.type === "warning" && "bg-yellow-500/10 text-yellow-500"
            )}>
              {item.type === "success" && <CheckCircle2 className="h-5 w-5" />}
              {item.type === "error" && <XCircle className="h-5 w-5" />}
              {item.type === "warning" && <AlertCircle className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <time className="text-xs text-muted-foreground">{item.time}</time>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const activityItems = [
  {
    id: 1,
    type: "success",
    title: "Project Completed",
    description: "Successfully completed the AI chatbot implementation",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "warning",
    title: "API Usage Alert",
    description: "Approaching monthly API usage limit (85%)",
    time: "5 hours ago"
  },
  {
    id: 3,
    type: "success",
    title: "New Integration Added",
    description: "Connected GitHub repository for automated deployments",
    time: "1 day ago"
  },
  {
    id: 4,
    type: "error",
    title: "Build Failed",
    description: "Production build failed due to dependency conflicts",
    time: "2 days ago"
  },
  {
    id: 5,
    type: "success",
    title: "Feature Deployed",
    description: "Successfully deployed new authentication system",
    time: "3 days ago"
  }
] 