import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const TITLE = 'Web Design Fortitude Valley | Custom Websites From $600 — Wilson Creative Co.'
const DESC = 'Web design for Fortitude Valley businesses — custom-coded sites for bars, venues, cafés, retail, creative studios and more. From $600. You own the code. Brisbane-based.'
const URL = 'https://www.wilsoncreativeco.au/web-design-fortitude-valley'

const faqs = [
  {
    q: 'Do you build websites for Fortitude Valley businesses?',
    a: 'Yes — we\'re based in Brisbane and regularly build sites for businesses throughout the Valley. Whether you\'re a bar, café, retailer, creative studio, or professional service, we build custom-coded sites that match the energy and identity of your brand.',
  },
  {
    q: 'What kind of businesses in Fortitude Valley do you work with?',
    a: 'The Valley\'s business mix is eclectic — hospitality, nightlife, retail, fashion, creative studios, hair and beauty, fitness, and professional services. We\'ve built sites for all of these. Every site is built from scratch in custom code, designed to stand out in a competitive space.',
  },
  {
    q: 'How much does a website cost for a Fortitude Valley business?',
    a: 'Our sites start from $600 for a custom single-page Starter site, $1,000 for a multi-page Growth site, and from $2,000 for Premium builds with e-commerce or booking systems. That\'s a fraction of what most Brisbane agencies charge for comparable work.',
  },
  {
    q: 'How long does it take to get a website built?',
    a: 'Starter sites are delivered in 5–7 business days. Growth sites take 10–14 days. Premium builds take 2–3 weeks. We work fast because we\'re lean — no layers of project managers between you and the person building your site.',
  },
  {
    q: 'Can you build booking systems or e-commerce for Valley venues and retailers?',
    a: 'Yes. Our Premium tier includes custom booking and e-commerce systems. Whether you need online reservations for a bar or restaurant, ticketing for events, or an online store for a retail brand, we build exactly what you need — not a bloated plugin solution.',
  },
  {
    q: 'Do I own the website once it\'s finished?',
    a: 'Completely. Every line of code, every design file, the domain — it all belongs to you. No lock-in to any platform, no ongoing fees unless you opt into our $25/month hosting. You can take the code to any developer at any time.',
  },
]

export default function WebDesignFortitudeValley() {
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
          message: fd.get('message') || 'Web Design Fortitude Valley enquiry',
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
            { '@type': 'ListItem', position: 2, name: 'Web Design Fortitude Valley', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Web Design Fortitude Valley',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://www.wilsoncreativeco.au' },
          areaServed: [{ '@type': 'Place', name: 'Fortitude Valley, Brisbane' }, { '@type': 'City', name: 'Brisbane' }],
          description: 'Custom web design for Fortitude Valley businesses. No templates. From $600.',
          offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '2000', priceCurrency: 'AUD' },
        })}</script>
      </Head>

      <SiteNav onBook={() => document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

      <section className="lp-hero" aria-label="Web design Fortitude Valley hero">
        <div className="lp-hero-inner">
          <p className="stag" style={{ justifyContent: 'center', marginBottom: 18 }}>Fortitude Valley · Brisbane</p>
          <h1 className="lp-h1">Web Design<br /><span className="gold-line">Fortitude Valley</span></h1>
          <p className="lp-sub">Custom-coded websites for Fortitude Valley's bars, cafés, retailers, studios, and creative businesses.<br />From <strong>$600</strong>. No templates. You own the code.</p>
          <div className="h-btns" style={{ justifyContent: 'center', marginTop: 36 }}>
            <a href="#enquire" className="btn-g">Get a Free Quote</a>
            <a href="/#work" className="btn-o">View Our Work →</a>
          </div>
          <p className="lp-trust">Brisbane-based. Built for Valley businesses that refuse to blend in.</p>
        </div>
      </section>

      <section className="secpad" aria-labelledby="fv-why-h2">
        <div className="lp-two-col">
          <div>
            <p className="stag">Built for the Valley</p>
            <h2 className="sh2" id="fv-why-h2">Fortitude Valley businesses<br />compete on identity. Your site should too.</h2>
            <p className="lp-body">Fortitude Valley is one of Brisbane's most distinctive business precincts — it's where bars, restaurants, independent retailers, creative studios, and lifestyle brands fight for attention in a dense, competitive environment. In a place like the Valley, your digital presence is as much a part of your brand as your fitout.</p>
            <p className="lp-body">Template websites don't cut it here. If your site looks like a generic WordPress theme, it sends a signal — and not the right one. Wilson Creative Co. builds custom sites from scratch, using clean modern code that reflects the actual character of your business. The result is a digital presence that works as hard as the rest of your brand.</p>
            <p className="lp-body">We're Brisbane-based, which means we know the Valley well. We understand how local customers find and choose businesses in this area — and we build sites that capture that intent, from mobile search to Google Maps to direct visits. Whether you're a long-established venue or just opening your doors, we build sites that put you in front of the right people.</p>
            <p className="lp-body">Our sites start from $600 — a fraction of what most Brisbane agencies charge — because we don't carry the overhead. You work directly with the person building your site. No account managers, no delays, no budget surprises.</p>
          </div>
          <div className="lp-checks">
            {[
              'Custom-coded — unique to your brand',
              'No templates, no Wix, no WordPress',
              'Built for local search in Brisbane',
              'Mobile-first design',
              'Fast load times — great for SEO',
              'Booking and e-commerce available',
              'You own the code outright',
              'Delivered in 5–14 business days',
            ].map(item => (
              <div className="lp-check" key={item}>
                <span className="lp-check-icon">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secpad lp-industries-sec" aria-labelledby="fv-ind-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Who We Build For in the Valley</p>
        <h2 className="sh2" id="fv-ind-h2" style={{ textAlign: 'center', maxWidth: 640, margin: '12px auto 48px' }}>
          Web design for every type of<br />Fortitude Valley business
        </h2>
        <div className="lp-industries">
          {[
            {
              icon: '🍸',
              title: 'Bars & Venues',
              desc: 'Fortitude Valley\'s nightlife is world-class. Your website should be too. We build venue sites that showcase your space, promote events, and make it effortless for people to find you and book a table.',
            },
            {
              icon: '☕',
              title: 'Cafés & Restaurants',
              desc: 'Premium-feeling sites for the Valley\'s café and dining scene. Custom-coded to load fast, reflect your brand, and make it easy for customers to find your hours, menu, and location.',
            },
            {
              icon: '🛍',
              title: 'Retail & Boutiques',
              desc: 'Independent retail stores and fashion boutiques that need a digital presence as carefully crafted as their physical store. Custom e-commerce available from $2,000.',
            },
            {
              icon: '🎨',
              title: 'Creative Studios',
              desc: 'Design studios, photographers, tattoo artists, and creative businesses. Portfolio-led sites that do justice to your work and present your brand with the same quality you put into everything else.',
            },
            {
              icon: '💆',
              title: 'Hair, Beauty & Wellness',
              desc: 'Salons, spas, and wellness brands. Sites that position you as premium, make online booking seamless, and keep existing clients coming back.',
            },
            {
              icon: '🏋',
              title: 'Fitness & Lifestyle',
              desc: 'Gyms, boxing clubs, yoga studios, and health brands in and around the Valley. Sites that drive new memberships and class bookings with a look that matches your energy.',
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

      <section className="secpad pricing-bg" aria-labelledby="fv-price-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Pricing</p>
        <h2 className="sh2" id="fv-price-h2" style={{ textAlign: 'center', maxWidth: 580, margin: '12px auto 16px' }}>
          Custom work.<br /><em>Honest prices.</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--w6)', fontSize: 15, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Fixed-price packages — you know the cost before we start. No surprises.
        </p>
        <div className="pc-grid">
          {[
            {
              name: 'Starter', price: 'From $600', featured: false,
              desc: 'Single-page custom site. Perfect for businesses getting online fast.',
              features: ['Custom-coded single page', 'Mobile-responsive', 'Contact form + click-to-call', 'SEO foundations', '1 revision round', '5–7 day delivery'],
            },
            {
              name: 'Growth', price: 'From $1,000', featured: true,
              desc: 'Multi-page site for established Valley businesses.',
              features: ['Up to 5 custom pages', 'Advanced animations', 'CMS or blog integration', 'Full SEO setup', '3 revision rounds', 'Analytics', '10–14 day delivery'],
            },
            {
              name: 'Premium', price: 'From $2,000', featured: false,
              desc: 'E-commerce, bookings, or complex custom functionality.',
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

      <section className="secpad" aria-labelledby="fv-faq-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>FAQ</p>
        <h2 className="sh2" id="fv-faq-h2" style={{ textAlign: 'center', maxWidth: 540, margin: '12px auto 48px' }}>
          Web design in Fortitude Valley —<br /><em>questions answered.</em>
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

      <section id="enquire" className="cta-sec" aria-labelledby="fv-cta-h2">
        <div className="cta-glow" aria-hidden="true" />
        <p className="stag" style={{ justifyContent: 'center' }}>Get Started</p>
        <h2 className="cta-h2" id="fv-cta-h2" style={{ textAlign: 'center' }}>
          Let's build your<br /><span>Fortitude Valley website.</span>
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
