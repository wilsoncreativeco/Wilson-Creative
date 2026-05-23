import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const PACKAGE_NAMES = {
  starter: 'Starter — $600',
  growth:  'Growth — $1,000',
  premium: 'Premium — From $2,000',
}

const TIMELINE_LABELS = {
  asap:     'ASAP',
  '1month':  '~ 1 Month',
  '2months': '1–2 Months',
  flexible:  'Flexible',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { you, project, signature, date } = req.body

  if (!you?.name || !you?.email || !signature) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const row = (label, value) => value ? `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;color:#888;width:130px;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>
      <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;line-height:1.6;">${value}</td>
    </tr>` : ''

  const darkHeader = `
    <div style="background:#07060a;padding:24px 32px;border-bottom:1px solid #1e1e1e;">
      <p style="margin:0;font-size:17px;font-weight:600;color:#f0ece2;letter-spacing:0.4px;font-family:sans-serif;">
        Wilson <span style="color:#c5a44a;">Creative</span> Co.
      </p>
    </div>`

  const darkFooter = `
    <div style="background:#0b0a0e;padding:14px 32px;border-top:1px solid #1e1e1e;">
      <p style="margin:0;font-size:11px;color:#555;">ABN 99 664 433 447 · Brisbane, QLD, Australia · wilsoncreativeco.au</p>
    </div>`

  // ── Email to George ─────────────────────────────────────────────────────────
  const georgeHtml = `
    <div style="font-family:sans-serif;max-width:620px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
      ${darkHeader}
      <div style="padding:28px 32px;">
        <h2 style="margin:0 0 6px;font-size:20px;color:#f0ece2;font-weight:600;">New Agreement Signed</h2>
        <p style="margin:0 0 24px;font-size:13px;color:#888;">Submitted ${date} via wilsoncreativeco.au/start</p>

        <p style="margin:0 0 10px;font-size:12px;color:#c5a44a;letter-spacing:.08em;text-transform:uppercase;font-weight:600;">Client Details</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${row('Name',     you.name)}
          ${row('Business', you.business)}
          ${row('Email',    `<a href="mailto:${you.email}" style="color:#c5a44a;text-decoration:none;">${you.email}</a>`)}
          ${row('Phone',    you.phone)}
          ${row('ABN',      you.abn || '—')}
        </table>

        <p style="margin:0 0 10px;font-size:12px;color:#c5a44a;letter-spacing:.08em;text-transform:uppercase;font-weight:600;">Project Details</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${row('Package',  PACKAGE_NAMES[project.package] || project.package)}
          ${row('Industry', project.industry)}
          ${row('Timeline', TIMELINE_LABELS[project.timeline] || project.timeline)}
          ${row('Brief',    (project.description || '').replace(/\n/g, '<br>'))}
        </table>

        <p style="margin:0 0 10px;font-size:12px;color:#c5a44a;letter-spacing:.08em;text-transform:uppercase;font-weight:600;">Agreement</p>
        <table style="width:100%;border-collapse:collapse;">
          ${row('Signature', `<span style="font-family:Georgia,serif;font-style:italic;font-size:16px;">${signature}</span>`)}
          ${row('Date',      date)}
        </table>
      </div>
      ${darkFooter}
    </div>`

  // ── Confirmation email to client ────────────────────────────────────────────
  const clientHtml = `
    <div style="font-family:sans-serif;max-width:620px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
      ${darkHeader}
      <div style="padding:32px;">
        <h2 style="margin:0 0 8px;font-size:22px;color:#f0ece2;font-weight:600;">You're locked in, ${you.name.split(' ')[0]}.</h2>
        <p style="margin:0 0 28px;font-size:14px;color:#888;line-height:1.7;">
          Thanks for signing your client agreement with Wilson Creative Co. We'll be in touch within 24 hours with your deposit invoice and project kickoff brief.
        </p>

        <div style="background:#0b0a0e;border:1px solid #1e1e1e;border-radius:6px;padding:20px 24px;margin-bottom:28px;">
          <p style="margin:0 0 14px;font-size:12px;color:#c5a44a;letter-spacing:.08em;text-transform:uppercase;font-weight:600;">Agreement Summary</p>
          <table style="width:100%;border-collapse:collapse;">
            ${row('Package',   PACKAGE_NAMES[project.package] || project.package)}
            ${row('Timeline',  TIMELINE_LABELS[project.timeline] || project.timeline)}
            ${row('Signed by', `<span style="font-family:Georgia,serif;font-style:italic;">${signature}</span>`)}
            ${row('Date',      date)}
          </table>
        </div>

        <p style="margin:0 0 6px;font-size:13px;color:#888;line-height:1.7;">
          <strong style="color:#f0ece2;">What happens next?</strong><br>
          We'll send your deposit invoice shortly. Once received, we schedule your project kickoff and get moving. If you have any immediate questions, reply to this email or reach out at
          <a href="mailto:wilsoncreativeco.au@gmail.com" style="color:#c5a44a;text-decoration:none;">wilsoncreativeco.au@gmail.com</a>.
        </p>
      </div>
      ${darkFooter}
    </div>`

  try {
    await Promise.all([
      // Notify George
      resend.emails.send({
        from:    'Wilson Creative Co <contact@wilsoncreativeco.au>',
        to:      'wilsoncreativeco.au@gmail.com',
        replyTo: you.email,
        subject: `Agreement signed — ${you.name} (${you.business}) · ${PACKAGE_NAMES[project.package] || project.package}`,
        html:    georgeHtml,
      }),
      // Confirm to client
      resend.emails.send({
        from:    'Wilson Creative Co <contact@wilsoncreativeco.au>',
        to:      you.email,
        subject: `Your agreement with Wilson Creative Co. — ${PACKAGE_NAMES[project.package] || project.package}`,
        html:    clientHtml,
      }),
    ])

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
