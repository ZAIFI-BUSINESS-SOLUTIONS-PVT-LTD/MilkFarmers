# Milk Farmers — Frontend POC

A frontend-only proof-of-concept for a premium milk subscription platform. Demonstrates UX and user flows for three roles: **Customer**, **Delivery Executive**, and **Admin**.

No backend. No API calls. All data is static mock JSON.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Icons | Lucide React |
| Charts | Recharts |
| Package manager | pnpm |
| Data | Local JSON files (`app/data/`) |

---

## Getting Started

```bash
# Install dependencies
cd app
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). A role-selection landing page lets you enter as Customer, Delivery Executive, or Admin.

```bash
# Type-check
pnpm exec tsc --noEmit

# Lint
pnpm lint

# Production build
pnpm build
```

---

## Demo Credentials

| Role | Credential | Value |
|------|-----------|-------|
| Customer | Phone | Any valid Indian mobile (`6-9` prefix, 10 digits) |
| Customer | OTP | `1234` |
| Delivery Executive | Employee ID | `EMP001` |
| Delivery Executive | PIN | `1234` |
| Admin | Employee ID | `EMP001` |
| Admin | PIN | `1234` |

---

## Entry Points

| Role | URL | Auth |
|------|-----|------|
| Landing (role selector) | `/` | — |
| Customer | `/customer/splash` → `/customer/login` | Phone + OTP |
| Delivery Executive | `/delivery/login` | Employee ID + PIN |
| Admin | `/admin/login` | Employee ID + PIN |

All protected routes redirect to their respective login screen if the session is missing. Logout buttons are available in the Delivery and Admin shells.

---

## Project Structure

```
app/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Role-selection landing page
│   ├── customer/         # Customer module (splash, login, home, subscription, …)
│   ├── delivery/         # Delivery module (login, route, customers, status)
│   └── admin/            # Admin module (login, dashboard, customers, routes, collections)
├── components/
│   ├── shells/           # Layout shells + auth guards (CustomerShell/Guard, AdminShell/Guard, DeliveryShell/Guard)
│   ├── cards/            # Reusable card components
│   └── shared/           # StatusBadge, OTPInput, QuantitySelector, EmptyState, PageHeader
├── data/                 # Mock JSON (customers, routes, payments, orders, collections)
└── types/                # TypeScript interfaces

docs/                     # Source-of-truth design docs (read-only)
FINAL_REVIEW.md           # FR compliance, screen coverage, QA results
```

---

## Screens Built (16 / 16)

**Customer (8):** Splash · Login · Home · Subscription · Extra Order · Pause/Resume · Payments · Profile

**Delivery (4):** Login · Today's Route · Customer List · Delivery Status

**Admin (5):** Login · Dashboard · Customers · Routes · Collections

See [FINAL_REVIEW.md](./FINAL_REVIEW.md) for full FR compliance matrix and user flow coverage.
