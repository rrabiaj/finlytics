# Finlytics

AI-powered financial operations platform for SMEs — CRM, invoicing, expense tracking, cash flow, projects, employees, AI insights, and reports.

## Run & Operate

- `pnpm --filter @workspace/finlytics run dev` — run the frontend (Vite, port from $PORT)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind v4, shadcn/ui (Radix UI), wouter routing
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (schema in `.migration-backup/backend/`)
- State: Zustand, React Query
- Animation: Framer Motion

## Where things live

- Frontend: `artifacts/finlytics/src/`
  - Pages: `src/pages/` (LandingPage, LoginPage, RegisterPage, PricingPage, Dashboard, CRM, Finance, Cashflow, Projects, Employees, AI, Reports, Settings, Admin)
  - Layout shell: `src/components/shell.tsx` (sidebar + header)
  - UI primitives: `src/components/ui/` (Radix-based shadcn components)
  - API client: `src/lib/api-client.ts` (uses `VITE_API_URL` env var)
- API Server: `artifacts/api-server/src/`
- Original backup: `.migration-backup/` (Next.js frontend + Express/Prisma backend)

## Architecture decisions

- Migrated from Next.js to Vite + React — original used `@base-ui/react` UI primitives (newer shadcn variant); replaced all with standard `@radix-ui/*` shadcn components
- Routing via wouter (replaces Next.js App Router); dashboard routes wrapped in Shell layout in `App.tsx`
- `SidebarMenuButton` and `SidebarMenuSubButton` support `asChild` via Radix `Slot` so wouter `Link` components render correctly inside sidebar
- `"use client"` directives from the Next.js source are harmless in Vite (ignored by bundler)
- API calls fall back to `/api` when `VITE_API_URL` is not set

## Product

- Landing page with hero, features, pricing CTA
- Auth pages: login (GitHub/Google/email), register
- Pricing page (Free / Professional / Business tiers)
- Dashboard: KPI cards, revenue chart, upcoming invoices
- CRM: customers, leads, tasks with search and filtering
- Finance: invoices, expenses, P&L statements
- Cash Flow forecasting
- Projects & Employees management
- AI Assistant with strategic insights
- Reports & Settings & Admin Panel

## Gotchas

- All UI components in `src/components/ui/` use `@radix-ui/*` — do NOT copy shadcn components built for `@base-ui/react` (different API)
- The backend (Prisma schema) has NOT been migrated to Drizzle yet — original schema is in `.migration-backup/backend/prisma/schema.prisma`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
