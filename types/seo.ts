import type { PracticeArea } from "./practice-area"
import type { Location } from "./location"

/**
 * A resolved SEO page ("SEO entity").
 *
 * Conceptually: PracticeArea + Location (+ language) => SeoEntity. Every SEO
 * page has exactly one canonical URL produced by `lib/seo/urls.ts`. Content
 * fields (title/description/h1/intro) are generated centrally in
 * `lib/seo/entities.ts` so no component hardcodes them.
 */
export interface SeoEntity {
  /** URL slug, e.g. "car-accident-lawyer-tampa" (without the /seo/ prefix). */
  slug: string
  practiceArea: PracticeArea
  /** Present when the location is a city. */
  location: Location | null
  /** Present when the location is a county. */
  county: Location | null
  title: string
  description: string
  h1: string
  intro: string
  /** Absolute canonical URL. */
  canonical: string
  /** BCP-47 language code for this page. */
  language: "en" | "es"
  /** Whether the page should be indexed by search engines. */
  indexable: boolean
}

/** Minimal parsed result of a slug lookup. */
export interface ParsedSeoSlug {
  practiceArea: PracticeArea
  location: Location | null
  county: Location | null
}
