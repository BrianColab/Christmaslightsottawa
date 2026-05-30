# Quote Form Wiring Notes

The quote form is front-end ready, but it is not connected to email delivery, a CRM, or a production form backend yet.

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

Suggested subject:

`New Christmas Lights Ottawa Quote Request`

The email body should be plain and readable, grouped by contact details, property details, selected services, project notes, and uploaded photo links or attachments.

## Spam protection plan

- Keep the hidden honeypot field and reject submissions when it is filled.
- Add server-side validation for required fields, email format, at least one selected service, and consent.
- Add basic rate limiting by IP address or session.
- Add Cloudflare Turnstile or reCAPTCHA only if spam becomes an issue.
- Use a production email or form service such as SMTP, SendGrid, Resend, Mailgun, Railway-compatible API endpoint, or an existing WordPress form plugin if the live site already depends on one.

## Current status

The current JavaScript prevents fake success messages. After a valid front-end submission, it tells the user that online submission still needs backend wiring.
