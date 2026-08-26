# Rules.md — Boundaries for the AI

This file governs *how* the AI should behave while building this project. If a request conflicts with this file, this file wins — flag the conflict instead of silently ignoring it.

---

## 1. Stack Discipline

- Use only what's listed in `Architecture.md`: React + Vite, Tailwind CSS, Django + DRF, PostgreSQL, JWT.
- Do not introduce a new state-management library (Redux, Zustand, Recoil, etc.) in V1. React Context + hooks is sufficient for this scope.
- Do not introduce a new CSS approach (styled-components, CSS-in-JS, SCSS) alongside Tailwind.
- Do not swap PostgreSQL for another database, or DRF for another API framework, without the human explicitly updating `Architecture.md` first.
- If a task seems to need a new library, stop and propose it rather than silently installing it.

## 2. Scope Discipline

- Never build anything listed under "Explicitly Out of Scope for V1" in `PRD.md` unless the human explicitly asks for it in that specific session.
- Never jump ahead to a feature from a later phase in `Phases.md` "because it's easy while I'm in this file." Flag it as a suggestion instead and wait for confirmation.
- If a request is ambiguous about which phase it belongs to, ask, don't assume.

## 3. Multi-Tenancy Is Non-Negotiable

- Every new model that stores shop data must include a `shop` foreign key.
- Every new queryset/view touching shop data must filter by `request.user`'s shop — never trust a shop ID passed in a request body/query param as the source of truth for which shop's data to return.
- Any new endpoint must be reviewed against: "Could this ever return or accept another shop's data?" If yes, it's not done.
- Never write a test, seed script, or migration that disables this scoping "for convenience."

## 4. The Core Transaction Must Stay Atomic

- The sale-creation flow (create sale → deduct stock → update customer history → update aggregates) must always run inside a single database transaction.
- Never split this into separate, independently-committed API calls from the frontend. It's one backend operation.
- If stock is insufficient, the whole operation must fail cleanly with no partial writes.

## 5. Error Handling

- Every API endpoint returns structured error responses (consistent shape: `{ "error": { "code": ..., "message": ... } }`), never a raw stack trace to the client.
- Validate on the backend even if the frontend already validates — never trust client-side validation alone.
- Frontend network calls always handle the failure path (show a message), never fail silently.
- Log errors server-side with enough context to debug (shop id, endpoint, timestamp) without logging sensitive data (passwords, tokens).

## 6. Security Baseline

- Passwords are always hashed (Django's built-in hasher); never store or log plaintext passwords.
- JWTs are never logged in full.
- No secrets (API keys, DB credentials) are hardcoded in source — use environment variables from the start, even in early phases.
- CORS is explicitly configured, not left wide open (`*`), once a real frontend origin exists.

## 7. Mobile-First Is a Hard Constraint

- Every new screen is designed/built for a ~375–420px viewport first.
- Touch targets are large enough for a thumb (no small icon-only buttons with no padding).
- Minimize required typing; prefer selects, steppers, and defaults over free text where reasonable.

## 8. Code Style & Conventions

- Frontend: functional React components, hooks only (no class components).
- Keep components small and colocated by domain (see folder structure in `Architecture.md`) rather than one giant file per page.
- Backend: DRF serializers + viewsets for standard CRUD; keep business logic (like the sale transaction) in a service function/module, not stuffed into the view.
- Name things after the domain language already used in `PRD.md`/`Architecture.md` (Shop, Product, Sale, Customer) — don't invent new terminology mid-project.

## 9. AI Feature Boundaries (V1)

- AI is limited to: onboarding feature recommendations, natural-language product entry parsing, and a single simple dashboard insight line.
- Do not build a general-purpose chatbot, open-ended AI assistant UI, or expose a raw LLM prompt box to the user in V1.
- Any AI-generated structured data (e.g., parsed product from natural language) must be shown to the user for confirmation before being saved — never auto-save unconfirmed AI output.

## 10. Communication & Process Rules

- No jumping directly into coding without confirming which `Phases.md` phase is being worked on.
- Before generating a large batch of new files, state which phase/feature this covers and how it maps to `PRD.md`.
- When a decision isn't covered by these docs (e.g., a naming choice, a library version), make a reasonable choice, state the assumption briefly, and proceed — don't block on it.
- When `Memory.md` exists, read it first at the start of a session before re-deriving context from the rest of the codebase.
- Update `Memory.md` at the end of a working session with what changed and what's next (see `Memory.md` template).

## 11. What "Done" Means for a Feature

A feature is not done until:
1. It matches the scope defined in `PRD.md` for its phase — no more, no less.
2. It respects shop-scoping (Section 3).
3. It has basic error handling (Section 5).
4. It works on a mobile viewport (Section 7).
5. `Memory.md` has been updated to reflect it.
