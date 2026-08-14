/**
 * Geographic entities used for SEO taxonomy.
 *
 * `Location` covers both cities and counties (they share the same shape). The
 * `county` field is optional metadata available for cities. Note: the live
 * attorney-matching flow resolves a ZIP to a county via the `zip_counties`
 * table — these entries drive SEO pages and internal linking, not matching.
 */
export interface Location {
  name: string
  slug: string
  /** Parent county label for a city (optional). */
  county?: string
}
