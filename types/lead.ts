/**
 * Lead entities.
 *
 * `LeadInput` is the validated shape accepted by the lead-submission flow
 * (intake form -> /api/submit-lead). `LeadRecord` mirrors the row that is
 * inserted into the Supabase `leads` table (snake_case columns).
 */

/** Camel-cased payload posted by the intake form and validated server-side. */
export interface LeadInput {
  attorneyId: string
  zipCode: string
  county: string
  practiceArea: string
  fullName: string
  phone: string
  email: string
  legalIssue: string
}

/** Row shape inserted into the `leads` table. */
export interface LeadRecord {
  attorney_id: string
  zip_code: string
  practice_area: string
  full_name: string
  phone: string
  email: string
  legal_issue: string
}
