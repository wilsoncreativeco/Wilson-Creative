import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import { posts } from '../data/blogPosts.js'

const TITLE = 'Blog | Media Production & Web Design Brisbane — Wilson Creative Co.'
const DESC = 'Practical advice for Brisbane businesses on brand film, photography, aerial and web design — from the content that actually converts to site costs and Google rankings.'
const URL = 'https://wilsoncreativeco.au/blog'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Blog() {
  const [booking, setBooking] = useState(false)
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://wilsoncreativeco.au/og.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wilsoncreativeco.au' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: URL },
          ],
        })}</script>
      </Head>

      <SiteNav onBook={() => setBooking(true)} />

      <section className="lp-hero" style={{ paddingBottom: 64 }} aria-label="Blog header">
        <div className="lp-hero-inner">
          <p className="stag" style={{ justifyContent: 'center', marginBottom: 18 }}>Film &middot; Photo &middot; Aerial &middot; Web</p>
          <h1 className="lp-h1" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>The Wilson Creative<br /><span className="gold-line">Blog</span></h1>
          <p className="lp-sub">Practical advice for Brisbane businesses — on the content that gets you seen, and the websites that turn attention into enquiries.</p>
        </div>
      </section>

      <section className="secpad" aria-label="Blog posts">
        <div className="blog-grid">
          {posts.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card" aria-label={post.title}>
              <div className="blog-card-inner">
                <div className="blog-meta">
                  <span className="blog-date">{formatDate(post.date)}</span>
                  <span className="blog-read">{post.readTime}</span>
                </div>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <span className="blog-cta">Read article →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="cta-sec" style={{ paddingTop: 80 }} aria-labelledby="blog-cta-h2">
        <div className="cta-glow" aria-hidden="true" />
        <p className="stag" style={{ justifyContent: 'center' }}>Ready to get started?</p>
        <h2 className="cta-h2" id="blog-cta-h2" style={{ textAlign: 'center' }}>
          Custom web design in Brisbane.<br /><span>From $600.</span>
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
          <a href="/#contact" className="btn-g">Start a Project</a>
        </div>
      </section>

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  )
}
