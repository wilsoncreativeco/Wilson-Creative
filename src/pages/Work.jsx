import { useState, useEffect, useCallback } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'
import { galleryCats, galleryItems, full, thumb } from '../data/gallery'

const TITLE = 'Our Work | Aerial, Construction & Real Estate Photography Brisbane — Wilson Creative Co.'
const DESC = 'Selected photography from Wilson Creative Co. — licensed aerial, construction progress and real estate work across Brisbane and the Gold Coast.'
const URL = 'https://wilsoncreativeco.au/work'

export default function Work() {
  const [booking, setBooking] = useState(false)
  const [cat, setCat] = useState('All')
  const [lightbox, setLightbox] = useState(null) // index into `shown`
  const book = () => setBooking(true)
  useReveal()

  const shown = cat === 'All' ? galleryItems : galleryItems.filter(i => i.cat === cat)

  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(d => {
    setLightbox(i => (i === null ? i : (i + d + shown.length) % shown.length))
  }, [shown.length])

  // Lock scroll and wire keyboard while the lightbox is open.
  useEffect(() => {
    if (lightbox === null) return
    document.body.style.overflow = 'hidden'
    const onKey = e => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, close, step])

  const active = lightbox === null ? null : shown[lightbox]

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <meta name="keywords" content="aerial photography Brisbane, construction photography Brisbane, real estate photography Brisbane, drone photography Gold Coast, progress photography" />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://wilsoncreativeco.au/work/drn-03.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wilsoncreativeco.au' },
            { '@type': 'ListItem', position: 2, name: 'Work', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Wilson Creative Co. — Selected Work',
          url: URL,
          about: 'Aerial, construction and real estate photography in Brisbane',
        })}</script>
      </Head>

      <SiteNav onBook={book} />

      <main>
        <header className="page-top biz-hero">
          <div className="page-top-bg" aria-hidden="true" />
          <div className="h-grain" aria-hidden="true" />
          <div className="page-top-inner">
            <div className="lane-mark rv">
              <span className="lane-idx">Selected Work</span>
              <span className="lane-div" aria-hidden="true" />
              <span className="lane-for">Aerial · Construction · Real Estate</span>
            </div>
            <h1 className="page-h1 rv d1">Proof, <em>not promises.</em></h1>
            <p className="page-lead rv d2">
              A selection of recent stills — licensed aerial, construction progress and
              property work, shot and graded in-house.
            </p>
          </div>
        </header>

        <section className="secpad" aria-label="Work gallery">
          <div className="gal-filters rv" role="tablist" aria-label="Filter by category">
            {galleryCats.map(c => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                className={`gal-filter ${cat === c ? 'on' : ''}`}
                onClick={() => { setCat(c); setLightbox(null) }}
              >
                {c}
                <span className="gal-filter-n">
                  {c === 'All' ? galleryItems.length : galleryItems.filter(i => i.cat === c).length}
                </span>
              </button>
            ))}
          </div>

          <div className="gal-masonry">
            {shown.map((it, i) => (
              <button
                type="button"
                className="gal-item rv"
                key={it.id}
                style={{ transitionDelay: `${Math.min(0.3, 0.03 * i).toFixed(2)}s` }}
                onClick={() => setLightbox(i)}
                aria-label={`${it.title} — view larger`}
              >
                <img
                  src={thumb(it.id)}
                  alt={`${it.cat} photography — ${it.title}`}
                  width={it.w}
                  height={it.h}
                  loading="lazy"
                  decoding="async"
                />
                <span className="gal-item-veil" aria-hidden="true" />
                <span className="gal-item-cap" aria-hidden="true">
                  <span className="gal-item-cat">{it.cat}</span>
                  <span className="gal-item-t">{it.title}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="retainer rv gal-cta">
            <p className="ret-k">Your Project Next</p>
            <p className="ret-line">Aerial, progress or property work — shot, graded and delivered <em>ready to use.</em></p>
            <div className="page-cta" style={{ justifyContent: 'center', marginTop: 24 }}>
              <button className="btn-g" onClick={book}>Book a Call →</button>
              <button className="btn-o" onClick={() => window.dispatchEvent(new CustomEvent('wc:contact'))}>Contact Us →</button>
            </div>
          </div>
        </section>
      </main>

      {active && (
        <div className="lbx" onClick={close} role="dialog" aria-modal="true" aria-label={active.title}>
          <button className="lbx-close" onClick={close} aria-label="Close">✕</button>
          <button
            className="lbx-nav lbx-prev"
            onClick={e => { e.stopPropagation(); step(-1) }}
            aria-label="Previous image"
          >‹</button>
          <figure className="lbx-fig" onClick={e => e.stopPropagation()}>
            <img src={full(active.id)} alt={`${active.cat} — ${active.title}`} />
            <figcaption>
              <span className="lbx-cat">{active.cat}</span>
              <span className="lbx-t">{active.title}</span>
              <span className="lbx-n">{lightbox + 1} / {shown.length}</span>
            </figcaption>
          </figure>
          <button
            className="lbx-nav lbx-next"
            onClick={e => { e.stopPropagation(); step(1) }}
            aria-label="Next image"
          >›</button>
        </div>
      )}

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  )
}
