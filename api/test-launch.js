// !! REMOVE THIS FILE BEFORE GOING LIVE !!
// Preview endpoint — fires launch email + handover PDF with dummy data
// Usage: curl -X POST https://wilsoncreativeco.au/api/test-launch

import { Resend } from 'resend'
import PDFDocument from 'pdfkit'
import { darkHeader, darkFooter } from './_welcome-email.js'

const resend = new Resend(process.env.RESEND_API_KEY)

const DUMMY = {
  clientName: 'Jane Smith',
  business:   'Smith & Co. Café',
  siteUrl:    'https://smithco.com.au',
  pages:      'Home, Menu, About, Gallery, Contact',
  features:   'Online booking, contact form, Google Maps, Instagram feed',
}

function buildHandoverPDF({ clientName, business, siteUrl, pages, features }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 56, info: {
      Title:  'Wilson Creative Co. — Site Handover',
      Author: 'Wilson Creative Co.',
    }})
    const chunks = []
    doc.on('data', c => chunks.push(c))
    doc.on('end',  () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const W    = doc.page.width - 112
    const GOLD = '#c5a44a'
    const DARK = '#07060a'
    const BODY = '#1a1a1a'
    const MUTED= '#666666'
    const LINE = '#e0ddd4'

    doc.rect(0, 0, doc.page.width, 72).fill(DARK)
    doc.fillColor('#f0ece2').font('Helvetica-Bold').fontSize(15)
       .text('Wilson ', 56, 26, { continued: true })
    doc.fillColor(GOLD).text('Creative ', { continued: true })
    doc.fillColor('#f0ece2').text('Co.')
    doc.fillColor('#888888').font('Helvetica').fontSize(9)
       .text('wilsoncreativeco.au  ·  ABN 99 664 433 447  ·  Brisbane, QLD, Australia', 56, 48)

    doc.moveDown(3)
    doc.fillColor(BODY).font('Helvetica-Bold').fontSize(22).text('Site Handover', 56)
    doc.fillColor(MUTED).font('Helvetica').fontSize(10)
       .text(`${business}  ·  ${new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}`, 56)
    doc.moveDown(1.4)

    function section(title) {
      doc.moveDown(0.6)
      doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(8)
         .text(title.toUpperCase(), 56, doc.y, { characterSpacing: 1.2 })
      doc.moveTo(56, doc.y + 4).lineTo(56 + W, doc.y + 4).strokeColor(LINE).lineWidth(0.5).stroke()
      doc.moveDown(0.7)
    }

    function fieldRow(label, value) {
      const y = doc.y
      doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(label, 56, y, { width: 130 })
      doc.fillColor(BODY).font('Helvetica').fontSize(10).text(value || '—', 190, y, { width: W - 134 })
      doc.moveDown(0.55)
    }

    function bodyText(text) {
      doc.fillColor(BODY).font('Helvetica').fontSize(10).text(text, 56, doc.y, { width: W, lineGap: 3 })
      doc.moveDown(0.6)
    }

    section('Project Details')
    fieldRow('Client',   clientName)
    fieldRow('Business', business)
    if (siteUrl)   fieldRow('Live URL',  siteUrl)
    if (pages)     fieldRow('Pages',     pages)
    if (features)  fieldRow('Features',  features)

    section('Logins & Access')
    bodyText('Your login details have been shared with you directly. Keep them somewhere safe — we recommend a password manager like 1Password or Bitwarden.')
    bodyText('If you ever need to reset access or require additional collaborators, reach out and we\'ll sort it out.')

    section('Updating Your Site')
    bodyText('For text and image updates, log into your CMS using the credentials provided. Most changes can be made without any technical knowledge.')
    bodyText('For structural changes (adding pages, new features, layout changes), it\'s best to get in touch — we can quote any additions quickly.')

    section('Domain & Hosting')
    bodyText('Your site is hosted on Vercel\'s global CDN — fast, reliable, and automatically scaled. No action needed on your end.')
    bodyText('Your domain is managed separately. If you need to update nameservers or DNS records in future, reach out and we\'ll handle it.')

    section('Future Support')
    bodyText('Need updates, new pages, or want to add features down the track? We\'re always available. Just reach out:')
    doc.fillColor(GOLD).font('Helvetica').fontSize(10).text('wilsoncreativeco.au@gmail.com', 56, doc.y)
    doc.fillColor(MUTED).font('Helvetica').fontSize(10).text('0401 609 118', 56, doc.y + 14)
    doc.moveDown(1.6)

    section('Leave a Review')
    bodyText('If you enjoyed working with us, a quick Google review means the world to a small studio and helps other businesses find us.')
    doc.fillColor(GOLD).font('Helvetica').fontSize(10)
       .text('https://g.page/r/CaP04YoIyRd1EBM/review', 56, doc.y, { link: 'https://g.page/r/CaP04YoIyRd1EBM/review', underline: true })
    doc.moveDown(1.2)

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

function buildLaunchEmail({ firstName, business, siteUrl }) {
  return `
  <div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
    ${darkHeader}
    <div style="padding:36px 32px;">
      <h1 style="margin:0 0 8px;font-size:26px;color:#f0ece2;font-weight:700;line-height:1.2;">You're live, ${firstName}. ✦</h1>
      <p style="margin:0 0 28px;font-size:15px;color:#888;line-height:1.8;">
        Payment confirmed — your site is now live. It's been a genuine pleasure working on this. Go share it with the world.
      </p>
      ${siteUrl ? `
      <div style="text-align:center;margin-bottom:32px;">
        <a href="${siteUrl}" style="display:inline-block;background:#c5a44a;color:#07060a;font-size:14px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:4px;letter-spacing:.04em;">View Your Live Site →</a>
      </div>` : ''}
      <div style="background:#0b0a0e;border:1px solid #1e1e1e;border-radius:6px;padding:22px 24px;margin-bottom:32px;">
        <p style="margin:0 0 6px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">Your Handover Pack</p>
        <p style="margin:0 0 16px;font-size:13px;color:#888;line-height:1.7;">
          Everything you need is attached as a PDF — logins, how to update your site, domain info, and how to reach us for future work.
        </p>
        <div style="display:flex;gap:10px;align-items:flex-start;">
          <span style="color:#c5a44a;font-size:14px;">📎</span>
          <p style="margin:0;font-size:13px;color:#f0ece2;font-weight:500;">${business} — Site Handover.pdf</p>
        </div>
      </div>
      <div style="background:#0b0a0e;border:1px solid #2a2a2a;border-left:3px solid #c5a44a;border-radius:4px;padding:18px 20px;margin-bottom:32px;">
        <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#f0ece2;">Need updates down the track?</p>
        <p style="margin:0;font-size:13px;color:#888;line-height:1.6;">New pages, features, seasonal changes — just reach out. We'll quote anything quickly and keep your site fresh.</p>
      </div>
      <div style="border-top:1px solid #1e1e1e;padding-top:24px;margin-bottom:28px;">
        <p style="margin:0 0 16px;font-size:13px;color:#888;line-height:1.7;">
          <strong style="color:#f0ece2;">Enjoyed working with us?</strong> — A Google review takes 30 seconds and genuinely helps more than you'd think. It means a lot to a small studio.
        </p>
        <a href="https://g.page/r/CaP04YoIyRd1EBM/review" style="display:inline-block;background:transparent;color:#c5a44a;font-size:13px;font-weight:600;text-decoration:none;padding:10px 20px;border-radius:4px;border:1px solid #c5a44a;letter-spacing:.04em;margin-bottom:20px;">⭐ Leave a Google Review →</a>
        <p style="margin:0;font-size:13px;color:#888;line-height:1.7;">
          And if you know any other business owners who could use a site like yours — a quick introduction is always appreciated.
        </p>
      </div>
      <p style="margin:0 0 4px;font-size:13px;color:#f0ece2;">📧 <a href="mailto:wilsoncreativeco.au@gmail.com" style="color:#c5a44a;text-decoration:none;">wilsoncreativeco.au@gmail.com</a></p>
      <p style="margin:0 0 24px;font-size:13px;color:#f0ece2;">📱 <a href="tel:+61401609118" style="color:#c5a44a;text-decoration:none;">0401 609 118</a></p>
      <p style="margin:0;font-size:14px;color:#888;line-height:1.8;">
        Congrats on the new site.<br/>
        <strong style="color:#f0ece2;">— George</strong><br/>
        <span style="font-size:12px;color:#555;">Wilson Creative Co.</span>
      </p>
    </div>
    ${darkFooter}
  </div>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const pdfBuffer  = await buildHandoverPDF(DUMMY)
  const pdfBase64  = pdfBuffer.toString('base64')
  const pdfFilename = `${DUMMY.business} — Site Handover.pdf`

  await resend.emails.send({
    from:        'George — Wilson Creative Co. <contact@wilsoncreativeco.au>',
    to:          'wilsoncreativeco.au@gmail.com',
    subject:     '[PREVIEW] You\'re live, Jane. ✦',
    html:        buildLaunchEmail({ firstName: 'Jane', business: DUMMY.business, siteUrl: DUMMY.siteUrl }),
    attachments: [{ filename: pdfFilename, content: pdfBase64 }],
  })

  return res.status(200).json({ ok: true })
}
