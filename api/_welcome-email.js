// Shared welcome email builder — used by webhook.js and test-welcome.js

const PACKAGE_NAMES = {
  starter: 'Starter',
  growth:  'Growth',
  premium: 'Premium',
}

const TIMELINE_LABELS = {
  asap:     'ASAP',
  '1month':  '~ 1 Month',
  '2months': '1–2 Months',
  flexible:  'Flexible',
}

export const darkHeader = `
  <div style="background:#07060a;padding:24px 32px;border-bottom:1px solid #1e1e1e;">
    <p style="margin:0;font-size:17px;font-weight:600;color:#f0ece2;letter-spacing:0.4px;font-family:sans-serif;">
      Wilson <span style="color:#c5a44a;">Creative</span> Co.
    </p>
  </div>`

export const darkFooter = `
  <div style="background:#0b0a0e;padding:14px 32px;border-top:1px solid #1e1e1e;">
    <p style="margin:0;font-size:11px;color:#555;">ABN 99 664 433 447 · Brisbane, QLD, Australia · wilsoncreativeco.au</p>
  </div>`

function step(num, title, body) {
  const n = String(num).padStart(2, '0')
  return `
    <div style="display:flex;gap:20px;margin-bottom:22px;align-items:flex-start;">
      <span style="font-size:11px;font-weight:700;color:#c5a44a;letter-spacing:.06em;padding-top:3px;min-width:22px;flex-shrink:0;">${n}</span>
      <div style="border-left:1px solid #2a2a2a;padding-left:18px;flex:1;">
        <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#f0ece2;">${title}</p>
        <p style="margin:0;font-size:13px;color:#888;line-height:1.65;">${body}</p>
      </div>
    </div>`
}

export function buildWelcomeEmail({ firstName, business, packageId, timeline }) {
  const pkgName = PACKAGE_NAMES[packageId] || 'Custom'
  const tlLabel = TIMELINE_LABELS[timeline] || timeline
  const revisions = packageId === 'starter' ? '1 revision round' : packageId === 'growth' ? '3 revision rounds' : 'unlimited revision rounds'

  return `
  <div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
    ${darkHeader}
    <div style="padding:36px 32px;">

      <h1 style="margin:0 0 8px;font-size:26px;color:#f0ece2;font-weight:700;line-height:1.2;">Welcome aboard, ${firstName}.</h1>
      <p style="margin:0 0 28px;font-size:15px;color:#888;line-height:1.8;">
        Deposit received — you're officially locked in. I'm genuinely excited to work on this with you.
        This email has everything you need to know before we kick off, so give it a read and reach out if anything's unclear.
      </p>

      <!-- Process -->
      <div style="margin-bottom:32px;">
        <p style="margin:0 0 16px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">What Happens Next</p>
        ${step(1, 'Kickoff', 'I\'ll be in touch as soon as possible to run through your project, confirm the scope, and answer anything before we get moving.')}
        ${step(2, 'Design Brief', 'Fill out your design brief (link below) so I have everything I need to nail the look and feel from the start.')}
        ${step(3, 'Design', 'I\'ll put together the initial design concepts based on your brief. You\'ll see it and approve it before a single line of code is written.')}
        ${step(4, 'Build', 'Once design is locked in, I build the full site — clean code, fast load times, perfect on every device.')}
        ${step(5, 'Review', `You get your ${revisions} to go through everything. We dial it in together until it's exactly right.`)}
        ${step(6, 'Launch', 'Balance is settled, domain is pointed, site goes live. I handle the full launch — you just share the link.')}
      </div>

      <!-- Design brief CTA -->
      <div style="background:#0b0a0e;border:1px solid #2a2a2a;border-left:3px solid #c5a44a;border-radius:4px;padding:20px 24px;margin-bottom:32px;">
        <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#f0ece2;">Complete your design brief</p>
        <p style="margin:0 0 16px;font-size:13px;color:#888;line-height:1.6;">Takes about 5 minutes. Helps me get your design right first time — your style, your vibe, your content.</p>
        <a href="https://wilsoncreativeco.au/brief" style="display:inline-block;background:#c5a44a;color:#07060a;font-size:13px;font-weight:700;text-decoration:none;padding:11px 24px;border-radius:4px;letter-spacing:.04em;">Start Design Brief →</a>
      </div>

      <!-- What we need -->
      <div style="background:#0b0a0e;border:1px solid #1e1e1e;border-radius:6px;padding:22px 24px;margin-bottom:32px;">
        <p style="margin:0 0 6px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">What I Need From You</p>
        <p style="margin:0 0 18px;font-size:13px;color:#888;line-height:1.7;">Don't stress about having everything ready — I'll guide you through it all. But a head start helps:</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#f0ece2;font-size:13px;font-weight:500;width:42%;">Your logo</td><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px;">Any format — we'll work with what you have</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#f0ece2;font-size:13px;font-weight:500;">Photos & images</td><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px;">Business, team, product — the more the better</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#f0ece2;font-size:13px;font-weight:500;">Sites you love</td><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#888;font-size:13px;">2–3 examples gives me a feel for your taste</td></tr>
          <tr><td style="padding:10px 0;color:#f0ece2;font-size:13px;font-weight:500;">Domain details</td><td style="padding:10px 0;color:#888;font-size:13px;">Login to wherever your domain is registered</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;color:#555;">No logo yet? No copy written? No problem — I can help with all of it.</p>
      </div>

      <!-- GitHub -->
      <div style="margin-bottom:32px;">
        <p style="margin:0 0 6px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">GitHub — Your Code, Your Ownership <span style="color:#555;font-weight:400;text-transform:none;letter-spacing:0;">(optional)</span></p>
        <p style="margin:0 0 10px;font-size:13px;color:#888;line-height:1.7;">
          Think of GitHub like Google Drive, but for your website's code. It's where everything lives — every page, every update, the full history of your site. Having it under your own account means <strong style="color:#f0ece2;">you own it completely</strong>. You're not tied to us, you can take it anywhere, and nothing gets lost.
        </p>
        <p style="margin:0 0 16px;font-size:13px;color:#888;line-height:1.7;">
          The video below walks you through setting up a free account and inviting me as a collaborator. <strong style="color:#f0ece2;">Totally optional</strong> — if you'd rather skip it, we can transfer full ownership to you at any point.
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

      <!-- Project summary -->
      <div style="background:#0b0a0e;border:1px solid #1e1e1e;border-radius:6px;padding:20px 24px;margin-bottom:32px;">
        <p style="margin:0 0 14px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">Your Project</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:9px 0;border-bottom:1px solid #1e1e1e;color:#888;width:110px;font-size:13px;">Business</td><td style="padding:9px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">${business}</td></tr>
          <tr><td style="padding:9px 0;border-bottom:1px solid #1e1e1e;color:#888;font-size:13px;">Package</td><td style="padding:9px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">${pkgName}</td></tr>
          <tr><td style="padding:9px 0;color:#888;font-size:13px;">Timeline</td><td style="padding:9px 0;color:#f0ece2;font-size:13px;">${tlLabel}</td></tr>
        </table>
      </div>

      <!-- Contact -->
      <div style="border-top:1px solid #1e1e1e;padding-top:28px;">
        <p style="margin:0 0 6px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">Reach Me Directly</p>
        <p style="margin:0 0 14px;font-size:13px;color:#888;line-height:1.7;">No ticketing systems, no waiting around — just reach out directly and I'll get back to you fast.</p>
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
  </div>`
}
