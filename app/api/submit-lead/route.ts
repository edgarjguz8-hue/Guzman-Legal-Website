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
      console.error(attorneyError)
      return NextResponse.json(
        { error: 'Attorney not found' },
        { status: 404 }
      )
    }

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

    // Email attorney
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
<h2>New Lead Received</h2>

<p><strong>Client:</strong> ${fullName}</p>

<p><strong>Phone:</strong> ${phone}</p>

<p><strong>Email:</strong> ${email}</p>

<p><strong>Practice Area:</strong> ${practiceArea}</p>

<p><strong>ZIP Code:</strong> ${zipCode}</p>

<p><strong>County:</strong> ${county}</p>

<p><strong>Legal Issue:</strong></p>

<p>${legalIssue.replace(/\n/g, '<br>')}</p>
`,
      })
    }

    // Confirmation email
    await sendEmail({
      to: email,
      subject: 'We Received Your Request',
      text: `
Thank you for contacting AttorneyAbogado.

We've successfully received your request and forwarded your information to:

${attorneyData.firm_name || attorneyData.name}

Someone from their office should contact you shortly.

Thank you,

AttorneyAbogado
`,
      html: `
<div style="margin:0;padding:40px;background:#f4f7fc;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:18px;padding:50px 40px;border:1px solid #e5e7eb;text-align:center;">

    <div style="width:80px;height:80px;border-radius:50%;background:#eef4ff;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
      <span style="font-size:42px;color:#0b6fff;line-height:1;">✓</span>
    </div>

    <h1 style="margin:0;color:#061733;font-size:42px;font-weight:700;">
      Thank You!
    </h1>

    <div style="width:70px;height:4px;background:#0b6fff;margin:18px auto 28px;border-radius:999px;"></div>

    <p style="font-size:18px;color:#4b5563;line-height:1.6;margin:0 0 30px;">
      We've successfully received your request.
    </p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0;">

    <p style="font-size:17px;color:#374151;margin-bottom:18px;">
      Your information has been forwarded to:
    </p>

    <div style="display:inline-block;border:1px solid #dbe3ef;border-radius:12px;padding:18px 28px;background:#ffffff;margin-bottom:30px;">
      <span style="font-size:24px;">⚖️</span>
      <span style="font-size:24px;font-weight:700;color:#061733;margin-left:10px;">
        ${attorneyData.firm_name || attorneyData.name}
      </span>
    </div>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 28px;">

    <p style="font-size:17px;color:#374151;margin-bottom:16px;">
      ⏰ Someone from <strong>${attorneyData.firm_name || attorneyData.name}</strong> should contact you shortly.
    </p>

    <p style="font-size:17px;color:#374151;margin:0;">
      Thank you for using <strong>AttorneyAbogado</strong>.
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