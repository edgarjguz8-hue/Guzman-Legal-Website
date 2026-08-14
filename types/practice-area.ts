/**
 * A legal practice area used for SEO taxonomy and attorney categorization.
 * `name` is the human-readable label (also used as the attorney `category`
 * value sent to the matching API); `slug` is the URL-safe identifier.
 */
export interface PracticeArea {
  name: string
  slug: string
}
