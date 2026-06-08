"use client"

import { 
  Download, 
  Filter, 
  Plus, 
  Calendar, 
  BarChart3, 
  LineChart, 
  PieChart, 
  FileJson,
  FileText as FilePdf,
  Table as TableIcon
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ResponsiveContainer, 
  Line, 
  LineChart as ReLineChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Bar,
  BarChart,
  Pie,
  PieChart as RePieChart,
  Cell
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const revenueData = [
  { day: "Mon", current: 4000, last: 2400 },
  { day: "Tue", current: 3000, last: 1398 },
  { day: "Wed", current: 2000, last: 9800 },
  { day: "Thu", current: 2780, last: 3908 },
  { day: "Fri", current: 1890, last: 4800 },
  { day: "Sat", current: 2390, last: 3800 },
  { day: "Sun", current: 3490, last: 4300 },
]

const categoryData = [
  { name: "Services", value: 400 },
  { name: "Subscriptions", value: 300 },
  { name: "Products", value: 200 },
  { name: "Licensing", value: 100 },
]

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444"]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>
          <p className="text-muted-foreground">
            Deep dive into your business performance with custom analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><FilePdf className="mr-2 h-4 w-4" /> PDF Report</DropdownMenuItem>
              <DropdownMenuItem><TableIcon className="mr-2 h-4 w-4" /> CSV Export</DropdownMenuItem>
              <DropdownMenuItem><FileJson className="mr-2 h-4 w-4" /> JSON Data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Revenue", value: "$45,231", desc: "+20.1% from last month" },
          { title: "Expenses", value: "$12,302", desc: "-4.5% from last month" },
          { title: "Avg. Transaction", value: "$852", desc: "+12% from last month" },
          { title: "Churn Rate", value: "2.4%", desc: "-0.5% from last month" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Plus className="h-3 w-3" /> Custom Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Comparison between current and previous period.</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                    <Tooltip contentStyle={{backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px'}} />
                    <Line type="monotone" dataKey="current" stroke="var(--primary)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="last" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </ReLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Distribution of income sources.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
              <div className="p-6 pt-0 space-y-2">
                {categoryData.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                      <span>{c.name}</span>
                    </div>
                    <span className="font-medium">{c.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
