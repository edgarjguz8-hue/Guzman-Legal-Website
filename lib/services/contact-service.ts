import { sendEmail } from "@/lib/services/email/send"
import {
  contactNotificationEmail,
  contactConfirmationEmail,
} from "@/lib/services/email/contact-templates"
import { siteConfig } from "@/lib/config/site"
import type { ContactInput } from "@/types"

/**
 * Contact service: dispatches the inbox notification and the sender
 * confirmation for a general website inquiry.
 *
 * Consolidates the logic previously inline in
 * `app/api/contact-attorney/route.ts`. The notification inbox now comes from
 * site config (previously a hardcoded constant in the route).
 */
export async function submitContactInquiry(
  input: ContactInput,
): Promise<void> {
  await sendEmail(contactNotificationEmail(input, siteConfig.email.inbox))
  await sendEmail(contactConfirmationEmail(input))
}
