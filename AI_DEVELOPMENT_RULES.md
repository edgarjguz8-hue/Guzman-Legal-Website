# AI Development Rules

Rules for any AI agent (or human) making changes to this codebase. These exist
to preserve the architecture described in `ARCHITECTURE.md`. Read that first.

## Non-negotiables

1. **No inline data access.** Never call `createClient` from
   `@supabase/supabase-js` in a route or component. Use the factories in
   `lib/supabase/` (`getSupabaseBrowserClient` / `tryGetSupabaseBrowserClient`
   for the browser, `getSupabaseServerClient` for server reads,
   `getSupabaseAdminClient` for privileged writes).

2. **Business logic lives in `lib/services`.** Route handlers and pages stay
   thin: parse -> validate -> call a service -> shape the response. If you are
   writing a Supabase query or a Resend call inside `app/`, stop and move it to
   a service.

3. **One SEO system.** All practice areas, cities, and counties come from
   `lib/seo/taxonomy.ts`. All SEO URLs come from `lib/seo/urls.ts`. Do not
   hardcode `/seo/...` paths or reintroduce a second dataset. If the route path
   changes, change it once in `SEO_BASE_PATH`.

4. **One config.** Brand name, canonical URL, logo, email addresses, region,
   and languages come from `lib/config/site.ts`. Never hardcode them.

5. **One set of domain types.** Import from `@/types`. Do not redeclare
   `Attorney`, `Lead`, `Article`, etc. locally.

6. **Validate all external input.** Every route handler validates its body with
   a validator from `lib/validation` and returns `400` with the error message on
   failure. Services must not trust client-supplied data (e.g. re-resolve the
   attorney server-side before inserting a lead).

## Preservation constraints

- **Do not add dependencies** without explicit approval. Validation is
  intentionally dependency-free.
- **Do not change visual design, copy, or behavior** during a refactor. This
  round was structure-only.
- **Do not change these flagged values** without owner sign-off (see the header
  comment in `lib/config/site.ts`): `siteConfig.url`, `siteConfig.email.sender`,
  `siteConfig.logoUrl`. They affect SEO canonicalization and email
  deliverability.
- **Email templates are ported verbatim.** If you edit
  `lib/services/email/*-templates.ts`, you are changing what recipients see —
  do so deliberately.

## Where things go

| I want to...                        | Put it in / use...                          |
|-------------------------------------|---------------------------------------------|
| Read/write the database             | a service in `lib/services` + a `lib/supabase` client |
| Add a new API endpoint              | `app/api/<name>/route.ts` (thin) + service + validator |
| Add/adjust an SEO practice area/city| `lib/seo/taxonomy.ts`                        |
| Build an SEO URL                    | `lib/seo/urls.ts` helpers                    |
| Add a shared type                   | `types/` + re-export from `types/index.ts`   |
| Reference the brand/domain/email    | `lib/config/site.ts` (`siteConfig`)          |
| Validate request input              | `lib/validation/`                            |
| Send an email                       | `lib/services/email`                         |

## Before you finish

- `npx tsc --noEmit` passes.
- No new inline `createClient` calls (`grep -r "createClient" app components`).
- No hardcoded brand strings, email addresses, or `/seo/` paths.
- New URLs go through the `lib/seo/urls.ts` helpers so the sitemap and canonical
  tags stay in sync.
