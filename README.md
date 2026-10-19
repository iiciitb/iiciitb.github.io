# IIC IIT Bombay — Official Website

The official website of the **Institution's Innovation Council at IIT Bombay**, prepared for deployment at **https://iic.iitb.ac.in** through the IIT Bombay Computer Centre's GitLab-based workflow.

- **Owner:** IIC IIT Bombay
- **Vice President:** Prof. Sankalp Pratap
- **President:** Prof. Milind Atrey (Deputy Director - Academic Research and Translation)
- **Powered by:** Desai Sethi School of Entrepreneurship (DSSE), IIT Bombay
- **Registration:** IC201810679 on the MIC portal
- **Contact:** iic@iitb.ac.in

---

## For the Computer Centre reviewer

This repository is a **pure static website**. No backend, no database, no external service calls, no build step, no runtime dependencies. It can be served by nginx or any plain static file host.

**To preview locally:**

```bash
cd iic-website
python3 -m http.server 8080
# Then visit http://localhost:8080
```

Or simply open `index.html` in a browser.

**What is in this repo:**

- 12 HTML files — 8 content pages, a custom 404, 2 redirect stubs, and 1 unused development file (see the tables below)
- A single design-system stylesheet (`assets/css/main.css`)
- A small vanilla JavaScript file (`assets/js/main.js`) for the mobile menu, scroll reveals, the dynamic copyright year, and the `mailto:` form handler
- Brand and content images in `assets/img/`, including member photographs in `assets/img/council/`
- Two PDFs in `assets/docs/` — the MIC academic calendar and an IIC research report
- `nginx.conf` with full security headers (CSP, HSTS, X-Frame-Options DENY, etc.) — kept here for reference; not required for the GitLab deployment workflow
- `Dockerfile` — kept for reference only; not required for the GitLab workflow
- `SECURITY.md` — security posture for the static site
- `FUTURE_SUPABASE.md` — a parked design document for a possible future admin panel. Not deployed, not referenced by any page.

**No external services are contacted by the site as deployed.** The only outbound URLs in the HTML are: the IIT Bombay Research Park (`iitbresearchpark.com`), SINE (`sineiitb.org`), IRCC, DSSE, BETIC, E-Cell, KAPILA, YUKTI, SIH, HULT Prize, Unstop, Instagram, LinkedIn — all visited only when a user explicitly clicks a public hyperlink.

**Content updates:** the council updates content by editing HTML files in this repo and pushing to GitLab. The Computer Centre fetches and re-deploys, as Sagar described over email. **The deployed site has no login, no sign-up, no sessions, no cookies and no content management system.** The file named `admin.html` is not an admin page — it is a three-line redirect to `index.html`, left over from an earlier structure. It contains no form, no password field and no script beyond the redirect itself.

---

## Pages

### Content pages

| File | Purpose |
|------|---------|
| `index.html` | Home — what IIC does, ecosystem connector visual, council preview |
| `about.html` | About IIC — MoE certificate, MIC evaluation framework, star-rating journey, calendar process, self-driven activities, celebration activities, Prof. Atrey's reasoning, IIC vs other bodies |
| `council.html` | Faculty Council, Student Council 2026-27 with member photographs, and an archive of past student councils |
| `initiatives.html` | National programmes (HULT Prize, SIH, KAPILA, YUKTI), then the council's own initiatives in three groups: on campus, tools being built, and outreach beyond campus |
| `events.html` | Open competitions, the events IIC runs each year, and the MIC academic calendar |
| `ecosystem.html` | SINE, Aspire, BETIC, DSSE, Maker Space, Tinkerers' Laboratory, E-Cell |
| `resources.html` | The Resource Vault — a searchable directory of funding, competitions, incubation, mentorship, prototyping and IP support, split between on-campus and national |
| `help.html` | Student help request form — submission opens a pre-filled email to `iic@iitb.ac.in` |
| `404.html` | Custom not-found page |

### Redirect stubs

Plain HTML redirects kept so that guessed or bookmarked URLs land somewhere useful instead of on the 404 page. Neither contains a form, a login, or any content of its own — each is a `meta refresh` plus a one-line `location.replace()`.

| File | Redirects to | Why it exists |
|------|--------------|---------------|
| `contact.html` | `help.html` | Contact details and the message form were merged into Get Help |
| `admin.html` | `index.html` | Left over from an earlier structure; despite the filename there is no admin page, and never was one on the deployed site |

### Not part of the public site

| File | Status |
|------|--------|
| `resources-1.html` | An alternative layout of the Resource Vault, kept during development. Not linked from any page. Safe to delete before deployment. |

## Project structure

```
iic-website/
├── README.md                  (this file)
├── SECURITY.md
├── FUTURE_SUPABASE.md         (parked; not deployed)
├── Dockerfile                 (reference only)
├── nginx.conf                 (reference only)
├── *.html                     (12 files, see tables above)
├── assets/
│   ├── css/main.css           (one stylesheet)
│   ├── js/main.js             (one JavaScript file)
│   ├── docs/                  (MIC academic calendar, IIC research report)
│   └── img/                   (IIC logo, MIC weightage pyramid, MoE certificate,
│       └── council/            and council member photographs)
├── .gitignore
└── .dockerignore
```

## Form handling

The site has **one** public form, on `help.html`. It does not POST to any server. On submit it opens the visitor's email client with a pre-filled message to `iic@iitb.ac.in`, and the visitor clicks Send in their own client. No JavaScript fetches any URL, and no data leaves the visitor's machine until they explicitly send that email.

## Security

A full breakdown is in `SECURITY.md`. The static site ships with:

- No third-party scripts, no external CDNs, no analytics, no tracking
- Self-hosted assets only
- Strict CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy denying all unused features (see `nginx.conf`)
- No inline event handlers
- Custom 404 with no stack disclosure
- `server_tokens off`

## Credits

- **President, IIC IIT Bombay:** Prof. Milind Atrey, Deputy Director (Academic Research and Translation)
- **Vice President, IIC IIT Bombay:** Prof. Sankalp Pratap (DSSE)
- **Convener, IIC IIT Bombay:** Prof. Ramesh Kuruva (DSSE)
- **Institute Secretary 2026-27:** Abhiraj Patel
- **Institute Secretaries 2025-26:** Prakhar Agrahari, Samyak Pahade
- **Development:** Mahima Singh (Web Manager, IIC Student Council 2025-26)