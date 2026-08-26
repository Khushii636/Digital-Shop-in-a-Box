# PRD.md — Project Requirements Document
## Digital Shop-in-a-Box

---

## 1. One-Line Pitch

Create your digital shop in minutes and manage your sales, products, customers, and stock — all from one simple, phone-friendly platform.

## 2. The Problem

Small shopkeepers currently run their business across a notebook for sales, a notebook for customers, mental math for stock, and a calculator for revenue. Existing business software is too complex, too expensive, or built for larger businesses.

We are not solving "inventory management." We are solving **digital chaos** for small shopkeepers — replacing scattered manual tracking with one simple place to run the shop.

## 3. Target User (V1)

**Primary user:** A small owner-operated grocery / general store owner who currently manages their business manually (notebook, memory, calculator).

Explicitly **not** targeting (in V1): large retailers, enterprises, multi-location chains, or technically sophisticated businesses.

**Primary persona:** Sharma, owner of "Sharma General Store." Standing behind the counter, one hand holding a phone, wants to record a sale in seconds without typing much.

## 4. Core Promise

The shopkeeper should never think "I need to learn software." They should only think "I need to manage my shop." This is the product's UX north star and the standard every feature is measured against.

## 5. Product Concept

**One platform → thousands of personalized shops.**

We do not build a different app per shop. A single core application is configured per shop through an onboarding flow (business type + selected features), producing a personalized dashboard and workspace per shop, backed by strict multi-tenant data isolation.

```
PLATFORM → Business Setup → Business Type + Feature Selection → Configuration → Personalized Dashboard
```

## 6. Core User Journey

```
Landing Page
   ↓
"Create My Shop"
   ↓
Shop Setup (name, business type, business details)
   ↓
Needs Assessment (system recommends features)
   ↓
Shopkeeper selects/edits features
   ↓
Shop Created 🎉
   ↓
Personalized Dashboard
   ↓
Sales · Products · Customers · Reports · Settings (all connected)
```

## 7. The Single Most Important Workflow

**Sale → automatic stock update.** If we perfect only one thing, it is this:

```
Sale created → Revenue updated → Stock deducted → Customer history updated → Dashboard updated
```

This is the moment the shopkeeper realizes the product is genuinely useful, and it is the workflow every design and engineering decision should protect.

## 8. V1 Feature Set (MVP)

### Authentication
- Register, Login, Logout (JWT-based)

### Shop Onboarding
- Shop name & business type
- Basic business details
- System-recommended features based on business type
- Feature selection (editable, stored per shop)

### Dashboard
- Today's sales, transaction count, product count
- Low-stock alert count
- Quick actions: New Sale, Add Product, Add Customer
- Basic insight (e.g., "Sales are 12% higher than last week")

### Products / Inventory
- Add / Edit / Delete product
- Price, quantity, unit, low-stock threshold

### Sales
- Create sale (select products + quantities)
- Automatic total calculation
- Automatic stock deduction
- Sale history

### Customers
- Add / Edit customer
- Purchase history per customer

### Reports
- Daily / Weekly / Monthly sales totals

### Settings
- Shop profile
- Feature configuration (toggle modules on/off)
- Account settings

## 9. Explicitly Out of Scope for V1

Do not build these until later versions — this discipline protects the MVP timeline:

- Customer accounts / logins
- Employee accounts & permissions
- Online ordering
- Public shop website / storefront
- Payment gateway integration
- GST / accounting suite
- Supplier management
- Advanced AI / AI chatbot
- WhatsApp automation
- Offline-first sync
- Complex accounting

## 10. AI Role (V1 — light touch only)

AI is a supporting layer, not the product:
1. **Onboarding** — recommend features based on declared business type.
2. **Product entry** — parse natural language ("Add 5 packets of Maggi at ₹15 each") into structured product data.
3. **Dashboard insight** — one simple, plain-language insight line (e.g., "Rice was your best-selling product this week").

No AI chatbot, no prominent "AI-powered" branding in V1.

## 11. Differentiating Feature: Shop Tools (Calculator Suite)

A "Shop Calculator" that pulls live data from the shop's own inventory rather than requiring manual entry:
- Stock Value Calculator (quantity × price)
- Quantity ↔ Price Calculator ("I have ₹500, how much rice can I buy?")
- Sale Calculator
- (Future) Profit / Margin / Discount / Restock calculators

This differentiates the product from a generic notebook-replacement app and is a planned post-MVP enhancement, not core MVP.

## 12. Security / Multi-Tenancy Requirement

Every shop's data must be fully isolated. A Shop ID (e.g., `SHARMA-4821`) identifies the shop, but authentication is handled via proper login (password/OTP), not the ID alone.

```
User → Shop → Products / Customers / Sales / Reports
```

Shop A must never be able to access Shop B's data under any circumstance. This is a first-class backend requirement, not an afterthought.

## 13. Success Criteria for V1

- A shopkeeper can go from landing page to a working, personalized shop in under 5 minutes.
- A sale can be recorded in under 15 seconds on a phone.
- Stock, revenue, and customer history update automatically and correctly after every sale, with zero manual reconciliation.
- Each shop's data is provably isolated from every other shop.

## 14. Long-Term Vision (context only — not built now)

A shopkeeper should eventually be able to say "This is my shop. Help me manage it," and the platform handles the underlying complexity: inventory, sales, customers, digital presence, payments, staff, suppliers, and intelligence. See `Phases.md` for the version roadmap (V1–V6).
