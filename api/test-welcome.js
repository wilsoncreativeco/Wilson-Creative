// !! REMOVE THIS FILE BEFORE GOING LIVE !!
// Quick preview endpoint — fires welcome email with dummy data
// Usage: POST https://wilsoncreativeco.au/api/test-welcome

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

function step(num, title, body) {
  return `
    <div style="display:flex;gap:16px;margin-bottom:20px;align-items:flex-start;">
      <div style="min-width:28px;height:28px;background:#c5a44a;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#07060a;text-align:center;line-height:28px;">${num}</div>
      <div>
        <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#f0ece2;">${title}</p>
        <p style="margin:0;font-size:13px;color:#888;line-height:1.6;">${body}</p>
      </div>
    </div>`
}

function checkItem(text) {
  return `
    <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:10px;">
      <span style="color:#c5a44a;font-size:14px;line-height:1.6;">✦</span>
      <p style="margin:0;font-size:13px;color:#888;line-height:1.6;">${text}</p>
    </div>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  await resend.emails.send({
    from:    'George — Wilson Creative Co. <contact@wilsoncreativeco.au>',
    to:      'wilsoncreativeco.au@gmail.com',
    subject: '[PREVIEW] Welcome aboard, Jane — let\'s get started.',
    html: `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
      ${darkHeader}
      <div style="padding:36px 32px;">
        <h1 style="margin:0 0 8px;font-size:26px;color:#f0ece2;font-weight:700;line-height:1.2;">Welcome aboard, Jane.</h1>
        <p style="margin:0 0 28px;font-size:15px;color:#888;line-height:1.8;">
          Deposit received — you're officially locked in. I'm genuinely excited to work on this with you.
          This email has everything you need to know before we kick off, so give it a read and reach out if anything's unclear.
        </p>

        <div style="margin-bottom:32px;">
          <p style="margin:0 0 16px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">What Happens Next</p>
          ${step(1, 'Kickoff', 'I\'ll reach out within 24 hours to confirm your project scope, timeline, and any questions before we start.')}
          ${step(2, 'Design', 'I\'ll put together the initial design concepts based on your brief. You\'ll get to see it before anything is built.')}
          ${step(3, 'Build', 'Once design is approved, I build the full site — clean code, fast, mobile-perfect.')}
          ${step(4, 'Review', 'You get your 3 revision rounds here. We go through it together and dial everything in.')}
          ${step(5, 'Launch', 'Balance is paid, domain is pointed, site goes live. I\'ll handle the full launch.')}
        </div>

        <div style="background:#0b0a0e;border:1px solid #1e1e1e;border-radius:6px;padding:22px 24px;margin-bottom:32px;">
          <p style="margin:0 0 16px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">What I Need From You</p>
          <p style="margin:0 0 14px;font-size:13px;color:#888;">Start pulling this together when you can — the faster I have it, the faster we move:</p>
          ${checkItem('Logo files — PNG or SVG preferred (highest quality you have)')}
          ${checkItem('Brand colours — hex codes if you know them, otherwise a few reference images')}
          ${checkItem('Copy / text for each page — don\'t stress if it\'s rough, we can refine it')}
          ${checkItem('Photos or images — high resolution, or let me know if you need help sourcing')}
          ${checkItem('2–3 websites you like the look of — gives me a feel for your taste')}
          ${checkItem('Domain login details — if you already have a domain registered')}
        </div>

        <div style="margin-bottom:32px;">
          <p style="margin:0 0 6px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">GitHub Setup <span style="color:#555;font-weight:400;text-transform:none;letter-spacing:0;">(optional)</span></p>
          <p style="margin:0 0 16px;font-size:13px;color:#888;line-height:1.7;">
            If you'd like full ownership of your site's code under your own GitHub account, the video below walks you through setting one up and inviting me as a collaborator.
            <strong style="color:#f0ece2;">Totally optional</strong> — if you'd prefer I handle it and transfer everything to you later, just say the word.
          </p>
          <a href="https://wilsoncreativeco.au/watch" style="display:block;position:relative;text-decoration:none;border-radius:6px;overflow:hidden;border:1px solid #1e1e1e;">
            <img src="https://wilsoncreativeco.au/github-setup-thumb.jpg" alt="GitHub Setup Guide" style="width:100%;display:block;" />
            <div style="position:absolute;inset:0;background:rgba(7,6,10,.45);display:flex;align-items:center;justify-content:center;">
              <div style="width:56px;height:56px;background:#c5a44a;border-radius:50%;display:flex;align-items:center;justify-content:center;">
                <div style="width:0;height:0;border-top:10px solid transparent;border-bottom:10px solid transparent;border-left:18px solid #07060a;margin-left:4px;"></div>
              </div>
            </div>
            <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(7,6,10,.85));padding:16px 18px;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#f0ece2;">GitHub Setup Guide</p>
              <p style="margin:2px 0 0;font-size:11px;color:#aaa;">Watch · wilsoncreativeco.au/watch</p>
            </div>
          </a>
        </div>

        <div style="background:#0b0a0e;border:1px solid #1e1e1e;border-radius:6px;padding:20px 24px;margin-bottom:32px;">
          <p style="margin:0 0 14px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">Your Project</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:9px 0;border-bottom:1px solid #1e1e1e;color:#888;width:110px;font-size:13px;">Business</td><td style="padding:9px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">Smith & Co. Café</td></tr>
            <tr><td style="padding:9px 0;border-bottom:1px solid #1e1e1e;color:#888;font-size:13px;">Package</td><td style="padding:9px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">Growth</td></tr>
            <tr><td style="padding:9px 0;color:#888;font-size:13px;">Timeline</td><td style="padding:9px 0;color:#f0ece2;font-size:13px;">~ 1 Month</td></tr>
          </table>
        </div>

        <div style="border-top:1px solid #1e1e1e;padding-top:28px;">
          <p style="margin:0 0 6px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">Reach Me Directly</p>
          <p style="margin:0 0 14px;font-size:13px;color:#888;line-height:1.7;">I keep communication simple — no ticketing systems, no waiting around. Just reach out directly and I'll get back to you fast.</p>
          <p style="margin:0 0 6px;font-size:13px;color:#f0ece2;">📧 <a href="mailto:wilsoncreativeco.au@gmail.com" style="color:#c5a44a;text-decoration:none;">wilsoncreativeco.au@gmail.com</a></p>
          <p style="margin:0 0 24px;font-size:13px;color:#f0ece2;">📱 <a href="tel:+61401609118" style="color:#c5a44a;text-decoration:none;">0401 609 118</a></p>
          <p style="margin:0;font-size:14px;color:#888;line-height:1.8;">
            Looking forward to building something great together.<br/>
            <strong style="color:#f0ece2;">— George</strong><br/>
            <span style="font-size:12px;color:#555;">Wilson Creative Co.</span>
          </p>
        </div>
      </div>
      ${darkFooter}
    </div>`,
  })

  return res.status(200).json({ ok: true })
}
