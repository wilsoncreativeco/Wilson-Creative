import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, business, type, package: pkg, style, timeline, message } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const row = (label, value) => value ? `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#888888;width:110px;font-size:13px;vertical-align:top;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#0d0d0d;font-size:14px;line-height:1.6;">${value}</td>
    </tr>` : ''

  try {
    await resend.emails.send({
      from: 'Wilson Creative Co <contact@wilsoncreativeco.au>',
      to: 'wilsoncreativeco.au@gmail.com',
      replyTo: email,
      subject: `New enquiry from ${name}${business ? ` — ${business}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
          <div style="background:#0d0d0d;padding:28px 32px;">
            <p style="margin:0;font-size:18px;font-weight:600;color:#ffffff;letter-spacing:0.5px;">Wilson <span style="color:#c9a84c;">Creative</span> Co.</p>
          </div>
          <div style="padding:32px;">
            <h2 style="margin:0 0 24px;font-size:20px;color:#0d0d0d;">New Project Enquiry</h2>
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name', name)}
              ${row('Business', business)}
              ${row('Email', `<a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a>`)}
              ${row('Phone', phone)}
              ${row('Website Type', type)}
              ${row('Package', pkg)}
              ${row('Style', style)}
              ${row('Timeline', timeline)}
              ${row('Notes', message ? message.replace(/\n/g, '<br>') : '')}
            </table>
          </div>
          <div style="background:#f7f7f7;padding:16px 32px;">
            <p style="margin:0;font-size:12px;color:#aaaaaa;">Sent via wilsoncreativeco.au contact form</p>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
