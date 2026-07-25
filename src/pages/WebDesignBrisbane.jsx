import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

const TITLE = 'Web Design Brisbane | Custom Websites From $600 — Wilson Creative Co.'
const DESC = 'Custom-coded web design in Brisbane from $600. No templates, no Wix. Hand-built sites for trades, cafés & businesses across Brisbane and Australia. You own the code.'
const URL = 'https://www.wilsoncreativeco.au/web-design-brisbane'

const faqs = [
  {
    q: 'How much does web design cost in Brisbane?',
    a: 'Wilson Creative Co. websites start from $600 for a Starter single-page site, $1,000 for a multi-page Growth site, and from $2,000 for a Premium build with e-commerce or booking systems. Compare that to most Brisbane agencies who charge $3,000–$8,000+ for comparable work. You also get optional managed hosting at $25/month.',
  },
  {
    q: 'Do you build websites for construction and trade businesses?',
    a: 'Yes — it\'s one of our most common builds. Tradies and construction businesses in Brisbane and the Gold Coast need sites that load fast on mobile, generate phone calls, and build trust at a glance. We build sites specifically designed to convert on-site estimates and drive enquiries.',
  },
  {
    q: 'Do you build websites for cafés and hospitality businesses in Brisbane?',
    a: 'Absolutely. We\'ve built sites for cafés and hospitality brands across Brisbane. Good café websites need to look premium, load instantly, and make it dead easy for customers to find your location, hours, and menu. We handle all of that in custom code — no template that looks like every other café in the city.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Starter sites are delivered in 5–7 business days. Growth sites take 10–14 days. Premium builds take 2–3 weeks. All timelines include revision rounds. Most Brisbane agencies quote 6–12 weeks for the same scope.',
  },
  {
    q: 'Do I own my website when it\'s built?',
    a: 'Yes — completely. You own the code, the domain, and every asset on the site. Nothing is locked to us. If you ever want to move to another developer, take it with you. No lock-in contracts, no ongoing fees unless you choose our optional hosting.',
  },
  {
    q: 'Do you work with businesses outside Brisbane?',
    a: 'Yes. We\'re Brisbane-based but we work with clients across Australia and internationally. Everything is handled remotely — discovery, design, build, revisions and launch — with clear communication at every step.',
  },
]

export default function WebDesignBrisbane() {
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
          message: fd.get('message') || 'Web Design Brisbane enquiry',
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
            { '@type': 'ListItem', position: 2, name: 'Web Design Brisbane', item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Web Design Brisbane',
          provider: { '@type': 'ProfessionalService', name: 'Wilson Creative Co.', url: 'https://www.wilsoncreativeco.au' },
          areaServed: [{ '@type': 'City', name: 'Brisbane' }, { '@type': 'Country', name: 'Australia' }],
          description: 'Custom-coded web design for Brisbane businesses. No templates. From $600.',
          offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '2000', priceCurrency: 'AUD' },
        })}</script>
      </Head>

      <SiteNav onBook={() => document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

      {/* HERO */}
      <section className="lp-hero" aria-label="Web design Brisbane hero">
        <div className="lp-hero-inner">
          <p className="stag" style={{ justifyContent: 'center', marginBottom: 18 }}>Brisbane &amp; Australia-Wide</p>
          <h1 className="lp-h1">Web Design<br /><span className="gold-line">Brisbane</span></h1>
          <p className="lp-sub">Custom-coded websites built to convert visitors into customers.<br />No templates. No Wix. No lock-in. From <strong>$600</strong>.</p>
          <div className="h-btns" style={{ justifyContent: 'center', marginTop: 36 }}>
            <a href="#enquire" className="btn-g">Get a Free Quote</a>
            <a href="/#work" className="btn-o">View Our Work →</a>
          </div>
          <p className="lp-trust">Trusted by Brisbane cafés, construction businesses, and growing brands across Australia</p>
        </div>
      </section>

      {/* WHY CUSTOM CODE */}
      <section className="secpad" aria-labelledby="why-h2">
        <div className="lp-two-col">
          <div>
            <p className="stag">The Problem With Templates</p>
            <h2 className="sh2" id="why-h2">Your competitors are using the same Wix template.<br />That's why nothing stands out.</h2>
            <p className="lp-body">Most Brisbane web designers hand you a WordPress theme, tweak the colours, and call it a day. You end up with a site that looks like everyone else in your industry — slow, generic, and built on a platform that you never truly own.</p>
            <p className="lp-body">At Wilson Creative Co., every website is written from scratch in clean, custom code. No Wix. No Squarespace. No page builders. The result is a site that's faster, ranks better in Google, and is built specifically around how your customers make decisions — not around a template that was designed for someone else.</p>
          </div>
          <div className="lp-checks">
            {[
              'Fully custom code — built from scratch',
              'You own everything outright',
              'No ongoing platform fees',
              'Faster loading than template sites',
              'Ranks better in Google',
              'Designed around your customers, not a template',
              'Unique — looks nothing like your competitors',
              'Can be maintained by any developer',
            ].map(item => (
              <div className="lp-check" key={item}>
                <span className="lp-check-icon">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="secpad lp-industries-sec" aria-labelledby="ind-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Who We Build For</p>
        <h2 className="sh2" id="ind-h2" style={{ textAlign: 'center', maxWidth: 640, margin: '12px auto 48px' }}>Web design for Brisbane businesses<br />across every industry</h2>
        <div className="lp-industries">
          {[
            {
              icon: '🏗',
              title: 'Construction & Trades',
              desc: 'Builders, electricians, plumbers, landscapers, and tradies across Brisbane and the Gold Coast. Sites that build trust fast, load on mobile, and turn quote requests into booked jobs.',
            },
            {
              icon: '☕',
              title: 'Cafés & Hospitality',
              desc: 'Café and restaurant websites for Brisbane\'s competitive food scene. Premium design that reflects your brand, loads instantly, and makes it easy for customers to find you, see your menu, and visit.',
            },
            {
              icon: '💼',
              title: 'Professional Services',
              desc: 'Accountants, lawyers, consultants, and service businesses who need a site that positions them as the obvious choice — not just another option on Google.',
            },
            {
              icon: '🏋',
              title: 'Fitness & Wellness',
              desc: 'Gyms, personal trainers, physios, and wellness studios. Sites that capture leads, showcase your offering, and make it easy for new clients to take the first step.',
            },
            {
              icon: '🏡',
              title: 'Real Estate & Property',
              desc: 'Property agencies, developers, and buyers\' agents who need a premium digital presence that matches the quality of their listings and builds client confidence.',
            },
            {
              icon: '🛒',
              title: 'Retail & E-commerce',
              desc: 'Custom online stores built for performance and conversion. Fast loading, mobile-first, and designed to make buying easy — not frustrating.',
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

      {/* PRICING */}
      <section className="secpad pricing-bg" aria-labelledby="price-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Transparent Pricing</p>
        <h2 className="sh2" id="price-h2" style={{ textAlign: 'center', maxWidth: 580, margin: '12px auto 16px' }}>
          Half the price of a Brisbane agency.<br /><em>Twice the quality.</em>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--w6)', fontSize: 15, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Most Brisbane web agencies charge $3,000–$8,000+ for a custom website. We charge a fraction of that — because we're not carrying the overhead of a 20-person studio.
        </p>
        <div className="pc-grid">
          {[
            {
              name: 'Starter', price: 'From $600', featured: false,
              desc: 'For small businesses and personal brands getting online.',
              features: ['Single-page custom website', 'Mobile-responsive design', 'Contact form + click-to-call', 'Basic SEO setup', '1 round of revisions', '5–7 day delivery'],
            },
            {
              name: 'Growth', price: 'From $1,000', featured: true,
              desc: 'For established Brisbane businesses ready to scale.',
              features: ['Multi-page website (up to 5 pages)', 'Advanced animations & interactions', 'CMS or blog integration', 'Full SEO optimisation', '3 rounds of revisions', 'Analytics setup', '10–14 day delivery'],
            },
            {
              name: 'Premium', price: 'From $2,000', featured: false,
              desc: 'Full-service solution for brands that demand the best.',
              features: ['Everything in Growth', 'E-commerce or booking system', 'Brand strategy session', 'Content & copywriting', 'Priority support', 'Unlimited revisions', '2–3 week delivery'],
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

      {/* VS AGENCIES / VS FREELANCERS */}
      <section className="secpad" aria-labelledby="vs-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>How We Compare</p>
        <h2 className="sh2" id="vs-h2" style={{ textAlign: 'center', maxWidth: 600, margin: '12px auto 48px' }}>
          Not a big agency. Not a Wix freelancer.<br /><em>Something better.</em>
        </h2>
        <div className="lp-compare">
          <div className="lp-compare-col lp-compare-bad">
            <h3>Big Brisbane Agencies</h3>
            <ul>
              <li>$3,000–$8,000+ for a basic site</li>
              <li>6–12 week turnaround</li>
              <li>You're one of 50 clients</li>
              <li>Junior staff do the actual work</li>
              <li>Locked into their retainer model</li>
            </ul>
          </div>
          <div className="lp-compare-col lp-compare-bad">
            <h3>Cheap Freelancers</h3>
            <ul>
              <li>WordPress or Wix templates</li>
              <li>Generic — looks like everyone else</li>
              <li>Slow, bloated, hard to maintain</li>
              <li>You don't fully own the code</li>
              <li>Disappears after launch</li>
            </ul>
          </div>
          <div className="lp-compare-col lp-compare-us">
            <h3>Wilson Creative Co. ✦</h3>
            <ul>
              <li>From $600 — fully custom code</li>
              <li>5–14 day delivery</li>
              <li>Direct access to the person building it</li>
              <li>Fast, clean, unique to your brand</li>
              <li>You own everything, no lock-in</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BRISBANE + AUSTRALIA */}
      <section className="secpad" aria-labelledby="loc-h2">
        <div className="lp-two-col lp-two-col-rev">
          <div className="av-frame" aria-hidden="true" style={{ maxWidth: 340, margin: '0 auto' }}>
            <div className="av-inner">
              <div className="av-bg">WC</div>
              <p className="av-tagline">Brisbane<br /><span>based.</span><br />Built for<br /><span>the world.</span></p>
            </div>
          </div>
          <div>
            <p className="stag">Location</p>
            <h2 className="sh2" id="loc-h2">Brisbane-based.<br />Available <em>anywhere in Australia.</em></h2>
            <p className="lp-body">We're based in Brisbane, QLD — which means we know the local market, understand what Brisbane customers respond to, and are available for in-person meetings if you prefer a face-to-face conversation before getting started.</p>
            <p className="lp-body">That said, location has never been a barrier. We work with clients across Australia — Sydney, Melbourne, Perth, the Gold Coast, regional Queensland — and internationally. Everything is handled remotely with clear communication from discovery to launch.</p>
            <a href="#enquire" className="btn-g" style={{ display: 'inline-block', marginTop: 24 }}>Start a Conversation</a>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="secpad" aria-labelledby="proc-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>How It Works</p>
        <h2 className="sh2" id="proc-h2" style={{ textAlign: 'center', maxWidth: 540, margin: '12px auto 48px' }}>
          From first conversation<br />to live website in <em>days, not months.</em>
        </h2>
        <div className="proc-steps">
          {[
            { num: '01', title: 'Discovery', desc: 'We learn about your business, your customers, and what you want the site to achieve. No jargon, no lengthy briefs — just a straightforward conversation that gives us everything we need to build something that works.' },
            { num: '02', title: 'Design & Build', desc: 'Your site is built from scratch in custom code. No templates, no shortcuts. Every section is designed specifically for your business and your audience — mobile-first, fast-loading, and built to convert.' },
            { num: '03', title: 'Review & Revise', desc: 'You review a live preview and give feedback. We include revision rounds in every package so you\'re not being rushed through changes. We keep refining until it\'s exactly right.' },
            { num: '04', title: 'Launch', desc: 'We handle the technical side of going live — domain connection, SSL, final testing across devices. After launch, we\'re available for ongoing support, updates, and anything else your business needs.' },
          ].map((s, i) => (
            <div className={`ps`} key={s.num}>
              <div className="ps-num" aria-hidden="true">{s.num}</div>
              <div>
                <h3 className="ps-ttl">{s.title}</h3>
                <p className="ps-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="secpad" aria-labelledby="faq-h2">
        <p className="stag" style={{ justifyContent: 'center' }}>Common Questions</p>
        <h2 className="sh2" id="faq-h2" style={{ textAlign: 'center', maxWidth: 540, margin: '12px auto 48px' }}>
          Web design in Brisbane —<br />questions <em>answered.</em>
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

      {/* CONTACT FORM */}
      <section id="enquire" className="cta-sec" aria-labelledby="cta-h2">
        <div className="cta-glow" aria-hidden="true" />
        <p className="stag" style={{ justifyContent: 'center' }}>Get Started</p>
        <h2 className="cta-h2" id="cta-h2" style={{ textAlign: 'center' }}>
          Let&apos;s build your<br /><span>Brisbane website.</span>
        </h2>
        <p className="cta-sub" style={{ textAlign: 'center' }}>
          Tell us about your business and we'll come back to you within 24 hours. No obligation, no hard sell.
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
                  <textarea name="message" placeholder="Tell us about your project — industry, goals, anything useful" aria-label="Project details" />
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
