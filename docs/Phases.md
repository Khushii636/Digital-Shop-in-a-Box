# Phases.md — Build Order

The AI builds one phase at a time, in order. Do not start a phase until the previous one is confirmed done. Do not pull in scope from a later phase early, even if it seems convenient (see `Rules.md` §2).

---

## Phase 0 — Product Definition
**Status of this phase:** ✅ Complete — captured in `PRD.md`.
Output: agreed target user, core promise, V1 feature list, out-of-scope list.

## Phase 1 — Environment & Project Skeleton
- Initialize Vite + React frontend, Tailwind configured with tokens from `Design.md`.
- Initialize Django + DRF backend, PostgreSQL connected, environment variables set up.
- Folder structure matches `Architecture.md` §7–8.
- Health-check endpoint working end-to-end (frontend can call backend and render a response).

**Done when:** a blank app runs locally, frontend talks to backend, no features yet.

## Phase 2 — Authentication
- User model, register / login / logout endpoints (JWT).
- Frontend: register & login screens, auth context, protected routing.
- Passwords hashed, tokens stored appropriately, logout clears session.

**Done when:** a user can register, log in, stay logged in on refresh, and log out.

## Phase 3 — Shop Onboarding
- Shop model + FeatureConfig model.
- Onboarding flow: shop name → business type → recommended features → confirm/edit → create shop.
- Shop scoped strictly to the logged-in user (Architecture §3).

**Done when:** a new user can create exactly one shop with a name, business type, and chosen feature set, and it persists correctly, isolated from other users' shops.

## Phase 4 — API Contract Finalization
- Lock the final endpoint list and request/response shapes for Products, Customers, Sales, Dashboard, Reports (draft in `Architecture.md` §6).
- Document any deviations from the draft contract.

**Done when:** frontend and backend agree on exact request/response shapes before Phase 6/7 build against them.

## Phase 5 — UI/UX for Core Screens
- Wireframe/build static (non-wired) versions of: Dashboard, Product list/add/edit, Customer list/add/edit, New Sale flow, Reports.
- Apply `Design.md` visual system (colors, type, spacing, mobile-first layout with bottom nav).

**Done when:** every core V1 screen exists visually, on mobile and desktop, with no real data wired in yet.

## Phase 6 — Frontend Implementation
- Wire Product CRUD, Customer CRUD, New Sale flow, Dashboard, Reports to real API calls.
- Loading and error states for every screen (Rules §5).

**Done when:** the frontend is fully functional against a working backend for all V1 features.

## Phase 7 — Backend Implementation
- Products, Customers, Sales (with atomic transaction logic per Architecture §4), Dashboard aggregates, Reports.
- Shop-scoping enforced everywhere (Rules §3).

**Done when:** every V1 endpoint from `Architecture.md` §6 works correctly and is shop-isolated.

*(Phases 6 and 7 may run in parallel/interleaved in practice, but each individual feature must be integration-tested per Phase 8 before being marked done.)*

## Phase 8 — Integration
- Connect the fully-built frontend to the fully-built backend for every V1 feature.
- Verify the core sale → stock → revenue → customer → dashboard flow end-to-end (Architecture §4).
- Verify multi-tenant isolation manually with two test shops.

**Done when:** a full user journey (register → onboard → add product → make sale → see updated dashboard) works with zero manual data patching.

## Phase 9 — Testing
- Backend: unit tests for models/serializers, integration tests for the sale transaction (including insufficient-stock failure case), multi-tenancy isolation tests.
- Frontend: at minimum, manual test pass of every V1 screen on a real mobile viewport.

**Done when:** core transaction and isolation have automated test coverage; no known critical bugs remain.

## Phase 10 — Deployment
- Frontend → Vercel.
- Backend → chosen cloud host (decide provider here, update `Architecture.md`).
- Database → managed PostgreSQL.
- Environment variables and CORS configured for production.

**Done when:** the app is reachable at a real URL and a fresh user can complete the full journey in production.

## Phase 11 — AI Layer (V1-scoped only)
- Onboarding feature recommendations based on business type.
- Natural-language product entry parsing (with user confirmation before save — Rules §9).
- One dashboard insight line.

**Done when:** these three AI touches work reliably and degrade gracefully (i.e., the app still fully works if the AI call fails).

## Phase 12 — Real-World Pilot
- Onboard a small number of real shopkeepers (ideally the original target persona: small grocery/general store owner).
- Collect feedback specifically on: onboarding time, speed of recording a sale, and whether the dashboard answers "how is my shop doing?" at a glance.
- Feed findings back into a prioritized backlog for V2.

**Done when:** at least one real shop has used the product for real sales over a real period (e.g., one week), and feedback has been captured.

---

## Beyond V1 — Version Roadmap (context only, not built yet)

| Version | Focus |
|---|---|
| V2 | Billing/invoices, expenses, suppliers, CSV/Excel import, better analytics |
| V3 | Fuller AI assistant — natural-language business questions, smart recommendations |
| V4 | Public digital storefront (`platform.com/shop-name`) |
| V5 | Online ordering, UPI/payment integration, customer notifications, loyalty |
| V6 | Offline-first sync, predictive inventory, automated restocking |

These are explicitly **not** part of the current build. Do not implement anything from this table without first updating `PRD.md` and `Phases.md`.
