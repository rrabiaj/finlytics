import { Link } from "wouter"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  Users, 
  Shield, 
  Zap,
  TrendingUp,
  CreditCard,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "AI Business Analyst",
    description: "Get real-time insights and forecasts from your data using our advanced AI assistant.",
    icon: MessageSquare,
  },
  {
    title: "Unified CRM",
    description: "Manage customers, leads, and tasks in one place, integrated with your finances.",
    icon: Users,
  },
  {
    title: "Invoicing & Expenses",
    description: "Automate your billing and track every penny with professional invoicing and expense tools.",
    icon: CreditCard,
  },
  {
    title: "Cash Flow Forecasting",
    description: "Predict future financial health with high accuracy and receive risk alerts.",
    icon: TrendingUp,
  },
  {
    title: "Strategic Reports",
    description: "Enterprise-grade financial reports and interactive dashboards at your fingertips.",
    icon: BarChart3,
  },
  {
    title: "Secure & Scalable",
    description: "Bank-level security and multi-tenant architecture designed to grow with your business.",
    icon: Shield,
  },
]

const testimonials = [
  {
    quote: "Finlytics completely transformed how we manage our agency's finances. The AI assistant is like having a CFO in my pocket.",
    author: "Sarah Jenkins",
    role: "CEO, CreativeFlow Agency",
  },
  {
    quote: "Finally, a tool that brings CRM and money together. No more manual data entry between platforms.",
    author: "Mark Thompson",
    role: "Founder, TechStack Solutions",
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      <nav className="w-full border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>Finlytics</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>
      <section className="container mx-auto px-4 pt-20 pb-32 md:pt-32 md:pb-48 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Enterprise Intelligence <br className="hidden md:block" /> for Every SME
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Unified CRM, invoicing, expense tracking, and AI-powered financial forecasting. 
            All in one integrated platform designed for growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-lg font-semibold">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold">
                View Pricing
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-20 relative mx-auto max-w-5xl rounded-2xl border bg-card/50 backdrop-blur shadow-2xl p-4 md:p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="rounded-lg border bg-background overflow-hidden aspect-video shadow-inner">
             <div className="flex h-full flex-col">
                <div className="h-12 border-b bg-muted/50 flex items-center px-4 gap-2">
                   <div className="w-3 h-3 rounded-full bg-destructive/50" />
                   <div className="w-3 h-3 rounded-full bg-orange-500/50" />
                   <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   <div className="ml-4 h-6 w-1/3 bg-muted rounded animate-pulse" />
                </div>
                <div className="flex-1 flex p-4 gap-4">
                   <div className="w-1/4 space-y-4">
                      {[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-muted rounded w-full animate-pulse" />)}
                   </div>
                   <div className="flex-1 grid grid-cols-3 gap-4">
                      {[1,2,3].map(i => <div key={i} className="h-24 bg-muted/50 rounded animate-pulse" />)}
                      <div className="col-span-3 h-full bg-muted/30 rounded animate-pulse" />
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="container mx-auto px-4 py-24 bg-muted/30 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need to Scale</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stop juggling multiple tools and spreadsheets. Finlytics brings your business operations into one single source of truth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-sm bg-background">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((t, index) => (
              <div key={index} className="flex flex-col gap-6 p-8 rounded-2xl bg-primary/5 relative">
                <span className="text-6xl text-primary/20 font-serif absolute top-4 left-4 leading-none">"</span>
                <p className="text-lg italic relative z-10">{t.quote}</p>
                <div>
                  <p className="font-bold">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24 text-center">
        <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join thousands of businesses using Finlytics to drive strategic growth. Start your 14-day free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-lg font-semibold">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="w-full border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 Finlytics. All rights reserved.</p>
      </footer>
    </div>
  )
}
