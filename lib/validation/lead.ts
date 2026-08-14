import type { LeadInput } from "@/types/lead"
import { type ValidationResult, ok, fail, isNonEmpty, isEmail, isPhone, toStr } from "./shared"

/**
 * Validate the /api/submit-lead request body (posted by the intake form).
 *
 * Preserves the original required-field set (attorneyId, zipCode, practiceArea,
 * fullName, phone, email, legalIssue); `county` is optional passthrough. Adds
 * permissive email/phone format checks so malformed contact details fail fast
 * with a clear 400 instead of surfacing later as an email-send 500.
 */
export function validateLead(body: unknown): ValidationResult<LeadInput> {
  const data = (body ?? {}) as Record<string, unknown>

  const required = [
    "attorneyId",
    "zipCode",
    "practiceArea",
    "fullName",
    "phone",
    "email",
    "legalIssue",
  ]

  for (const field of required) {
    if (!isNonEmpty(data[field])) {
      return fail("Missing required fields")
    }
  }

  if (!isEmail(data.email)) return fail("A valid email address is required")
  if (!isPhone(data.phone)) return fail("A valid phone number is required")

  return ok({
    attorneyId: toStr(data.attorneyId),
    zipCode: toStr(data.zipCode),
    county: toStr(data.county),
    practiceArea: toStr(data.practiceArea),
    fullName: toStr(data.fullName),
    phone: toStr(data.phone),
    email: toStr(data.email),
    legalIssue: toStr(data.legalIssue),
  })
}
