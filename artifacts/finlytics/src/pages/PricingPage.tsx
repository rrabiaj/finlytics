import { Link } from "wouter"
import { Check, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for freelancers and small startups.",
    features: ["1 User", "20 Customers", "Basic Invoicing", "Basic Expense Tracking", "Manual Reports"],
    cta: "Start for Free",
    href: "/register",
    popular: false,
  },
  {
    name: "Professional",
    price: "$29",
    description: "Ideal for growing businesses needing AI insights.",
    features: ["5 Users", "Unlimited Customers", "Advanced Invoicing", "AI Business Assistant", "Automated Expense Tracking", "VAT Calculator"],
    cta: "Start 14-day Trial",
    href: "/register",
    popular: true,
  },
  {
    name: "Business",
    price: "$79",
    description: "For established teams wanting complete visibility.",
    features: ["Unlimited Users", "Unlimited Customers", "Cash Flow Forecasting", "Project Profitability", "Advanced API Access", "Team Collaboration", "Custom Branding"],
    cta: "Start 14-day Trial",
    href: "/register",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="w-full border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span>Finlytics</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login"><Button variant="ghost" size="sm">Sign In</Button></Link>
            <Link href="/register"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-24 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your business. No hidden fees, cancel anytime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col relative ${tier.popular ? 'border-primary shadow-lg scale-105 z-10' : ''}`}>
              {tier.popular && (
                <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-3 py-1">Most Popular</Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <CardDescription className="mt-4">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={tier.href} className="w-full">
                  <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>{tier.cta}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-32 text-center mb-16">
          <h2 className="text-3xl font-bold">Compare Features</h2>
        </div>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4 font-semibold">Features</th>
                <th className="py-4 font-semibold text-center">Free</th>
                <th className="py-4 font-semibold text-center">Professional</th>
                <th className="py-4 font-semibold text-center">Business</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b"><td className="py-4">AI Assistant Queries</td><td className="py-4 text-center text-muted-foreground">-</td><td className="py-4 text-center">50/mo</td><td className="py-4 text-center">Unlimited</td></tr>
              <tr className="border-b"><td className="py-4">Custom Branding</td><td className="py-4 text-center text-muted-foreground">-</td><td className="py-4 text-center text-muted-foreground">-</td><td className="py-4 text-center font-bold">Yes</td></tr>
              <tr className="border-b"><td className="py-4">Public API</td><td className="py-4 text-center text-muted-foreground">-</td><td className="py-4 text-center font-bold">Read-only</td><td className="py-4 text-center font-bold">Full Access</td></tr>
              <tr className="border-b"><td className="py-4">Financial Forecasting</td><td className="py-4 text-center text-muted-foreground">-</td><td className="py-4 text-center">Basic</td><td className="py-4 text-center">Advanced</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
