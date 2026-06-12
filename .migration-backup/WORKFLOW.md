# Finlytics Code Workflow

## Branch Strategy
- `main` — Production-ready code, protected
- `develop` — Integration branch for features
- `feature/*` — Individual feature branches (e.g., `feature/crm-module`)
- `fix/*` — Bug fixes

## Workflow
1. Create a feature/fix branch from `develop`
2. Make changes and commit with descriptive messages
3. Push branch and create a Pull Request to `develop`
4. Lead reviews the PR before merging
5. Merges to `main` happen via release PRs

## Commit Style
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Keep commits atomic and focused

## PR Process
- All code goes through PR review
- Lead reviews and merges using squash merge
- PR descriptions should explain what and why

## Repo Structure
```
finlytics/
├── backend/          # Node.js + Express + Prisma API
├── frontend/         # Next.js + Tailwind + Shadcn UI
└── README.md
```
