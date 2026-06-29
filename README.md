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

Open [http://localhost:3000](http://localhost:3000). The root page redirects to the Customer splash screen.

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

---

## Entry Points

| Role | URL |
|------|-----|
| Customer | `/customer/splash` |
| Delivery Executive | `/delivery/login` |
| Admin | `/admin/dashboard` |

---

## Project Structure

```
app/
├── app/                  # Next.js App Router pages
│   ├── customer/         # Customer module (splash, login, home, …)
│   ├── delivery/         # Delivery module (login, route, status)
│   └── admin/            # Admin module (dashboard, customers, routes, collections)
├── components/
│   ├── shells/           # Layout shells (CustomerShell, AdminShell, DeliveryShell)
│   ├── cards/            # Reusable card components
│   └── shared/           # StatusBadge, OTPInput, QuantitySelector, EmptyState
├── data/                 # Mock JSON (customers, routes, payments, orders, collections)
└── types/                # TypeScript interfaces

docs/                     # Source-of-truth design docs (read-only)
FINAL_REVIEW.md           # FR compliance, screen coverage, QA results, known limitations
```

---

## Screens Built (15 / 16)

**Customer (8):** Splash · Login · Home · Subscription · Extra Order · Pause/Resume · Payments · Profile

**Delivery (3):** Login · Today's Route · Delivery Status

**Admin (4):** Dashboard · Customers · Routes · Collections

See [FINAL_REVIEW.md](./FINAL_REVIEW.md) for full FR compliance matrix, user flow coverage, and known limitations.
