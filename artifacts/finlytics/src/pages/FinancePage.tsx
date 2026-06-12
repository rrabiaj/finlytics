

import { useState } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Receipt, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Calculator,
  Calendar,
  DollarSign
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  Bar,
  BarChart,
  Cell
} from "recharts"

const invoices = [
  { id: "INV-001", customer: "Acme Corp", amount: "$1,200.00", date: "2024-06-01", status: "Paid", due: "2024-06-15" },
  { id: "INV-002", customer: "Global Tech", amount: "$850.00", date: "2024-06-05", status: "Sent", due: "2024-06-20" },
  { id: "INV-003", customer: "Stripe Inc", amount: "$12,400.00", date: "2024-06-07", status: "Overdue", due: "2024-06-07" },
  { id: "INV-004", customer: "Vercel", amount: "$3,100.00", date: "2024-06-08", status: "Draft", due: "2024-06-22" },
]

const expenses = [
  { id: "EXP-001", category: "Software", vendor: "AWS", amount: "$450.00", date: "2024-06-02", status: "Paid" },
  { id: "EXP-002", category: "Marketing", vendor: "Google Ads", amount: "$1,200.00", date: "2024-06-04", status: "Pending" },
  { id: "EXP-003", category: "Office", vendor: "WeWork", amount: "$2,800.00", date: "2024-06-01", status: "Paid" },
  { id: "EXP-004", category: "Travel", vendor: "Uber", amount: "$45.00", date: "2024-06-05", status: "Paid" },
]

const profitData = [
  { month: "Jan", profit: 12000 },
  { month: "Feb", profit: 15000 },
  { month: "Mar", profit: 11000 },
  { month: "Apr", profit: 18000 },
  { month: "May", profit: 21000 },
  { month: "Jun", profit: 24000 },
]

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("invoices")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Finance</h2>
          <p className="text-muted-foreground">
            Track your invoices, expenses, and overall financial performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New {activeTab === "invoices" ? "Invoice" : "Expense"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New {activeTab === "invoices" ? "Invoice" : "Expense"}</DialogTitle>
                <DialogDescription>
                  Enter the details below to generate a new {activeTab === "invoices" ? "invoice for your customer" : "expense record"}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right">
                    {activeTab === "invoices" ? "Customer" : "Vendor"}
                  </Label>
                  <Input id="customer" className="col-span-3" placeholder="Select or type..." />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">Amount</Label>
                  <Input id="amount" type="number" className="col-span-3" placeholder="0.00" />
                </div>
                {activeTab === "invoices" && (
                  <div className="grid gap-4 mt-4">
                    <h4 className="text-sm font-medium">Line Items</h4>
                    <div className="space-y-2">
                       <div className="flex gap-2">
                          <Input placeholder="Description" className="flex-1" />
                          <Input placeholder="Qty" className="w-20" />
                          <Input placeholder="Price" className="w-24" />
                       </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-fit">
                       <Plus className="mr-2 h-3 w-3" /> Add Item
                    </Button>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Save {activeTab === "invoices" ? "Invoice" : "Expense"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accounts Receivable</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,245.00</div>
            <p className="text-xs text-muted-foreground mt-1">8 pending invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accounts Payable</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,592.00</div>
            <p className="text-xs text-muted-foreground mt-1">12 unpaid bills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Cash Flow</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$13,653.00</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estimated VAT</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,120.00</div>
            <p className="text-xs text-muted-foreground mt-1">Q2 Estimate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="pnl" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Profit & Loss
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Invoices</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Filter invoices..." className="w-[200px]" />
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.customer}</TableCell>
                      <TableCell>{inv.amount}</TableCell>
                      <TableCell>{inv.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          inv.status === "Paid" ? "default" : 
                          inv.status === "Sent" ? "secondary" : 
                          inv.status === "Overdue" ? "destructive" : "outline"
                        }>
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Expenses</CardTitle>
                <Button variant="outline" size="sm">
                  Upload Receipt
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((exp) => (
                    <TableRow key={exp.id}>
                      <TableCell className="font-medium">{exp.category}</TableCell>
                      <TableCell>{exp.vendor}</TableCell>
                      <TableCell>{exp.amount}</TableCell>
                      <TableCell>{exp.date}</TableCell>
                      <TableCell>
                        <Badge variant={exp.status === "Paid" ? "default" : "secondary"}>
                          {exp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pnl" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Net Profit Trend</CardTitle>
                <CardDescription>Monthly net profit for the current fiscal year.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitData}>
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip cursor={{fill: 'var(--muted)'}} contentStyle={{backgroundColor: 'var(--background)', border: '1px solid var(--border)'}} />
                    <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                      {profitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === profitData.length - 1 ? 'var(--primary)' : 'var(--primary)/40'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Gross Revenue</span>
                    <span className="font-medium">$154,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Operating Costs</span>
                    <span className="font-medium text-red-500">-$42,300</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes (Est.)</span>
                    <span className="font-medium text-red-500">-$12,400</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between font-bold">
                    <span>Net Profit</span>
                    <span className="text-green-500">$99,500</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Download P&L Statement
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
