// !! REMOVE THIS FILE BEFORE GOING LIVE !!
// Quick preview endpoint — fires welcome email with dummy data
// Usage: curl -X POST https://wilsoncreativeco.au/api/test-welcome

import { Resend } from 'resend'
import { buildWelcomeEmail } from './_welcome-email.js'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  await resend.emails.send({
    from:    'George — Wilson Creative Co. <contact@wilsoncreativeco.au>',
    to:      'wilsoncreativeco.au@gmail.com',
    subject: '[PREVIEW] Welcome aboard, Jane — let\'s get started.',
    html:    buildWelcomeEmail({
      firstName: 'Jane',
      business:  'Smith & Co. Café',
      packageId: 'growth',
      timeline:  '1month',
    }),
  })

  return res.status(200).json({ ok: true })
}
