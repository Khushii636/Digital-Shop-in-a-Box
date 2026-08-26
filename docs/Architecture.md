# Architecture.md — Digital Shop-in-a-Box

This document defines the technical stack, system architecture, data model shape, and file/folder structure. It is the AI's reference for *how* to build what `PRD.md` defines. Read this before generating any code.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React + Vite | Fast dev loop, SPA |
| Styling | Tailwind CSS | Mobile-first utility CSS; see `Design.md` for tokens |
| Backend | Django + Django REST Framework | REST API, mature auth ecosystem |
| Database | PostgreSQL | Relational, strong support for multi-tenant row isolation |
| Auth | JWT (initially) | Access + refresh tokens; OTP/password later |
| Frontend hosting | Vercel | |
| Backend hosting | Any managed cloud (Render / Railway / similar) — decide at Phase 10 | |
| DB hosting | Managed PostgreSQL | |

No other frameworks, ORMs, or state-management libraries should be introduced without updating this file first (see `Rules.md`).

## 2. High-Level System Diagram

```
                 React (Vite) SPA — mobile-first UI
                              │
                              ↓
                        REST API (JSON)
                              │
                       Django + DRF Backend
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
            Users           Shops          Products
                              │
                         Customers
                              │
                            Sales
                              │
                         PostgreSQL
```

## 3. Multi-Tenancy Model (critical, non-negotiable)

Every data-owning table (Product, Customer, Sale, Report data) carries a `shop` foreign key. Every query that touches shop-owned data **must** be scoped to `request.user`'s shop.

```
User (auth account)
  ↓  (1-to-1 or 1-to-many if staff added later)
Shop
  ├── Products
  ├── Customers
  ├── Sales
  └── FeatureConfig (which modules are ON/OFF for this shop)
```

Rules:
- No endpoint returns or accepts data for a shop the authenticated user does not own.
- Shop scoping is enforced at the queryset level (e.g., a shared `ShopScopedQuerySet`/mixin), not just in serializers, so a missed filter can't leak data.
- Shop ID (e.g. `SHARMA-4821`) is a human-friendly identifier, never a secret or auth mechanism.

## 4. Core Data Flow (the workflow that matters most)

```
New Sale request
   ↓
Validate stock availability
   ↓
Create Sale + SaleLineItems (atomic transaction)
   ↓
Decrement Product.stock for each line item
   ↓
Update Customer purchase history (if customer attached)
   ↓
Recompute dashboard aggregates (today's sales, transaction count)
```

This must happen as a single atomic database transaction — a sale should never partially apply (e.g., stock deducted but sale not saved).

## 5. Core Data Model (V1)

```
User
 - id, email/phone, password_hash, created_at

Shop
 - id, shop_id (human-readable, e.g. SHARMA-4821), owner (FK User)
 - name, business_type, created_at

FeatureConfig
 - id, shop (FK, 1-to-1)
 - inventory: bool, sales: bool, customers: bool, reports: bool
 - (future flags added here only, never new tables per feature toggle)

Product
 - id, shop (FK), name, price, unit, stock_qty, low_stock_threshold

Customer
 - id, shop (FK), name, phone, created_at

Sale
 - id, shop (FK), customer (FK, nullable), total_amount, created_at

SaleLineItem
 - id, sale (FK), product (FK), quantity, unit_price_at_sale, subtotal
```

`unit_price_at_sale` is stored on the line item (not just referenced from Product) so historical sales remain accurate if a product's price later changes.

## 6. API Contract Shape (V1, indicative — finalize in Phase 4)

```
POST   /api/auth/register/
POST   /api/auth/login/
POST   /api/auth/logout/

GET    /api/shop/                  (current user's shop)
POST   /api/shop/                  (create shop / onboarding)
PATCH  /api/shop/                  (update features/profile)

GET    /api/products/
POST   /api/products/
PATCH  /api/products/:id/
DELETE /api/products/:id/

GET    /api/customers/
POST   /api/customers/
PATCH  /api/customers/:id/

POST   /api/sales/                 (create sale — triggers full data flow above)
GET    /api/sales/

GET    /api/dashboard/summary/     (today/week/month aggregates, low stock, insight)
GET    /api/reports/daily|weekly|monthly/
```

All endpoints (except auth) require a valid JWT and are implicitly scoped to `request.user.shop`.

## 7. Frontend Structure

```
src/
  api/              # thin fetch/axios wrappers per resource (products.js, sales.js, ...)
  components/
    ui/             # generic building blocks (Button, Card, Input, StatCard)
    dashboard/
    products/
    sales/
    customers/
    onboarding/
  pages/            # route-level screens
  hooks/            # useAuth, useShop, useDashboardSummary, etc.
  context/           # AuthContext, ShopContext (feature flags live here)
  layouts/          # MobileLayout (bottom nav), DesktopLayout (sidebar)
  styles/           # tailwind.config.js tokens live here, see Design.md
  utils/
  App.jsx
  main.jsx
```

## 8. Backend Structure

```
backend/
  config/            # Django project settings, urls.py, wsgi/asgi
  apps/
    accounts/        # User model, auth views/serializers
    shops/           # Shop, FeatureConfig
    products/
    customers/
    sales/           # Sale, SaleLineItem, the core transaction logic
    dashboard/        # aggregate/report endpoints (read-only, computed)
  common/
    permissions.py   # IsShopOwner / shop-scoping mixins
    querysets.py      # ShopScopedQuerySet base
  manage.py
  requirements.txt
```

Each Django app maps 1:1 to a domain concept from the data model in Section 5 — this keeps the AI's future edits localized and predictable.

## 9. Responsive / Mobile-First Rule

Layouts are designed and built for a narrow phone viewport first, then progressively enhanced for desktop (sidebar nav replaces bottom nav; stat cards move into a row instead of a stack). Never build the desktop layout first and shrink it down.

## 10. What This Document Does Not Cover

- Visual design tokens, colors, typography → `Design.md`
- Which libraries are banned/allowed and coding conventions → `Rules.md`
- Build order → `Phases.md`
- Running progress log → `Memory.md` (created once coding starts)
