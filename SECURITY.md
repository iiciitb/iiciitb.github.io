# SECURITY.md — IIC IIT Bombay Website

This document records the security posture of the IIC IIT Bombay website. The site will be linked from the IIT Bombay homepage, which makes it a high-value target. Every commitment below treats that as a load-bearing assumption.

## 1. Architecture

A **pure static website**: HTML, CSS, vanilla JavaScript, and image assets. No backend, no database, no authentication service, no external API calls.

Content is managed by editing files in this repository and pushing through `gitlab.iitb.ac.in`. The Computer Centre fetches updates and re-deploys, per the workflow Sagar described over email. There is no admin panel, no sign-up flow, and no login form on the deployed site.

## 2. No external services

The deployed site makes **no outbound API calls or script loads**. The only external URLs are public hyperlinks in the body content (SINE, Aspire, IRCC, DSSE, BETIC, E-Cell, KAPILA, YUKTI, SIH, HULT Prize, Instagram, LinkedIn). These open in a new tab only when a visitor clicks them.

There is no analytics, no Google Fonts CDN, no jQuery CDN, no chat widget, no embedded video, no embedded form service.

## 3. Form handling

The two public forms (`help.html`, `contact.html`) use `mailto:iic@iitb.ac.in`. On submit, the user's email client opens with a pre-filled body. The user clicks Send in their own client.

No data leaves the visitor's machine through the website. No backend ever receives form input. No request is made to any URL on submit.

## 4. HTTP security headers (set by `nginx.conf`)

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()` |
| `Server` | hidden (`server_tokens off`) |

(If the Computer Centre's GitLab-based deployment uses a different nginx config, these headers can be applied at the server level instead.)

## 5. JavaScript

A single file at `assets/js/main.js`, plus zero inline `<script>` blocks except for a small footer-year fallback on each page (now removed in favour of `data-current-year`).

`main.js` does only the following:
- Toggles the mobile hamburger menu
- Marks the current nav item as `aria-current="page"`
- Updates the dynamic copyright year in the footer
- Applies a reveal-on-scroll animation
- Handles the Help and Contact form submissions via `mailto:`

There are no fetches, no XHR calls, no WebSocket connections, no `eval`, no `Function()` constructors, no JSON-from-string parsing of user data.

## 6. Input handling

The only user inputs are the Help and Contact form fields, which are passed straight into a `mailto:` URL via `encodeURIComponent`. No values are reflected into the DOM via `innerHTML`. No values are sent to a server.

## 7. Images

Three brand images live in `assets/img/`:
- `IIC-logo.png` (official IIC logo)
- `IIC-Weightage.png` (MIC evaluation framework infographic)
- `IIC-Certificate-2023-24.png` (MoE certificate of recognition)

No EXIF metadata of significance; all served from `'self'` origin only.

## 8. Routine maintenance

| Task | Cadence | Owner |
|---|---|---|
| Lighthouse + Mozilla Observatory scan | Quarterly | Development lead |
| Review CSP and Permissions-Policy for any new content additions | On every PR | Reviewer |
| Audit `assets/js/main.js` for any added fetches or external calls | On every PR | Reviewer |

## 9. What is explicitly NOT in scope

- **Authentication or sessions.** There is no login on the deployed site.
- **Server-side code.** None runs on IIT Bombay infrastructure.
- **External services.** Nothing is loaded from a CDN; nothing is fetched from any third-party API.
- **User accounts.** There is no public sign-up. The word "signup" does not appear anywhere in the site.
- **File uploads from visitors.** None.

## 10. Future considerations

The `FUTURE_SUPABASE.md` document describes a possible future enhancement that would add a small admin panel (login + database + file storage) via Supabase, a managed external service. That is **not deployed today** and is **not part of this submission**. It is included in the repo only so the future direction is visible. If the Computer Centre evaluates and approves Supabase later, the admin panel would be added in a separate, clearly-scoped change.
