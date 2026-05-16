import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    await resend.emails.send({
      from: 'Wilson Creative Co <contact@wilsoncreativeco.au>',
      to: 'wilsoncreativeco.au@gmail.com',
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: #0d0d0d; padding: 28px 32px;">
            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ffffff; letter-spacing: 0.5px;">Wilson <span style="color: #c9a84c;">Creative</span> Co.</p>
          </div>
          <div style="padding: 32px;">
            <h2 style="margin: 0 0 24px; font-size: 20px; color: #0d0d0d;">New Project Enquiry</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #888888; width: 90px; font-size: 13px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #0d0d0d; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #888888; font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; font-size: 14px;"><a href="mailto:${email}" style="color: #c9a84c; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #888888; font-size: 13px;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #0d0d0d; font-size: 14px;">${phone || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #888888; vertical-align: top; font-size: 13px;">Message</td>
                <td style="padding: 12px 0; color: #0d0d0d; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background: #f7f7f7; padding: 16px 32px;">
            <p style="margin: 0; font-size: 12px; color: #aaaaaa;">Sent via wilsoncreativeco.au contact form</p>
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
