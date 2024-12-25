import { Container } from "@/components/ui/container"
import { DashboardWelcome } from "@/components/dashboard/widgets/welcome"
import { DashboardStats } from "@/components/dashboard/widgets/stats"
import { DashboardChart } from "@/components/dashboard/widgets/chart"
import { DashboardActivity } from "@/components/dashboard/widgets/activity"
import { DashboardQuotas } from "@/components/dashboard/widgets/quotas"
import { QuickActions } from "@/components/dashboard/widgets/quick-actions"
import { AIPerformance } from "@/components/dashboard/widgets/ai-performance"
import { NotificationCenter } from "@/components/dashboard/widgets/notifications"

export const metadata = {
  title: "Dashboard | Qubiq",
  description: "AI-powered content generation dashboard"
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-3 sm:p-6">
      <DashboardWelcome />
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      
      <QuickActions />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <DashboardChart />
          <AIPerformance />
        </div>
        <div className="space-y-6">
          <NotificationCenter />
          <DashboardQuotas />
          <DashboardActivity />
        </div>
      </div>
    </div>
  )
} 