"use client"

import { useState } from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  ExternalLink,
  Users,
  Target,
  CheckCircle2,
  Clock,
  ArrowUpRight
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const customers = [
  {
    id: "1",
    name: "Acme Corp",
    contact: "Alice Johnson",
    email: "alice@acme.com",
    status: "Active",
    value: "$12,400",
    lastOrder: "2024-05-15",
    tags: ["VIP", "Enterprise"],
  },
  {
    id: "2",
    name: "Global Tech",
    contact: "Bob Smith",
    email: "bob@globaltech.io",
    status: "Inactive",
    value: "$8,900",
    lastOrder: "2024-03-20",
    tags: ["Legacy"],
  },
  {
    id: "3",
    name: "Stripe Inc",
    contact: "Charlie Brown",
    email: "charlie@stripe.com",
    status: "Active",
    value: "$45,000",
    lastOrder: "2024-06-01",
    tags: ["VIP", "High Value"],
  },
  {
    id: "4",
    name: "Vercel",
    contact: "David Miller",
    email: "david@vercel.com",
    status: "Active",
    value: "$22,100",
    lastOrder: "2024-05-28",
    tags: ["Fast Growth"],
  },
]

const leads = [
  { id: "L1", name: "Innovate AI", stage: "Proposal", value: "$15,000", owner: "John Doe" },
  { id: "L2", name: "Nexus Systems", stage: "Qualified", value: "$5,500", owner: "Sarah Smith" },
  { id: "L3", name: "Skyline Media", stage: "Contacted", value: "$2,200", owner: "John Doe" },
  { id: "L4", name: "Peak Solutions", stage: "New", value: "$10,000", owner: "Jane Wilson" },
]

const leadStages = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState("customers")
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">CRM</h2>
          <p className="text-muted-foreground">
            Manage your customers, leads, and sales pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add {activeTab === "customers" ? "Customer" : "Lead"}
          </Button>
        </div>
      </div>

      <Sheet open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <SheetContent className="sm:max-w-[540px]">
          {selectedCustomer && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-xl">{selectedCustomer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle className="text-2xl">{selectedCustomer.name}</SheetTitle>
                    <SheetDescription>{selectedCustomer.contact} • {selectedCustomer.email}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <div className="space-y-6 py-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Lifetime Value</p>
                    <p className="text-lg font-bold text-primary">{selectedCustomer.value}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge variant={selectedCustomer.status === "Active" ? "default" : "secondary"}>
                      {selectedCustomer.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3">Activity History</h4>
                  <div className="space-y-4">
                    {[
                      { date: "2024-05-15", event: "Order #4029 placed", amount: "$1,200" },
                      { date: "2024-04-10", event: "Inquiry regarding API access", amount: null },
                      { date: "2024-03-20", event: "Annual subscription renewal", amount: "$8,900" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="w-20 shrink-0 text-muted-foreground text-[12px]">{item.date}</div>
                        <div>
                          <p className="font-medium">{item.event}</p>
                          {item.amount && <p className="text-xs text-muted-foreground">Amount: {item.amount}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Tabs defaultValue="customers" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Tasks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Customer Directory</CardTitle>
                  <CardDescription>Manage your customer relationships and view their status.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search customers..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>LTV</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id} className="cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{customer.name}</span>
                          <span className="text-xs text-muted-foreground font-normal">{customer.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.contact}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0">{tag}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.value}</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Send email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
            {leadStages.map((stage) => (
              <div key={stage} className="space-y-4 min-w-[200px]">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-semibold text-sm">{stage}</h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {leads.filter(l => l.stage === stage).length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {leads.filter(l => l.stage === stage).map((lead) => (
                    <Card key={lead.id} className="cursor-pointer hover:border-primary transition-colors">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">{lead.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-xs font-bold text-primary mb-2">{lead.value}</div>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarFallback>{lead.owner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            {lead.owner}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="ghost" className="w-full h-8 text-xs border-dashed border justify-start px-2 opacity-50 hover:opacity-100">
                    <Plus className="mr-1 h-3 w-3" /> Add Lead
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sales Tasks</CardTitle>
                <CardDescription>Follow-ups and reminders for your leads and customers.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Follow up with Acme Corp", due: "Today, 2:00 PM", priority: "High", type: "Email" },
                    { title: "Send proposal to Innovate AI", due: "Tomorrow", priority: "Medium", type: "Document" },
                    { title: "Call Bob Smith regarding renewal", due: "Friday", priority: "Low", type: "Call" },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {task.type === "Email" ? <Mail className="h-4 w-4" /> : task.type === "Call" ? <Phone className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"} className="text-[10px]">
                          {task.priority}
                        </Badge>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Conversion Rate</span>
                    <span className="text-sm font-bold text-green-500 flex items-center">24% <ArrowUpRight className="h-3 w-3" /></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Open Deals</span>
                    <span className="text-sm font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Average Deal Size</span>
                    <span className="text-sm font-bold">$12,400</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recently Viewed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customers.slice(0, 3).map((c) => (
                    <div key={c.id} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">{c.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">{c.name}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
