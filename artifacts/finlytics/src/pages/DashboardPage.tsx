

import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const data = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 52000, expenses: 34000 },
  { month: "Mar", revenue: 48000, expenses: 35000 },
  { month: "Apr", revenue: 61000, expenses: 40000 },
  { month: "May", revenue: 55000, expenses: 38000 },
  { month: "Jun", revenue: 67000, expenses: 42000 },
  { month: "Jul", revenue: 72000, expenses: 45000 },
]

const kpis = [
  {
    title: "Total Revenue",
    value: "$124,592",
    description: "+12.5% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Customers",
    value: "1,248",
    description: "+48 new this week",
    icon: Users,
    trend: "up",
  },
  {
    title: "Monthly Expenses",
    value: "$42,300",
    description: "+2.1% from last month",
    icon: TrendingDown,
    trend: "down",
  },
  {
    title: "Net Profit",
    value: "$82,292",
    description: "+15.2% from last month",
    icon: TrendingUp,
    trend: "up",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Overview</h2>
          <p className="text-muted-foreground">
            Welcome back, John. Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>Generate Insights</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {kpi.trend === "up" ? (
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <ArrowDownRight className="h-3 w-3" />
                  </span>
                )}
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Cash Flow Forecast</CardTitle>
            <CardDescription>
              Revenue vs Expenses over the last 7 months
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#888888" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#888888" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--muted-foreground)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="var(--muted-foreground)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--background)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#888888" 
                  fillOpacity={1} 
                  fill="url(#colorExpenses)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Invoices</CardTitle>
            <CardDescription>
              You have 3 invoices due this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Acme Corp", amount: "$4,200", status: "Due Tomorrow", icon: Clock, color: "text-orange-500" },
                { name: "Global Tech", amount: "$12,500", status: "Overdue", icon: AlertCircle, color: "text-destructive" },
                { name: "Stripe Inc", amount: "$8,900", status: "Due in 3 days", icon: Clock, color: "text-orange-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-muted`}>
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.status}</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold">{item.amount}</div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs text-primary">
              View all invoices
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent AI Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm">
                  Your revenue is projected to grow by <span className="font-bold">12%</span> next month based on current pipeline trends.
                </p>
              </div>
            </div>
            <div className="bg-orange-500/5 rounded-lg p-4 border border-orange-500/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                <p className="text-sm">
                  Operational expenses are <span className="font-bold">8%</span> higher than last year. Consider reviewing subscription costs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg">Project Profitability</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                   {[
                       { name: "Website Redesign", budget: "$15,000", profit: "62%", status: "On Track" },
                       { name: "Q3 Marketing Campaign", budget: "$8,000", profit: "45%", status: "On Track" },
                       { name: "Inventory Management System", budget: "$25,000", profit: "18%", status: "High Risk" },
                   ].map((project, i) => (
                       <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                           <div className="space-y-1">
                               <p className="text-sm font-medium">{project.name}</p>
                               <div className="flex items-center gap-2">
                                   <Badge variant={project.status === "On Track" ? "outline" : "destructive"} className="text-[10px] py-0">
                                       {project.status}
                                   </Badge>
                                   <span className="text-xs text-muted-foreground">Budget: {project.budget}</span>
                               </div>
                           </div>
                           <div className="text-right">
                               <p className="text-sm font-bold text-green-500">{project.profit}</p>
                               <p className="text-xs text-muted-foreground">Profit Margin</p>
                           </div>
                       </div>
                   ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
