# Design.md — Visual Identity

Direction: **warm, trustworthy, slightly premium Indian-local-business aesthetic** — not a generic corporate SaaS look, not a childish/toy look, not "AI bro" futurism.

Brand personality: Simple · Warm · Trustworthy · Local · Modern · Helpful
Emotional message: *"Your shop. Your way. Made simple."*

---

## 1. Color Palette — "Mitti & Mint"

| Purpose | Hex | Usage |
|---|---|---|
| Primary | `#245C4A` | Deep forest/mint — primary buttons, nav highlights, headings |
| Primary Light | `#DDEFE7` | Subtle backgrounds, hover states, badges |
| Accent | `#F2B84B` | Warm turmeric/gold — highlights, key CTAs like "+ New Sale", alerts |
| Background | `#F7F5EF` | Warm paper — app background |
| Card | `#FFFDF8` | Card surfaces |
| Text (primary) | `#18231F` | Body/heading text |
| Text (muted) | `#718078` | Secondary text, labels, timestamps |
| Danger | `#D96B5F` | Errors, destructive actions, out-of-stock |
| Success | `#4E9B72` | Confirmations, positive trends |

Do not introduce additional brand colors without updating this table. Low-stock warnings use a warm amber (derived from Accent, slightly desaturated), not the Danger red — reserve Danger for genuine errors/failures.

## 2. Typography

- Typeface: **Plus Jakarta Sans** (Google Fonts) throughout.
- Headings: bold / semi-bold.
- Body: regular / medium.
- Numbers (money, quantities): slightly larger and bolder than surrounding text — the number *is* the content on this dashboard, it should never compete with its label for attention.

Suggested scale (Tailwind-friendly):

| Token | Size | Weight | Use |
|---|---|---|---|
| `text-3xl` | 30px | bold | Big dashboard numbers (₹4,820) |
| `text-xl` | 20px | semibold | Section headings |
| `text-base` | 16px | medium | Body text, form labels |
| `text-sm` | 14px | regular | Muted/secondary text, timestamps |

## 3. Surfaces & Shapes

- Cards: warm white (`#FFFDF8`), **16–20px rounded corners**, very subtle shadow, thin border (`1px`, low-opacity dark or `#EAE6DA`-ish tone), generous internal padding.
- Avoid heavy glassmorphism, gradients, or large drop shadows — keep it flat and calm.
- Lots of breathing room / whitespace; this is not a dense data-grid product.

## 4. Iconography

- Simple rounded line icons (Lucide-style), single color (usually Text or Primary), consistent stroke width.
- No large colorful illustrations in the core app UI. Small, subtle shop-themed illustrations (storefront, shelf, receipt, calculator, box) are reserved for onboarding only, and should stay consistent and understated — like modern illustrated Indian stationery, not cartoonish.

## 5. Layout

### Desktop
Sidebar navigation + main content area:

```
┌─────────────────────────────────────────────────────┐
│  LOGO       Good morning, Sharma Store     🔔  👤   │
├────────────┬────────────────────────────────────────┤
│  🏠 Home   │   Good morning 👋                       │
│  🧾 Sales  │   Here's how your shop is doing         │
│  📦 Stock  │  ┌────────┐ ┌────────┐ ┌────────┐       │
│  👥 People │  │ ₹4,820 │ │   23   │ │  126   │       │
│  📊 Reports│  │ Sales  │ │ Txns   │ │Products│       │
│  🧮 Tools  │  └────────┘ └────────┘ └────────┘       │
│  ⚙ Settings│  [ Sales Graph ]        [ ⚠ Low Stock ] │
└────────────┴────────────────────────────────────────┘
```

### Mobile (primary experience — design this first)
Bottom navigation, 5 items max, with the most-used action easy to reach:

```
Home | Sales | Stock | Customers | More
```

A prominent **"+ New Sale"** action should always be one tap away (e.g., a floating/central action or pinned top button) — this is the single most-used action in the product (see `PRD.md` §7).

## 6. Dashboard Content Pattern

Keep it to: greeting, 3–4 key stat cards (today's sales, transactions, products, low stock), quick actions (New Sale / Add Product / Add Customer), one "needs attention" callout, one simple chart, one plain-language insight line. Resist the urge to add more — this is not meant to look like an ERP dashboard.

Example tone:
```
Good morning, Sharma General Store 👋
Today: ₹4,820 · 23 Sales · 126 Products · 4 ⚠ Low Stock

⚠ Needs attention: 5 products are running low → View products

💡 Smart Insight: Your sales are 12% higher than last week.
```

## 7. Shop Tools / Calculator Screen

This screen gets a visually distinct treatment — warm background, one large numeric result as the focal point:

```
┌───────────────────────────────┐
│ ← Shop Calculator             │
│  Calculate Stock Value        │
│  Product:  Rice ▾              │
│  Current stock: 25 kg          │
│  Price: ₹60 / kg               │
│  ┌─────────────────────────┐  │
│  │       ₹1,500             │  │
│  │    Stock Value           │  │
│  └─────────────────────────┘  │
│        [ Calculate ]          │
└───────────────────────────────┘
```

The result number should be the single largest, boldest element on the screen.

## 8. Onboarding Visual Tone

Onboarding is the signature moment of the product and should feel like a short, satisfying conversation, not a form:
- One question group per screen step (shop name → business type → recommended features → confirm).
- Progress should be visible (e.g., step 01/04) but light-touch.
- End on a small celebratory moment ("Your digital shop is ready 🎉") before entering the dashboard.

## 9. What to Avoid

- ❌ Corporate SaaS blue/gray palettes
- ❌ Dense multi-column ERP-style tables as the primary dashboard view
- ❌ Overly futuristic/neon "AI" visual language
- ❌ Small, cramped touch targets
- ❌ Large, generic stock-photo-style illustrations
