# Environment Setup

Do not commit real secrets. Add production values in Railway environment variables.

## Required for live quote delivery

- `RESEND_API_KEY` - Resend API key used by `/api/quote`.
- `QUOTE_TO_EMAIL` - inbox that receives quote requests.

## Optional form/email variables

- `QUOTE_FROM_EMAIL` - verified sender address. If omitted, the server uses Resend's onboarding sender, which should be replaced before production.

## Optional analytics variables

These are documented for launch planning only. The current site does not inject analytics scripts because no real IDs have been provided.

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID if this later becomes a Next.js site.
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID if used.
- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel ID if Facebook/Instagram ads are used.

For this current Node static site, equivalent public analytics IDs can be added as Railway variables when an analytics snippet is implemented.

## Example `.env.local`

```bash
PORT=3000
RESEND_API_KEY=replace_with_real_key
QUOTE_TO_EMAIL=quotes@example.com
QUOTE_FROM_EMAIL="Christmas Lights Ottawa <quotes@example.com>"

# Optional future analytics
GA_MEASUREMENT_ID=
GTM_ID=
META_PIXEL_ID=
```

## Commands

- Local dev: `npm run dev`
- Production start: `npm start`
- Build command: none required for the current static Node server.
- Deployment command: Railway should use `npm start`.
