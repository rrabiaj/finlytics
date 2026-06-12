

import { 
  Users, 
  ShieldCheck, 
  Activity, 
  CreditCard, 
  Search, 
  MoreHorizontal, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Shield,
  Filter,
  Download
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

const users = [
  { id: "U001", name: "John Doe", email: "john@acme.com", role: "Owner", organization: "Acme Corp", status: "Active", joined: "2024-01-15" },
  { id: "U002", name: "Jane Smith", email: "jane@global.io", role: "Admin", organization: "Global Tech", status: "Active", joined: "2024-02-20" },
  { id: "U003", name: "Bob Wilson", email: "bob@stripe.com", role: "User", organization: "Stripe Inc", status: "Suspended", joined: "2024-03-05" },
  { id: "U004", name: "Alice Brown", email: "alice@vercel.com", role: "Admin", organization: "Vercel", status: "Active", joined: "2024-04-12" },
]

const subscriptions = [
  { id: "S001", organization: "Acme Corp", plan: "Business", status: "Active", amount: "$79/mo", nextBilling: "2024-07-15" },
  { id: "S002", organization: "Global Tech", plan: "Professional", status: "Active", amount: "$29/mo", nextBilling: "2024-07-20" },
  { id: "S003", organization: "Stripe Inc", plan: "Enterprise", status: "Past Due", amount: "$499/mo", nextBilling: "2024-06-05" },
  { id: "S004", organization: "Vercel", plan: "Professional", status: "Active", amount: "$29/mo", nextBilling: "2024-07-12" },
]

const auditLogs = [
  { id: "L001", user: "John Doe", action: "Deleted Invoice", resource: "INV-204", timestamp: "2 mins ago" },
  { id: "L002", user: "Jane Smith", action: "Updated Settings", resource: "Organization", timestamp: "15 mins ago" },
  { id: "L003", user: "System", action: "Scheduled Backup", resource: "Database", timestamp: "1 hour ago" },
  { id: "L004", user: "Alice Brown", action: "Added User", resource: "New Team Member", timestamp: "3 hours ago" },
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Panel</h2>
          <p className="text-muted-foreground">
            System-wide management, monitoring, and audit logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            System Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Shield className="mr-2 h-4 w-4" />
            Security Audit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">+12% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">MRR</CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,300</div>
            <p className="text-xs text-muted-foreground mt-1">+$5.2k this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Sessions</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground mt-1">Real-time count</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Manage all users across the platform.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search users..." className="w-[250px]" />
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
                    <TableHead>User</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span>{user.name}</span>
                            <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.organization}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Impersonate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
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

        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Monitor and manage customer billing cycles and plans.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.organization}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{sub.plan}</Badge>
                      </TableCell>
                      <TableCell>{sub.amount}</TableCell>
                      <TableCell>
                        <Badge variant={sub.status === "Active" ? "default" : "destructive"}>
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{sub.nextBilling}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Logs</CardTitle>
              <CardDescription>Track all critical actions performed across the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-bold">{log.user}</span> {log.action} <span className="font-medium text-primary">{log.resource}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-xs">Load more logs</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Server Infrastructure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage</span>
                        <span className="text-muted-foreground">24%</span>
                      </div>
                      <Progress value={24} className="h-2" />
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage</span>
                        <span className="text-muted-foreground">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Database Load</span>
                        <span className="text-muted-foreground">18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                   </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Service Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {[
                     { name: "API Gateway", status: "Operational", color: "text-green-500" },
                     { name: "Auth Service", status: "Operational", color: "text-green-500" },
                     { name: "AI Engine", status: "Operational", color: "text-green-500" },
                     { name: "Reporting Worker", status: "Operational", color: "text-green-500" },
                   ].map((service, i) => (
                     <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                        <span className="text-sm font-medium">{service.name}</span>
                        <div className="flex items-center gap-2">
                           <div className={`h-2 w-2 rounded-full bg-current ${service.color}`} />
                           <span className="text-xs text-muted-foreground">{service.status}</span>
                        </div>
                     </div>
                   ))}
                </CardContent>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
