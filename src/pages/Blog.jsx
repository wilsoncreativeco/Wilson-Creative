import { Head } from 'vite-react-ssg'
import { posts } from '../data/blogPosts.js'

const TITLE = 'Web Design Blog Brisbane | Wilson Creative Co.'
const DESC = 'Practical web design and SEO advice for Brisbane businesses — from site costs to Google rankings, custom code vs WordPress, and more.'
const URL = 'https://www.wilsoncreativeco.au/blog'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Blog() {
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
        <meta property="og:image" content="https://www.wilsoncreativeco.au/og.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.wilsoncreativeco.au' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: URL },
          ],
        })}</script>
      </Head>

      <nav id="nav" className="sc" aria-label="Main navigation">
        <a href="/" className="n-logo" aria-label="Wilson Creative Co. Home">
          <img src="/wlogo.png" alt="Wilson Creative Co." className="n-logo-img" width="1536" height="1024" />
          <span className="n-logo-text">Wilson <span>Creative</span> Co.</span>
        </a>
        <a href="/#contact" className="n-cta">Start a Project</a>
      </nav>

      <section className="lp-hero" style={{ paddingBottom: 64 }} aria-label="Blog header">
        <div className="lp-hero-inner">
          <p className="stag" style={{ justifyContent: 'center', marginBottom: 18 }}>Web Design &amp; SEO</p>
          <h1 className="lp-h1" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>The Wilson Creative<br /><span className="gold-line">Blog</span></h1>
          <p className="lp-sub">Practical advice on web design, SEO, and digital growth for Brisbane businesses.</p>
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

      <footer role="contentinfo">
        <div className="ft">
          <div className="fb">
            <p className="fb-name">Wilson <span>Creative</span> Co.</p>
            <p>Custom web design in Brisbane and across Australia. No templates. No lock-in. From $600.</p>
          </div>
          <div className="f-cols">
            <div className="fc">
              <p>Navigate</p>
              <a href="/">Home</a>
              <a href="/#services">Services</a>
              <a href="/#work">Our Work</a>
              <a href="/blog">Blog</a>
              <a href="/#contact">Contact</a>
            </div>
            <div className="fc">
              <p>Services</p>
              <a href="/web-design-brisbane">Web Design Brisbane</a>
              <a href="/custom-website-development-brisbane">Custom Development</a>
              <a href="/affordable-web-design-brisbane">Affordable Web Design</a>
            </div>
            <div className="fc">
              <p>Contact</p>
              <a href="mailto:wilsoncreativeco.au@gmail.com">wilsoncreativeco.au@gmail.com</a>
              <a href="tel:+61401609118">0401 609 118</a>
            </div>
          </div>
        </div>
        <div className="fb-bot">
          <p className="f-copy">© {new Date().getFullYear()} Wilson Creative Co. All rights reserved. | Brisbane, QLD, Australia</p>
        </div>
      </footer>
    </>
  )
}
