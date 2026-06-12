import { Switch, Route, Router as WouterRouter } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { Shell } from "@/components/shell"
import LandingPage from "@/pages/LandingPage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import PricingPage from "@/pages/PricingPage"
import DashboardPage from "@/pages/DashboardPage"
import CrmPage from "@/pages/CrmPage"
import FinancePage from "@/pages/FinancePage"
import CashflowPage from "@/pages/CashflowPage"
import ProjectsPage from "@/pages/ProjectsPage"
import EmployeesPage from "@/pages/EmployeesPage"
import AiPage from "@/pages/AiPage"
import ReportsPage from "@/pages/ReportsPage"
import SettingsPage from "@/pages/SettingsPage"
import AdminPage from "@/pages/AdminPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
})

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/dashboard">
        <DashboardLayout><DashboardPage /></DashboardLayout>
      </Route>
      <Route path="/crm">
        <DashboardLayout><CrmPage /></DashboardLayout>
      </Route>
      <Route path="/finance">
        <DashboardLayout><FinancePage /></DashboardLayout>
      </Route>
      <Route path="/cashflow">
        <DashboardLayout><CashflowPage /></DashboardLayout>
      </Route>
      <Route path="/projects">
        <DashboardLayout><ProjectsPage /></DashboardLayout>
      </Route>
      <Route path="/employees">
        <DashboardLayout><EmployeesPage /></DashboardLayout>
      </Route>
      <Route path="/ai">
        <DashboardLayout><AiPage /></DashboardLayout>
      </Route>
      <Route path="/reports">
        <DashboardLayout><ReportsPage /></DashboardLayout>
      </Route>
      <Route path="/settings">
        <DashboardLayout><SettingsPage /></DashboardLayout>
      </Route>
      <Route path="/admin">
        <DashboardLayout><AdminPage /></DashboardLayout>
      </Route>
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-muted-foreground mt-2">Page not found</p>
            <a href="/" className="text-primary hover:underline mt-4 inline-block">Go home</a>
          </div>
        </div>
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
