# Quote Form Wiring Notes

The quote form now posts to `/api/quote` on the Node server. The endpoint validates the request, checks a honeypot field, applies basic IP rate limiting, and sends through Resend when the required environment variables are configured.

If the email environment variables are missing, the endpoint returns an honest error and does not show a fake success message.

## Fields to submit

- Full Name
- Email
- Phone
- Property Address
- Property Type
- Services Interested In
- Preferred Contact Method
- Project Details
- Photo Upload
- Consent confirmation
- Honeypot field named `website`

## Email details

Email subject:

`New Christmas Lights Ottawa Quote Request`

The email body should be plain and readable, grouped by contact details, property details, selected services, project notes, and uploaded photo links or attachments.

Current upload handling sends uploaded file names only. Full file attachments or hosted upload links still need a storage/email strategy if the client wants actual photo delivery through the form.

## Spam protection plan

- Keep the hidden honeypot field and reject submissions when it is filled. Done.
- Add server-side validation for required fields, email format, at least one selected service, and consent. Done.
- Add basic rate limiting by IP address or session. Done.
- Add Cloudflare Turnstile or reCAPTCHA only if spam becomes an issue.
- Use a production email or form service such as SMTP, SendGrid, Resend, Mailgun, Railway-compatible API endpoint, or an existing WordPress form plugin if the live site already depends on one. Current implementation supports Resend.

## Current status

The endpoint is ready for Resend. Add `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, and optionally `QUOTE_FROM_EMAIL` in Railway before expecting live delivery.
