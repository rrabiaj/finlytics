

import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  Calendar
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
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const forecastData = [
  { month: "Jun", current: 82000, projected: 82000 },
  { month: "Jul", current: null, projected: 88000 },
  { month: "Aug", current: null, projected: 95000 },
  { month: "Sep", current: null, projected: 102000 },
  { month: "Oct", current: null, projected: 110000 },
  { month: "Nov", current: null, projected: 105000 },
  { month: "Dec", current: null, projected: 125000 },
]

export default function CashFlowPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cash Flow Forecasting</h2>
          <p className="text-muted-foreground">
            AI-powered projections based on your historical data and current pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            July 2024 - Dec 2024
          </Button>
          <Button>Run Simulation</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>12-Month Projection</CardTitle>
                <CardDescription>Estimated cash balance based on known invoices and projected sales.</CardDescription>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Growth: 15.2%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(v) => `$${v/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="var(--primary)" 
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorProjected)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorProjected)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Financial Health Score</CardTitle>
              <CardDescription>Based on runway and debt-to-income</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end justify-between">
                <div className="text-5xl font-bold">84</div>
                <div className="text-sm font-medium text-green-500">Excellent</div>
              </div>
              <Progress value={84} className="h-2" />
              <div className="space-y-2 pt-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Runway</span>
                  <span className="font-medium text-foreground">14.2 months</span>
                </div>
                <div className="flex justify-between">
                  <span>Burn Rate</span>
                  <span className="font-medium text-foreground">$12,400/mo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Risk Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Late Invoice Risk</p>
                  <p className="text-xs text-muted-foreground">Stripe Inc invoice is 2 days overdue. Possible impact: $12k.</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Tax Reserve OK</p>
                  <p className="text-xs text-muted-foreground">You have successfully reserved $3.1k for Q2 taxes.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Worst Case", value: "$62,000", change: "-24%", trend: "down", desc: "If all pending deals fail" },
          { title: "Likely Case", value: "$125,000", change: "+12%", trend: "up", desc: "Based on historical win rate" },
          { title: "Best Case", value: "$158,000", change: "+42%", trend: "up", desc: "If all pipeline closes" },
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className={`text-xs font-medium flex items-center gap-1 mt-1 ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {item.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {item.change}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
