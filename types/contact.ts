/**
 * Contact inquiry payload.
 *
 * Validated shape accepted by the general website contact form
 * (contact page -> /api/contact-attorney).
 */
export interface ContactInput {
  name: string
  email: string
  phone: string
  legalIssue: string
}
