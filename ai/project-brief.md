# Project Brief — TypoHero

> Last updated: 2026-03-18
> Source of truth: existing repo at /Typochecker + live site at typohero.com
> Current migration target: Railway.app (from SiteGround shared hosting)

---

## 1. Summary of the current app

TypoHero is a live, production SaaS that scans websites for grammar, spelling, and punctuation errors. It uses the Jina AI Reader to fetch page content and the LanguageTool free API to check it. Users register, choose a plan, pay via Stripe, and get a dashboard with scan history, scheduled scans, and team collaboration.

The app is fully functional on SiteGround shared hosting with a MySQL database, PHP 8.1 backend, and a static HTML/CSS/Vanilla JS frontend. Stripe is live. Google OAuth is live. Multiple paid users exist.

---

## 2. Confirmed facts

### Identity
- App name: TypoHero
- Domain: typohero.com
- Live: yes, paying customers exist
- Admin account: info@typohero.com (is_admin = 1)
- Analytics: Google Analytics G-0HJ3WXKD0F

### Stack
- Front-end: Static HTML + CSS + Vanilla JavaScript (no framework)
- Back-end: PHP 8.1 with PDO (no framework — raw PHP files)
- Database: MySQL on SiteGround (db: dblhnm1v9cz6yc)
- Auth: PHP sessions + bcrypt + Google OAuth 2.0
- Payments: Stripe Checkout + Stripe Billing Portal + Stripe Webhooks (live keys)
- Hosting: SiteGround shared hosting → migrating to Railway.app
- Scanning: Jina AI Reader (r.jina.ai) + LanguageTool free API
- Scheduled scans: SiteGround Cron Jobs calling cron.php hourly

### Database tables (all prefixed TH_)
- TH_users — accounts (email, password_hash nullable, name, lang, is_admin, scan_bonus, google_id, logo_url)
- TH_plans — plan tiers (free/starter/pro with limits)
- TH_subscriptions — one row per user, written by Stripe webhook
- TH_scans — scan results stored as JSON (LONGTEXT pages_json)
- TH_scheduled_scans — cron schedule config per user
- TH_team_members — Pro-only team relationships
- TH_team_invites — token-based invite flow

### API endpoints (27 total in /api/)
- /api/auth/ — register, login, logout, me, update-profile, change-password, forgot-password, reset-password, delete, google-redirect, google-callback, upload-logo
- /api/scans/ — save, history, get, schedule, cron
- /api/stripe/ — create-checkout, webhook, portal
- /api/team/ — members, invite, accept, remove
- /api/admin/ — users, update-user
- /api/contact.php

### External services in use
- Jina AI Reader: https://r.jina.ai/ (no API key required, free)
- LanguageTool free API: https://api.languagetool.org/v2/check (no key, 20k char limit)
- Stripe: live keys configured (Checkout + Webhooks + Portal)
- Google OAuth 2.0: live credentials configured
- ipapi.co: geo-IP language detection on homepage (no key)
- Google Analytics: G-0HJ3WXKD0F

### Plan tiers
| Plan    | Pages/scan | Saved scans | Team seats | Schedules | Price   |
|---------|-----------|-------------|-----------|-----------|---------|
| Free    | 5         | 0 (none)    | No        | No        | $0      |
| Starter | 25        | 10          | 3         | Yes       | $29/mo  |
| Pro     | 100       | 50          | 3         | Yes       | $79/mo  |

### Languages supported
- en-US (default)
- en-CA
- en-GB
- fr-CA

### File storage
- White-label logos uploaded via upload-logo.php
- Stored on the server filesystem (not S3 or a CDN)
- logo_url saved to TH_users

### Email
- Planned but not yet implemented (no service configured)
- forgot-password.php and cron.php have email hooks stubbed out
- No SendGrid/Postmark/SES integrated yet

---

## 3. Assumptions and unknowns

### Assumptions (conservative)
- Railway.app will run PHP via a Docker container (not native PHP hosting)
- MySQL on Railway.app will require a new database — existing data must be exported and imported
- Sessions must remain PHP session-based (no JWT rewrite approved)
- The Stripe webhook URL must be updated in the Stripe Dashboard after migration
- The Google OAuth redirect URI must be updated in Google Cloud Console after migration
- File uploads (logo_url) currently write to local disk — Railway.app has ephemeral storage, so this must change before go-live on Railway
- The SiteGround cron job must be recreated on Railway (or replaced with a Railway cron)

### Unknowns
- Whether Railway.app supports PHP natively or requires Dockerfile
- Whether Railway.app supports persistent file storage or if S3/Cloudflare R2 is needed for logo uploads
- Whether the existing SiteGround MySQL data needs to be migrated or if Railway starts fresh
- Whether session cookies will behave identically under Railway's domain/SSL setup
- Whether LanguageTool rate limits are a problem at scale (no key = shared pool)
- Email service decision (SendGrid, Postmark, Resend, or SES) — not yet chosen
- Whether CORS config needs changes after Railway URL is assigned

---

## 4. Architecture notes

### Folder structure
```
/
├── index.html, dashboard.html, admin.html      ← marketing + app pages
├── signup.html, login.html, checkout.html      ← auth + payment pages
├── forgot-password.html, reset-password.html
├── privacy.html, terms.html, gdpr.html, cookie-policy.html
├── about.html, blog.html, contact.html, careers.html, changelog.html
├── css/          ← main.css, scanner.css, dashboard.css, modal.css, etc.
├── js/           ← scanner.js, dashboard.js, modal.js, main.js, etc.
├── api/
│   ├── auth/     ← 12 PHP auth endpoints
│   ├── scans/    ← 5 PHP scan endpoints
│   ├── stripe/   ← 3 PHP Stripe endpoints
│   ├── team/     ← 4 PHP team endpoints
│   ├── admin/    ← 2 PHP admin endpoints
│   └── contact.php
├── config/       ← db.php, cors.php, stripe.php, google.php (secrets here)
├── vendor/       ← stripe/stripe-php SDK (manually uploaded)
├── assets/       ← logo.svg, favicon.svg, icon.svg
├── migrations/   ← numbered SQL migration files
├── docs/         ← schema.sql, stripe-integration-workflow.md, ai/
└── setup-admin.php (one-time, should be deleted after use)
```

### Key patterns in use
- All PHP endpoints include config/cors.php first (session security + CORS headers)
- All protected endpoints check $_SESSION['user_id'] — return 401 if missing
- Admin endpoints additionally check $_SESSION['is_admin']
- All DB queries use PDO prepared statements
- JS fetches always use credentials: 'include' (sends session cookie)
- JS checks me.php on page load to gate UI behind auth state
- Plan limits enforced server-side in save.php, not only in JS

### State management
- Server: PHP sessions (cookie-based, HttpOnly, Secure, SameSite=Lax)
- Client: vanilla JS variables (no framework, no Redux, no localStorage)
- Scan state: passed through JS function calls, rendered directly to DOM

### API style
- REST-ish with JSON responses
- All responses: { ok: true/false, ... } or { error: "message" }
- POST bodies: JSON parsed via json_decode(file_get_contents('php://input'))
- GET params: $_GET superglobal

---

## 5. Constraints

### Must preserve
- All existing user accounts, subscriptions, and scan history (DB must migrate intact)
- Stripe subscription continuity (customer_id, subscription_id, price_id mappings)
- Google OAuth flow (redirect URI will need updating post-migration)
- PHP session-based auth — do not rewrite to JWT without explicit approval
- All plan limits and gating logic (server-side enforcement)
- Admin account (info@typohero.com, is_admin=1)
- All existing URL paths for API endpoints (Stripe webhook URL is registered externally)
- The TH_ table prefix

### Things Claude must not change without explicit approval
- Database schema (additive changes only — no column renames, no table drops)
- Session security settings in config/cors.php
- Stripe price IDs or plan mappings
- LanguageTool disabled categories and rules (tuned to avoid false positives)
- The filterMatches() logic in scanner.js (carefully tuned)
- cleanMarkdown() logic in scanner.js
- Plan tier names (free/starter/pro) — used as string keys throughout

### Security constraints
- Stripe webhook must verify signature (constructEvent) — never skip
- Admin endpoints must check $_SESSION['is_admin'] server-side
- SQL must use prepared statements — no string interpolation in queries
- Passwords must use PASSWORD_BCRYPT
- Session cookies must remain HttpOnly + Secure + SameSite=Lax

### Browser support
- Chrome/Edge: full (Text Fragment API used for "view on page" links)
- Firefox/Safari: clipboard fallback for Text Fragments (already implemented)

---

## 6. Repo guardrails

- Follow the existing raw PHP + PDO pattern — do not introduce a PHP framework
- Reuse config/db.php, config/cors.php, config/stripe.php — do not duplicate
- Do not introduce Composer dependencies without approval (Stripe SDK is manually vendored)
- Keep frontend as static HTML/CSS/Vanilla JS — do not introduce React/Vue/etc.
- All DB changes must be additive (new columns, new tables) — never drop or rename
- New API endpoints go in the existing /api/ subfolder structure
- Do not touch scanner.js false-positive filtering without explicit approval
- Prefer surgical changes — do not refactor working code as part of feature additions

---

## 7. Current priorities

- Highest: Migrate from SiteGround to Railway.app without breaking live users
- Secondary: Implement email delivery (forgot-password, cron scan reports)
- Secondary: Replace local file storage for logo uploads (Railway ephemeral disk)
- Known gap: Email service not configured (blocks password reset and scheduled report emails)
- Fragile areas:
  - scanner.js filterMatches() and cleanMarkdown() — carefully tuned, easy to break
  - Stripe webhook.php — must preserve signature verification and price_id mapping
  - cron.php — depends on SiteGround cron setup, needs replacement on Railway

---

## 8. Migration risks and guardrails (SiteGround → Railway.app)

### Critical risks

**1. PHP on Railway**
- Railway does not have native PHP hosting like SiteGround
- Requires a Dockerfile (e.g., php:8.1-apache or php:8.1-fpm + nginx)
- Risk: session handling, file permissions, and .htaccess rewrite rules may behave differently
- Guard: test auth flow end-to-end before switching DNS

**2. Database migration**
- Must export full MySQL dump from SiteGround phpMyAdmin
- Import into Railway MySQL plugin (or PlanetScale, or Railway's MySQL service)
- Risk: charset (utf8mb4), collation, AUTO_INCREMENT values must be preserved
- Guard: verify row counts and spot-check user/subscription data after import
- Guard: do not run schema.sql fresh on live data — it will truncate existing records

**3. Stripe webhook URL**
- Currently registered as: https://typohero.com/api/stripe/webhook.php
- Must update in Stripe Dashboard → Developers → Webhooks after DNS cutover
- Risk: webhook events will fail during cutover window (subscription changes may not process)
- Guard: plan the DNS cutover during a low-activity window; check Stripe webhook logs after

**4. Google OAuth redirect URI**
- Currently registered as: https://typohero.com/api/auth/google-callback.php
- URI is hardcoded in Google Cloud Console AND in config/google.php
- No change needed if domain stays typohero.com and Railway serves under same domain
- Risk: if Railway assigns a .up.railway.app URL during testing, Google will reject OAuth
- Guard: add the Railway test URL to Google Cloud Console authorized redirect URIs during migration testing

**5. File storage (logo uploads)**
- Railway.app has ephemeral disk — files written to local disk are lost on redeploy
- upload-logo.php currently writes to server filesystem
- Risk: all white-label logos will disappear after first Railway deploy
- Guard: migrate logo storage to S3-compatible storage (Cloudflare R2 recommended — free tier) before Railway go-live
- This is a blocking issue for Pro users who have uploaded logos

**6. SiteGround cron job**
- SiteGround Site Tools → Cron Jobs runs cron.php hourly
- Railway does not have a built-in cron UI on the free tier
- Options: Railway cron service (paid), external cron (cron-job.org free), or GitHub Actions scheduled workflow
- Guard: set up replacement cron before switching DNS or scheduled scans will silently stop

**7. Sessions on Railway**
- PHP sessions currently use filesystem storage (default)
- On Railway with multiple replicas or redeploys, sessions stored on disk will be lost
- Guard: if Railway runs single instance, this is acceptable initially
- Long-term: migrate to database-backed sessions or Redis for robustness

**8. Secrets in config/ PHP files**
- config/db.php, config/stripe.php, config/google.php contain hardcoded secrets
- On Railway, secrets must be environment variables (not committed files)
- Refactor these files to use getenv() or $_ENV before Railway deploy
- Guard: never commit live secrets to a git repository

**9. CORS allowed origins**
- config/cors.php whitelist: typohero.com, www.typohero.com, localhost
- No change needed if domain stays the same
- Guard: during Railway testing under .up.railway.app URL, temporarily add that origin

**10. Stripe SDK (manually vendored)**
- vendor/stripe/stripe-php/ was manually uploaded to SiteGround
- Must be included in the Railway Docker build context
- Guard: include vendor/ in the Dockerfile COPY or add Composer to the build process

### Migration order (recommended)
1. Refactor config/ files to use environment variables (getenv)
2. Build and test Dockerfile locally (php:8.1-apache)
3. Deploy to Railway under .up.railway.app URL
4. Export MySQL from SiteGround → import into Railway MySQL
5. Test full auth, payment, and scan flows on Railway URL
6. Set up replacement cron job pointing at Railway URL
7. Update Stripe webhook URL to Railway test URL → verify webhook events
8. Decide on logo storage solution (Cloudflare R2 or similar)
9. Cut DNS over to Railway (update typohero.com DNS)
10. Update Stripe webhook URL to typohero.com
11. Verify Google OAuth still works (redirect URI unchanged)
12. Monitor Stripe webhook logs and session behavior for 24 hours
13. Decommission SiteGround after 1 week of stable operation

---

## 9. Current task context

- Current task: Migrate from SiteGround to Railway.app
- Why this matters: SiteGround shared hosting has limits on cron, file storage, and scalability; Railway provides more control and a better CI/CD story
- Relevant files: config/db.php, config/cors.php, config/stripe.php, config/google.php, api/scans/cron.php, api/auth/upload-logo.php, docs/schema.sql
- Known constraints: Live Stripe customers exist — zero-downtime migration required
- Known risks: File storage, cron replacement, and secrets refactor are all blocking before Railway go-live
