import { useState } from 'react'
import { Head } from 'vite-react-ssg'

const TITLE = 'Custom Website Development Brisbane | Hand-Built From $600 — Wilson Creative Co.'
const DESC = 'Custom website development in Brisbane — no templates, no WordPress, no Wix. Hand-coded sites built for performance, SEO, and conversion. From $600. You own the code.'
const URL = 'https://www.wilsoncreativeco.au/custom-website-development-brisbane'

const faqs = [
  {
    q: 'What is custom website development?',
    a: 'Custom website development means your site is written from scratch in real code — HTML, CSS, JavaScript and modern frameworks like React — rather than being built on a template platform like WordPress or Wix. The result is a faster, more unique site that\'s built specifically for your business and your customers.',
  },
  {
    q: 'Why choose custom development over WordPress?',
    a: 'WordPress sites carry enormous bloat — dozens of plugins, theme overhead, and constant security updates. A custom-coded site is leaner, faster, and more secure. It also looks nothing like your competitors, because it\'s built around your brand from the ground up. And you own every line of code — no dependency on a platform that can change its pricing or terms.',
  },
  {
    q: 'How much does custom website development cost in Brisbane?',
    a: 'Our custom-coded websites start from $600 for a Starter single-page site, $1,000 for a Growth multi-page site, and from $2,000 for Premium builds with e-commerce or booking systems. That\'s a fraction of what most Brisbane development agencies charge for the same quality of work.',
  },
  {
    q: 'How long does development take?',
    a: 'Starter sites take 5–7 business days. Growth sites take 10–14 days. Premium builds take 2–3 weeks. Compare that to most Brisbane web agencies who quote 6–12 weeks. We move fast because we\'re not working through layers of project managers and account executives.',
  },
  {
    q: 'Do I own the code when it\'s delivered?',
    a: 'Yes — completely. Every file, every line of code, the domain, and all assets belong to you the moment we deliver the project. No lock-in to our platform, no proprietary builder, no licensing fees. If you ever want another developer to take over, the code is yours to hand over.',
  },
  {
    q: 'Can you build e-commerce or booking systems?',
    a: 'Yes. Our Premium tier includes custom e-commerce stores and booking systems, built to be fast and conversion-focused. We don\'t use bloated off-the-shelf plugins — we build the exact functionality your business needs, nothing more.',
  },
]

export default function CustomWebsiteDevelopmentBrisbane() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = async e => {
    e.preventDefault()
    setFormStatus('sending')
    const fd = new FormData(e.target)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message') || 'Custom Website Development Brisbane enquiry',
        }),
      })
      setFormStatus(res.ok ? 'sent' : 'idle')
      if (res.ok) e.target.reset()
    } catch {
      setFormStatus('idle')
    }
  }

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.wilsoncreativeco.au' },
            { '@type': 'ListItem', position: 2, name: 'Custom Website Development Brisbane', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Custom Website Development Brisbane',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://www.wilsoncreativeco.au' },
          areaServed: [{ '@type': 'City', name: 'Brisbane' }, { '@type': 'Country', name: 'Australia' }],
          description: 'Custom-coded website development for Brisbane businesses. No templates. From $600.',
          offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '2000', priceCurrency: 'AUD' },
        })}</script>
      </Head>

      <nav id="nav" className="sc" aria-label="Main navigation">
        <a href="/" className="n-logo" aria-label="Wilson Creative Co. Home">
          <img src="/wlogo.png" alt="Wilson Creative Co." className="n-logo-img" width="1536" height="1024" />
          <span className="n-logo-text">Wilson <span>Creative</span> Co.</span>
        </a>
        <a href="/#contact" className="n-cta">Start a Project</a>
      </nav>

      <section className="lp-hero" aria-label="Custom website development Brisbane hero">
        <div className="lp-hero-inner">
          <p className="stag" style={{ justifyContent: 'center', marginBottom: 18 }}>Brisbane &amp; Australia-Wide</p>
          <h1 className="lp-h1">Custom Website<br /><span className="gold-line">Development</span></h1>
          <p className="lp-sub">Hand-coded websites built from scratch — not assembled from templates.<br />No WordPress. No Wix. No bloat. From <strong>$600</strong>.</p>
          <div className="h-btns" style={{ justifyContent: 'center', marginTop: 36 }}>
            <a href="#enquire" className="btn-g">Get a Free Quote</a>
            <a href="/#work" className="btn-o">View Our Work →</a>
          </div>
          <p className="lp-trust">Built for Brisbane businesses who are done with slow, generic template sites</p>
        </div>
      </section>

      <section className="secpad" aria-labelledby="why-h2">
        <div className="lp-two-col">
          <div>
            <p className="stag">Why Custom Development Wins</p>
            <h2 className="sh2" id="why-h2">Template sites cost you money.<br />Custom code earns it back.</h2>
            <p className="lp-body">A WordPress site with a theme and 15 plugins might look passable on day one. But within months it's slow, outdated, and a security risk. Every plugin is someone else's code that can break, get abandoned, or introduce a vulnerability. Your site becomes a maintenance headache instead of a business asset.</p>
            <p className="lp-body">Custom website development means your site is written specifically for your business — leaner code, faster load times, better Google rankings, and a unique design that sets you apart from every competitor running the same Divi theme. At Wilson Creative Co., we write clean, modern code that's built to last and easy for any developer to maintain.</p>
            <p className="lp-body">We're based in Brisbane and we build for Brisbane businesses — but our work runs Australia-wide. Whatever your industry, whatever your goal, the result is a site that you own outright and that actually works for your business.</p>
          </div>
          <div className="lp-checks">
            {[
              'Hand-written code — zero page builders',
              'No WordPress, no Wix, no Squarespace',
              'Faster than any template site',
              'Better Google rankings from day one',
              'Unique design — not a reskinned theme',
              'No plugin vulnerabilities or update debt',
              'You own every file and every line of code',
              'Maintained by any developer, not just us',
            ].map(item => (
              <div className="lp-check" key={item}>
                <span className="lp-check-icon">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secpad lp-industries-sec" aria-labelledby="ind-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>What We Build</p>
        <h2 className="sh2" id="ind-h2" style={{ textAlign: 'center', maxWidth: 640, margin: '12px auto 48px' }}>Custom development for every<br />type of Brisbane business</h2>
        <div className="lp-industries">
          {[
            {
              icon: '⚡',
              title: 'Business Websites',
              desc: 'Custom multi-page sites for service businesses, professional practices, and growing Brisbane brands. Built to rank, convert, and represent your business at its best.',
            },
            {
              icon: '🛒',
              title: 'E-commerce Stores',
              desc: 'Custom online stores built for speed and conversion. No WooCommerce bloat — clean, fast checkout experiences designed to increase sales.',
            },
            {
              icon: '📅',
              title: 'Booking Systems',
              desc: 'Custom booking and appointment systems for service businesses. Integrated into your site, designed around your workflow, and built to reduce admin.',
            },
            {
              icon: '📱',
              title: 'Landing Pages',
              desc: 'High-converting single-page sites for campaigns, launches, or businesses that need an effective online presence fast. Delivered in 5–7 days.',
            },
            {
              icon: '📰',
              title: 'Blog & Content Sites',
              desc: 'Custom CMS-powered sites where you control the content. Fast, SEO-optimised, and built to grow your organic traffic over time.',
            },
            {
              icon: '🏗',
              title: 'Trade & Construction',
              desc: 'Specialist sites for builders, tradies, and construction businesses. Mobile-first, fast-loading, and designed to turn visit into quote request.',
            },
          ].map(ind => (
            <div className="lp-ind-card" key={ind.title}>
              <div className="lp-ind-icon" aria-hidden="true">{ind.icon}</div>
              <h3 className="lp-ind-title">{ind.title}</h3>
              <p className="lp-ind-desc">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="secpad pricing-bg" aria-labelledby="price-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Pricing</p>
        <h2 className="sh2" id="price-h2" style={{ textAlign: 'center', maxWidth: 580, margin: '12px auto 16px' }}>
          Custom development.<br /><em>Not custom prices.</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--w6)', fontSize: 15, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Transparent, fixed-price packages. No surprise invoices, no scope creep, no retainer lock-in.
        </p>
        <div className="pc-grid">
          {[
            {
              name: 'Starter', price: 'From $600', featured: false,
              desc: 'Single-page custom site. Perfect for small businesses getting started.',
              features: ['Custom-coded single page', 'Mobile-responsive', 'Contact form + click-to-call', 'SEO foundations', '1 revision round', '5–7 day delivery'],
            },
            {
              name: 'Growth', price: 'From $1,000', featured: true,
              desc: 'Multi-page custom site for established Brisbane businesses.',
              features: ['Up to 5 custom pages', 'Advanced design & animations', 'CMS or blog integration', 'Full SEO setup', '3 revision rounds', 'Analytics', '10–14 day delivery'],
            },
            {
              name: 'Premium', price: 'From $2,000', featured: false,
              desc: 'Full-service custom development — e-commerce, bookings, everything.',
              features: ['Everything in Growth', 'E-commerce or booking system', 'Brand strategy session', 'Copywriting support', 'Priority turnaround', 'Unlimited revisions'],
            },
          ].map(t => (
            <div className={`pc ${t.featured ? 'feat' : ''}`} key={t.name}>
              {t.featured && <div className="pc-badge">Most Popular</div>}
              <h3 className="pc-name">{t.name}</h3>
              <div className="pc-price">{t.price}</div>
              <p className="pc-desc">{t.desc}</p>
              <ul className="pc-feats">
                {t.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="#enquire" className={t.featured ? 'btn-g' : 'btn-o'} style={{ textAlign: 'center', display: 'block', padding: 14 }}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="secpad" aria-labelledby="vs-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>How We Compare</p>
        <h2 className="sh2" id="vs-h2" style={{ textAlign: 'center', maxWidth: 600, margin: '12px auto 48px' }}>
          Not a dev shop. Not a freelancer.<br /><em>Something better.</em>
        </h2>
        <div className="lp-compare">
          <div className="lp-compare-col lp-compare-bad">
            <h3>Development Agencies</h3>
            <ul>
              <li>$5,000–$20,000+ for custom work</li>
              <li>12+ week timelines</li>
              <li>Account managers between you and devs</li>
              <li>Retainer contracts to keep support</li>
              <li>Not built for small business scale</li>
            </ul>
          </div>
          <div className="lp-compare-col lp-compare-bad">
            <h3>Template Freelancers</h3>
            <ul>
              <li>WordPress with premium themes</li>
              <li>Slow, insecure, generic</li>
              <li>Plugin dependency nightmares</li>
              <li>You don't own clean code</li>
              <li>Hard to hand off to other developers</li>
            </ul>
          </div>
          <div className="lp-compare-col lp-compare-us">
            <h3>Wilson Creative Co. ✦</h3>
            <ul>
              <li>Custom code from $600</li>
              <li>5–14 day delivery</li>
              <li>You talk directly to the developer</li>
              <li>Clean, portable code you own</li>
              <li>No lock-in, no ongoing fees</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="secpad" aria-labelledby="faq-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>FAQ</p>
        <h2 className="sh2" id="faq-h2" style={{ textAlign: 'center', maxWidth: 540, margin: '12px auto 48px' }}>
          Custom website development —<br /><em>questions answered.</em>
        </h2>
        <div className="faq-list" style={{ maxWidth: 780, margin: '0 auto' }}>
          {faqs.map((f, i) => (
            <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={f.q}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                {f.q}<span className="faq-ico" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="enquire" className="cta-sec" aria-labelledby="cta-h2">
        <div className="cta-glow" aria-hidden="true" />
        <p className="stag" style={{ justifyContent: 'center' }}>Get Started</p>
        <h2 className="cta-h2" id="cta-h2" style={{ textAlign: 'center' }}>
          Ready for a site built<br /><span>the right way?</span>
        </h2>
        <p className="cta-sub" style={{ textAlign: 'center' }}>
          Tell us about your business and we'll come back to you within 24 hours.
        </p>
        <div className="contact-form" style={{ maxWidth: 600, margin: '48px auto 0' }}>
          {formStatus === 'sent' ? (
            <div className="f-ok" role="alert" aria-live="polite">
              <div className="f-ok-ico">✦</div>
              <h3>Message Received</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} noValidate>
                <div className="f-row">
                  <div className="f-fld">
                    <input type="text" name="name" placeholder="Your Name *" required autoComplete="name" aria-label="Your Name" />
                  </div>
                  <div className="f-fld">
                    <input type="email" name="email" placeholder="Email Address *" required autoComplete="email" aria-label="Email Address" />
                  </div>
                </div>
                <div className="f-row">
                  <div className="f-fld">
                    <input type="tel" name="phone" placeholder="Phone Number" autoComplete="tel" aria-label="Phone Number" />
                  </div>
                  <div className="f-fld">
                    <input type="text" name="business" placeholder="Business Name" autoComplete="organization" aria-label="Business Name" />
                  </div>
                </div>
                <div className="f-fld">
                  <textarea name="message" placeholder="Tell us about your project" aria-label="Project details" />
                </div>
                <button type="submit" className="f-sub" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
              <p className="f-note">We'll get back to you within 24 hours. No obligation, no spam.</p>
            </>
          )}
        </div>
        <div className="cta-ci" style={{ marginTop: 56 }}>
          <div className="ci"><p className="ci-l">Call Us</p><a href="tel:+61401609118" className="ci-v">0401 609 118</a></div>
          <div className="ci-div" aria-hidden="true" />
          <div className="ci"><p className="ci-l">Email Us</p><a href="mailto:wilsoncreativeco.au@gmail.com" className="ci-v">wilsoncreativeco.au@gmail.com</a></div>
          <div className="ci-div" aria-hidden="true" />
          <div className="ci"><p className="ci-l">Based In</p><span className="ci-v">Brisbane, Australia</span></div>
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
              <a href="/#pricing">Pricing</a>
              <a href="#enquire">Contact</a>
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
