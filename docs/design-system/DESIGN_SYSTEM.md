# CampusConnect Design System & UI Specifications

## 1. Color Palette Tokens

CampusConnect utilizes an enterprise SaaS palette designed for high contrast, readability, and visual hierarchy across all four dashboard personas.

| Token Name | Light Hex | Dark Hex | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `#172554` | `#0F172A` | Brand identity, sidebar header, enterprise contrast |
| **Primary Blue** | `#2563EB` | `#3B82F6` | Primary CTAs, active links, accents, focus rings |
| **Secondary Blue**| `#1D4ED8` | `#2563EB` | Button hover states, active states |
| **Background** | `#F8FAFC` | `#0B0F19` | Application main body background |
| **Surface** | `#FFFFFF` | `#1E293B` | Cards, modals, sidebars, header navigation |
| **Primary Text** | `#0F172A` | `#F8FAFC` | Headings, high-emphasis text |
| **Secondary Text**| `#64748B` | `#94A3B8` | Body copy, timestamps, metadata, labels |
| **Border** | `#E2E8F0` | `#334155` | Dividers, card outlines, table gridlines |
| **Success** | `#10B981` | `#34D399` | Placed badges, eligible statuses, positive trends |
| **Warning** | `#F59E0B` | `#FBBF24` | Review stages, pending assessments, warnings |
| **Danger** | `#EF4444` | `#F87171` | Ineligibility, destructive buttons, error alerts |

---

## 2. Typography & Hierarchy

- **Typeface:** Inter (`'Inter', sans-serif`), loaded via Google Fonts.
- **Hierarchy Scale:**
  - `Display / H1`: `text-3xl` to `text-4xl` (30px - 36px), font-extrabold, tracking-tight.
  - `H2 (Section Header)`: `text-2xl` (24px), font-bold, tracking-tight.
  - `H3 (Card Title)`: `text-lg` (18px), font-semibold.
  - `Body Text`: `text-sm` (14px), leading-relaxed, text-slate-600 / dark:text-slate-300.
  - `Caption / Meta`: `text-xs` to `text-[10px]` (10px - 12px), text-slate-500 / dark:text-slate-400.

---

## 3. Spacing & Border Radius

- **Radius Tokens:**
  - Default cards: `rounded-xl` (12px)
  - Modals / Large cards: `rounded-2xl` (16px)
  - Buttons & Inputs: `rounded-lg` (8px)
  - Badges & Pills: `rounded-full` (9999px)
- **Shadows:**
  - Card baseline: `shadow-xs` / `border border-slate-200 dark:border-slate-800`
  - Dropdown / Menus: `shadow-lg`
  - Modals: `shadow-2xl`

---

## 4. Component States Guide

- **Hover States:** Smooth 150ms transitions (`transition-colors`). Buttons darken by one step; cards shift subtle border contrast.
- **Focus Rings:** Accessible 2px rings with offset (`focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2`).
- **Disabled State:** Opacity reduced to 50-60%, pointer events disabled (`disabled:pointer-events-none disabled:opacity-50`).
- **Loading State:** Integrated Lucide `Loader2` spinner with disabled trigger state.

