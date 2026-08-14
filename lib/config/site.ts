/**
 * Single source of truth for brand and business configuration.
 *
 * ---------------------------------------------------------------------------
 * Public identity configuration for Guzman Legal.
 *
 * Canonical URLs and public contact details are centralized here so metadata,
 * sitemap generation, transactional email, and contact surfaces stay aligned.
 * ---------------------------------------------------------------------------
 */
export const siteConfig = {
  /** Display brand name used across UI and transactional email. */
  name: "Guzman Legal",

  /** Canonical origin used for absolute URLs, sitemap, and OG metadata. */
  url: "https://guzmanlegal.com",

  description:
    "Guzman Legal connects individuals, families, and businesses throughout Tampa Bay with experienced attorneys. Free consultation available. Hablamos Español.",

  /** Open Graph / Twitter site name. */
  ogSiteName: "Guzman Legal",

  /** Absolute URL of the logo used in transactional email. */
  get logoUrl() {
    return `${this.url}/aa-logo.jpg`
  },

  email: {
    /** Resend "from" address and inbox for public Guzman Legal inquiries. */
    sender: "info@guzmanlegal.com",
    inbox: "info@guzmanlegal.com",
  },

  /** Supported UI languages. English is the default. */
  languages: ["en", "es"] as const,
  defaultLanguage: "en" as const,

  region: "Tampa Bay, Florida",
} as const

export type SupportedLanguage = (typeof siteConfig.languages)[number]
