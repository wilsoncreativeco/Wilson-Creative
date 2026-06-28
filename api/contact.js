import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, business, type, package: pkg, message } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const row = (label, value) => value ? `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;color:#888;width:120px;font-size:13px;vertical-align:top;">${label}</td>
      <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;line-height:1.6;">${value}</td>
    </tr>` : ''

  try {
    await resend.emails.send({
      from: 'Wilson Creative Co <contact@wilsoncreativeco.au>',
      to: 'wilsoncreativeco.au@gmail.com',
      replyTo: email,
      subject: `New enquiry — ${name}${type ? ` · ${type}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
          <div style="background:#07060a;padding:22px 32px;border-bottom:1px solid #1e1e1e;">
            <p style="margin:0;font-size:16px;font-weight:600;color:#f0ece2;letter-spacing:0.3px;">Wilson <span style="color:#c5a44a;">Creative</span> Co.</p>
          </div>
          <div style="padding:28px 32px;">
            <h2 style="margin:0 0 6px;font-size:18px;color:#f0ece2;font-weight:600;">New Enquiry ✦</h2>
            <p style="margin:0 0 24px;font-size:13px;color:#555;">via wilsoncreativeco.au — reply directly to respond</p>
            <table style="width:100%;border-collapse:collapse;">
              ${row('Name',    name)}
              ${row('Email',   `<a href="mailto:${email}" style="color:#c5a44a;text-decoration:none;">${email}</a>`)}
              ${row('Phone',   phone ? `<a href="tel:${phone.replace(/\s/g, '')}" style="color:#c5a44a;text-decoration:none;">${phone}</a>` : '')}
              ${row('Business', business)}
              ${row('Need',    type || '—')}
              ${row('Budget',  pkg  || '—')}
              ${row('Details', message ? message.replace(/\n/g, '<br>') : '')}
            </table>
          </div>
          <div style="background:#0b0a0e;padding:14px 32px;border-top:1px solid #1e1e1e;">
            <p style="margin:0;font-size:11px;color:#444;">Hit reply to respond directly to ${name}.</p>
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
