import { Head } from 'vite-react-ssg'
import { posts } from '../data/blogPosts.js'

const SITE = 'https://www.wilsoncreativeco.au'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderSection(s, i) {
  if (s.type === 'h2') return <h2 key={i} className="bp-h2">{s.text}</h2>
  if (s.type === 'p') return <p key={i} className="bp-p">{s.text}</p>
  if (s.type === 'ul') return (
    <ul key={i} className="bp-ul">
      {s.items.map((item, j) => <li key={j}>{item}</li>)}
    </ul>
  )
  return null
}

export default function BlogPost({ slug }) {
  const post = posts.find(p => p.slug === slug)
  if (!post) return null

  const url = `${SITE}/blog/${post.slug}`

  return (
    <>
      <Head>
        <title>{post.title} — Wilson Creative Co.</title>
        <meta name="description" content={post.metaDesc} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${post.title} — Wilson Creative Co.`} />
        <meta property="og:description" content={post.metaDesc} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${SITE}/og.jpg`} />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDesc,
          datePublished: post.date,
          author: { '@type': 'Person', name: 'George Wilson', url: SITE },
          publisher: { '@type': 'Organization', name: 'Wilson Creative Co.', url: SITE },
          mainEntityOfPage: url,
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
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

      <article className="bp-wrap" aria-labelledby="bp-title">
        <div className="bp-header">
          <div className="bp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <a href="/blog">Blog</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{post.title}</span>
          </div>
          <div className="bp-meta">
            <span className="blog-date">{formatDate(post.date)}</span>
            <span className="blog-read">{post.readTime}</span>
          </div>
          <h1 className="bp-title" id="bp-title">{post.title}</h1>
          <p className="bp-byline">By <strong>George Wilson</strong> · Wilson Creative Co.</p>
        </div>

        <div className="bp-body">
          {post.sections.map(renderSection)}
        </div>

        <div className="bp-cta-box">
          <p className="bp-cta-lead">Need a Brisbane website that actually works?</p>
          <p className="bp-cta-sub">Custom-coded sites from $600. Fast delivery, no templates, you own the code.</p>
          <a href="/#contact" className="btn-g" style={{ display: 'inline-block', marginTop: 20 }}>Get a Free Quote →</a>
        </div>
      </article>

      <section className="secpad" aria-labelledby="related-h2" style={{ paddingTop: 48 }}>
        <h2 className="sh2" id="related-h2" style={{ marginBottom: 32 }}>More from the blog</h2>
        <div className="blog-grid blog-grid-sm">
          {posts.filter(p => p.slug !== slug).slice(0, 3).map(p => (
            <a key={p.slug} href={`/blog/${p.slug}`} className="blog-card" aria-label={p.title}>
              <div className="blog-card-inner">
                <div className="blog-meta">
                  <span className="blog-date">{formatDate(p.date)}</span>
                  <span className="blog-read">{p.readTime}</span>
                </div>
                <h3 className="blog-title">{p.title}</h3>
                <span className="blog-cta">Read article →</span>
              </div>
            </a>
          ))}
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
