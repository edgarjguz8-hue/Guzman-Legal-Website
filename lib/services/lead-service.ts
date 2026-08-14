import { getSupabaseAdminClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/services/email/send"
import {
  attorneyLeadEmail,
  clientConfirmationEmail,
} from "@/lib/services/email/lead-templates"
import type { LeadInput, LeadRecord } from "@/types"

/**
 * Lead service: persists a submitted lead and dispatches notification +
 * confirmation emails.
 *
 * Consolidates the logic previously inline in `app/api/submit-lead/route.ts`.
 * Behavior is preserved: attorney existence is verified first (404 semantics
 * surface via `AttorneyNotFoundError`), the lead row is inserted with the same
 * column mapping, then the attorney is notified (only if they have an email)
 * and the client always receives a confirmation.
 */

export class AttorneyNotFoundError extends Error {
  constructor() {
    super("Attorney not found")
    this.name = "AttorneyNotFoundError"
  }
}

export class LeadPersistError extends Error {
  constructor() {
    super("Failed to save lead")
    this.name = "LeadPersistError"
  }
}

export async function createLead(input: LeadInput): Promise<LeadRecord[]> {
  const supabase = getSupabaseAdminClient()

  const { data: attorneyData, error: attorneyError } = await supabase
    .from("attorneys")
    .select("*")
    .eq("id", input.attorneyId)
    .single()

  if (attorneyError || !attorneyData) {
    console.error("Attorney lookup error:", attorneyError)
    throw new AttorneyNotFoundError()
  }

  const { data: leadData, error: leadError } = await supabase
    .from("leads")
    .insert([
      {
        attorney_id: input.attorneyId,
        zip_code: input.zipCode,
        practice_area: input.practiceArea,
        full_name: input.fullName,
        phone: input.phone,
        email: input.email,
        legal_issue: input.legalIssue,
      },
    ])
    .select()

  if (leadError) {
    console.error("Supabase Error:", leadError)
    throw new LeadPersistError()
  }

  const firmName = attorneyData.firm_name || attorneyData.name

  const emailInput = {
    attorneyEmail: attorneyData.email,
    firmName,
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    practiceArea: input.practiceArea,
    zipCode: input.zipCode,
    county: input.county ?? "",
    legalIssue: input.legalIssue,
  }

  // Branded notification email sent to the attorney (only if they have one).
  if (attorneyData.email) {
    await sendEmail(attorneyLeadEmail(emailInput))
  }

  // Confirmation email always sent to the client.
  await sendEmail(clientConfirmationEmail(emailInput))

  return (leadData as LeadRecord[]) ?? []
}
