import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const TITLE = 'Web Design New Farm | Custom Websites From $600 — Wilson Creative Co.'
const DESC = 'Web design for New Farm businesses — custom-coded sites for cafés, restaurants, boutiques, studios, and professional services. From $600. Brisbane-based. You own the code.'
const URL = 'https://www.wilsoncreativeco.au/web-design-new-farm'

const faqs = [
  {
    q: 'Do you build websites for New Farm businesses?',
    a: 'Yes — we work with businesses throughout New Farm and the surrounding inner-city Brisbane suburbs. Whether you\'re a café on Brunswick Street, a boutique near the park, or a professional service in the area, we build custom-coded sites that reflect the quality and character of your business.',
  },
  {
    q: 'What types of New Farm businesses do you work with?',
    a: 'New Farm has a strong mix of hospitality, independent retail, professional services, creative practices, and lifestyle businesses. We\'ve built sites for cafés, restaurants, health practitioners, architects, designers, beauty salons, and more. Every site is built from scratch in custom code.',
  },
  {
    q: 'How much does a website cost for a New Farm business?',
    a: 'Our sites start from $600 for a custom Starter single-page site, $1,000 for a multi-page Growth site, and from $2,000 for Premium builds with e-commerce or booking systems. That\'s significantly less than most Brisbane agencies charge for the same level of quality.',
  },
  {
    q: 'How long does it take?',
    a: 'Starter sites are delivered in 5–7 business days. Growth sites take 10–14 days. Premium builds take 2–3 weeks. We work quickly and directly — no project management layers slowing things down.',
  },
  {
    q: 'Can you build booking systems for New Farm restaurants, health practitioners, or salons?',
    a: 'Yes. Our Premium tier includes custom booking and reservation systems. We build the exact functionality your business needs — whether it\'s a restaurant reservation flow, a health appointment system, or a salon booking page — without bloated off-the-shelf plugin solutions.',
  },
  {
    q: 'Do I own the website?',
    a: 'Yes — fully and completely. The code, the design assets, the domain — all yours the moment we deliver. No ongoing platform fees, no proprietary lock-in. Take the code to any developer at any time.',
  },
]

export default function WebDesignNewFarm() {
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
          message: fd.get('message') || 'Web Design New Farm enquiry',
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
            { '@type': 'ListItem', position: 2, name: 'Web Design New Farm', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Web Design New Farm',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://www.wilsoncreativeco.au' },
          areaServed: [{ '@type': 'Place', name: 'New Farm, Brisbane' }, { '@type': 'City', name: 'Brisbane' }],
          description: 'Custom web design for New Farm businesses. No templates. From $600.',
          offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '2000', priceCurrency: 'AUD' },
        })}</script>
      </Head>

      <SiteNav onBook={() => document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

      <section className="lp-hero" aria-label="Web design New Farm hero">
        <div className="lp-hero-inner">
          <p className="stag" style={{ justifyContent: 'center', marginBottom: 18 }}>New Farm · Inner Brisbane</p>
          <h1 className="lp-h1">Web Design<br /><span className="gold-line">New Farm</span></h1>
          <p className="lp-sub">Custom-coded websites for New Farm's cafés, boutiques, studios, and service businesses.<br />From <strong>$600</strong>. No templates. You own the code.</p>
          <div className="h-btns" style={{ justifyContent: 'center', marginTop: 36 }}>
            <a href="#enquire" className="btn-g">Get a Free Quote</a>
            <a href="/#work" className="btn-o">View Our Work →</a>
          </div>
          <p className="lp-trust">Brisbane-based. Built for the quality standards New Farm businesses expect.</p>
        </div>
      </section>

      <section className="secpad" aria-labelledby="nf-why-h2">
        <div className="lp-two-col">
          <div>
            <p className="stag">Built for New Farm</p>
            <h2 className="sh2" id="nf-why-h2">New Farm has high standards.<br />Your website should match them.</h2>
            <p className="lp-body">New Farm is one of Brisbane's most affluent and design-conscious suburbs. Customers here are discerning — they research before they visit, they judge quality on first impressions, and they expect a brand's online presence to match the standard of the experience they're about to have in person.</p>
            <p className="lp-body">A generic WordPress template doesn't cut it in this market. When someone finds your café, studio, or practice on Google, your website is often the deciding factor. If it looks like a free theme — slow, outdated, identical to a dozen other businesses — you've already lost them to the competitor whose site made a better impression.</p>
            <p className="lp-body">Wilson Creative Co. builds custom-coded websites from scratch. No page builders, no templates, no bloat. Every site is designed around the specific identity of your business — the kind of digital presence that earns the trust of New Farm's high-expectation customers before they've even walked through your door.</p>
            <p className="lp-body">We're Brisbane-based, and we understand the inner-city market. Sites start from $600 — because our lean, direct approach means you're not paying for overhead you don't need.</p>
          </div>
          <div className="lp-checks">
            {[
              'Custom-coded — built around your brand',
              'No templates, no Wix, no WordPress',
              'Premium look that matches the area',
              'Fast load times for mobile users',
              'Ranks better in local Google searches',
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

      <section className="secpad lp-industries-sec" aria-labelledby="nf-ind-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Who We Build For in New Farm</p>
        <h2 className="sh2" id="nf-ind-h2" style={{ textAlign: 'center', maxWidth: 640, margin: '12px auto 48px' }}>
          Web design for New Farm's diverse<br />community of businesses
        </h2>
        <div className="lp-industries">
          {[
            {
              icon: '☕',
              title: 'Cafés & Restaurants',
              desc: "New Farm's café culture is second to none. We build sites that do justice to your food, your space, and your brand — premium-feeling, fast-loading, and easy for customers to navigate.",
            },
            {
              icon: '🛍',
              title: 'Boutiques & Retail',
              desc: 'Independent retailers on Brunswick Street and throughout the suburb. Custom e-commerce or catalogue sites that feel as curated as your in-store experience.',
            },
            {
              icon: '💆',
              title: 'Health & Wellness',
              desc: 'Physios, psychologists, naturopaths, and wellness practitioners. Sites that build trust, communicate your approach, and make booking appointments straightforward.',
            },
            {
              icon: '🎨',
              title: 'Creative Studios & Architects',
              desc: 'Design studios, architects, interior designers, and photographers. Portfolio sites that let your work do the talking — minimal, fast, beautifully presented.',
            },
            {
              icon: '💼',
              title: 'Professional Services',
              desc: 'Lawyers, accountants, consultants, and financial advisers. Sites that position you as the obvious choice in a market where clients are comparing multiple providers.',
            },
            {
              icon: '💈',
              title: 'Hair, Beauty & Lifestyle',
              desc: 'Salons, spas, and beauty businesses where presentation is everything. Premium design that matches the standard of your services and makes booking online easy.',
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

      <section className="secpad pricing-bg" aria-labelledby="nf-price-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Pricing</p>
        <h2 className="sh2" id="nf-price-h2" style={{ textAlign: 'center', maxWidth: 580, margin: '12px auto 16px' }}>
          Premium quality.<br /><em>Not a premium price.</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--w6)', fontSize: 15, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Fixed-price packages with no surprises. You know exactly what you're paying before we start.
        </p>
        <div className="pc-grid">
          {[
            {
              name: 'Starter', price: 'From $600', featured: false,
              desc: 'Single-page custom site. Fast to deliver, built to convert.',
              features: ['Custom-coded single page', 'Mobile-responsive', 'Contact form + click-to-call', 'SEO foundations', '1 revision round', '5–7 day delivery'],
            },
            {
              name: 'Growth', price: 'From $1,000', featured: true,
              desc: 'Multi-page site for established New Farm businesses.',
              features: ['Up to 5 custom pages', 'Advanced design & animations', 'CMS or blog integration', 'Full SEO setup', '3 revision rounds', 'Analytics', '10–14 day delivery'],
            },
            {
              name: 'Premium', price: 'From $2,000', featured: false,
              desc: 'E-commerce, booking systems, and full-service builds.',
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

      <section className="secpad" aria-labelledby="nf-faq-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>FAQ</p>
        <h2 className="sh2" id="nf-faq-h2" style={{ textAlign: 'center', maxWidth: 540, margin: '12px auto 48px' }}>
          Web design in New Farm —<br /><em>questions answered.</em>
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

      <section id="enquire" className="cta-sec" aria-labelledby="nf-cta-h2">
        <div className="cta-glow" aria-hidden="true" />
        <p className="stag" style={{ justifyContent: 'center' }}>Get Started</p>
        <h2 className="cta-h2" id="nf-cta-h2" style={{ textAlign: 'center' }}>
          Let's build your<br /><span>New Farm website.</span>
        </h2>
        <p className="cta-sub" style={{ textAlign: 'center' }}>
          Tell us about your business and we'll be back within 24 hours. No obligation.
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
