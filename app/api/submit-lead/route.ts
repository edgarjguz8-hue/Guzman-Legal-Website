import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

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
    from: 'AttorneyAbogado <info@networkingleads.com>',
    to: [to],
    subject,
    text,
    html:
      html ||
      `<div style="font-family:Arial,sans-serif;white-space:pre-line">${text}</div>`,
    replyTo,
  })

  if (error) {
    console.error('Resend Error:', error)
    throw error
  }

  return data
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      attorneyId,
      zipCode,
      county,
      practiceArea,
      fullName,
      phone,
      email,
      legalIssue,
    } = body

    if (
      !attorneyId ||
      !zipCode ||
      !practiceArea ||
      !fullName ||
      !phone ||
      !email ||
      !legalIssue
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: attorneyData, error: attorneyError } = await supabase
      .from('attorneys')
      .select('*')
      .eq('id', attorneyId)
      .single()

    if (attorneyError || !attorneyData) {
      console.error('Attorney lookup error:', attorneyError)

      return NextResponse.json(
        { error: 'Attorney not found' },
        { status: 404 }
      )
    }

    const firmName = attorneyData.firm_name || attorneyData.name
    const firstName = String(fullName).trim().split(' ')[0]
    const logoUrl = 'https://attorneyabogado.com/aa-logo.jpg'
    const formattedLegalIssue = String(legalIssue).replace(/\n/g, '<br>')

    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([
        {
          attorney_id: attorneyId,
          zip_code: zipCode,
          practice_area: practiceArea,
          full_name: fullName,
          phone,
          email,
          legal_issue: legalIssue,
        },
      ])
      .select()

    if (leadError) {
      console.error('Supabase Error:', leadError)

      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      )
    }

    // Branded notification email sent to the attorney
    if (attorneyData.email) {
      await sendEmail({
        to: attorneyData.email,
        subject: `New Lead - ${fullName}`,
        replyTo: email,
        text: `
New Lead Received

Client:
${fullName}

Phone:
${phone}

Email:
${email}

Practice Area:
${practiceArea}

ZIP Code:
${zipCode}

County:
${county}

Legal Issue:
${legalIssue}
`,
        html: `
<div style="margin:0;padding:42px 20px;background:#f4f7fc;font-family:Arial,Helvetica,sans-serif;color:#061733;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:22px;padding:42px 34px;border:1px solid #e5eaf2;box-shadow:0 12px 30px rgba(6,23,51,0.08);">

    <img
      src="${logoUrl}"
      alt="AttorneyAbogado"
      style="width:110px;max-width:110px;margin:0 auto 26px;display:block;border:0;"
    />

    <div style="text-align:center;">
      <p style="font-size:13px;letter-spacing:1.4px;text-transform:uppercase;color:#0b6fff;font-weight:800;margin:0 0 12px;">
        Attorney Notification
      </p>

      <h1 style="margin:0;color:#061733;font-size:34px;font-weight:800;line-height:1.15;">
        New Lead Received
      </h1>

      <div style="width:70px;height:4px;background:#0b6fff;margin:18px auto 24px;border-radius:999px;"></div>

      <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 30px;">
        A potential client has submitted a request through AttorneyAbogado.
        Their information is provided below.
      </p>
    </div>

    <div style="background:#f8fbff;border:1px solid #dbe3ef;border-radius:18px;padding:28px 26px;margin:0 0 28px;">

      <p style="font-size:13px;letter-spacing:1.4px;text-transform:uppercase;color:#0b6fff;font-weight:800;margin:0 0 22px;">
        Lead Information
      </p>

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">
        Client Name
      </p>

      <p style="font-size:18px;color:#061733;font-weight:700;margin:0 0 20px;">
        ${fullName}
      </p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">
        Phone
      </p>

      <p style="font-size:17px;font-weight:700;margin:0 0 20px;">
        <a
          href="tel:${phone}"
          style="color:#0b6fff;text-decoration:none;"
        >
          ${phone}
        </a>
      </p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">
        Email
      </p>

      <p style="font-size:17px;font-weight:700;margin:0 0 20px;word-break:break-word;">
        <a
          href="mailto:${email}"
          style="color:#0b6fff;text-decoration:none;"
        >
          ${email}
        </a>
      </p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">
        Practice Area
      </p>

      <p style="font-size:17px;color:#061733;font-weight:700;margin:0 0 20px;">
        ${practiceArea}
      </p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">
        ZIP Code
      </p>

      <p style="font-size:17px;color:#061733;font-weight:700;margin:0 0 20px;">
        ${zipCode}
      </p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 5px;">
        County
      </p>

      <p style="font-size:17px;color:#061733;font-weight:700;margin:0 0 20px;">
        ${county}
      </p>

      <div style="border-top:1px solid #e2e8f0;margin:0 0 20px;"></div>

      <p style="font-size:14px;color:#64748b;margin:0 0 8px;">
        Legal Issue
      </p>

      <p style="font-size:16px;color:#061733;line-height:1.7;margin:0;">
        ${formattedLegalIssue}
      </p>

    </div>

    <div style="text-align:center;">
      <p style="font-size:15px;color:#475569;line-height:1.6;margin:0;">
        Please contact this potential client as soon as possible.
      </p>

      <p style="font-size:13px;color:#94a3b8;margin:14px 0 0;">
        This lead was submitted through AttorneyAbogado.com.
      </p>
    </div>

  </div>
</div>
`,
      })
    }

    // Confirmation email sent to the customer
    await sendEmail({
      to: email,
      subject: `You're Connected with ${firmName}`,
      text: `
Thank you, ${firstName}!

We've successfully received your request and matched you with:

${firmName}

Practice Area:
${practiceArea}

Serving:
${county} County

Someone from ${firmName} should contact you shortly.

Thank you for using AttorneyAbogado.
`,
      html: `
<div style="margin:0;padding:42px 20px;background:#f4f7fc;font-family:Arial,Helvetica,sans-serif;color:#061733;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:22px;padding:42px 34px;border:1px solid #e5eaf2;text-align:center;box-shadow:0 12px 30px rgba(6,23,51,0.08);">

    <img src="${logoUrl}" alt="AttorneyAbogado" style="width:110px;max-width:110px;margin:0 auto 26px;display:block;border:0;" />

    <div style="width:72px;height:72px;border-radius:50%;background:#eef4ff;margin:0 auto 20px;line-height:72px;text-align:center;">
      <span style="font-size:40px;color:#0b6fff;">✓</span>
    </div>

    <h1 style="margin:0;color:#061733;font-size:38px;font-weight:800;line-height:1.15;">
      Thank You, ${firstName}!
    </h1>

    <div style="width:70px;height:4px;background:#0b6fff;margin:18px auto 26px;border-radius:999px;"></div>

    <p style="font-size:17px;color:#475569;line-height:1.6;margin:0 0 30px;">
      We've successfully received your request and matched you with a law firm based on your legal matter and location.
    </p>

    <div style="background:#f8fbff;border:1px solid #dbe3ef;border-radius:18px;padding:26px 24px;margin:0 0 30px;">
      <p style="font-size:13px;letter-spacing:1.4px;text-transform:uppercase;color:#0b6fff;font-weight:800;margin:0 0 16px;">
        Your Attorney Match
      </p>

      <h2 style="font-size:26px;color:#061733;margin:0 0 18px;font-weight:800;">
        ${firmName}
      </h2>

      <div style="border-top:1px solid #e5eaf2;margin:18px 0;"></div>

      <p style="font-size:15px;color:#64748b;margin:0 0 6px;">
        Practice Area
      </p>

      <p style="font-size:18px;color:#061733;font-weight:700;margin:0 0 18px;">
        ${practiceArea}
      </p>

      <p style="font-size:15px;color:#64748b;margin:0 0 6px;">
        Serving
      </p>

      <p style="font-size:18px;color:#061733;font-weight:700;margin:0;">
        ${county} County
      </p>
    </div>

    <div style="text-align:left;background:#ffffff;border:1px solid #e5eaf2;border-radius:16px;padding:22px 24px;margin-bottom:28px;">
      <h3 style="font-size:18px;color:#061733;margin:0 0 16px;">
        What happens next?
      </h3>

      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 12px;">
        ✅ Your information has been securely sent to <strong>${firmName}</strong>.
      </p>

      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0 0 12px;">
        📞 Someone from their office should contact you shortly.
      </p>

      <p style="font-size:15px;color:#334155;line-height:1.6;margin:0;">
        💬 If you don't hear back within one business day, simply reply to this email and our team will be happy to help.
      </p>
    </div>

    <p style="font-size:15px;color:#475569;line-height:1.6;margin:0;">
      Thank you for trusting <strong>AttorneyAbogado</strong>.
    </p>

    <p style="font-size:13px;color:#94a3b8;margin:14px 0 0;">
      Connecting people with the right attorney.
    </p>

  </div>
</div>
`,
    })

    return NextResponse.json(
      {
        success: true,
        data: leadData,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error('API Error:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}