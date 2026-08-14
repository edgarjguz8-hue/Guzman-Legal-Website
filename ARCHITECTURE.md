# Architecture

This document describes how the Guzman Legal site is organized after the
architecture consolidation. Read it before adding features so new code lands in
the right layer.

## Layering

```
app/            Next.js App Router (routes only — thin)
  api/*         Route handlers: parse request -> validate -> call service -> shape response
  **/page.tsx   Server/Client pages: render + call services (no inline data access)

components/      Presentational + client components
contexts/        React context (i18n)

lib/
  config/        Brand + business configuration (single source of truth)
  supabase/      Centralized Supabase client factories
  seo/           One SEO system: taxonomy, URLs, entities, metadata
  services/      Business logic + all data access (server-side)
  validation/    Input validation (dependency-free)

types/           Shared domain types (single source of truth)
```

### The golden rule

**Routes and components never talk to Supabase or Resend directly.**
They call a service in `lib/services`. Services own data access, business
rules, and side effects (email). This keeps route handlers to a few lines and
makes the data layer testable and reusable.

## Configuration: `lib/config/site.ts`

`siteConfig` is the single source of truth for brand name, canonical URL,
Open Graph metadata, logo, email sender/inbox, region, and languages. Never
hardcode any of these values elsewhere — import `siteConfig`.

> **Known branding conflict:** the UI is branded "Guzman Legal" while the
> canonical domain (`attorneyabogado.com`), OG logo asset, and the Resend
> sending domain (`networkingleads.com`) are legacy AttorneyAbogado values that
> are currently live. These are flagged in `site.ts` and left unchanged because
> changing them affects SEO canonicalization and email deliverability. They
> require an explicit owner decision.

## Supabase: `lib/supabase/`

Three factories, each with a clear purpose:

- `client.ts` -> `getSupabaseBrowserClient()` / `tryGetSupabaseBrowserClient()`
  Anon key. For Client Components. The `try*` variant returns `null` instead of
  throwing so components can degrade gracefully when env vars are missing.
- `server.ts` -> `getSupabaseServerClient()`
  Anon key, server-side. For server reads of publicly-readable data (e.g.
  published articles). Cached singleton.
- `server.ts` -> `getSupabaseAdminClient()`
  Service-role key, server-only (throws if called in the browser). For
  privileged writes such as inserting leads.

Never call `createClient` inline in a route or component again.

### Data model (as used by the app)

- `zip_counties` — maps `zip_code` -> `county`
- `attorneys` — `id, name, firm_name, category, county, phone, email, website,
  description, spanish_speaking, approved`
- `leads` — inbound lead submissions
- `articles` — marketing content (`published`, `featured`, bilingual columns)

## SEO: `lib/seo/`

Previously there were **two** competing SEO datasets with different practice
areas/locations, and the sitemap generated URLs (`/{slug}`) that did not match
the actual route (`/seo/{slug}`). This is now one system:

- `taxonomy.ts` — the single list of practice areas, cities, and counties.
- `urls.ts` — canonical URL helpers (`seoPagePath`, `seoPageUrl`, `absoluteUrl`,
  `SEO_BASE_PATH`). **Every** SEO URL (route links, sitemap, canonical tags)
  comes from here, so the route and sitemap can never drift apart again.
- `entities.ts` — slug parsing/generation, content generators (H1, meta,
  intro), and related-entity resolution.
- `metadata.ts` — builds Next.js `Metadata` from a parsed slug + `siteConfig`.

Programmatic SEO pages render at `app/seo/[slug]/page.tsx`. The sitemap enumerates
them via `generateAllSeoSlugs()`.

## Services: `lib/services/`

- `attorney-service.ts` — ZIP -> county -> approved attorneys match flow.
- `lead-service.ts` — validates match, inserts the lead (admin client), and
  sends both the client confirmation and attorney notification emails.
- `contact-service.ts` — sends the contact-form notification.
- `article-service.ts` — published article reads (detail + listing).
- `email/` — Resend transport (`send.ts`) plus verbatim HTML/text templates
  (`lead-templates.ts`, `contact-templates.ts`).

## Validation: `lib/validation/`

Dependency-free validators (no schema library added). Each returns a discriminated
result: `{ success: true, data }` or `{ success: false, error }`. Route handlers
check `result.success` and return a `400` with `result.error` on failure.

- `shared.ts` — primitives (required strings, email, phone, trimming).
- `find-attorney.ts`, `lead.ts`, `contact.ts` — per-endpoint input rules.

## Request lifecycle example (`POST /api/submit-lead`)

1. Route handler parses JSON.
2. `validateLead(body)` — returns `400` on failure.
3. `submitLead(data)` service:
   - re-resolves the attorney (never trusts client-supplied attorney data),
   - inserts the lead with the admin client,
   - sends confirmation + notification emails.
4. Handler returns the service result as JSON.
