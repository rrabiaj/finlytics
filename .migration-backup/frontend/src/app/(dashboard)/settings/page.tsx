"use client"

import { 
  User, 
  Building2, 
  CreditCard, 
  Users, 
  Key, 
  Palette, 
  Bell, 
  Shield,
  Save,
  Plus,
  Copy,
  Trash2
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account, organization, and platform preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <TabsList className="flex flex-col h-auto bg-transparent border-none lg:w-64 gap-1 items-stretch">
            <TabsTrigger value="profile" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:shadow-none">
              <User className="mr-2 h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="organization" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:shadow-none">
              <Building2 className="mr-2 h-4 w-4" /> Organization
            </TabsTrigger>
            <TabsTrigger value="billing" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:shadow-none">
              <CreditCard className="mr-2 h-4 w-4" /> Billing & Subscription
            </TabsTrigger>
            <TabsTrigger value="team" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:shadow-none">
              <Users className="mr-2 h-4 w-4" /> Team Management
            </TabsTrigger>
            <TabsTrigger value="api" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:shadow-none">
              <Key className="mr-2 h-4 w-4" /> API Keys
            </TabsTrigger>
            <TabsTrigger value="appearance" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:shadow-none">
              <Palette className="mr-2 h-4 w-4" /> White-label
            </TabsTrigger>
          </TabsList>

          <div className="flex-1">
            <TabsContent value="profile" className="mt-0 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details and how others see you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/avatars/user.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john@finlytics.com" disabled />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button className="ml-auto"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Choose what notifications you want to receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-xs text-muted-foreground">Get notified about new login attempts and security events.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Financial Summaries</Label>
                      <p className="text-xs text-muted-foreground">Weekly digest of your business financial health.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0 space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Current Plan</CardTitle>
                     <CardDescription>You are currently on the Professional plan.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5 border-primary/20">
                        <div className="space-y-1">
                           <p className="font-bold">Professional Plan</p>
                           <p className="text-xs text-muted-foreground">$29 / month • Renews on July 15, 2024</p>
                        </div>
                        <Badge variant="default">Active</Badge>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                           <span>Monthly AI Credits</span>
                           <span>42 / 50</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                           <div className="h-full bg-primary w-[84%]" />
                        </div>
                     </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                     <Button variant="outline">View Billing History</Button>
                     <Button>Upgrade Plan</Button>
                  </CardFooter>
               </Card>
            </TabsContent>

            <TabsContent value="api" className="mt-0 space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>Secret API Keys</CardTitle>
                     <CardDescription>Your secret API keys are listed below. Do not share these with anyone.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="p-4 border rounded-lg flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-sm font-medium">Production Key</p>
                           <code className="text-xs text-muted-foreground font-mono">fl_live_••••••••••••••••4j9k</code>
                        </div>
                        <div className="flex gap-2">
                           <Button variant="ghost" size="icon"><Copy className="h-4 w-4" /></Button>
                           <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                     </div>
                     <Button variant="outline" size="sm" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Create New Key
                     </Button>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0 space-y-6">
               <Card>
                  <CardHeader>
                     <CardTitle>White-label Branding</CardTitle>
                     <CardDescription>Customize the platform with your own branding (Business Plan required).</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 opacity-50 pointer-events-none">
                     <div className="space-y-2">
                        <Label>Organization Logo</Label>
                        <div className="flex items-center gap-4">
                           <div className="h-12 w-12 rounded border bg-muted flex items-center justify-center">
                              <Plus className="h-4 w-4" />
                           </div>
                           <Button variant="outline" size="sm">Upload Logo</Button>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label>Primary Brand Color</Label>
                        <div className="flex items-center gap-4">
                           <div className="h-8 w-24 rounded border bg-[#3b82f6]" />
                           <Input defaultValue="#3b82f6" className="w-32" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label>Custom Domain</Label>
                        <Input placeholder="dashboard.yourcompany.com" />
                     </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4 flex justify-between items-center bg-muted/30">
                     <p className="text-xs text-muted-foreground">Upgrade to Business to enable white-labeling.</p>
                     <Button size="sm">Upgrade Now</Button>
                  </CardFooter>
               </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
