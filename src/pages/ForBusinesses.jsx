import { useState, useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'
import useLazyVideo from '../components/useLazyVideo'
import { services, businessIndustries } from '../data/offerings'

// cinematic poster media for each craft tile
const CRAFT_MEDIA = {
  '01': { video: '/hero.mp4' },
  '02': { img: '/brisbane.jpg', w: 1800, h: 2400 },
  '03': { video: '/hero-drone.mp4', poster: '/hero-drone.jpg' },
  '04': { img: '/work-zantara.jpg', w: 1400, h: 875 },
}

const TITLE = 'Media Production for Business in Brisbane | Film, Photo, Aerial & Web — Wilson Creative Co.'
const DESC = 'Brand films, photography, aerial drone work and custom websites for Brisbane businesses — produced in-house. Industry-tailored content for construction, real estate, hospitality, trades and brands, plus ongoing monthly retainers.'
const URL = 'https://www.wilsoncreativeco.au/for-businesses'

export default function ForBusinesses() {
  const [booking, setBooking] = useState(false)
  const [ind, setInd] = useState(null)
  const [ret, setRet] = useState(false)
  const book = () => setBooking(true)
  useReveal()
  useLazyVideo()

  // Industry / retainer modals: lock scroll while open; close on Escape.
  useEffect(() => {
    if (!ind && !ret) return
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') { setInd(null); setRet(false) } }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [ind, ret])

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="business video production Brisbane, brand films Brisbane, commercial photography Brisbane, construction progress video Brisbane, real estate media Brisbane, aerial drone Brisbane, content retainer Brisbane" />
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
            { '@type': 'ListItem', position: 2, name: 'For Businesses', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Media Production for Business',
          serviceType: 'Brand film, photography, aerial & web for businesses',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://www.wilsoncreativeco.au' },
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
              <span className="lane-idx">For Businesses</span>
              <span className="lane-div" aria-hidden="true" />
              <span className="lane-for">Film · Photo · Aerial · Web</span>
            </div>
            <h1 className="page-h1 rv d1">Content that makes your brand <em>impossible to ignore.</em></h1>
            <p className="page-lead rv d2">
              Film, photography, aerial &amp; web — produced in-house and tuned to your industry.
              From a single hero film to an always-on content engine, we make the media that fills
              your feeds, your listings and your pitch decks.
            </p>
            <div className="page-cta rv d3">
              <button className="btn-g" onClick={book}>Book a Call →</button>
              <a className="btn-o" href="#offerings">See what we make →</a>
            </div>
          </div>
        </header>

        {/* ── Four crafts ── */}
        <section className="secpad" aria-labelledby="biz-svc-h2">
          <div className="lane-head">
            <p className="stag rv">What We Do</p>
            <h2 className="sh2 rv d1" id="biz-svc-h2">Four crafts, <em>one team</em></h2>
            <p className="lane-sub rv d2">
              Everything your brand needs to look and sound premium — shot, edited, retouched and
              built under one roof. Including the website that turns it all into enquiries.
            </p>
          </div>
          <div className="craft-grid">
            {services.map((s, i) => (
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

        {/* ── Tailored by industry ── */}
        <section id="offerings" className="secpad lane-biz" aria-labelledby="biz-ind-h2">
          <div className="lane-head">
            <p className="stag rv">Tailored By Industry</p>
            <h2 className="sh2 rv d1" id="biz-ind-h2">Built around <em>your world</em></h2>
            <p className="lane-sub rv d2">
              We don&apos;t shoot everyone the same. Here&apos;s how we tune film, photo, aerial and
              web to what actually moves the needle in your industry.
            </p>
          </div>
          <div className="indy-index">
            {businessIndustries.map((it, i) => (
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
                  {it.ongoing && <span className="ind-pill">Ongoing</span>}
                </span>
                <span className="indy-crafts" aria-label="Services included">{it.tags.join(' · ')}</span>
                <span className="indy-arw" aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div className="retainer rv">
            <p className="ret-k">Ongoing — Not One-Offs</p>
            <p className="ret-line">Monthly progress series, retainers &amp; content drops that keep your brand <em>shipping.</em></p>
            <p className="ret-note">
              Built for construction timelines, property developments and any brand that needs a
              steady feed of fresh film &amp; photo — month after month.
            </p>
            <button type="button" className="ret-more" onClick={() => setRet(true)} aria-haspopup="dialog">
              Learn More →
            </button>
          </div>
        </section>

        {/* ── Selected work (graceful) ── */}
        <section className="secpad" aria-labelledby="biz-work-h2">
          <div className="lane-head">
            <p className="stag rv">Selected Work</p>
            <h2 className="sh2 rv d1" id="biz-work-h2">Proof, <em>not promises</em></h2>
            <p className="lane-sub rv d2">
              A fresh reel of brand films, shoots and builds is on its way. Want to see work
              relevant to your industry right now? Ask on your call — we&apos;ll show you the closest fits.
            </p>
          </div>
          <div className="page-cta rv d2">
            <button className="btn-g" onClick={book}>Book a Call →</button>
          </div>
        </section>

        {/* ── Soft pricing anchor ── */}
        <section className="secpad" aria-labelledby="biz-price-h2">
          <h2 id="biz-price-h2" className="sr-only">Pricing</h2>
          <div className="lane-cta rv">
            <div className="lane-anchor">
              <span className="la-k">Projects from</span>
              <span className="la-fig">$1,500</span>
              <span className="la-note">
                Tailored to scope — most brands land on a package or a monthly retainer.
                Book a call for a quote built around you.
              </span>
            </div>
            <div className="lane-cta-btns">
              <button className="btn-g" onClick={book}>Book a Call →</button>
              <button className="btn-o" onClick={() => window.dispatchEvent(new CustomEvent('wc:contact'))}>Contact Us →</button>
              <a className="btn-o" href="/for-events">For Events →</a>
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
            <p className="modal-tag">Tailored For</p>
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

      {ret && (
        <div className="modal-overlay" onClick={() => setRet(false)} role="dialog" aria-modal="true" aria-label="Ongoing content retainers">
          <div className="modal-box modal-ind" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRet(false)} aria-label="Close">✕</button>
            <p className="modal-tag">Ongoing Content</p>
            <h3 className="modal-title">Retainers &amp; Progress Series</h3>
            <p className="indm-lead">
              One team on your brand, month after month — shooting, editing and delivering on a
              schedule, so your feed never runs dry and your projects never go undocumented.
            </p>
            <div className="indm-rows">
              <div className="indm-row">
                <span className="indm-k">Cadence</span>
                <p>Monthly or fortnightly shoot days, scheduled around your projects and timelines.</p>
              </div>
              <div className="indm-row">
                <span className="indm-k">Delivery</span>
                <p>Progress films, social cuts, stills &amp; aerial updates — edited and delivered ready to post.</p>
              </div>
              <div className="indm-row">
                <span className="indm-k">Priority</span>
                <p>Retainer clients jump the queue — extra shoots and fast turnarounds, whenever you need them.</p>
              </div>
            </div>
            <ul className="ind-tags indm-tags" aria-label="Typical inclusions">
              <li>Monthly progress films</li>
              <li>Social content drops</li>
              <li>Aerial site updates</li>
              <li>Priority booking</li>
            </ul>
            <div className="page-cta">
              <button className="btn-g" onClick={() => { setRet(false); book() }}>Book a Call →</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
