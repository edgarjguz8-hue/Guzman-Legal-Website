/**
 * Single source of truth for brand and business configuration.
 *
 * ---------------------------------------------------------------------------
 * KNOWN BRANDING CONFLICT (requires a human decision):
 *
 * The codebase mixes two brands:
 *   - "Guzman Legal"      -> current UI, contact form, and this config
 *   - "AttorneyAbogado"   -> legacy canonical domain, OG siteName, logo asset,
 *                            and (previously) the lead-notification emails
 *
 * The following values reflect what is CURRENTLY LIVE in production and were
 * intentionally left unchanged so that canonical URLs, the sitemap, and email
 * deliverability do not silently break. They are flagged so the owner can
 * confirm the intended brand/domain deliberately:
 *
 *   - `url`          -> https://attorneyabogado.com   (drives canonical + sitemap)
 *   - `email.sender` -> info@networkingleads.com       (verified Resend domain)
 *   - `logoUrl`      -> {url}/aa-logo.jpg              (legacy asset filename)
 *
 * Changing `url` changes every canonical/sitemap URL (a real SEO decision).
 * Changing `email.sender` requires a verified domain in Resend.
 * Do NOT change these without explicit approval — see ARCHITECTURE.md.
 * ---------------------------------------------------------------------------
 */
export const siteConfig = {
  /** Display brand name used across UI and transactional email. */
  name: "Guzman Legal",

  /**
   * Canonical origin used for absolute URLs (canonical tags, sitemap, OG).
   * FLAGGED: legacy AttorneyAbogado domain still in production.
   */
  url: "https://attorneyabogado.com",

  description:
    "Guzman Legal connects individuals, families, and businesses throughout Tampa Bay with experienced attorneys. Free consultation available. Hablamos Español.",

  /** Open Graph / Twitter site name. */
  ogSiteName: "Guzman Legal",

  /** Absolute URL of the logo used in transactional email. */
  get logoUrl() {
    return `${this.url}/aa-logo.jpg`
  },

  email: {
    /**
     * Resend "from" address. Must be on a domain verified in Resend.
     * FLAGGED: uses networkingleads.com, not the brand/canonical domain.
     */
    sender: "info@networkingleads.com",
    /** Inbox that receives contact/lead notifications. */
    inbox: "info@networkingleads.com",
  },

  /** Supported UI languages. English is the default. */
  languages: ["en", "es"] as const,
  defaultLanguage: "en" as const,

  region: "Tampa Bay, Florida",
} as const

export type SupportedLanguage = (typeof siteConfig.languages)[number]
