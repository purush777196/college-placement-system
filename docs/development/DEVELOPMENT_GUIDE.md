# CampusConnect Development & Contribution Guide

## 1. Prerequisites
- Node.js `v20.0.0` or higher (verified on `v22.17.1`)
- npm `10.0.0` or higher (verified on `11.4.2`)
- Git

---

## 2. Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server on `http://localhost:5173` with HMR |
| `npm run build` | Compiles production assets into the `dist/` directory |
| `npm run preview` | Locally serves the production build from `dist/` |
| `npm run lint` | Runs ESLint 9 across all JS/JSX files |
| `npm test` | Executes Vitest test suite in single-run mode |
| `npm run test:coverage` | Generates detailed V8 code coverage report |

---

## 3. Git Branching & Commits Workflow

- **Branch Naming Standard:**
  - Feature branches: `feature/<feature-name>` (e.g., `feature/frontend-foundation`)
  - Bug fixes: `fix/<bug-name>`
  - Documentation: `docs/<doc-name>`
- **Commit Format (Conventional Commits):**
  - `feat: add student eligibility verification modal`
  - `fix: resolve sidebar active state in dark mode`
  - `test: add unit tests for DataTable component`
  - `docs: update design system color tokens`

---

## 4. Code Standards & Best Practices

1. **JavaScript Only:** Do not introduce TypeScript files (`.ts`, `.tsx`) or tsconfig.
2. **Import Aliases:** Always use `@/` to import from `src/` (e.g., `import Button from '@/components/ui/Button'`).
3. **No Direct Hardcoded Datasets:** When creating features, create or extend service methods in `src/services/mock/` instead of hardcoding data inside pages.
4. **Tailwind CSS v4:** Utilize `@import "tailwindcss";` conventions; avoid legacy `tailwind.config.js` requirements.
5. **No Monolithic Components:** Break complex views into smaller presentational atoms and composable widgets.

