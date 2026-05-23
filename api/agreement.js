import { Resend } from 'resend'
import PDFDocument from 'pdfkit'

const resend = new Resend(process.env.RESEND_API_KEY)

const PACKAGE_NAMES = {
  starter: 'Starter — $600',
  growth:  'Growth — $1,000',
  premium: 'Premium — From $2,000',
}

const PACKAGE_DEPOSITS = {
  starter: '$120',
  growth:  '$200',
  premium: '20% of agreed total',
}

const PACKAGE_BALANCES = {
  starter: '$480',
  growth:  '$800',
  premium: '80% before launch',
}

const PACKAGE_REVISIONS = {
  starter: '1 revision round',
  growth:  '3 revision rounds',
  premium: 'Unlimited revisions',
}

const TIMELINE_LABELS = {
  asap:     'ASAP',
  '1month':  '~ 1 Month',
  '2months': '1–2 Months',
  flexible:  'Flexible',
}

const CHECKS = [
  'I understand the deposit is non-refundable and is forfeited if I cancel after work commences.',
  'I understand the remaining balance is due before the site goes live — the site will not launch until paid in full.',
  'I understand the revision rounds included in my package, and that requests outside the agreed scope may be quoted separately.',
  'I confirm all content I provide (text, images, logos) is owned by me or properly licensed.',
  'I understand Wilson Creative Co. may display the completed work in its portfolio and marketing materials.',
  'I have read and agree to be bound by Wilson Creative Co.\'s full client agreement terms.',
]

// ── PDF Generator ─────────────────────────────────────────────────────────────
function buildPDF({ you, project, signature, date }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 56, info: {
      Title:   'Wilson Creative Co. — Client Agreement',
      Author:  'Wilson Creative Co.',
      Subject: `Agreement — ${you.name} / ${you.business}`,
    }})

    const chunks = []
    doc.on('data', c => chunks.push(c))
    doc.on('end',  () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const W = doc.page.width - 112   // usable width
    const GOLD  = '#c5a44a'
    const DARK  = '#07060a'
    const BODY  = '#1a1a1a'
    const MUTED = '#666666'
    const LINE  = '#e0ddd4'

    // ── Header bar ────────────────────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 72).fill(DARK)
    doc.fillColor('#f0ece2').font('Helvetica-Bold').fontSize(15)
       .text('Wilson ', 56, 26, { continued: true })
    doc.fillColor(GOLD).text('Creative ', { continued: true })
    doc.fillColor('#f0ece2').text('Co.')
    doc.fillColor('#888888').font('Helvetica').fontSize(9)
       .text('wilsoncreativeco.au  ·  ABN 99 664 433 447  ·  Brisbane, QLD, Australia', 56, 48)

    doc.moveDown(3)

    // ── Title ─────────────────────────────────────────────────────────────────
    doc.fillColor(BODY).font('Helvetica-Bold').fontSize(22)
       .text('Client Agreement', 56)
    doc.fillColor(MUTED).font('Helvetica').fontSize(10)
       .text(`Signed ${date}`, 56)

    doc.moveDown(1.4)

    // ── Section helper ────────────────────────────────────────────────────────
    function section(title) {
      doc.moveDown(0.6)
      doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(8)
         .text(title.toUpperCase(), 56, doc.y, { characterSpacing: 1.2 })
      doc.moveTo(56, doc.y + 4).lineTo(56 + W, doc.y + 4).strokeColor(LINE).lineWidth(0.5).stroke()
      doc.moveDown(0.7)
    }

    // ── Field row helper ──────────────────────────────────────────────────────
    function fieldRow(label, value, opts = {}) {
      const y = doc.y
      doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(label, 56, y, { width: 130 })
      doc.fillColor(BODY).font(opts.italic ? 'Helvetica-Oblique' : 'Helvetica')
         .fontSize(opts.italic ? 12 : 10)
         .text(value || '—', 190, y, { width: W - 134 })
      doc.moveDown(0.55)
    }

    // ── Client details ────────────────────────────────────────────────────────
    section('Client Details')
    fieldRow('Full Name',      you.name)
    fieldRow('Business Name',  you.business)
    fieldRow('Email Address',  you.email)
    fieldRow('Phone Number',   you.phone)
    if (you.abn) fieldRow('ABN', you.abn)

    // ── Project details ───────────────────────────────────────────────────────
    section('Project Details')
    fieldRow('Package',        PACKAGE_NAMES[project.package] || project.package)
    fieldRow('Industry',       project.industry)
    fieldRow('Timeline',       TIMELINE_LABELS[project.timeline] || project.timeline)
    fieldRow('Project Brief',  project.description)

    // ── Payment terms ─────────────────────────────────────────────────────────
    section('Payment Terms')
    fieldRow('Deposit',        PACKAGE_DEPOSITS[project.package] || '20% of agreed total')
    fieldRow('Balance',        PACKAGE_BALANCES[project.package] || '80% before launch')
    fieldRow('Revisions',      PACKAGE_REVISIONS[project.package] || 'Unlimited')
    fieldRow('Jurisdiction',   'Queensland, Australia')

    // ── Agreement acknowledgements ────────────────────────────────────────────
    section('Acknowledged & Agreed')
    doc.fillColor(MUTED).font('Helvetica').fontSize(9)
       .text('The client confirmed the following items:', 56)
    doc.moveDown(0.5)

    CHECKS.forEach((text, i) => {
      const y = doc.y
      // Tick box
      doc.rect(56, y, 10, 10).strokeColor(GOLD).lineWidth(0.8).stroke()
      doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(8).text('✓', 58, y + 1)
      // Text
      doc.fillColor(BODY).font('Helvetica').fontSize(9)
         .text(text, 74, y, { width: W - 18 })
      doc.moveDown(0.6)
    })

    // ── Signature block ───────────────────────────────────────────────────────
    section('Digital Signature')

    doc.fillColor(MUTED).font('Helvetica').fontSize(9)
       .text('By typing their full name below, the client agrees to be bound by all terms stated in this agreement.', 56, doc.y, { width: W })
    doc.moveDown(0.8)

    // Signature box
    const sigBoxY = doc.y
    doc.rect(56, sigBoxY, W, 52).fillAndStroke('#fafaf8', LINE)
    doc.fillColor(BODY).font('Helvetica-Oblique').fontSize(17)
       .text(signature, 68, sigBoxY + 14, { width: W - 24 })

    doc.moveDown(0.4)
    const underY = sigBoxY + 56
    doc.fillColor(MUTED).font('Helvetica').fontSize(8)
       .text(`Signed: ${date}`, 56, underY + 6)
    doc.text('Wilson Creative Co. — Digital Agreement', 56, underY + 18)

    // ── Footer on every page ──────────────────────────────────────────────────
    const range = doc.bufferedPageRange()
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i)
      const footY = doc.page.height - 36
      doc.moveTo(56, footY - 6).lineTo(doc.page.width - 56, footY - 6)
         .strokeColor(LINE).lineWidth(0.4).stroke()
      doc.fillColor(MUTED).font('Helvetica').fontSize(8)
         .text(
           `Wilson Creative Co.  ·  ABN 99 664 433 447  ·  Brisbane, QLD, Australia  ·  Page ${i + 1}`,
           56, footY, { width: W, align: 'center' }
         )
    }

    doc.end()
  })
}

// ── Email HTML helpers ─────────────────────────────────────────────────────────
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

const row = (label, value) => value ? `
  <tr>
    <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;color:#888;width:130px;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:11px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;line-height:1.6;">${value}</td>
  </tr>` : ''

// ── Handler ────────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { you, project, signature, date } = req.body

  if (!you?.name || !you?.email || !signature) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Generate PDF
  let pdfBuffer
  try {
    pdfBuffer = await buildPDF({ you, project, signature, date })
  } catch (err) {
    console.error('PDF generation error:', err)
    return res.status(500).json({ error: 'PDF generation failed' })
  }

  const pdfBase64 = pdfBuffer.toString('base64')
  const pdfFilename = `Wilson Creative Co — Agreement (${you.name}).pdf`

  // ── Email to George ──────────────────────────────────────────────────────────
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

        <p style="margin:28px 0 0;font-size:13px;color:#888;">The signed agreement PDF is attached to this email.</p>
      </div>
      ${darkFooter}
    </div>`

  // ── Email to client ──────────────────────────────────────────────────────────
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

        <div style="background:#0b0a0e;border:1px solid #2a2a2a;border-left:3px solid #c5a44a;border-radius:4px;padding:16px 20px;margin-bottom:28px;">
          <p style="margin:0;font-size:13px;color:#c5a44a;font-weight:600;">📎 Your signed agreement is attached as a PDF</p>
          <p style="margin:6px 0 0;font-size:12px;color:#888;">Keep it for your records — it contains all terms, payment details, and your digital signature.</p>
        </div>

        <p style="margin:0 0 6px;font-size:13px;color:#888;line-height:1.7;">
          <strong style="color:#f0ece2;">What happens next?</strong><br>
          We'll send your deposit invoice shortly. Once received, we schedule your project kickoff and get moving. Questions? Reply to this email or reach out at
          <a href="mailto:wilsoncreativeco.au@gmail.com" style="color:#c5a44a;text-decoration:none;">wilsoncreativeco.au@gmail.com</a>.
        </p>
      </div>
      ${darkFooter}
    </div>`

  try {
    await Promise.all([
      resend.emails.send({
        from:        'Wilson Creative Co <contact@wilsoncreativeco.au>',
        to:          'wilsoncreativeco.au@gmail.com',
        replyTo:     you.email,
        subject:     `Agreement signed — ${you.name} (${you.business}) · ${PACKAGE_NAMES[project.package] || project.package}`,
        html:        georgeHtml,
        attachments: [{ filename: pdfFilename, content: pdfBase64 }],
      }),
      resend.emails.send({
        from:        'Wilson Creative Co <contact@wilsoncreativeco.au>',
        to:          you.email,
        subject:     `Your agreement with Wilson Creative Co. — ${PACKAGE_NAMES[project.package] || project.package}`,
        html:        clientHtml,
        attachments: [{ filename: pdfFilename, content: pdfBase64 }],
      }),
    ])

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
