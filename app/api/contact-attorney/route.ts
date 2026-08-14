import { type NextRequest, NextResponse } from "next/server"
import { submitContactInquiry } from "@/lib/services/contact-service"
import { validateContact } from "@/lib/validation/contact"

/**
 * POST /api/contact-attorney
 *
 * Thin controller for the general website contact form. Validates the body,
 * then delegates email dispatch to the contact service. Email assembly and
 * the notification inbox live under `lib/services/` and `lib/config/site.ts`.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = validateContact(body)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    await submitContactInquiry(result.data)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Contact API Error:", error)

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
