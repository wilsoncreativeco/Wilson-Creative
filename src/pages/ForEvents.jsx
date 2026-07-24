import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'
import { services, eventTypes } from '../data/offerings'

const TITLE = 'Event Videography & Photography in Brisbane | Weddings, Corporate & Live — Wilson Creative Co.'
const DESC = 'Cinematic event films, photography and aerial coverage for Brisbane weddings, parties, corporate events and live performances — shot and edited in-house. Relive the day, not just remember it.'
const URL = 'https://www.wilsoncreativeco.au/for-events'

export default function ForEvents() {
  const [booking, setBooking] = useState(false)
  const book = () => setBooking(true)
  useReveal()

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="event videography Brisbane, wedding videography Brisbane, wedding photography Brisbane, corporate event video Brisbane, conference filming Brisbane, party photography Brisbane, live event coverage Brisbane, aerial event drone Brisbane" />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.wilsoncreativeco.au/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.wilsoncreativeco.au' },
            { '@type': 'ListItem', position: 2, name: 'For Events', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Event Videography & Photography',
          serviceType: 'Wedding, corporate, party & live event film and photography',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://www.wilsoncreativeco.au' },
          areaServed: [{ '@type': 'City', name: 'Brisbane' }, { '@type': 'Country', name: 'Australia' }],
          description: DESC,
          url: URL,
        })}</script>
      </Head>

      <SiteNav onBook={book} />

      <main>
        <header className="page-top">
          <div className="lane-mark rv">
            <span className="lane-idx">For Events</span>
            <span className="lane-div" aria-hidden="true" />
            <span className="lane-for">Film · Photo · Aerial</span>
          </div>
          <h1 className="page-h1 rv d1">Relive the day —<br /><em>not just remember it.</em></h1>
          <p className="page-lead rv d2">
            Weddings, celebrations, corporate and live — captured in cinema. We film and shoot
            the moments you&apos;ll want to feel again, then cut them into something you&apos;ll
            watch for years.
          </p>
          <div className="page-cta rv d3">
            <button className="btn-g" onClick={book}>Book a Call →</button>
            <a className="btn-o" href="#offerings">See what we cover →</a>
          </div>
        </header>

        {/* ── What we bring ── */}
        <section className="secpad" aria-labelledby="ev-svc-h2">
          <div className="lane-head">
            <p className="stag rv">What We Bring</p>
            <h2 className="sh2 rv d1" id="ev-svc-h2">Cinema, <em>on your day</em></h2>
            <p className="lane-sub rv d2">
              A calm, unobtrusive crew with cinema cameras, editorial photography and licensed
              aerial — so every angle of the day is covered without you ever feeling filmed.
            </p>
          </div>
          <div className="ind-grid ind-grid-4">
            {services.filter(s => s.tag !== 'Web').map((s, i) => (
              <article className="ind-card rv" key={s.num} style={{ transitionDelay: `${(0.05 + i * 0.06).toFixed(2)}s` }}>
                <span className="ind-num" aria-hidden="true">{s.num} — {s.tag}</span>
                <h3 className="ind-t">{s.name}</h3>
                <p className="ind-line">{s.line}</p>
                <p className="ind-d">{s.desc}</p>
                <ul className="ind-tags" aria-label="Deliverables">
                  {s.deliverables.map(d => <li key={d}>{d}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Event types ── */}
        <section id="offerings" className="secpad lane-biz" aria-labelledby="ev-type-h2">
          <div className="lane-head">
            <p className="stag rv">Every Kind Of Event</p>
            <h2 className="sh2 rv d1" id="ev-type-h2">Made for <em>the moment</em></h2>
            <p className="lane-sub rv d2">
              However big or intimate, we tune the crew, the kit and the edit to the feeling of
              your day — here&apos;s how that looks across the events we cover most.
            </p>
          </div>
          <div className="ind-grid ind-grid-4">
            {eventTypes.map((it, i) => (
              <article
                className="ind-card rv"
                key={it.t}
                style={{ transitionDelay: `${(0.05 + i * 0.06).toFixed(2)}s` }}
              >
                <span className="ind-num" aria-hidden="true">{it.n}</span>
                <h3 className="ind-t">{it.t}</h3>
                <p className="ind-d">{it.d}</p>
                <ul className="ind-tags" aria-label="Coverage included">
                  {it.tags.map(tg => <li key={tg}>{tg}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Selected work (graceful) ── */}
        <section className="secpad" aria-labelledby="ev-work-h2">
          <div className="lane-head">
            <p className="stag rv">Selected Work</p>
            <h2 className="sh2 rv d1" id="ev-work-h2">Proof, <em>not promises</em></h2>
            <p className="lane-sub rv d2">
              A fresh reel of films and galleries is on its way. Planning something soon and want
              to see coverage like yours? Ask on your call — we&apos;ll show you the closest fits.
            </p>
          </div>
          <div className="page-cta rv d2">
            <button className="btn-g" onClick={book}>Book a Call →</button>
          </div>
        </section>

        {/* ── Soft pricing anchor ── */}
        <section className="secpad" aria-labelledby="ev-price-h2">
          <h2 id="ev-price-h2" className="sr-only">Pricing</h2>
          <div className="lane-cta rv">
            <div className="lane-anchor">
              <span className="la-k">Coverage from</span>
              <span className="la-fig">$1,200</span>
              <span className="la-note">
                Tailored to your day — most events land on a half-day, full-day or film-and-photo
                package. Book a call for a quote built around you.
              </span>
            </div>
            <div className="lane-cta-btns">
              <button className="btn-g" onClick={book}>Book a Call →</button>
              <a className="btn-o" href="/for-businesses">For Businesses →</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  )
}
