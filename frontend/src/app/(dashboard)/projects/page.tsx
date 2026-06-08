"use client"

import { useState } from "react"
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Layout, 
  List, 
  Users,
  MessageSquare,
  BarChart2,
  Calendar
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const columns = ["Planning", "Active", "Review", "Done"]

const tasks = [
  { id: "T-1", title: "Landing Page Redesign", project: "Website 2.0", assignee: "John Doe", priority: "High", column: "Active", progress: 65, due: "June 15" },
  { id: "T-2", title: "API Integration", project: "Mobile App", assignee: "Jane Smith", priority: "Medium", column: "Active", progress: 30, due: "June 20" },
  { id: "T-3", title: "User Interview Analysis", project: "UX Research", assignee: "Bob Wilson", priority: "Low", column: "Planning", progress: 0, due: "June 25" },
  { id: "T-4", title: "Security Audit", project: "Backend", assignee: "Jane Smith", priority: "High", column: "Review", progress: 90, due: "June 12" },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your project pipeline and track team productivity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg p-1 bg-muted">
            <Button variant="ghost" size="sm" className="h-7 px-2 bg-background shadow-sm">
              <Layout className="h-4 w-4 mr-1" /> Kanban
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <List className="h-4 w-4 mr-1" /> List
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">4 finishing this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground mt-1">+2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Profitability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground mt-1">Target: 40%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="board" className="space-y-4">
        <TabsList>
          <TabsTrigger value="board">Task Board</TabsTrigger>
          <TabsTrigger value="profitability">Profitability Tracking</TabsTrigger>
          <TabsTrigger value="team">Team Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <div key={column} className="space-y-4 min-w-[250px]">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-semibold text-sm">{column}</h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {tasks.filter(t => t.column === column).length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {tasks.filter(t => t.column === column).map((task) => (
                    <Card key={task.id} className="cursor-pointer hover:border-primary transition-colors group">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="text-[10px] py-0">{task.project}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Task</DropdownMenuItem>
                              <DropdownMenuItem>Move to...</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-1" />
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[8px]">{task.assignee[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-[10px] text-muted-foreground">{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {task.due}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="ghost" className="w-full h-8 text-xs border-dashed border justify-start px-2 opacity-50 hover:opacity-100">
                    <Plus className="mr-1 h-3 w-3" /> Add Task
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profitability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Profitability Index</CardTitle>
              <CardDescription>Estimated profit margin per active project based on billable hours vs costs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Website 2.0", budget: "$15,000", cost: "$5,200", margin: "65%", status: "Healthy" },
                  { name: "Mobile App", budget: "$45,000", cost: "$22,000", margin: "51%", status: "Healthy" },
                  { name: "UX Research", budget: "$5,000", cost: "$4,800", margin: "4%", status: "Risk" },
                  { name: "Backend Security", budget: "$12,000", cost: "$3,500", margin: "71%", status: "Healthy" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{p.name}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Budget: {p.budget}</span>
                        <span>Actual Cost: {p.cost}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${p.status === "Healthy" ? "text-green-500" : "text-red-500"}`}>
                        {p.margin} Margin
                      </div>
                      <Badge variant={p.status === "Healthy" ? "outline" : "destructive"} className="text-[10px] py-0">
                        {p.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Active Discussions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                           <p className="text-xs font-bold">User {i} <span className="font-normal text-muted-foreground text-[10px]">2h ago</span></p>
                           <p className="text-xs text-muted-foreground">Updated the technical specs for the new API integration...</p>
                           <div className="flex items-center gap-2 pt-1">
                              <Badge variant="secondary" className="text-[8px] py-0">Project Alpha</Badge>
                              <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                                 <MessageSquare className="h-2 w-2" /> 4 replies
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Team Workload</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                   {[
                     { name: "Jane Smith", tasks: 8, load: 85 },
                     { name: "John Doe", tasks: 4, load: 42 },
                     { name: "Bob Wilson", tasks: 6, load: 70 },
                   ].map((user, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs">
                           <span className="font-medium">{user.name}</span>
                           <span className="text-muted-foreground">{user.tasks} tasks • {user.load}% capacity</span>
                        </div>
                        <Progress value={user.load} className="h-1.5" />
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
