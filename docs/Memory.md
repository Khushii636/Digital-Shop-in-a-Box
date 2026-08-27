## Completed
### Phase 1 — Environment & Project Skeleton
- Vite + React frontend scaffolded, Tailwind v4 configured with Design.md tokens.
- Django + DRF backend scaffolded, PostgreSQL connected.
- Health-check endpoint working end-to-end.

## Phase 2 — Authentication
- User model, register / login / logout endpoints (JWT).
- Frontend: register & login screens, auth context, protected routing.
- Passwords hashed, tokens stored appropriately, logout clears session.

## Phase 3 — Shop Onboarding
- Shop model + FeatureConfig model.
- Onboarding flow: shop name → business type → recommended features → confirm/edit → create shop.
- Shop scoped strictly to the logged-in user (Architecture §3).
