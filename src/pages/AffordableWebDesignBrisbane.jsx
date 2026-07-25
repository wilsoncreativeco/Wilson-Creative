import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const TITLE = 'Affordable Web Design Brisbane | Custom Sites From $600 — Wilson Creative Co.'
const DESC = 'Affordable web design in Brisbane that doesn\'t cut corners. Custom-coded sites from $600 — half the price of agencies, twice the quality. No templates. You own the code.'
const URL = 'https://wilsoncreativeco.au/affordable-web-design-brisbane'

const faqs = [
  {
    q: 'What does affordable web design actually cost in Brisbane?',
    a: 'At Wilson Creative Co., affordable means starting from $600 for a fully custom-coded single-page website. Our Growth tier starts at $1,000 for a multi-page site, and Premium from $2,000 for e-commerce or booking systems. That\'s 3–5x cheaper than most Brisbane agencies for genuinely custom work — not a template with your logo on it.',
  },
  {
    q: 'Is affordable web design lower quality?',
    a: 'Not with us. Our sites are custom-coded from scratch — no WordPress, no Wix, no page builders. The reason we can charge less than a big agency isn\'t because we cut corners on quality. It\'s because we don\'t carry the overhead of a 20-person studio with account managers, project managers, and sales teams. You pay for the work, not the headcount.',
  },
  {
    q: 'What\'s included in a $600 starter website?',
    a: 'A $600 Starter site includes a fully custom-coded single-page website, mobile-responsive design, a contact form with click-to-call, basic SEO setup (meta tags, schema, sitemap), and one round of revisions. Delivered in 5–7 business days.',
  },
  {
    q: 'Are there ongoing fees after the website is built?',
    a: 'No mandatory ongoing fees. You own the code and can host it anywhere you like. We offer optional managed hosting at $25/month if you want us to handle server management, updates, and uptime monitoring — but it\'s completely optional. No lock-in.',
  },
  {
    q: 'Do I own the website once it\'s built?',
    a: 'Yes, fully. The code, the design, the domain, every image — it\'s all yours from the moment we deliver. There are no ongoing licensing fees, no proprietary platform, and no dependency on us to keep your site running. You can take it to any developer at any time.',
  },
  {
    q: 'How do you keep prices so low compared to other Brisbane agencies?',
    a: 'Simple: we\'re a lean operation. No CBD office, no junior staff learning on your project, no account management overhead. When you work with Wilson Creative Co., you\'re working directly with the person building your site. That means faster delivery, clearer communication, and a lower price — without any compromise on quality.',
  },
]

export default function AffordableWebDesignBrisbane() {
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
          message: fd.get('message') || 'Affordable Web Design Brisbane enquiry',
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
        <meta property="og:image" content="https://wilsoncreativeco.au/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wilsoncreativeco.au' },
            { '@type': 'ListItem', position: 2, name: 'Affordable Web Design Brisbane', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Affordable Web Design Brisbane',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://wilsoncreativeco.au' },
          areaServed: [{ '@type': 'City', name: 'Brisbane' }, { '@type': 'Country', name: 'Australia' }],
          description: 'Affordable custom web design for Brisbane businesses. No templates. From $600.',
          offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '2000', priceCurrency: 'AUD' },
        })}</script>
      </Head>

      <SiteNav onBook={() => document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

      <section className="lp-hero" aria-label="Affordable web design Brisbane hero">
        <div className="lp-hero-inner">
          <p className="stag" style={{ justifyContent: 'center', marginBottom: 18 }}>No Compromise. No Templates.</p>
          <h1 className="lp-h1">Affordable Web Design<br /><span className="gold-line">Brisbane</span></h1>
          <p className="lp-sub">Custom-coded websites at a price that actually makes sense for small business.<br />From <strong>$600</strong> — half the price of agencies, built the right way.</p>
          <div className="h-btns" style={{ justifyContent: 'center', marginTop: 36 }}>
            <a href="#enquire" className="btn-g">Get a Free Quote</a>
            <a href="/#work" className="btn-o">View Our Work →</a>
          </div>
          <p className="lp-trust">Trusted by Brisbane small businesses, trades, cafés, and growing brands</p>
        </div>
      </section>

      <section className="secpad" aria-labelledby="why-h2">
        <div className="lp-two-col">
          <div>
            <p className="stag">Why We're Different</p>
            <h2 className="sh2" id="why-h2">Affordable doesn't mean cheap.<br />It means we cut overhead, not quality.</h2>
            <p className="lp-body">The reason web design feels expensive in Brisbane is overhead. Big agencies carry the cost of CBD offices, account managers, project managers, and sales teams — and all of that overhead gets billed to you. A simple website becomes a $5,000 project because of the layers between you and the person actually doing the work.</p>
            <p className="lp-body">Wilson Creative Co. is different. We're a lean, direct operation — you work with the person building your site from day one. No intermediaries, no hidden fees, no inflated timelines to justify a big invoice. The result is genuinely affordable web design that doesn't cut corners on what matters: code quality, design, and results.</p>
            <p className="lp-body">Every site we build is custom-coded from scratch. Not a WordPress theme, not a Squarespace template, not a Wix drag-and-drop. Real code, written for your business, that you own outright when it's done.</p>
          </div>
          <div className="lp-checks">
            {[
              'From $600 — fixed price, no surprises',
              'Custom-coded, not template-built',
              'You talk directly to the developer',
              'No CBD agency overhead in your invoice',
              'Delivered in 5–14 days',
              'You own everything outright',
              'No ongoing mandatory fees',
              'Fast, unique, and built to rank',
            ].map(item => (
              <div className="lp-check" key={item}>
                <span className="lp-check-icon">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secpad pricing-bg" aria-labelledby="price-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>What You Pay</p>
        <h2 className="sh2" id="price-h2" style={{ textAlign: 'center', maxWidth: 580, margin: '12px auto 16px' }}>
          Transparent pricing.<br /><em>No hidden fees. No surprises.</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--w6)', fontSize: 15, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Fixed-price packages — you know exactly what you're paying before we start.
        </p>
        <div className="pc-grid">
          {[
            {
              name: 'Starter', price: 'From $600', featured: false,
              desc: 'The most affordable way to get a professional custom website online.',
              features: ['Custom-coded single page', 'Mobile-responsive', 'Contact form + click-to-call', 'SEO foundations', '1 revision round', '5–7 day delivery'],
            },
            {
              name: 'Growth', price: 'From $1,000', featured: true,
              desc: 'Multi-page site for businesses ready to grow their online presence.',
              features: ['Up to 5 custom pages', 'Advanced design & animations', 'CMS or blog integration', 'Full SEO setup', '3 revision rounds', 'Google Analytics', '10–14 day delivery'],
            },
            {
              name: 'Premium', price: 'From $2,000', featured: false,
              desc: 'Full-service build with e-commerce, booking, or custom functionality.',
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
        <p style={{ textAlign: 'center', color: 'var(--w5)', fontSize: 14, marginTop: 32 }}>
          Optional managed hosting available at $25/month — fully optional, no lock-in.
        </p>
      </section>

      <section className="secpad" aria-labelledby="vs-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>The Real Comparison</p>
        <h2 className="sh2" id="vs-h2" style={{ textAlign: 'center', maxWidth: 640, margin: '12px auto 48px' }}>
          What does $600–$2,000 get you<br /><em>from different providers?</em>
        </h2>
        <div className="lp-compare">
          <div className="lp-compare-col lp-compare-bad">
            <h3>Brisbane Agencies</h3>
            <ul>
              <li>$3,000–$8,000+ for a basic site</li>
              <li>6–12 week timelines</li>
              <li>Junior staff do the work</li>
              <li>Locked into ongoing retainers</li>
              <li>You're not a priority client</li>
            </ul>
          </div>
          <div className="lp-compare-col lp-compare-bad">
            <h3>Cheap DIY / Fiverr</h3>
            <ul>
              <li>WordPress themes or Wix</li>
              <li>Looks like everyone else</li>
              <li>Slow and hard to rank</li>
              <li>Platform fees forever</li>
              <li>Poor results, no support</li>
            </ul>
          </div>
          <div className="lp-compare-col lp-compare-us">
            <h3>Wilson Creative Co. ✦</h3>
            <ul>
              <li>From $600 — fully custom code</li>
              <li>5–14 day delivery</li>
              <li>Direct access to your developer</li>
              <li>Fast, ranked, unique to your brand</li>
              <li>You own everything. No lock-in.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="secpad" aria-labelledby="faq-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>FAQ</p>
        <h2 className="sh2" id="faq-h2" style={{ textAlign: 'center', maxWidth: 540, margin: '12px auto 48px' }}>
          Affordable web design Brisbane —<br /><em>questions answered.</em>
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
          Get a quote.<br /><span>No obligation.</span>
        </h2>
        <p className="cta-sub" style={{ textAlign: 'center' }}>
          Tell us about your business and we'll respond within 24 hours with a clear quote.
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

      <SiteFooter />
    </>
  )
}
