# Deployment Checklist

## Hosting

- Platform: Railway-ready Node static server.
- Build command: none required.
- Start command: `npm start`
- Local dev command: `npm run dev`
- Runtime: Node 20 or newer.

## Environment variables

- `PORT` is read by `server.js` and supplied by Railway in production.
- No other environment variables are currently required.

## Form backend

- Quote forms are front-end ready but not connected to email delivery, a CRM, or a production form backend.
- See `FORM-WIRING.md` for the required fields, suggested email subject, validation, honeypot, and spam-protection plan.

## Assets needed before launch

- Final logo and favicon.
- Real installation photos focused on lower-level decorating.
- Verified client testimonials.
- Confirmed business claims such as insurance, years in business, warranties, product ownership, and service response policy.

## SEO and indexing

- `server.js` serves `/robots.txt` and `/sitemap.xml`.
- Homepage, quote page, blog index, blog posts, and service-area pages are included in the sitemap.
- Canonical URLs use `https://christmaslightsottawa.com`.

## Known launch blockers

- Form backend is not live.
- Real gallery assets and approved testimonials are still needed.
- Email and physical address should not be shown until confirmed by the client.
