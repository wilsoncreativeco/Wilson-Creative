import { useState, useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'
import useLazyVideo from '../components/useLazyVideo'
import { services, eventTypes } from '../data/offerings'

// cinematic poster media for each craft tile (no Web on events)
const CRAFT_MEDIA = {
  '01': { video: '/hero.mp4' },
  '02': { img: '/brisbane.jpg', w: 1800, h: 2400 },
  '03': { video: '/hero-drone-m.mp4', poster: '/hero-drone.jpg' },
}

const TITLE = 'Event Videography & Photography in Brisbane | Weddings, Corporate & Live — Wilson Creative Co.'
const DESC = 'Cinematic event films, photography and aerial coverage for Brisbane weddings, parties, corporate events and live performances — shot and edited in-house. Relive the day, not just remember it.'
const URL = 'https://wilsoncreativeco.au/for-events'

export default function ForEvents() {
  const [booking, setBooking] = useState(false)
  const [ind, setInd] = useState(null)
  const book = () => setBooking(true)
  useReveal()
  useLazyVideo()

  // Event-type modal: lock scroll while open; close on Escape.
  useEffect(() => {
    if (!ind) return
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') setInd(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [ind])

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
        <meta property="og:image" content="https://wilsoncreativeco.au/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wilsoncreativeco.au' },
            { '@type': 'ListItem', position: 2, name: 'For Events', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Event Videography & Photography',
          serviceType: 'Wedding, corporate, party & live event film and photography',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://wilsoncreativeco.au' },
          areaServed: [{ '@type': 'City', name: 'Brisbane' }, { '@type': 'Country', name: 'Australia' }],
          description: DESC,
          url: URL,
        })}</script>
      </Head>

      <SiteNav onBook={book} />

      <main>
        <header className="page-top biz-hero">
          <div className="page-top-bg" aria-hidden="true" />
          <div className="h-grain" aria-hidden="true" />
          <div className="page-top-inner">
            <div className="lane-mark rv">
              <span className="lane-idx">For Events</span>
              <span className="lane-div" aria-hidden="true" />
              <span className="lane-for">Film · Photo · Aerial</span>
            </div>
            <h1 className="page-h1 rv d1">Relive the day — <em>not just remember it.</em></h1>
            <p className="page-lead rv d2">
              Weddings, celebrations, corporate and live — captured in cinema. We film and shoot
              the moments you&apos;ll want to feel again, then cut them into something you&apos;ll
              watch for years.
            </p>
            <div className="page-cta rv d3">
              <button className="btn-g" onClick={book}>Book a Call →</button>
              <a className="btn-o" href="#offerings">See what we cover →</a>
            </div>
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
          <div className="craft-grid craft-grid-3">
            {services.filter(s => s.tag !== 'Web').map((s, i) => (
              <article className="craft-tile rv" key={s.num} style={{ transitionDelay: `${(0.05 + i * 0.06).toFixed(2)}s` }}>
                <div className="craft-media" aria-hidden="true">
                  {CRAFT_MEDIA[s.num]?.video
                    ? <video src={CRAFT_MEDIA[s.num].video} poster={CRAFT_MEDIA[s.num].poster} autoPlay muted loop playsInline preload="metadata" />
                    : <img src={CRAFT_MEDIA[s.num]?.img} alt="" loading="lazy" width={CRAFT_MEDIA[s.num]?.w} height={CRAFT_MEDIA[s.num]?.h} />}
                </div>
                <div className="craft-scrim" aria-hidden="true" />
                <div className="craft-info">
                  <span className="craft-num" aria-hidden="true">{s.num} — {s.tag}</span>
                  <h3 className="craft-name">{s.name}</h3>
                  <p className="craft-line">{s.line}</p>
                </div>
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
          <div className="indy-index">
            {eventTypes.map((it, i) => (
              <button
                type="button"
                className="indy-row rv"
                key={it.t}
                style={{ transitionDelay: `${(0.05 + i * 0.05).toFixed(2)}s` }}
                onClick={() => setInd(it)}
                aria-haspopup="dialog"
              >
                <span className="indy-name">
                  <h3 className="indy-t">{it.t}</h3>
                </span>
                <span className="indy-crafts" aria-label="Coverage included">{it.tags.join(' · ')}</span>
                <span className="indy-arw" aria-hidden="true">→</span>
              </button>
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
              <button className="btn-o" onClick={() => window.dispatchEvent(new CustomEvent('wc:contact'))}>Contact Us →</button>
              <a className="btn-o" href="/for-businesses">For Businesses →</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />

      {ind && (
        <div className="modal-overlay" onClick={() => setInd(null)} role="dialog" aria-modal="true" aria-label={ind.t}>
          <div className="modal-box modal-ind" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setInd(null)} aria-label="Close">✕</button>
            <p className="modal-tag">Made For</p>
            <h3 className="modal-title">{ind.t}</h3>
            <p className="indm-lead">{ind.detail.lead}</p>
            <div className="indm-rows">
              {ind.detail.crafts.map(c => (
                <div className="indm-row" key={c.k}>
                  <span className="indm-k">{c.k}</span>
                  <p>{c.v}</p>
                </div>
              ))}
            </div>
            <ul className="ind-tags indm-tags" aria-label="Typical outcomes">
              {ind.detail.outcomes.map(o => <li key={o}>{o}</li>)}
            </ul>
            <div className="page-cta">
              <button className="btn-g" onClick={() => { setInd(null); book() }}>Book a Call →</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
