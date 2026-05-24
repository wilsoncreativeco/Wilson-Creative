import Stripe from 'stripe'
import { Resend } from 'resend'
import { darkHeader, darkFooter } from './_welcome-email.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend  = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { clientName, clientEmail, business, siteUrl, balanceAmount,
          pages, features, personalNote } = req.body

  if (!clientName || !clientEmail || !balanceAmount) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const firstName   = clientName.split(' ')[0]
  const amountCents = Math.round(parseFloat(balanceAmount) * 100)
  const amountFmt   = `$${parseFloat(balanceAmount).toLocaleString('en-AU', { minimumFractionDigits: 0 })}`

  // ── Stripe balance payment link ──────────────────────────────────────────────
  let paymentUrl
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: clientEmail,
      line_items: [{
        price_data: {
          currency: 'aud',
          product_data: {
            name: `Website Balance Payment — ${business}`,
            description: `Final balance payment. Site goes live upon receipt.`,
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://wilsoncreativeco.au/?launched=1',
      cancel_url:  'https://wilsoncreativeco.au/',
      metadata: {
        type:         'balance',
        client_name:  clientName,
        business,
        site_url:     siteUrl || '',
        pages:        pages || '',
        features:     features || '',
        personal_note: personalNote || '',
      },
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 23,
    })
    paymentUrl = session.url
  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: 'Failed to create payment link' })
  }

  // ── Email to client ──────────────────────────────────────────────────────────
  const clientHtml = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
      ${darkHeader}
      <div style="padding:36px 32px;">

        <h1 style="margin:0 0 8px;font-size:26px;color:#f0ece2;font-weight:700;line-height:1.2;">Your site is ready, ${firstName}.</h1>
        <p style="margin:0 0 28px;font-size:15px;color:#888;line-height:1.8;">
          ${personalNote
            ? `${personalNote}`
            : `It's been a pleasure working on this — the site is looking sharp and I'm proud of what we've built. One last step and you're live.`
          }
        </p>

        <!-- Balance payment -->
        <div style="text-align:center;background:#0b0a0e;border:1px solid #1e1e1e;border-radius:6px;padding:32px 24px;margin-bottom:32px;">
          <p style="margin:0 0 4px;font-size:13px;color:#888;">Final balance to go live</p>
          <p style="margin:0 0 20px;font-size:36px;font-weight:700;color:#f0ece2;letter-spacing:-.5px;">${amountFmt}</p>
          <a href="${paymentUrl}" style="display:inline-block;background:#c5a44a;color:#07060a;font-size:14px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:4px;letter-spacing:.04em;">Pay Balance & Go Live →</a>
          <p style="margin:12px 0 0;font-size:11px;color:#555;">Secure payment via Stripe · Site launches immediately after payment</p>
        </div>

        <!-- What was delivered -->
        ${pages || features ? `
        <div style="background:#0b0a0e;border:1px solid #1e1e1e;border-radius:6px;padding:22px 24px;margin-bottom:32px;">
          <p style="margin:0 0 14px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">What We Built</p>
          <table style="width:100%;border-collapse:collapse;">
            ${pages ? `<tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#888;width:110px;font-size:13px;vertical-align:top;">Pages</td><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#f0ece2;font-size:13px;line-height:1.6;">${pages}</td></tr>` : ''}
            ${features ? `<tr><td style="padding:10px 0;color:#888;font-size:13px;vertical-align:top;">Features</td><td style="padding:10px 0;color:#f0ece2;font-size:13px;line-height:1.6;">${features}</td></tr>` : ''}
          </table>
        </div>` : ''}

        <!-- What happens after payment -->
        <div style="margin-bottom:32px;">
          <p style="margin:0 0 16px;font-size:12px;color:#c5a44a;letter-spacing:.1em;text-transform:uppercase;font-weight:700;">What Happens Next</p>
          <div style="display:flex;gap:20px;margin-bottom:16px;align-items:flex-start;">
            <span style="font-size:11px;font-weight:700;color:#c5a44a;letter-spacing:.06em;padding-top:2px;min-width:22px;">01</span>
            <div style="border-left:1px solid #2a2a2a;padding-left:18px;">
              <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#f0ece2;">Pay the balance</p>
              <p style="margin:0;font-size:13px;color:#888;line-height:1.6;">Use the button above — takes 2 minutes via Stripe.</p>
            </div>
          </div>
          <div style="display:flex;gap:20px;margin-bottom:16px;align-items:flex-start;">
            <span style="font-size:11px;font-weight:700;color:#c5a44a;letter-spacing:.06em;padding-top:2px;min-width:22px;">02</span>
            <div style="border-left:1px solid #2a2a2a;padding-left:18px;">
              <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#f0ece2;">Site goes live</p>
              <p style="margin:0;font-size:13px;color:#888;line-height:1.6;">I'll point your domain and push everything live. Usually within the hour.</p>
            </div>
          </div>
          <div style="display:flex;gap:20px;align-items:flex-start;">
            <span style="font-size:11px;font-weight:700;color:#c5a44a;letter-spacing:.06em;padding-top:2px;min-width:22px;">03</span>
            <div style="border-left:1px solid #2a2a2a;padding-left:18px;">
              <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#f0ece2;">Handover</p>
              <p style="margin:0;font-size:13px;color:#888;line-height:1.6;">You'll receive a full handover email with everything you need — logins, how to update content, next steps.</p>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div style="border-top:1px solid #1e1e1e;padding-top:24px;">
          <p style="margin:0 0 14px;font-size:13px;color:#888;line-height:1.7;">Any questions before paying, just reach out directly.</p>
          <p style="margin:0 0 4px;font-size:13px;color:#f0ece2;">📧 <a href="mailto:wilsoncreativeco.au@gmail.com" style="color:#c5a44a;text-decoration:none;">wilsoncreativeco.au@gmail.com</a></p>
          <p style="margin:0 0 20px;font-size:13px;color:#f0ece2;">📱 <a href="tel:+61401609118" style="color:#c5a44a;text-decoration:none;">0401 609 118</a></p>
          <p style="margin:0;font-size:14px;color:#888;line-height:1.8;">
            — <strong style="color:#f0ece2;">George</strong><br/>
            <span style="font-size:12px;color:#555;">Wilson Creative Co.</span>
          </p>
        </div>

      </div>
      ${darkFooter}
    </div>`

  // ── Notification to George ───────────────────────────────────────────────────
  const georgeHtml = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
      ${darkHeader}
      <div style="padding:28px 32px;">
        <h2 style="margin:0 0 6px;font-size:20px;color:#f0ece2;">Finalisation Sent ✦</h2>
        <p style="margin:0 0 20px;font-size:13px;color:#888;">Balance payment link sent to client. Waiting on payment.</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#888;width:110px;font-size:13px;">Client</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">${clientName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#888;font-size:13px;">Business</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">${business}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#888;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#c5a44a;font-size:13px;">${clientEmail}</td></tr>
          <tr><td style="padding:10px 0;color:#888;font-size:13px;">Balance</td><td style="padding:10px 0;color:#f0ece2;font-size:13px;font-weight:600;">${amountFmt}</td></tr>
        </table>
      </div>
      ${darkFooter}
    </div>`

  try {
    await Promise.all([
      resend.emails.send({
        from:    'George — Wilson Creative Co. <contact@wilsoncreativeco.au>',
        to:      clientEmail,
        subject: `Your site is ready, ${firstName} — one last step.`,
        html:    clientHtml,
      }),
      resend.emails.send({
        from:    'Wilson Creative Co <contact@wilsoncreativeco.au>',
        to:      'wilsoncreativeco.au@gmail.com',
        subject: `Finalisation sent — ${clientName} (${business}) · ${amountFmt} balance`,
        html:    georgeHtml,
      }),
    ])

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Email error:', err)
    return res.status(500).json({ error: 'Failed to send' })
  }
}
