import { Resend } from 'resend'
import { darkHeader, darkFooter } from './_welcome-email.js'

const resend = new Resend(process.env.RESEND_API_KEY)

const AESTHETIC_LABELS = {
  clean: 'Clean & Minimal', bold: 'Bold & Impactful', luxury: 'Luxury & Premium',
  warm: 'Warm & Friendly', modern: 'Modern & Tech', classic: 'Classic & Timeless',
}
const VIBE_LABELS = {
  dark: 'Dark & Moody', light: 'Light & Airy', neutral: 'Neutral & Natural',
  vibrant: 'Vibrant & Colourful', mono: 'Black & White', unsure: 'Not Sure — You Decide',
}
const LAYOUT_LABELS = {
  hero: 'Big Impact Hero', simple: 'Simple & Direct',
  sections: 'Multiple Sections', creative: 'Creative & Unique',
}
const TONE_LABELS = {
  professional: 'Professional', friendly: 'Friendly',
  bold: 'Confident', luxury: 'Luxurious',
}
const LOGO_LABELS   = { yes: 'Yes', no: 'No logo yet', wip: 'In progress' }
const PHOTOS_LABELS = { yes: 'Ready to go', some: 'Some, not all', no: 'None yet', help: 'Need help sourcing' }

const row = (label, value) => value ? `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#888;width:160px;font-size:13px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#f0ece2;font-size:13px;line-height:1.6;">${value}</td>
  </tr>` : ''

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, aesthetic, vibe, layout, tone, features, headline, subheading,
          cta, inspiration, logoStatus, logoLink, photosStatus, assetsLink,
          avoidColors, avoidStyles, socials, notes } = req.body

  if (!email) return res.status(400).json({ error: 'Missing email' })

  const featureList = Array.isArray(features) && features.length
    ? features.join(', ')
    : 'None selected'

  const socialLinks = Object.entries(socials || {})
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('<br>') || '—'

  const html = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
      ${darkHeader}
      <div style="padding:28px 32px;">
        <h2 style="margin:0 0 4px;font-size:20px;color:#f0ece2;font-weight:600;">Design Brief Received ✦</h2>
        <p style="margin:0 0 28px;font-size:13px;color:#888;">Submitted via wilsoncreativeco.au/brief · ${email}</p>

        <p style="margin:0 0 10px;font-size:12px;color:#c5a44a;letter-spacing:.08em;text-transform:uppercase;font-weight:600;">Style</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${row('Aesthetic',    AESTHETIC_LABELS[aesthetic] || aesthetic)}
          ${row('Colour vibe',  VIBE_LABELS[vibe] || vibe)}
          ${row('Layout',       LAYOUT_LABELS[layout] || layout)}
          ${row('Tone',         TONE_LABELS[tone] || tone)}
          ${row('Avoid colours', avoidColors || '—')}
          ${row('Avoid styles',  avoidStyles || '—')}
        </table>

        <p style="margin:0 0 10px;font-size:12px;color:#c5a44a;letter-spacing:.08em;text-transform:uppercase;font-weight:600;">Content</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${row('Headline',    headline || '—')}
          ${row('Subheading',  subheading || '—')}
          ${row('CTA button',  cta || '—')}
          ${row('Features',    featureList)}
          ${row('Inspiration', (inspiration || '—').replace(/\n/g, '<br>'))}
          ${row('Socials',     socialLinks)}
        </table>

        <p style="margin:0 0 10px;font-size:12px;color:#c5a44a;letter-spacing:.08em;text-transform:uppercase;font-weight:600;">Assets</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${row('Logo',        LOGO_LABELS[logoStatus] || logoStatus)}
          ${logoLink   ? row('Logo files',  `<a href="${logoLink}" style="color:#c5a44a;text-decoration:none;">${logoLink}</a>`) : ''}
          ${row('Photos',      PHOTOS_LABELS[photosStatus] || photosStatus)}
          ${assetsLink ? row('Photo files', `<a href="${assetsLink}" style="color:#c5a44a;text-decoration:none;">${assetsLink}</a>`) : ''}
          ${row('Notes',       (notes || '—').replace(/\n/g, '<br>'))}
        </table>
      </div>
      ${darkFooter}
    </div>`

  try {
    await resend.emails.send({
      from:    'Wilson Creative Co <contact@wilsoncreativeco.au>',
      to:      'wilsoncreativeco.au@gmail.com',
      replyTo: email,
      subject: `Design Brief — ${email}`,
      html,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Brief email error:', err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
