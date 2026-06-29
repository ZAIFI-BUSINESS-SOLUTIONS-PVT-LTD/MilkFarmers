# Product Requirements Document

## Metadata
| Key | Value |
|------|-------|
| Project | Milk Farmers |
| Version | v0.1 |
| Status | POC |
| Platform | Web + Mobile Responsive |
| Scope | Frontend Only |
| Backend | None |
| Data | Mock JSON |

## Business Context
Develop a frontend-only POC for a premium milk subscription platform.

### Goals
- Demonstrate UX
- Validate flows
- Convince client

### Out of Scope
- ERP
- Backend
- APIs
- GPS
- Notifications
- Payment Integration

## User Roles
- Customer
- Delivery Executive
- Admin

## Navigation
Customer: Splash → Login → Home → Subscription → Orders → Payments → Profile
Delivery: Login → Route → Customers → Status
Admin: Login → Dashboard → Customers → Routes → Collections

## Screen Inventory
SCR-001 Splash
SCR-002 Login
SCR-003 Home
SCR-004 Subscription
SCR-005 Extra Order
SCR-006 Pause
SCR-007 Payments
SCR-008 Profile
SCR-101 Delivery Login
SCR-102 Route
SCR-103 Customers
SCR-104 Delivery Status
SCR-201 Dashboard
SCR-202 Customers
SCR-203 Routes
SCR-204 Collections

## Functional Requirements
FR-001 Login
FR-002 Subscription
FR-003 Pause Subscription
FR-004 Extra Order
FR-005 Payments
FR-006 Route Management
FR-007 Dashboard
FR-008 Customer Management
FR-009 Collections

## Tech Stack
Next.js, TypeScript, Tailwind CSS, shadcn/ui, Lucide, Recharts, Mock JSON.

## Acceptance Criteria
- Responsive
- Mock data only
- No backend
- Navigation complete
- Matches user flows
