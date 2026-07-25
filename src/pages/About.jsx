import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'

const TITLE = 'About Wilson Creative Co. | Brisbane Creative Studio — Film, Photo, Aerial & Web'
const DESC = 'Wilson Creative Co. is a Brisbane creative studio founded by George Wilson — film, photography, aerial drone and web under one roof. Meet the team that makes brands impossible to ignore.'
const URL = 'https://www.wilsoncreativeco.au/about'

const PILLS = ['One Team', 'Film & Photo', 'Drone Certified', 'Custom Web', 'Brisbane Based', 'Every Format']

const VALUES = [
  {
    n: '01', t: 'Listen first',
    d: 'Every project starts with a conversation, not a quote. We learn the brand, the day, the goal — so nothing we shoot is decoration. It all means something.',
  },
  {
    n: '02', t: 'Shoot with intent',
    d: 'Calm, planned and unobtrusive on the day — cinema cameras, editorial photography, licensed aerial. Every angle covered, no chaos in the room.',
  },
  {
    n: '03', t: 'Finish properly',
    d: 'The difference lives in the finish: the grade, the retouch, the cut, the build. Delivered ready to run — and made to hold up years from now.',
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
        <meta name="keywords" content="Wilson Creative Co, George Wilson, media production Brisbane, video production Brisbane, creative studio Brisbane, about, creative director Brisbane" />
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
        <header className="page-top biz-hero">
          <div className="page-top-bg" aria-hidden="true" />
          <div className="h-grain" aria-hidden="true" />
          <div className="page-top-inner">
            <div className="lane-mark rv">
              <span className="lane-idx">About</span>
              <span className="lane-div" aria-hidden="true" />
              <span className="lane-for">Brisbane Based</span>
            </div>
            <h1 className="page-h1 rv d1">What you build deserves <em>to be remembered.</em></h1>
            <p className="page-lead rv d2">
              Wilson Creative Co. is one Brisbane studio — film, photography, aerial and web —
              built on a simple belief: work that carries your name should outlast the scroll.
              One team. One standard. No seams.
            </p>
            <div className="page-cta rv d3">
              <button className="btn-g" onClick={book}>Book a Call →</button>
              <a className="btn-o" href="/for-businesses">See what we make →</a>
            </div>
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
              <h2 className="sh2 rv d1" id="about-h2">How we do anything is<br /><em>how we do everything.</em></h2>
              <p className="rv d2">Wilson Creative Co. began with a conviction: anything that carries your name should be made properly — by people who care that it&apos;s right, not just that it&apos;s done. We kept watching brands hand their vision to five strangers who&apos;d never spoken — a videographer here, a photographer there, a web build that never saw the footage — and get back something that felt stitched together. Because it was.</p>
              <p className="rv d3">So we built the opposite. One team that shoots, edits, retouches and builds under a single roof, every frame answering to the same eye. We&apos;re not chasing volume — we&apos;re building a body of work. Yours. The kind people don&apos;t scroll past. The kind they remember.</p>
              <div className="about-pills rv d3">
                {PILLS.map(p => <span className="pill" key={p}>{p}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* ── What we stand for ── */}
        <section className="secpad lane-biz" aria-labelledby="about-val-h2">
          <div className="lane-head">
            <p className="stag rv">How We Work</p>
            <h2 className="sh2 rv d1" id="about-val-h2">The way we <em>work</em></h2>
            <p className="lane-sub rv d2">
              Three moves, every project — and the reason the work lands the way it does.
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
