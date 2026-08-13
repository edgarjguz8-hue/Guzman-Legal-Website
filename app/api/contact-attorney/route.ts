import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

// Guzman Legal notification inbox. Uses the same verified sending domain
// (networkingleads.com) already configured for the existing lead system.
const CONTACT_INBOX = "info@networkingleads.com"

async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}) {
  const { data, error } = await resend.emails.send({
    from: "Guzman Legal <info@networkingleads.com>",
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, legalIssue } = body

    if (!name || !email || !phone || !legalIssue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const firstName = String(name).trim().split(" ")[0]
    const formattedLegalIssue = String(legalIssue).replace(/\n/g, "<br>")

    // Notification email sent to Guzman Legal
    await sendEmail({
      to: CONTACT_INBOX,
      subject: `New Inquiry - ${name}`,
      replyTo: email,
      text: `
New Inquiry Received

Name:
${name}

Phone:
${phone}

Email:
${email}

How can we help:
${legalIssue}
`,
      html: `
<div style="margin:0;padding:42px 20px;background:#f4f7fc;font-family:Arial,Helvetica,sans-serif;color:#061733;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:22px;padding:42px 34px;border:1px solid #e5eaf2;box-shadow:0 12px 30px rgba(6,23,51,0.08);">

    <div style="text-align:center;">
      <p style="font-size:13px;letter-spacing:1.4px;text-transform:uppercase;color:#0b6fff;font-weight:800;margin:0 0 12px;">
        New Inquiry
      </p>

      <h1 style="margin:0;color:#061733;font-size:34px;font-weight:800;line-height:1.15;">
        Guzman Legal
      </h1>

      <div style="width:70px;height:4px;background:#0b6fff;margin:18px auto 24px;border-radius:999px;"></div>

      <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 30px;">
        A potential client submitted an inquiry through the Guzman Legal website.
      </p>
    </div>

    <div style="background:#f8fbff;border:1px solid #dbe3ef;border-radius:18px;padding:28px 26px;margin:0 0 28px;">

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">Name</p>
      <p style="font-size:18px;color:#061733;font-weight:700;margin:0 0 20px;">${name}</p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">Phone</p>
      <p style="font-size:17px;font-weight:700;margin:0 0 20px;">
        <a href="tel:${phone}" style="color:#0b6fff;text-decoration:none;">${phone}</a>
      </p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">Email</p>
      <p style="font-size:17px;font-weight:700;margin:0 0 20px;word-break:break-word;">
        <a href="mailto:${email}" style="color:#0b6fff;text-decoration:none;">${email}</a>
      </p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 8px;">How can we help</p>
      <p style="font-size:16px;color:#061733;line-height:1.7;margin:0;">${formattedLegalIssue}</p>

    </div>

    <div style="text-align:center;">
      <p style="font-size:15px;color:#475569;line-height:1.6;margin:0;">
        Please reach out to this potential client as soon as possible.
      </p>
    </div>

  </div>
</div>
`,
    })

    // Confirmation email sent to the person who submitted the form
    await sendEmail({
      to: email,
      subject: "We received your inquiry - Guzman Legal",
      text: `
Thank you, ${firstName}!

We've received your inquiry and someone from Guzman Legal will contact you shortly.

Thank you for reaching out to Guzman Legal.
`,
      html: `
<div style="margin:0;padding:42px 20px;background:#f4f7fc;font-family:Arial,Helvetica,sans-serif;color:#061733;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:22px;padding:42px 34px;border:1px solid #e5eaf2;text-align:center;box-shadow:0 12px 30px rgba(6,23,51,0.08);">

    <div style="width:72px;height:72px;border-radius:50%;background:#eef4ff;margin:0 auto 20px;line-height:72px;text-align:center;">
      <span style="font-size:40px;color:#0b6fff;">&#10003;</span>
    </div>

    <h1 style="margin:0;color:#061733;font-size:38px;font-weight:800;line-height:1.15;">
      Thank You, ${firstName}!
    </h1>

    <div style="width:70px;height:4px;background:#0b6fff;margin:18px auto 26px;border-radius:999px;"></div>

    <p style="font-size:17px;color:#475569;line-height:1.6;margin:0 0 30px;">
      We've received your inquiry and someone from <strong>Guzman Legal</strong> will contact you shortly.
    </p>

    <p style="font-size:13px;color:#94a3b8;margin:14px 0 0;">
      Serving individuals, families, and businesses throughout Tampa Bay.
    </p>

  </div>
</div>
`,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Contact API Error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
