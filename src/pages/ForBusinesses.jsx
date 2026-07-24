import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'
import { services, businessIndustries } from '../data/offerings'

const TITLE = 'Media Production for Business in Brisbane | Film, Photo, Aerial & Web — Wilson Creative Co.'
const DESC = 'Brand films, photography, aerial drone work and custom websites for Brisbane businesses — produced in-house. Industry-tailored content for construction, real estate, hospitality, trades and brands, plus ongoing monthly retainers.'
const URL = 'https://www.wilsoncreativeco.au/for-businesses'

export default function ForBusinesses() {
  const [booking, setBooking] = useState(false)
  const book = () => setBooking(true)
  useReveal()

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
        <header className="page-top">
          <div className="lane-mark rv">
            <span className="lane-idx">For Businesses</span>
            <span className="lane-div" aria-hidden="true" />
            <span className="lane-for">Film · Photo · Aerial · Web</span>
          </div>
          <h1 className="page-h1 rv d1">Content that makes your<br />brand <em>impossible to ignore.</em></h1>
          <p className="page-lead rv d2">
            Film, photography, aerial &amp; web — produced in-house and tuned to your industry.
            From a single hero film to an always-on content engine, we make the media that fills
            your feeds, your listings and your pitch decks.
          </p>
          <div className="page-cta rv d3">
            <button className="btn-g" onClick={book}>Book a Call →</button>
            <a className="btn-o" href="#offerings">See what we make →</a>
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
          <div className="ind-grid ind-grid-4">
            {services.map((s, i) => (
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
          <div className="ind-grid">
            {businessIndustries.map((it, i) => (
              <article
                className={`ind-card rv ${it.ongoing ? 'is-ongoing' : ''}`}
                key={it.t}
                style={{ transitionDelay: `${(0.05 + i * 0.06).toFixed(2)}s` }}
              >
                {it.ongoing && <span className="ind-pill">Ongoing</span>}
                <span className="ind-num" aria-hidden="true">{it.n}</span>
                <h3 className="ind-t">{it.t}</h3>
                <p className="ind-d">{it.d}</p>
                <ul className="ind-tags" aria-label="Services included">
                  {it.tags.map(tg => <li key={tg}>{tg}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="lane-retainer rv">
            <div className="lr-l">
              <p className="lr-k">Ongoing content — not one-offs</p>
              <p className="lr-t">Monthly progress series, retainers &amp; content drops that keep your brand shipping.</p>
            </div>
            <p className="lr-d">
              Built for construction timelines, property developments and any brand that needs a
              steady feed of fresh film &amp; photo — month after month.
            </p>
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
              <a className="btn-o" href="/for-events">For Events →</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  )
}
