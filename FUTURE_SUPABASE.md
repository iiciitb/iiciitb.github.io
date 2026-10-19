# FUTURE_SUPABASE.md — parked design

**Status:** Not part of the current deployment. Deferred pending Computer Centre evaluation, per Sagar's email of 14 May.

This document describes a possible future admin panel for the IIC IIT Bombay website. It is parked here for two reasons:

1. So that the future direction is visible to anyone reading the repo.
2. So that the design work done earlier is not lost if the Computer Centre later evaluates and approves the approach.

**Nothing in this document is currently deployed.** The website as it stands is a pure static site with no admin features, no login, no external services. Content is updated by editing HTML and pushing to GitLab.

## What the future admin panel would do

If approved, the admin panel would let council members update content (council members, events, calendar PDFs, resources, initiatives) through a logged-in web interface instead of editing HTML directly. The static front-end stays the same; a small admin sub-tree (`/admin`) is added.

## Proposed architecture (parked)

- **Frontend:** the same static HTML/CSS/JS, with an additional `admin.html` page behind a login.
- **Backend:** [Supabase](https://supabase.com), a managed external service that provides:
  - Authentication (bcrypt-hashed passwords, JWT sessions)
  - PostgreSQL database with Row Level Security
  - File storage for council photos and calendar PDFs
- **Auth model:** single shared admin account at `iic@iitb.ac.in`, strong generated password, 2FA via TOTP, rotated on every council handover.
- **Network flow:** the static site lives on IIT Bombay hosting; the browser communicates directly with Supabase over HTTPS for admin actions. No backend code runs on IIT Bombay infrastructure.

## Open question (from Sagar's email of 14 May)

> *"Regarding the proposed use of Supabase for administrative features, we will need to evaluate and test this setup before confirming its suitability. At present, our network and security infrastructure generally restricts the use of external services unless they are properly validated and approved through the server-side infrastructure and security review process."*

The Computer Centre will evaluate Supabase separately. If they do not approve it, the design here is shelved and content stays in the GitLab workflow.

## Database schema sketch (parked)

If Supabase is approved, the tables we would need:

- `council_members` (academic_year, type, name, designation, linkedin, photo_url)
- `initiatives` (title, description, status, image_url, link_url)
- `events` (date, title, organiser, mic_category, description, link)
- `mic_calendars` (academic_year, pdf_url)
- `resources` (title, description, type, link_url)
- `ecosystem_bodies` (name, abbreviation, tagline, description, website_url)
- `audit_log` (action, table, row_id, old_values, new_values, performed_at)

All public tables would have Row Level Security: anonymous role can `SELECT`, only the `admin` role can `INSERT` / `UPDATE` / `DELETE`.

## Why we parked this

The Computer Centre uses a GitLab-driven static deployment flow today. For a 10-page IIC site that changes a handful of times a year, editing HTML in a Git repository is simpler than introducing a new external service. The Supabase architecture is only worth the security review if the editing volume grows past what's comfortable in Git.
