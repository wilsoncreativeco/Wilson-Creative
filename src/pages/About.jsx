import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'

const TITLE = 'About Wilson Creative Co. | Brisbane Media Production House — Film, Photo, Aerial & Web'
const DESC = 'Wilson Creative Co. is a Brisbane media production house founded by George Wilson — film, photography, aerial drone and web under one roof. Meet the team that makes brands impossible to ignore.'
const URL = 'https://www.wilsoncreativeco.au/about'

const PILLS = ['One Team', 'Film & Photo', 'Drone Certified', 'Custom Web', 'Brisbane Based', 'Every Format']

const VALUES = [
  {
    n: '01', t: 'One team, one vision',
    d: 'Film, photo, aerial and web handled under one roof — so your brand stays consistent across every format, with no freelancers to juggle.',
  },
  {
    n: '02', t: 'Craft over noise',
    d: 'Premium is a feeling. We earn it through restraint, detail and finish — every frame, every cut, every pixel considered.',
  },
  {
    n: '03', t: 'Built to convert',
    d: 'Beautiful is the baseline. Everything we make is built to move the needle — more enquiries, more bookings, more reach.',
  },
]

export default function About() {
  const [booking, setBooking] = useState(false)
  const book = () => setBooking(true)
  useReveal()

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="Wilson Creative Co, George Wilson, media production Brisbane, video production house Brisbane, about, creative director Brisbane" />
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
            { '@type': 'ListItem', position: 2, name: 'About', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Wilson Creative Co.',
          url: URL,
          description: DESC,
          mainEntity: {
            '@type': 'ProfessionalService',
            name: 'Wilson Creative Co.',
            url: 'https://www.wilsoncreativeco.au',
            image: 'https://www.wilsoncreativeco.au/og.jpg',
            areaServed: [{ '@type': 'City', name: 'Brisbane' }, { '@type': 'Country', name: 'Australia' }],
            founder: { '@type': 'Person', name: 'George Wilson', jobTitle: 'Founder & Creative Director' },
          },
        })}</script>
      </Head>

      <SiteNav onBook={book} />

      <main>
        <header className="page-top">
          <div className="lane-mark rv">
            <span className="lane-idx">About</span>
            <span className="lane-div" aria-hidden="true" />
            <span className="lane-for">Brisbane Based</span>
          </div>
          <h1 className="page-h1 rv d1">One team.<br /><em>Every format.</em></h1>
          <p className="page-lead rv d2">
            Wilson Creative Co. is a full media production house in Brisbane — film, photography,
            aerial and web, all handled by one team that understands your whole brand.
          </p>
          <div className="page-cta rv d3">
            <button className="btn-g" onClick={book}>Book a Call →</button>
            <a className="btn-o" href="/for-businesses">See what we make →</a>
          </div>
        </header>

        {/* ── Founder ── */}
        <section className="secpad" aria-labelledby="about-h2">
          <div className="about">
            <figure className="about-portrait rl">
              <img
                src="/founder1.jpg"
                alt="George Wilson, Founder and Creative Director of Wilson Creative Co."
                className="about-portrait-img"
                width="1000"
                height="1333"
                loading="lazy"
              />
              <figcaption className="about-portrait-cap">
                <span className="about-portrait-name">George Wilson</span>
                <span className="about-portrait-role">Founder &amp; Creative Director</span>
              </figcaption>
            </figure>
            <div className="about-text">
              <p className="stag rv">Why Wilson Creative</p>
              <h2 className="sh2 rv d1" id="about-h2">Made by people who<br /><em>sweat the details</em></h2>
              <p className="rv d2">Wilson Creative Co. started with a simple frustration: brands were handing their vision to five different people who&apos;d never spoken. A videographer here, a photographer there, a web guy who&apos;d never seen the footage. The result always felt stitched together — because it was.</p>
              <p className="rv d3">So we built the opposite. One team that shoots, edits, retouches and builds under a single roof — film, photography, aerial and web, all speaking the same language. From a single shoot to a complete brand rollout, we cover every angle and every format, built to make your business impossible to ignore, online and off.</p>
              <div className="about-pills rv d3">
                {PILLS.map(p => <span className="pill" key={p}>{p}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* ── What we stand for ── */}
        <section className="secpad lane-biz" aria-labelledby="about-val-h2">
          <div className="lane-head">
            <p className="stag rv">What We Stand For</p>
            <h2 className="sh2 rv d1" id="about-val-h2">The way we <em>work</em></h2>
            <p className="lane-sub rv d2">
              Three things shape everything we make — and they&apos;re the reason our work looks
              and performs the way it does.
            </p>
          </div>
          <div className="ind-grid">
            {VALUES.map((v, i) => (
              <article className="ind-card rv" key={v.n} style={{ transitionDelay: `${(0.05 + i * 0.06).toFixed(2)}s` }}>
                <span className="ind-num" aria-hidden="true">{v.n}</span>
                <h3 className="ind-t">{v.t}</h3>
                <p className="ind-d">{v.d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="secpad" aria-labelledby="about-cta-h2">
          <h2 id="about-cta-h2" className="sr-only">Work with us</h2>
          <div className="lane-cta rv">
            <div className="lane-anchor">
              <span className="la-k">Let&apos;s make something</span>
              <span className="la-fig">Unforgettable</span>
              <span className="la-note">
                Tell us what you have in mind — a single film, a full brand rollout or ongoing
                content. We&apos;ll map out the next steps on a quick call.
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
    </>
  )
}
