import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const TITLE = 'Web Design Newstead | Custom Websites From $600 — Wilson Creative Co.'
const DESC = 'Web design for Newstead businesses — custom-coded sites for hospitality, retail, professional services, and creative brands in one of Brisbane\'s fastest-growing precincts. From $600.'
const URL = 'https://www.wilsoncreativeco.au/web-design-newstead'

const faqs = [
  {
    q: 'Do you build websites for Newstead businesses?',
    a: 'Yes — we work with businesses throughout Newstead and the surrounding inner-city Brisbane precincts including Teneriffe, Newstead, and Bowen Hills. We build custom-coded sites for hospitality venues, retail brands, professional services, creative studios, and fitness businesses.',
  },
  {
    q: 'What types of Newstead businesses do you work with?',
    a: 'Newstead has evolved into one of Brisbane\'s most dynamic mixed-use precincts. We build sites for the full range — restaurants and bars near Gasworks, boutique retailers, creative agencies, fitness studios, health professionals, and corporate services. Every site is custom-coded from scratch.',
  },
  {
    q: 'How much does a website cost for a Newstead business?',
    a: 'Our sites start from $600 for a custom Starter single-page site, $1,000 for a multi-page Growth site, and from $2,000 for Premium builds. That\'s significantly cheaper than most Brisbane agencies — because we\'re lean and direct, not carrying the overhead of a large studio.',
  },
  {
    q: 'How fast can you deliver?',
    a: 'Starter sites are delivered in 5–7 business days. Growth sites in 10–14 days. Premium builds in 2–3 weeks. We work faster than any agency in Brisbane because you deal directly with the developer — no layers, no delays.',
  },
  {
    q: 'Can you build e-commerce or booking systems for Newstead businesses?',
    a: 'Yes. Our Premium tier includes custom e-commerce stores and booking systems. We build the exact functionality you need — whether it\'s a restaurant reservation system, an online retail store, or an appointment booking flow for a health or fitness business.',
  },
  {
    q: 'Do I own the website when it\'s finished?',
    a: 'Completely. Every line of code, every file, the domain — all yours from the moment we deliver. No platform lock-in, no mandatory ongoing fees. Optional managed hosting is available at $25/month, but there\'s zero obligation.',
  },
]

export default function WebDesignNewstead() {
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
          message: fd.get('message') || 'Web Design Newstead enquiry',
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
            { '@type': 'ListItem', position: 2, name: 'Web Design Newstead', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Web Design Newstead',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://www.wilsoncreativeco.au' },
          areaServed: [{ '@type': 'Place', name: 'Newstead, Brisbane' }, { '@type': 'City', name: 'Brisbane' }],
          description: 'Custom web design for Newstead businesses. No templates. From $600.',
          offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '2000', priceCurrency: 'AUD' },
        })}</script>
      </Head>

      <SiteNav onBook={() => document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

      <section className="lp-hero" aria-label="Web design Newstead hero">
        <div className="lp-hero-inner">
          <p className="stag" style={{ justifyContent: 'center', marginBottom: 18 }}>Newstead · Inner Brisbane</p>
          <h1 className="lp-h1">Web Design<br /><span className="gold-line">Newstead</span></h1>
          <p className="lp-sub">Custom-coded websites for Newstead's hospitality venues, retailers, creative brands, and service businesses.<br />From <strong>$600</strong>. No templates. You own the code.</p>
          <div className="h-btns" style={{ justifyContent: 'center', marginTop: 36 }}>
            <a href="#enquire" className="btn-g">Get a Free Quote</a>
            <a href="/#work" className="btn-o">View Our Work →</a>
          </div>
          <p className="lp-trust">Brisbane-based. Built for the pace and ambition of Newstead's business precinct.</p>
        </div>
      </section>

      <section className="secpad" aria-labelledby="ns-why-h2">
        <div className="lp-two-col">
          <div>
            <p className="stag">Built for Newstead</p>
            <h2 className="sh2" id="ns-why-h2">Newstead is growing fast.<br />Your website needs to keep up.</h2>
            <p className="lp-body">Newstead has transformed into one of Brisbane's most exciting precincts. The Gasworks development, the influx of hospitality and retail, the concentration of creative and professional businesses — this is a suburb that moves quickly and attracts a commercially savvy, design-literate customer base.</p>
            <p className="lp-body">In that environment, a generic WordPress template is a liability. When your potential customer is choosing between you and the business next door, your website is often the deciding vote. A site that looks cheap, loads slowly, or feels like a template tells them everything they need to know about how you run your business.</p>
            <p className="lp-body">Wilson Creative Co. builds custom-coded websites from scratch. No shortcuts, no templates, no bloat. Every site is designed around your specific brand and your customers — fast-loading, mobile-first, and built to rank in local Brisbane search results. We're based in Brisbane, we understand the Newstead market, and we build sites that give you a real competitive edge.</p>
            <p className="lp-body">Sites start from $600 — because we're lean and direct. You work with the person building your site. No account managers, no project managers, no unnecessary overhead.</p>
          </div>
          <div className="lp-checks">
            {[
              'Custom code — built from scratch',
              'No WordPress, Wix, or page builders',
              'Designed for Newstead\'s competitive market',
              'Mobile-first, fast-loading',
              'Optimised for local Brisbane search',
              'Booking and e-commerce available',
              'You own the code outright',
              '5–14 business day delivery',
            ].map(item => (
              <div className="lp-check" key={item}>
                <span className="lp-check-icon">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secpad lp-industries-sec" aria-labelledby="ns-ind-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Who We Build For in Newstead</p>
        <h2 className="sh2" id="ns-ind-h2" style={{ textAlign: 'center', maxWidth: 640, margin: '12px auto 48px' }}>
          Web design for every business<br />in the Newstead precinct
        </h2>
        <div className="lp-industries">
          {[
            {
              icon: '🍽',
              title: 'Restaurants & Bars',
              desc: 'The Gasworks precinct and surrounding streets have some of Brisbane\'s best hospitality. We build sites that showcase your food, your space, and your brand — and make it effortless for new customers to find and choose you.',
            },
            {
              icon: '🛍',
              title: 'Retail & Boutiques',
              desc: 'Independent retailers and boutique stores in and around Newstead. Custom e-commerce or catalogue sites that reflect the quality and curation of what you sell.',
            },
            {
              icon: '💼',
              title: 'Professional Services',
              desc: 'Lawyers, accountants, consultants, and financial services in the Newstead and Teneriffe business corridor. Sites that position you credibly and convert enquiries.',
            },
            {
              icon: '🎨',
              title: 'Creative Agencies',
              desc: 'Design studios, marketing agencies, architects, and creative businesses. Showcase your work with a custom-coded portfolio site that matches the standard of your output.',
            },
            {
              icon: '🏋',
              title: 'Fitness & Wellness',
              desc: 'Gyms, yoga studios, personal trainers, and health practitioners serving the Newstead and Teneriffe residential and corporate market. Booking-integrated sites that drive new memberships.',
            },
            {
              icon: '🏗',
              title: 'Construction & Development',
              desc: 'Builders, developers, and trade contractors active in Brisbane\'s inner-city growth corridor. Sites that build credibility and drive commercial enquiries.',
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

      <section className="secpad pricing-bg" aria-labelledby="ns-price-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Pricing</p>
        <h2 className="sh2" id="ns-price-h2" style={{ textAlign: 'center', maxWidth: 580, margin: '12px auto 16px' }}>
          Custom-built websites.<br /><em>Fixed, transparent prices.</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--w6)', fontSize: 15, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          You know exactly what you're paying before we start. No surprises, no scope creep.
        </p>
        <div className="pc-grid">
          {[
            {
              name: 'Starter', price: 'From $600', featured: false,
              desc: 'Single-page custom site. The fastest way to get a professional site live.',
              features: ['Custom-coded single page', 'Mobile-responsive', 'Contact form + click-to-call', 'SEO foundations', '1 revision round', '5–7 day delivery'],
            },
            {
              name: 'Growth', price: 'From $1,000', featured: true,
              desc: 'Multi-page site for established Newstead businesses.',
              features: ['Up to 5 custom pages', 'Advanced design & animations', 'CMS or blog', 'Full SEO setup', '3 revision rounds', 'Analytics', '10–14 day delivery'],
            },
            {
              name: 'Premium', price: 'From $2,000', featured: false,
              desc: 'E-commerce, booking systems, and complex builds.',
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

      <section className="secpad" aria-labelledby="ns-faq-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>FAQ</p>
        <h2 className="sh2" id="ns-faq-h2" style={{ textAlign: 'center', maxWidth: 540, margin: '12px auto 48px' }}>
          Web design in Newstead —<br /><em>questions answered.</em>
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

      <section id="enquire" className="cta-sec" aria-labelledby="ns-cta-h2">
        <div className="cta-glow" aria-hidden="true" />
        <p className="stag" style={{ justifyContent: 'center' }}>Get Started</p>
        <h2 className="cta-h2" id="ns-cta-h2" style={{ textAlign: 'center' }}>
          Let's build your<br /><span>Newstead website.</span>
        </h2>
        <p className="cta-sub" style={{ textAlign: 'center' }}>
          Tell us about your business and we'll respond within 24 hours. No obligation.
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
