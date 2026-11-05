# CampusConnect Frontend Architecture Specification

## 1. Executive Architecture Summary
CampusConnect is designed as a modular, decoupled Single Page Application (SPA) utilizing React 19, Tailwind CSS v4, and Vite. The architecture prioritizes strict separation of concerns, accessible component design tokens, reactive state handling via Zustand, and asynchronous mock services that prepare the system for Phase 2 Django REST Framework integration.

```
+-------------------------------------------------------------------+
|                        Client Browser (SPA)                       |
+---------------------------------+---------------------------------+
|          Routing Layer          |        React Router DOM v7      |
+---------------------------------+---------------------------------+
|         Layout Engine           |  Public | Auth | 4 Role Layouts   |
+---------------------------------+---------------------------------+
|        State Management         |  authStore | themeStore | uiStore|
+---------------------------------+---------------------------------+
|       Component Hierarchy       |  UI Primitives -> Common Layout |
+---------------------------------+---------------------------------+
|      Service Layer (Decoupled)  |  Async Mock Services (Phase 0)  |
|                                 |  -> Axios API Client (Phase 2)  |
+---------------------------------+---------------------------------+
```

---

## 2. Directory Taxonomy & Responsibilities

- **`src/app/`**: Application entry points, root providers (`AppProviders`), and client route tree (`router.jsx`).
- **`src/components/ui/`**: Low-level accessible primitives (`Button`, `Input`, `Textarea`, `Select`, `Card`, `Badge`, `Modal`, `Dialog`, `Dropdown`, `DataTable`, `Pagination`, `SearchBar`, `FileUpload`, `Breadcrumb`).
- **`src/components/common/`**: Feedback and shared building blocks (`PageHeader`, `EmptyState`, `LoadingState`, `ErrorState`, `ConfirmDialog`, `ThemeSwitcher`, `GlobalSearchModal`).
- **`src/components/layout/`**: Dashboard structural elements (`Sidebar`, `Header`, `NotificationMenu`, `UserProfileMenu`).
- **`src/components/charts/`**: Chart.js visualizations (`PlacementStatsChart`, `PackageDistributionChart`).
- **`src/layouts/`**: Six specialized layouts:
  1. `PublicLayout`: Marketing header, navigation, and footer.
  2. `AuthLayout`: Dual-pane branding feature showcase and responsive auth card.
  3. `StudentLayout`: Student sidebar, navigation, search, notifications, profile.
  4. `TpoLayout`: Placement officer console layout.
  5. `RecruiterLayout`: Recruiter hiring dashboard layout.
  6. `AdminLayout`: Administrative oversight layout.
- **`src/pages/`**: Page views organized by domain (`public/`, `auth/`, `student/`, `tpo/`, `recruiter/`, `admin/`).
- **`src/services/`**:
  - `api/client.js`: Configured Axios client with bearer token interception.
  - `api/endpoints.js`: Complete Django REST endpoint catalog.
  - `mock/`: Fully asynchronous, typed-like mock services (`auth.mock.js`, `students.mock.js`, `drives.mock.js`, etc.).
- **`src/store/`**: Lightweight Zustand reactive state stores (`authStore.js`, `themeStore.js`, `uiStore.js`).
- **`src/hooks/`**: Custom hooks (`useAuth`, `useTheme`, `useDebounce`).
- **`src/utils/`**: Utilities (`cn.js`, `formatters.js`).
- **`src/schemas/`**: Zod validation schemas (`authSchemas.js`).
- **`src/test/`**: Unit test suites and RTL configuration.

---

## 3. Data Flow & Service Isolation

To ensure maintainability, page and feature components NEVER hardcode mock datasets. Data retrieval adheres to a strict unidirectional flow:

```
UI Component / Page
       │
       ▼ calls
Async Mock Service Function (returns Promise + simulated latency)
       │
       ▼ resolves with structured dataset
UI State / Zustand Store
       │
       ▼ re-renders
Presentational View
```

In Phase 2, the async mock services will be swapped for real REST calls via `src/services/api/client.js` with zero architectural restructuring required in presentational components.

---

## 4. Client-Side Route Protection (Demonstration Only)

`ProtectedRoute` in `src/app/router.jsx` verifies client state:
- If unauthenticated -> redirects to `/auth/login`
- If unauthorized for current role -> redirects to `/unauthorized`

> **Security Disclaimer:** Client-side route protection is designed exclusively for user experience and interface flow demonstration. It does not provide cryptographic or server-level security. True role-based access control (RBAC) is enforced server-side via Django JWT claims and permissions.

