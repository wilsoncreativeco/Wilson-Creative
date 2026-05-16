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
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0d0d0d; color: #f5f2ec; border-radius: 8px;">
          <h2 style="margin: 0 0 24px; font-size: 22px; color: #c9a84c;">New Project Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888; width: 100px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222;">${phone || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 16px 10px 0; color: #888; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin: 24px 0 0; font-size: 12px; color: #555;">Sent via wilsoncreativeco.com.au contact form</p>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
