import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'

const TITLE = 'Privacy Policy | Wilson Creative Co.'
const DESC = 'How Wilson Creative Co. collects, uses and protects the personal information you share through wilsoncreativeco.au.'
const URL = 'https://wilsoncreativeco.au/privacy'

const SECTIONS = [
  {
    t: 'What we collect',
    d: 'When you book a call, send an enquiry or email us, we collect the details you choose to give us — typically your name, email address, phone number, business name and whatever you tell us about your project. We do not ask for, or store, payment card details on this website.',
  },
  {
    t: 'Why we collect it',
    d: 'Only to respond to you and deliver the work you have asked about: replying to your enquiry, quoting, scheduling shoots and keeping in touch about your project. We do not sell your information, and we do not add you to marketing lists you did not ask for.',
  },
  {
    t: 'How it reaches us',
    d: 'Enquiry forms on this site are delivered to our inbox by Resend, our email provider. Calls are booked through Cal.com, which handles the scheduling. The site is hosted by Vercel. Each of these providers processes your details only to provide that service to us.',
  },
  {
    t: 'Analytics',
    d: 'We use privacy-friendly analytics to understand which pages people visit and how they found us. It measures traffic in aggregate — it does not use advertising cookies, does not track you across other websites, and does not build a profile of you.',
  },
  {
    t: 'How long we keep it',
    d: 'Enquiry emails and project correspondence are kept for as long as we need them for the work and our business records. If you would like your details removed, email us and we will delete them.',
  },
  {
    t: 'Your footage & photos',
    d: 'Material we film or photograph for you is handled under the terms agreed for your project. We will always ask before using any of your work in our portfolio, on social media or on this website.',
  },
  {
    t: 'Access, corrections & complaints',
    d: 'You can ask us what personal information we hold about you, have it corrected, or have it deleted. Email wilsoncreativeco.au@gmail.com and we will respond promptly. If you are not satisfied with how we have handled your information, you can contact the Office of the Australian Information Commissioner at oaic.gov.au.',
  },
]

export default function Privacy() {
  const [booking, setBooking] = useState(false)
  const book = () => setBooking(true)
  useReveal()

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
      </Head>

      <SiteNav onBook={book} />

      <main>
        <header className="page-top legal-top">
          <div className="lane-mark rv">
            <span className="lane-idx">Legal</span>
            <span className="lane-div" aria-hidden="true" />
            <span className="lane-for">Wilson Creative Co.</span>
          </div>
          <h1 className="page-h1 rv d1">Privacy <em>policy</em></h1>
          <p className="page-lead rv d2">
            Plain English, no fine print. This is what we collect when you get in touch, why we
            collect it, and what we do with it.
          </p>
          <p className="legal-updated rv d3">Last updated 25 July 2026</p>
        </header>

        <section className="secpad" aria-label="Privacy policy details">
          <div className="legal-body">
            {SECTIONS.map((s, i) => (
              <article className="legal-block rv" key={s.t} style={{ transitionDelay: `${(0.04 + i * 0.04).toFixed(2)}s` }}>
                <h2 className="legal-h">{s.t}</h2>
                <p className="legal-p">{s.d}</p>
              </article>
            ))}
            <article className="legal-block rv">
              <h2 className="legal-h">Contact</h2>
              <p className="legal-p">
                Wilson Creative Co. — Brisbane, QLD, Australia. ABN 99 664 433 447.<br />
                <a className="legal-link" href="mailto:wilsoncreativeco.au@gmail.com">wilsoncreativeco.au@gmail.com</a> · <a className="legal-link" href="tel:+61401609118">0401 609 118</a>
              </p>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  )
}
