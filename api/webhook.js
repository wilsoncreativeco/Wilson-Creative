import Stripe from 'stripe'
import { Resend } from 'resend'
import { buildWelcomeEmail, darkHeader, darkFooter } from './_welcome-email.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend  = new Resend(process.env.RESEND_API_KEY)

const PACKAGE_NAMES = {
  starter: 'Starter',
  growth:  'Growth',
  premium: 'Premium',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig    = req.headers['stripe-signature']
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  let event

  try {
    const rawBody = await getRawBody(req)
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true })
  }

  const session   = event.data.object
  const email     = session.customer_email
  const meta      = session.metadata || {}
  const firstName = (meta.client_name || '').split(' ')[0] || 'there'
  const business  = meta.business  || ''
  const packageId = meta.package   || ''
  const timeline  = meta.timeline  || ''

  if (!email) {
    console.error('No customer email in session')
    return res.status(200).json({ received: true })
  }

  try {
    await Promise.all([
      resend.emails.send({
        from:    'George — Wilson Creative Co. <contact@wilsoncreativeco.au>',
        to:      email,
        subject: `Welcome aboard, ${firstName} — let's get started.`,
        html:    buildWelcomeEmail({ firstName, business, packageId, timeline }),
      }),
      resend.emails.send({
        from:    'Wilson Creative Co <contact@wilsoncreativeco.au>',
        to:      'wilsoncreativeco.au@gmail.com',
        subject: `💰 Deposit paid — ${meta.client_name} (${business}) · ${PACKAGE_NAMES[packageId] || packageId}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0f0e13;border:1px solid #1e1e1e;border-radius:8px;overflow:hidden;">
            ${darkHeader}
            <div style="padding:28px 32px;">
              <h2 style="margin:0 0 6px;font-size:20px;color:#f0ece2;">Deposit Paid ✦</h2>
              <p style="margin:0 0 20px;font-size:13px;color:#888;">Stripe confirmed payment. Welcome pack sent to client automatically.</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#888;width:110px;font-size:13px;">Client</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">${meta.client_name}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#888;font-size:13px;">Business</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">${business}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#888;font-size:13px;">Package</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#f0ece2;font-size:13px;">${PACKAGE_NAMES[packageId] || packageId}</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#888;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#c5a44a;font-size:13px;">${email}</td></tr>
                <tr><td style="padding:10px 0;color:#888;font-size:13px;">Phone</td><td style="padding:10px 0;color:#f0ece2;font-size:13px;">${meta.phone || '—'}</td></tr>
              </table>
            </div>
            ${darkFooter}
          </div>`,
      }),
    ])

    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('Email send error:', err)
    return res.status(500).json({ error: 'Failed to send welcome email' })
  }
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end',  () => resolve(data))
    req.on('error', reject)
  })
}
