# CampusConnect – AI-Powered College Placement Management System

[![Phase](https://img.shields.io/badge/Phase-0%20(Frontend%20Foundation)-blue.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20Tailwind%20CSS%20v4%20%7C%20Vite-61DAFB.svg)](#)
[![Testing](https://img.shields.io/badge/Testing-Vitest%20%7C%20RTL%20%7C%20Playwright-3178C6.svg)](#)

> **Enterprise-grade, AI-driven placement platform** linking University Training & Placement Offices (TPOs), Student Candidates, Corporate Recruiters, and College Administrators into one high-velocity, automated hiring pipeline.

---

## 📌 Development Roadmap

| Phase | Description | Status |
| :--- | :--- | :--- |
| **Phase 0** | **Frontend Foundation & Design System (React, Tailwind CSS v4, Zustand, Vitest)** | **COMPLETED** |
| Phase 1 | Frontend Core Portals & Workflows (Role dashboards, AI resume builder, drive scheduler) | Planned |
| Phase 2 | Django REST Backend Development (Auth, models, serializers, business logic, PostgreSQL) | Planned |
| Phase 3 | Frontend & Backend API Integration & Real Authentication | Planned |
| Phase 4 | End-to-End Testing & Security Hardening | Planned |
| Phase 5 | Cloud Deployment with Docker & AWS (ECS/EKS, RDS, S3, CloudFront) | Planned |

---

## 🚀 Key Highlights in Phase 0

- **SaaS Design System:** Enterprise-tailored palette (Deep Navy `#172554`, Primary Blue `#2563EB`, Secondary Blue `#1D4ED8`, Background `#F8FAFC`), crisp Inter typography, and light/dark theme persistence.
- **4 Role-Based Dashboard Layouts:** Fully responsive, collapsible sidebar and top-nav layout foundations for **Student**, **TPO (Placement Officer)**, **Corporate Recruiter**, and **System Administrator**.
- **Public & Authentication Experiences:** Dedicated public informational pages (`/`, `/about`, `/careers`, `/contact`) and split-screen authentication suite (`/auth/login`, `/auth/register`, `/auth/forgot-password`).
- **Zustand State Engine:** Global reactivity for role switching (`authStore`), light/dark themes (`themeStore`), and navigation/search states (`uiStore`).
- **Asynchronous Mock Layer:** Realistic asynchronous mock services for Students, Partner Companies, Drives, Applications, and Analytics with simulated latency.
- **Rigorous Test Suite:** Vitest + React Testing Library unit tests and Playwright E2E configuration.

---

## 🛠️ Technology Stack

- **Core Framework:** [React 19](https://react.dev) + [Vite 6](https://vitejs.dev) (JavaScript)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) + `@tailwindcss/vite`
- **Routing:** [React Router DOM v7](https://reactrouter.com)
- **State Management:** [Zustand v5](https://zustand.docs.pmnd.rs)
- **Form Management & Schemas:** [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Icons & Visuals:** [Lucide React](https://lucide.dev)
- **Charts:** [Chart.js](https://www.chartjs.org) + [react-chartjs-2](https://react-chartjs-2.js.org)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski)
- **Unit & Integration Testing:** [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com)
- **End-to-End Testing:** [Playwright](https://playwright.dev)
- **Code Quality:** [ESLint 9](https://eslint.org)

---

## 📂 Project Structure

```
├── docs/
│   ├── architecture/FRONTEND_ARCHITECTURE.md
│   ├── design-system/DESIGN_SYSTEM.md
│   ├── development/DEVELOPMENT_GUIDE.md
│   └── reports/PHASE_0_REPORT.md
├── public/
├── src/
│   ├── app/                 # App root, providers & route definitions
│   ├── assets/              # Static assets
│   ├── components/
│   │   ├── charts/          # Placement trend & package charts
│   │   ├── common/          # PageHeader, Feedback states, Theme switcher
│   │   ├── layout/          # Responsive Sidebar, Header, Menus
│   │   └── ui/              # Reusable accessible primitives
│   ├── constants/           # Roles, Navigation configurations
│   ├── features/            # Feature modules
│   ├── hooks/               # useAuth, useTheme, useDebounce
│   ├── layouts/             # 6 Specialized layout structures
│   ├── pages/               # Public, Auth & 4 Role Dashboard pages
│   ├── schemas/             # Zod validation schemas
│   ├── services/
│   │   ├── api/             # Axios client & endpoint catalog
│   │   └── mock/            # Async mock services (students, drives, etc.)
│   ├── store/               # Zustand stores (authStore, themeStore, uiStore)
│   ├── styles/              # Global Tailwind CSS v4 styling
│   ├── test/                # Unit & integration test suites
│   └── utils/               # cn, formatters
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Verification Commands
```bash
npm run lint          # Run ESLint checks
npm test              # Run Vitest test suite
npm run build         # Produce production build bundle
```

---

## 👥 Instant Role Switching in Demo

In Phase 0, all 4 user roles can be experienced without backend credentials:
1. Navigate to `/auth/login` and click any of the 4 quick role buttons:
   - **Student:** `aarav.sharma@campus.edu` -> `/student/dashboard`
   - **TPO Head:** `tpo.head@campus.edu` -> `/tpo/dashboard`
   - **Corporate Recruiter:** `priya.s@novatech.io` -> `/recruiter/dashboard`
   - **Administrator:** `admin@campusconnect.internal` -> `/admin/dashboard`
2. You can also switch roles live at any time using the user profile menu located at the top-right corner of any dashboard.

---

## 📄 Documentation

- [Frontend Architecture](docs/architecture/FRONTEND_ARCHITECTURE.md)
- [Design System Guide](docs/design-system/DESIGN_SYSTEM.md)
- [Development Guide](docs/development/DEVELOPMENT_GUIDE.md)
- [Phase 0 Completion Report](docs/reports/PHASE_0_REPORT.md)
