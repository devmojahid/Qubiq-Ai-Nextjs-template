"use client"

import { motion } from "framer-motion"
import { LineChart, BarChart3, Calendar, ArrowUpRight, Download } from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

const data = [
  {
    name: 'Mon',
    text: 650,
    image: 280,
    audio: 190,
    video: 120,
    success_rate: 98,
    response_time: 1.2
  },
  {
    name: 'Tue',
    text: 590,
    image: 480,
    audio: 210,
    video: 150,
    success_rate: 98,
    response_time: 1.2
  },
  {
    name: 'Wed',
    text: 800,
    image: 400,
    audio: 250,
    video: 180,
    success_rate: 98,
    response_time: 1.2
  },
  {
    name: 'Thu',
    text: 810,
    image: 190,
    audio: 280,
    video: 200,
    success_rate: 98,
    response_time: 1.2
  },
  {
    name: 'Fri',
    text: 560,
    image: 860,
    audio: 320,
    video: 160,
    success_rate: 98,
    response_time: 1.2
  },
  {
    name: 'Sat',
    text: 550,
    image: 270,
    audio: 190,
    video: 140,
    success_rate: 98,
    response_time: 1.2
  },
  {
    name: 'Sun',
    text: 700,
    image: 900,
    audio: 400,
    video: 220,
    success_rate: 98,
    response_time: 1.2
  },
]

const timeRanges = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last Year']

export function DashboardChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-semibold">Usage Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Your AI generation activity over time
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-lg border px-3 py-1.5 text-sm bg-transparent">
            {timeRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          <div className="flex items-center gap-1">
            <button className="rounded-lg p-2 hover:bg-secondary/80 transition-colors">
              <Calendar className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 hover:bg-secondary/80 transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -25,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorText" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(99, 102, 241)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="rgb(99, 102, 241)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorImage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(34, 197, 94)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="rgb(34, 197, 94)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAudio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(168, 85, 247)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="rgb(168, 85, 247)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorVideo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(236, 72, 153)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="rgb(236, 72, 153)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="text"
              name="Text Generation"
              stroke="rgb(99, 102, 241)"
              fillOpacity={1}
              fill="url(#colorText)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="image"
              name="Image Generation"
              stroke="rgb(34, 197, 94)"
              fillOpacity={1}
              fill="url(#colorImage)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="audio"
              name="Audio Processing"
              stroke="rgb(168, 85, 247)"
              fillOpacity={1}
              fill="url(#colorAudio)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="video"
              name="Video Generation"
              stroke="rgb(236, 72, 153)"
              fillOpacity={1}
              fill="url(#colorVideo)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
        {Object.entries({
          'Total Generations': '125.4K',
          'Active Projects': '23',
          'Success Rate': '99.8%',
          'API Calls': '1.2M',
          'Avg Response Time': '1.2s',
          'Credits Used': '78.5K',
          'Storage Used': '45.2GB',
          'Cost Savings': '$1.2K'
        }).map(([label, value]) => (
          <div key={label} className="text-center">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold mt-1">{value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
} 