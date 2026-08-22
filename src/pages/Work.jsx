import { useState, useEffect, useCallback } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'
import { collections, galleryItems, full, thumb } from '../data/gallery'

const TITLE = 'Our Work | Aerial, Construction & Real Estate Photography Brisbane — Wilson Creative Co.'
const DESC = 'Selected photography from Wilson Creative Co. — licensed aerial, construction progress and real estate work across Brisbane and the Gold Coast.'
const URL = 'https://wilsoncreativeco.au/work'

export default function Work() {
  const [booking, setBooking] = useState(false)
  const [open, setOpen] = useState(null)      // open collection category
  const [lightbox, setLightbox] = useState(null) // index within the open set
  const book = () => setBooking(true)
  useReveal()

  const set = open ? galleryItems.filter(i => i.cat === open) : []

  const closeSet = useCallback(() => { setOpen(null); setLightbox(null) }, [])
  const step = useCallback(d => {
    setLightbox(i => (i === null ? i : (i + d + set.length) % set.length))
  }, [set.length])

  // One scroll lock for both layers; Escape steps back one level at a time.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = e => {
      if (e.key === 'Escape') { lightbox !== null ? setLightbox(null) : closeSet() }
      else if (lightbox !== null && e.key === 'ArrowRight') step(1)
      else if (lightbox !== null && e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, lightbox, closeSet, step])

  const active = lightbox === null ? null : set[lightbox]

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
              Three collections — licensed aerial, construction progress and property work.
              Open one to look through the set.
            </p>
          </div>
        </header>

        <section className="secpad" aria-label="Work collections">
          <div className="col-grid">
            {collections.map((c, i) => {
              const count = galleryItems.filter(g => g.cat === c.cat).length
              return (
                <button
                  type="button"
                  className="col-card rv"
                  key={c.cat}
                  style={{ transitionDelay: `${(0.05 + i * 0.07).toFixed(2)}s` }}
                  onClick={() => { setOpen(c.cat); setLightbox(null) }}
                  aria-haspopup="dialog"
                >
                  <span className="col-stack" aria-hidden="true" />
                  <span className="col-media">
                    <img src={thumb(c.cover)} alt={`${c.cat} photography`} loading="lazy" decoding="async" />
                    <span className="col-veil" aria-hidden="true" />
                  </span>
                  <span className="col-body">
                    <span className="col-top">
                      <span className="col-name">{c.cat}</span>
                      <span className="col-count">{count}</span>
                    </span>
                    <span className="col-blurb">{c.blurb}</span>
                    <span className="col-open" aria-hidden="true">Open set <span className="col-arw">→</span></span>
                  </span>
                </button>
              )
            })}
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

      {/* collection popup */}
      {open && (
        <div className="setx" onClick={closeSet} role="dialog" aria-modal="true" aria-label={`${open} collection`}>
          <div className="setx-box" onClick={e => e.stopPropagation()}>
            <div className="setx-head">
              <div>
                <p className="setx-eyebrow">Collection</p>
                <h2 className="setx-title">{open}</h2>
              </div>
              <button className="setx-close" onClick={closeSet} aria-label="Close collection">✕</button>
            </div>
            <div className="setx-grid">
              {set.map((it, i) => (
                <button
                  type="button"
                  className="setx-thumb"
                  key={it.id}
                  onClick={() => setLightbox(i)}
                  aria-label={`${it.title} — view larger`}
                >
                  <img src={thumb(it.id)} alt={`${it.cat} — ${it.title}`} loading="lazy" decoding="async" />
                  <span className="setx-cap" aria-hidden="true">{it.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* full-size viewer */}
      {active && (
        <div className="lbx" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label={active.title}>
          <button className="lbx-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
          <button className="lbx-nav lbx-prev" onClick={e => { e.stopPropagation(); step(-1) }} aria-label="Previous image">‹</button>
          <figure className="lbx-fig" onClick={e => e.stopPropagation()}>
            <img src={full(active.id)} alt={`${active.cat} — ${active.title}`} />
            <figcaption>
              <span className="lbx-cat">{active.cat}</span>
              <span className="lbx-t">{active.title}</span>
              <span className="lbx-n">{lightbox + 1} / {set.length}</span>
            </figcaption>
          </figure>
          <button className="lbx-nav lbx-next" onClick={e => { e.stopPropagation(); step(1) }} aria-label="Next image">›</button>
        </div>
      )}

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  )
}
