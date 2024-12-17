import { Container } from "@/components/ui/container"
import { DashboardWelcome } from "@/components/dashboard/widgets/welcome"
import { DashboardStats } from "@/components/dashboard/widgets/stats"
import { DashboardChart } from "@/components/dashboard/widgets/chart"
import { DashboardActivity } from "@/components/dashboard/widgets/activity"

export const metadata = {
  title: "Dashboard | Qubiq",
  description: "AI-powered content generation dashboard"
}

export default function DashboardPage() {
  return (
      <div className="grid gap-6">
        <DashboardWelcome />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardStats />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <DashboardChart />
          <DashboardActivity />
        </div>
      </div>
  )
} 