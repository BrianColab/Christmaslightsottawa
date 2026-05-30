# Tech Reference: AfterBody Health

Critical integration details for development sessions. Verify against source code before acting on anything here — credentials and IDs don't change often but the code is authoritative.

## Stack

- **Framework:** React 19 + TanStack Router (file-based routing under `src/routes/`)
- **Styling:** Tailwind CSS v4, OKLCH color space throughout
- **Build:** Vite (`npm run build` → `dist/`)
- **Node:** 20 (see `.node-version`)
- **Package manager:** npm (also has `bun.lock` — either works)

## Deployment Architecture

| Environment | Trigger | Host | Who |
|---|---|---|---|
| DEV | Push to `main` on Brian's GitHub | Railway | Brian |
| LIVE | GitHub Action (manual trigger) strips internal files → pushes to client's GitHub `main` | Cloudflare Pages | Client |

**Railway config:** `railway.json` at repo root.
**Cloudflare Pages config:** Build command `npm run build`, output directory `dist`, Node version env var `NODE_VERSION=20`.

### GitHub Action — Deploy to Client

File: `.github/workflows/deploy-live.yml`
Trigger: Manual (`workflow_dispatch`) from GitHub Actions tab.

Files stripped before push to client GitHub:
- `ai/` — internal AI context
- `.lovable` — Lovable.dev legacy config
- `.impeccable` — internal design skill config
- `PO.txt` — internal purchase order note
- `fix-encoding.mjs` — one-off dev utility
- `wrangler.jsonc` — Cloudflare Workers config (not used)

Required GitHub secrets on Brian's repo:
- `CLIENT_GITHUB_TOKEN` — PAT from client's GitHub with `repo` write scope
- `CLIENT_GITHUB_REPO` — `clientusername/reponame`

## Shopify Integration

**Store:** `sybtx0-zn.myshopify.com`
**API:** Storefront API v2025-01 (GraphQL)
**Token:** `bd2c1ce0f945ca67c144ec109e695d2a` (public storefront token)
**Source file:** `src/lib/shopify.ts`

### Variant & Selling Plan GIDs

```typescript
SHOPIFY_VARIANT_GIDS = {
  protocol: "gid://shopify/ProductVariant/44204143050812",
}

SHOPIFY_SELLING_PLANS = {
  oneMonth:   "gid://shopify/SellingPlan/2296447036",   // $288/mo (one-time equivalent)
  threeMonth: "gid://shopify/SellingPlan/2295758908",   // $222/mo
  sixMonth:   "gid://shopify/SellingPlan/2295791676",   // $188/mo
}
```

### Checkout Flow — Critical

**Do NOT use URL params (`?selling_plan=`) to set the plan.** Shopify ignores them when a cart session already exists — all orders go to the same plan.

**Correct flow:**
1. `createCart()` — creates a fresh cart via Storefront API
2. `addCartLines(cartId, [{ merchandiseId, quantity, sellingPlanId }])` — plan is baked into the cart token
3. Redirect to `cart.webUrl` — Shopify checkout with correct plan

**Fallback URLs** (used if Storefront API fails):
```
oneTime:    https://afterbodyhealth.com/products/afterbody-protocol
threeMonth: https://afterbodyhealth.com/products/afterbody-protocol?selling_plan=2295758908
sixMonth:   https://afterbodyhealth.com/products/afterbody-protocol?selling_plan=2295791676
```

### Product Publishing Requirement

The AfterBody Protocol product must be published to the **Buy Button** sales channel in Shopify admin for the Storefront API token to access it. If you see `"merchandise does not exist"` errors, check: Shopify Admin → Products → AfterBody Protocol → Sales channels → Buy Button.

### Checkout Modal Pattern

All "Get Your Protocol →" buttons open `SubscriptionModal` (component at `src/components/SubscriptionModal.tsx`).

- Modal shows plan-specific disclaimer text + checkbox agreement
- User must check the box before proceeding
- On proceed: creates cart via Storefront API, redirects to Shopify checkout
- `key={activePlan ?? "closed"}` on the modal forces full remount on each open (prevents stale `processing` state)
- `handleClose` resets `agreed`, `attempted`, `processing` state

Used on: `/shop`, `/protocol`. Import `SubscriptionModal` and `PlanKey` from `@/components/SubscriptionModal`.

## Klaviyo Email Signup

**Public API key:** `pk_Sb78T7_39713ecad86f2c072ad7041fc7353ad447`
**Lists:**
- `SqtCXa` — 10% off first order (email capture, used in `EmailSignup` component)
- `SzTM3e` — Purchase list (handled by Klaviyo-Shopify native integration, not our code)

**API:** Klaviyo client subscriptions endpoint, revision `2023-02-22`
**Source file:** `src/components/EmailSignup.tsx`

The public API key (`pk_`) is safe for client-side use. Never use the private key in frontend code.

## Routing

File-based routing via TanStack Router. Route files live in `src/routes/`.

| Route | File |
|---|---|
| `/` | `src/routes/index.tsx` |
| `/shop` | `src/routes/shop.tsx` |
| `/protocol` | `src/routes/protocol.tsx` |
| `/the-stack` | `src/routes/the-stack.tsx` |
| `/reset` | `src/routes/reset.tsx` |
| `/rebuild` | `src/routes/rebuild.tsx` |
| `/recharge` | `src/routes/recharge.tsx` |
| `/shop/$slug` | `src/routes/shop.$slug.tsx` |

Science pages (reset, rebuild, recharge) share `SciencePage` component at `src/components/SciencePage.tsx` with data passed in from each route file.
