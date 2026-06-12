import { Link } from "wouter"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Users,
  Shield,
  Zap,
  TrendingUp,
  CreditCard,
  MessageSquare,
  ChevronRight,
  Star,
  Globe,
  Sparkles,
  RefreshCw,
  LineChart,
  FileText,
  Clock,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  { value: "10,000+", label: "Businesses worldwide" },
  { value: "$4.2B+", label: "Revenue tracked" },
  { value: "92%", label: "Auto-categorization rate" },
  { value: "50%", label: "Faster month-end close" },
]

const features = [
  {
    icon: Sparkles,
    label: "AI-Powered",
    title: "Your AI Financial Analyst",
    description:
      "Get strategic insights, anomaly detection, and cash flow forecasts automatically. The AI learns your business patterns and alerts you before problems arise.",
    metric: "92% of transactions auto-categorized",
  },
  {
    icon: RefreshCw,
    label: "Real-Time",
    title: "Continuous Reconciliation",
    description:
      "Your books stay accurate every day — not just at month-end. Connect bank accounts, Stripe, and payroll tools for a live view of your financial health.",
    metric: "Daily sync with 50+ integrations",
  },
  {
    icon: Users,
    label: "Unified CRM",
    title: "Customers + Finances, Together",
    description:
      "Manage leads, customers, and tasks in the same platform as your invoices and expenses. No more copying data between tools.",
    metric: "1 platform replaces 4 tools",
  },
  {
    icon: LineChart,
    label: "Forecasting",
    title: "Cash Flow Forecasting",
    description:
      "Predict your runway, spot risk before it hits, and plan confidently with ML-powered cash flow models tailored to your industry.",
    metric: "Up to 90% forecast accuracy",
  },
  {
    icon: FileText,
    label: "Reporting",
    title: "Investor-Ready Reports",
    description:
      "Generate P&L, balance sheets, and custom dashboards in one click. Export GAAP-compliant reports for board meetings or due diligence.",
    metric: "1-click report generation",
  },
  {
    icon: Shield,
    label: "Enterprise Security",
    title: "Bank-Level Security",
    description:
      "SOC 2 Type II certified infrastructure, AES-256 encryption at rest, and granular role-based access controls for your whole team.",
    metric: "SOC 2 Type II certified",
  },
]

const integrations = [
  "Stripe", "QuickBooks", "Xero", "Brex", "Ramp", "Mercury",
  "Gusto", "Rippling", "Plaid", "Slack", "HubSpot", "Salesforce",
]

const steps = [
  {
    num: "01",
    title: "Connect your accounts",
    desc: "Link your bank, payment processor, and payroll in minutes. Finlytics automatically ingests and maps your entire financial history.",
  },
  {
    num: "02",
    title: "AI categorizes everything",
    desc: "Our AI classifies 92% of transactions instantly. Review exceptions in plain English — no accounting degree required.",
  },
  {
    num: "03",
    title: "Get clear financial insight",
    desc: "Wake up every morning with a real-time view of your cash, burn, runway, and revenue. No waiting for month-end.",
  },
]

const testimonials = [
  {
    quote:
      "Finlytics closed our books 3× faster and gave our CFO back 15 hours a month. It's the only tool that actually understands how a growth-stage company operates.",
    author: "Sarah Jenkins",
    role: "CEO, CreativeFlow Agency",
    initials: "SJ",
    rating: 5,
  },
  {
    quote:
      "I replaced QuickBooks, a separate CRM, and two spreadsheets with Finlytics. The AI assistant caught a billing error that saved us $12,000.",
    author: "Mark Thompson",
    role: "Founder, TechStack Solutions",
    initials: "MT",
    rating: 5,
  },
  {
    quote:
      "Our investors love the one-click board reports. We went from spending 2 days preparing financials to 20 minutes. Absolute game-changer.",
    author: "Alicia Moreno",
    role: "CFO, Verda Health",
    initials: "AM",
    rating: 5,
  },
]

const navLinks = [
  { label: "Product", href: "/dashboard" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "#integrations" },
  { label: "About", href: "#" },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
      ))}
    </div>
  )
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      {/* ── ANNOUNCEMENT BANNER ── */}
      <div className="w-full bg-foreground text-background text-center py-2.5 text-sm font-medium tracking-wide">
        <span className="opacity-80">New:</span> AI Close Agents for accounting firms — scale to 3× more clients{" "}
        <a href="#" className="underline underline-offset-2 font-semibold">
          Learn more →
        </a>
      </div>

      {/* ── NAV ── */}
      <nav className="w-full border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-background" />
            </div>
            Finlytics
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="font-semibold px-5">Start for free</Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-background px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-base font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t">
              <Link href="/login"><Button variant="outline" className="w-full">Sign In</Button></Link>
              <Link href="/register"><Button className="w-full">Start for free</Button></Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center relative">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-muted/40 to-transparent -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-sm font-medium mb-8 bg-background shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">The AI-native alternative to QuickBooks</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
            Financial intelligence
            <br />
            <span className="text-muted-foreground/60">built for this era.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Finlytics gives you a real-time view of your business finances — with AI that closes your books 50% faster, categorizes 92% of transactions automatically, and keeps your CRM in sync.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base font-semibold gap-2">
                Start for free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold gap-2">
                View live demo <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Free 14-day trial · No credit card required · Setup in under 5 minutes
          </p>
        </motion.div>

        {/* ── DASHBOARD PREVIEW ── */}
        <motion.div
          className="mt-16 relative mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
        >
          <div className="rounded-2xl border bg-card shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="h-11 bg-muted/60 border-b flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="ml-4 flex-1 max-w-sm h-6 bg-background rounded-md border flex items-center px-3 gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">app.finlytics.io/dashboard</span>
              </div>
            </div>

            {/* App layout */}
            <div className="flex h-[420px] md:h-[520px]">
              {/* Sidebar */}
              <div className="w-52 border-r bg-muted/20 flex flex-col p-3 gap-1 hidden md:flex">
                <div className="flex items-center gap-2 px-3 py-2 mb-2">
                  <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 text-background" />
                  </div>
                  <span className="text-sm font-bold">Finlytics</span>
                </div>
                {["Dashboard", "CRM", "Finance", "Cash Flow", "AI Assistant", "Reports"].map((item, i) => (
                  <div key={item} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${i === 0 ? "bg-foreground text-background font-medium" : "text-muted-foreground"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-background" : "bg-muted-foreground/40"}`} />
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 bg-background overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Good morning, Sarah</p>
                    <h3 className="text-base font-bold">Financial Overview</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Revenue", val: "$124.5K", change: "+12.4%" },
                    { label: "Expenses", val: "$42.3K", change: "+2.1%" },
                    { label: "Net Profit", val: "$82.2K", change: "+15.2%" },
                    { label: "Runway", val: "14 mo", change: "Healthy" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="rounded-xl border bg-card p-3">
                      <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                      <p className="text-lg font-bold">{kpi.val}</p>
                      <p className="text-xs text-green-600 font-medium mt-0.5">{kpi.change}</p>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="rounded-xl border bg-card p-4 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold">Revenue vs Expenses</p>
                    <p className="text-xs text-muted-foreground">Last 6 months</p>
                  </div>
                  <div className="flex items-end gap-2 h-20">
                    {[65, 78, 55, 90, 72, 95].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                        <div className="w-full bg-foreground rounded-t" style={{ height: `${h}%` }} />
                        <div className="w-full bg-muted rounded-t" style={{ height: `${h * 0.45}%` }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI alert */}
                <div className="rounded-xl border border-foreground/10 bg-muted/30 p-3 flex items-start gap-2.5">
                  <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="h-3 w-3 text-background" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5">AI Insight</p>
                    <p className="text-xs text-muted-foreground">Marketing spend is 18% above your 90-day average. Consider reviewing 3 duplicate SaaS subscriptions totaling $340/month.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="absolute -left-4 top-1/3 bg-background border rounded-2xl shadow-lg p-3 hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold">Books closed</p>
              <p className="text-xs text-muted-foreground">50% faster than before</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-4 bottom-1/3 bg-background border rounded-2xl shadow-lg p-3 hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
          >
            <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-xs font-bold">AI categorized</p>
              <p className="text-xs text-muted-foreground">247 transactions today</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section id="integrations" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Integrates with the tools you already use</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {integrations.map((name) => (
            <div key={name} className="border rounded-xl px-5 py-3 text-sm font-semibold text-muted-foreground bg-background hover:border-foreground/30 hover:text-foreground transition-all cursor-default">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-muted/20 border-y">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 font-semibold">Everything in one platform</Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
              Built for the way modern businesses actually work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stop stitching together tools. Finlytics gives you a single source of financial truth — powered by AI, updated in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border bg-background p-7 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">{f.label}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.description}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold border rounded-full px-3 py-1.5 w-fit">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  {f.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 font-semibold">How it works</Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Up and running in under 5 minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Unlike legacy accounting tools that take weeks to configure, Finlytics connects and learns your business automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="absolute top-12 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-border hidden md:block" />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-3xl font-extrabold text-foreground/20">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-background/60 uppercase tracking-widest mb-3">Customer stories</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Loved by finance teams worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-background/10 border border-background/10 rounded-2xl p-8"
              >
                <StarRating count={t.rating} />
                <p className="mt-5 text-base text-background/85 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-7 pt-6 border-t border-background/10">
                  <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t.author}</p>
                    <p className="text-xs text-background/55">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <Badge variant="outline" className="mb-4 font-semibold">Simple pricing</Badge>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
          Start free, scale as you grow
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          All plans include a 14-day free trial and our close-your-books-50%-faster guarantee — or your money back.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { name: "Free", price: "$0", desc: "For freelancers and solo founders. Core invoicing and expense tracking.", cta: "Get started free", outline: true },
            { name: "Professional", price: "$29", desc: "AI assistant, unlimited invoices, CRM, and cash flow forecasting.", cta: "Start free trial", popular: true },
            { name: "Business", price: "$79", desc: "Advanced reports, multi-entity, unlimited users, and API access.", cta: "Start free trial", outline: false },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-7 text-left relative ${plan.popular ? "border-foreground ring-2 ring-foreground/10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-4 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <p className="text-sm font-semibold text-muted-foreground mb-1">{plan.name}</p>
              <p className="text-4xl font-extrabold tracking-tight mb-1">
                {plan.price}<span className="text-lg font-medium text-muted-foreground">/mo</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{plan.desc}</p>
              <Link href="/register">
                <Button className="w-full" variant={plan.outline ? "outline" : "default"}>{plan.cta}</Button>
              </Link>
            </div>
          ))}
        </div>

        <Link href="/pricing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
          See full plan comparison <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-12 md:p-20 text-center">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-background/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-background/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <Badge className="bg-background/20 text-background hover:bg-background/20 mb-6 font-semibold">14-day free trial</Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto">
              Close your books 50% faster — or get your money back.
            </h2>
            <p className="text-lg text-background/70 max-w-xl mx-auto mb-10">
              Join 10,000+ businesses worldwide that trust Finlytics to keep their finances accurate, automated, and investor-ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="h-12 px-10 text-base font-semibold gap-2">
                  Start for free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="ghost" className="h-12 px-10 text-base font-semibold text-background hover:text-background hover:bg-background/10 gap-2">
                  View live demo <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-background/50 mt-6">No credit card required · Setup in 5 minutes · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight mb-4">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-background" />
                </div>
                Finlytics
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                The AI-native financial platform for SMEs. Real-time books, automated insights, and a unified workspace.
              </p>
            </div>
            {[
              { heading: "Product", links: ["Dashboard", "CRM", "Finance", "AI Assistant", "Reports"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { heading: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-sm font-bold mb-4">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Finlytics, Inc. All rights reserved.</p>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              Available worldwide in 30+ countries
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
