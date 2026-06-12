# Finlytics — AI-Powered Financial Operations for SMEs

All-in-one business management platform combining CRM, invoicing, expense tracking, cash flow forecasting, project management, and an AI business analyst.

## Architecture

```
finlytics/
├── backend/     # Node.js + Express + Prisma (PostgreSQL)
└── frontend/    # Next.js 16 + Tailwind CSS v4 + Shadcn UI
```

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Shadcn UI, Recharts, Zustand
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL
- **Auth:** JWT, Google OAuth, Microsoft OAuth, RBAC
- **Payments:** Stripe
- **AI:** OpenAI (GPT-4 Turbo with function calling)
- **Features:** Multi-tenant, audit logs, rate limiting, Zod validation

## Getting Started

### Backend
```bash
cd backend
cp .env.example .env  # Fill in your env vars
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Modules

- 📊 Executive Dashboard
- 👥 CRM (Customers, Leads, Pipeline)
- 💰 Finance (Invoices, Expenses, P&L)
- 🔮 Cash Flow Forecasting
- 👔 Employee Management
- 📋 Project Management (Kanban)
- 🤖 AI Business Assistant
- 📈 Reports & Analytics
- ⚙️ Settings & Admin Panel

## License

MIT