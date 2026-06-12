"use client"

import { useState } from "react"
import { 
  Send, 
  Sparkles, 
  History, 
  Lightbulb, 
  Plus, 
  TrendingUp, 
  AlertCircle,
  FileText,
  BarChart2,
  ChevronRight,
  Bot,
  User
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
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const initialMessages = [
  { 
    id: "1", 
    role: "assistant", 
    content: "Hello John! I've analyzed your financial data for June. You're currently on track to exceed your revenue target by 12%. Would you like to see the breakdown or a cash flow forecast for July?",
    timestamp: "10:00 AM"
  }
]

const suggestedQuestions = [
  "What is my projected cash balance for next month?",
  "Analyze my highest expense categories this quarter.",
  "Which customers have the highest lifetime value?",
  "Predict potential financial risks for Q3.",
]

const insights = [
  {
    title: "Subscription Optimization",
    desc: "You have 3 unused SaaS seats in the Design team. Saving potential: $145/mo.",
    type: "Saving",
    icon: Lightbulb
  },
  {
    title: "Revenue Opportunity",
    desc: "Up-selling Pro plan to top 10% of Free users could increase MRR by $2.4k.",
    type: "Growth",
    icon: TrendingUp
  }
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages([...messages, newMsg])
    setInput("")
    
    // Fake assistant reply
    setTimeout(() => {
      const reply = { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: "I'm processing that analysis for you now. Based on your current data, the trend looks positive...", 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
      setMessages(prev => [...prev, reply])
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Business Analyst</CardTitle>
                  <CardDescription className="text-xs">Powered by Finlytics Strategic AI</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" /> History
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      {msg.role === "assistant" ? (
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-4 w-4" /></AvatarFallback>
                      ) : (
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      )}
                    </Avatar>
                    <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : ""}`}>
                      <div className={`rounded-2xl px-4 py-2 text-sm ${
                        msg.role === "assistant" 
                          ? "bg-muted text-foreground rounded-tl-none" 
                          : "bg-primary text-primary-foreground rounded-tr-none"
                      }`}>
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-4 flex-col gap-3">
             <div className="w-full flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {suggestedQuestions.map((q, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm" 
                    className="whitespace-nowrap text-xs h-7 opacity-70 hover:opacity-100"
                    onClick={() => setInput(q)}
                  >
                    {q}
                  </Button>
                ))}
             </div>
             <div className="w-full flex gap-2">
                <Input 
                  placeholder="Ask about your cash flow, expenses, or projections..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
             </div>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6 overflow-auto pr-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Strategic Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, i) => (
              <div key={i} className="group p-4 rounded-xl border bg-card hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{insight.type}</Badge>
                </div>
                <h4 className="text-sm font-semibold mb-1">{insight.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
                <div className="mt-3 flex items-center text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                   Apply recommendation <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recently Generated Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
             {[
               { title: "Q2 Financial Summary", icon: FileText },
               { title: "Expense Growth Analysis", icon: BarChart2 },
               { title: "Customer Churn Prediction", icon: TrendingUp },
             ].map((report, i) => (
               <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                     <report.icon className="h-4 w-4 text-muted-foreground" />
                     <span className="text-xs font-medium">{report.title}</span>
                  </div>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
               </div>
             ))}
          </CardContent>
          <CardFooter>
             <Button variant="ghost" className="w-full text-xs h-8">View all history</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
