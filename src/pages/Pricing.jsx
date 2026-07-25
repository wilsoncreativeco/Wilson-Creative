import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'

/**
 * Unlisted rate card — /pricing.
 * Deliberately noindex + absent from the nav, footer and sitemap: this exists to
 * be sent directly to a client during a conversation, not to be found in search.
 */

const GROUPS = [
  {
    k: 'Film & Video',
    note: 'Every film is delivered graded, mixed and ready to publish — with vertical cutdowns included, not quoted as an extra.',
    rows: [
      { n: 'Social Content & Reels', d: '1 hero reel (30–60s), 2× 15s cuts, captions, 2 revisions.', p: '750', mkt: '900–1,400' },
      { n: 'Half-Day Shoot', d: 'Up to 4 hours on location, one operator, graded edit + 2 social cuts.', p: '1,200', mkt: '1,500–2,200' },
      { n: 'Brand Film & Commercial', d: 'Full shoot day, aerial included, colour grade — master film + 2 social cuts.', p: '2,200', mkt: '3,000–6,000' },
      { n: 'Multi-Location / Multi-Day', d: 'Two or more days, scripted structure, full deliverable family.', p: '3,800+', mkt: '5,000–9,000' },
    ],
  },
  {
    k: 'Photography',
    note: 'All photography is delivered fully retouched with full commercial usage rights.',
    rows: [
      { n: 'Corporate Headshots', d: 'Up to 5 people, 3 retouched finals each. +$90 per additional person.', p: '550', mkt: '700–900' },
      { n: 'Brand & Product Shoot', d: '25+ edited images, 3-hour session, full commercial rights.', p: '850', mkt: '1,000–1,500' },
      { n: 'Interiors & Property', d: '20+ edited images, natural + flash blend, listing-ready.', p: '650', mkt: '800–1,200' },
      { n: 'Event Photography', d: 'Up to 4 hours, 100+ edited images, 5-day delivery.', p: '900', mkt: '1,100–1,600' },
    ],
  },
  {
    k: 'Aerial — CASA Licensed',
    note: 'Flown under a current CASA remote pilot licence, with airspace clearance handled before the day.',
    rows: [
      { n: 'Aerial Photography', d: '15+ edited stills, flown with NOTAM clearance where required.', p: '650', mkt: '800–1,200' },
      { n: 'Aerial Photo + Video', d: '15+ stills plus a 60-second cinematic aerial clip.', p: '950', mkt: '1,200–1,800' },
      { n: 'Site Milestone Visit', d: 'Construction milestone capture — drone included, 25+ images.', p: '550', mkt: '700–1,000' },
    ],
  },
  {
    k: 'Weddings & Events',
    note: 'Coverage hours are the real driver here. We would rather talk through your run sheet than sell you a package that ends before the speeches.',
    rows: [
      { n: 'Half-Day Wedding Film', d: 'Up to 5 hours, one operator, 3–5 min highlight film.', p: '1,200', mkt: '1,500–2,200' },
      { n: 'Full-Day Wedding Film', d: 'Up to 10 hours, highlight film + full ceremony & speeches edit.', p: '2,400', mkt: '2,800–4,000' },
      { n: 'Wedding Film + Photography', d: 'Full-day coverage, both crafts, one team. Highlight film + full gallery.', p: '3,200', mkt: '4,000–6,500' },
      { n: 'Corporate Event / Conference', d: 'Up to 6 hours, recap film + speaker coverage + stills.', p: '1,400', mkt: '1,800–3,000' },
      { n: 'Party & Celebration', d: 'Up to 4 hours, recap film and candid gallery.', p: '1,100', mkt: '1,300–2,000' },
    ],
  },
  {
    k: 'Ongoing Retainers',
    note: 'Retainer clients get priority booking and faster turnarounds. Minimum three-month term, then month to month.',
    rows: [
      { n: 'Progress Documentation', d: '2 site visits monthly, drone each visit, 50+ images.', p: '1,100/mo', mkt: '1,400–2,000' },
      { n: 'Content Retainer', d: 'Half-day shoot monthly — 15 photos, 2 reels, captions.', p: '1,400/mo', mkt: '1,800–2,800' },
      { n: 'Media + Web Retainer', d: 'Content retainer plus monthly site updates and a quarterly brand film.', p: '2,800/mo', mkt: '3,500–5,000' },
    ],
  },
  {
    k: 'Web',
    note: 'Custom-coded, no page builders. You own the code and the domain outright on delivery.',
    rows: [
      { n: 'Starter Site', d: 'Single-page site, mobile-first, SEO foundations.', p: '600', mkt: '1,200–2,500' },
      { n: 'Growth Site', d: 'Multi-page build, CMS, full on-page SEO.', p: '1,000', mkt: '2,500–5,000' },
      { n: 'Premium Build', d: 'E-commerce, bookings or custom functionality.', p: '2,000+', mkt: '5,000–12,000' },
      { n: 'Managed Hosting', d: 'Hosting, SSL, backups, updates and small edits.', p: '25/mo', mkt: '50–120' },
    ],
  },
]

const TERMS = [
  { k: 'Deposit', v: '30% to lock the date, balance on delivery. Weddings: 20% deposit, balance two weeks before the day.' },
  { k: 'Travel', v: 'Included within 50km of Brisbane CBD. Beyond that, $0.95/km or a flat day rate for regional work.' },
  { k: 'Turnaround', v: 'Photography 5–7 days. Film 2–3 weeks. Weddings 4–6 weeks. Rush delivery available at +30%.' },
  { k: 'Revisions', v: 'Two rounds included on every edit. Additional rounds $120 each.' },
  { k: 'Raw Footage', v: 'Available on request — $300 per shoot day, delivered on your drive.' },
  { k: 'Usage Rights', v: 'Full commercial rights included. We only use your work in our portfolio with your say-so.' },
  { k: 'Bundles', v: 'Combining two or more services in one booking saves $200 or more, depending on scope.' },
]

export default function Pricing() {
  const [booking, setBooking] = useState(false)
  const book = () => setBooking(true)
  useReveal()

  return (
    <>
      <Head>
        <title>Rate Card | Wilson Creative Co.</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Wilson Creative Co. rate card." />
      </Head>

      <SiteNav onBook={book} />

      <main>
        <header className="page-top legal-top">
          <div className="lane-mark rv">
            <span className="lane-idx">Rate Card</span>
            <span className="lane-div" aria-hidden="true" />
            <span className="lane-for">2026 · Brisbane</span>
          </div>
          <h1 className="page-h1 rv d1">What things <em>cost.</em></h1>
          <p className="page-lead rv d2">
            Honest guide pricing across everything we make. Every project is still quoted to its
            own scope — but this is the range you can plan around, and it sits deliberately under
            what most Brisbane studios charge for comparable work.
          </p>
        </header>

        <section className="secpad" aria-label="Rate card">
          <div className="rate-wrap">
            {GROUPS.map((g, gi) => (
              <div className="rate-group rv" key={g.k} style={{ transitionDelay: `${(0.04 + gi * 0.04).toFixed(2)}s` }}>
                <div className="rate-head">
                  <h2 className="rate-k">{g.k}</h2>
                  <p className="rate-note">{g.note}</p>
                </div>
                <div className="rate-rows">
                  <div className="rate-row rate-row-h" aria-hidden="true">
                    <span>Service</span>
                    <span className="rate-mkt-c">Brisbane market</span>
                    <span className="rate-p-c">Our rate</span>
                  </div>
                  {g.rows.map(r => (
                    <div className="rate-row" key={r.n}>
                      <span className="rate-n">
                        <strong>{r.n}</strong>
                        <em>{r.d}</em>
                      </span>
                      <span className="rate-mkt">${r.mkt}</span>
                      <span className="rate-p">${r.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rate-group rv">
              <div className="rate-head">
                <h2 className="rate-k">The Fine Print</h2>
                <p className="rate-note">No padded packages, no surprise line items.</p>
              </div>
              <div className="rate-terms">
                {TERMS.map(t => (
                  <div className="rate-term" key={t.k}>
                    <span className="rate-term-k">{t.k}</span>
                    <p>{t.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="retainer rv rate-cta">
              <p className="ret-k">Built Around You</p>
              <p className="ret-line">Nothing here is a package you have to squeeze into — tell us the brief and we&apos;ll price <em>the actual job.</em></p>
              <div className="page-cta" style={{ justifyContent: 'center', marginTop: 26 }}>
                <button className="btn-g" onClick={book}>Book a Call →</button>
                <button className="btn-o" onClick={() => window.dispatchEvent(new CustomEvent('wc:contact'))}>Contact Us →</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  )
}
