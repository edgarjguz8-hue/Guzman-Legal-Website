import { Resend } from "resend"
import { siteConfig } from "@/lib/config/site"

/**
 * Shared email transport.
 *
 * Both the lead flow and the contact flow previously constructed their own
 * Resend client and inline `sendEmail` helper. This centralizes the transport
 * so the sending domain / from-address lives in one place (site config) and
 * every email path shares the same error handling.
 */

let resendClient: Resend | null = null

function getResend(): Resend {
  if (typeof window !== "undefined") {
    throw new Error("Email can only be sent from the server.")
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY!)
  }
  return resendClient
}

export type SendEmailParams = {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
  /** Overrides the default from-address (site config email.from). */
  from?: string
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
  from = siteConfig.email.sender,
}: SendEmailParams) {
  const resend = getResend()

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    html:
      html ||
      `<div style="font-family:Arial,sans-serif;white-space:pre-line">${text}</div>`,
    replyTo,
  })

  if (error) {
    console.error("Resend Error:", error)
    throw error
  }

  return data
}
