import { useEffect, useRef, useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  {
    num: '01',
    icon: '🖥',
    name: 'Web Design & Development',
    desc: 'Fully custom-coded websites built from the ground up. No templates, no page builders, no shortcuts. Fast, modern, and designed to turn attention into enquiries.',
    statusType: 'live',
    statusLabel: 'Available Now',
    backTitle: 'What you get',
    backPoints: [
      'Fully custom-coded website',
      'No Wix, no templates, no drag-and-drop builders',
      'Mobile-first responsive design',
      'Fast loading performance',
      'SEO foundations included',
      'Contact forms, click-to-call and analytics',
    ],
  },
  {
    num: '02',
    icon: '🚁',
    name: 'Drone Videography',
    desc: 'Cinematic aerial footage for brands, properties, events, and campaigns. Built to add scale, movement, and premium production value to your online presence.',
    statusType: 'soon',
    statusLabel: 'Coming Soon',
    backTitle: "What's coming",
    backPoints: [
      'Cinematic aerial footage',
      'Property, brand and event shoots',
      'Hero video content for websites',
      'Social media-ready edits',
      'Colour grading and delivery included',
      'Brisbane and surrounding areas',
    ],
  },
]

const aboutPills = [
  'Custom Code',
  'No Templates',
  'Brisbane Based',
  'Global Clients',
  'Conversion First',
  'Mobile First',
]

const workItems = [
  {
    src: 'https://noir-cafe-beige.vercel.app',
    preview: '/work-noir.jpg',
    displayUrl: 'noircafe.com.au',
    tag: 'Hospitality',
    industry: 'Sample Build — NOIR Café',
    title: 'Coffee · Matcha · Culture',
    sub: 'Award-worthy café brand & site',
    scroll: 4200,
  },
  {
    src: 'https://detailing-ashen.vercel.app',
    preview: '/work-detailing.jpg',
    displayUrl: 'elitedetailing.com.au',
    tag: 'Automotive',
    industry: 'Sample Build — Elite Detailing',
    title: 'Precision · Gloss · Protection',
    sub: 'High-end detailing experience & conversion-focused site',
    scroll: 4800,
  },
  {
    src: 'https://landscaping-azure.vercel.app',
    preview: '/work-landscaping.jpg',
    displayUrl: 'horizonlandscaping.com.au',
    tag: 'Landscaping',
    industry: 'Sample Build — Horizon Landscaping',
    title: 'Outdoor · Luxury · Transformation',
    sub: 'Premium landscaping brand & modern lead-generation site',
    scroll: 4600,
  },
  {
    src: 'https://n-two-theta-61.vercel.app',
    preview: '/work-gym.jpg',
    displayUrl: 'premiumgym.com.au',
    tag: 'Gym',
    industry: 'Sample Build — Premium Gym',
    title: 'Strength · Discipline · Presence',
    sub: 'High-impact fitness brand & lead-generation site',
    scroll: 4400,
  },
  {
    src: '/meridian.html',
    preview: '/work-meridian.jpg',
    displayUrl: 'meridianproperty.com.au',
    tag: 'Real Estate',
    industry: 'Sample Build — Luxury Property',
    title: 'Where Exceptional Homes Find Their People',
    sub: 'Premium real estate agency experience',
    scroll: 4000,
  },
]

const processSteps = [
  {
    num: '01',
    title: 'Discovery',
    desc: "We take the time to understand your business, your goals, and exactly what you want your website to achieve. Whether you have a clear vision or no idea where to start, we'll guide the process and identify what will actually drive results.",
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'We map out a clear plan for your site — structure, layout, and user flow — all tailored to your business. Every decision is made with one goal: turning visitors into enquiries or customers.',
  },
  {
    num: '03',
    title: 'Design & Build',
    desc: 'Your website is fully custom coded from scratch — no Wix, no templates, no shortcuts. Everything designed and built specifically for your business — fast, modern, and completely unique.',
  },
  {
    num: '04',
    title: 'Launch & Support',
    desc: "Once everything is tested and approved, we launch your site smoothly. After launch, we're here for updates, tweaks, and ongoing support to keep everything running properly.",
  },
]

const pricingTiers = [
  {
    name: 'Starter',
    price: 'From $600',
    featured: false,
    desc: 'Perfect for small businesses and personal brands getting started online.',
    features: [
      'Custom single-page website',
      'Mobile-responsive design',
      'Contact form + click-to-call',
      'Basic SEO setup',
      '1 round of revisions',
      '5–7 day delivery',
    ],
  },
  {
    name: 'Growth',
    price: 'From $1,000',
    featured: true,
    desc: 'For established brands ready to scale their digital presence.',
    features: [
      'Multi-page website (up to 5 pages)',
      'Advanced animations & interactions',
      'CMS or blog integration',
      'Full SEO optimisation',
      '3 rounds of revisions',
      'Analytics dashboard setup',
      '10–14 day delivery',
    ],
  },
  {
    name: 'Premium',
    price: 'From $2,000',
    featured: false,
    desc: 'Full-service creative solution for brands that demand the best.',
    features: [
      'Everything in Growth',
      'E-commerce or booking system',
      'Custom brand strategy session',
      'Content creation & copywriting',
      'Priority ongoing support',
      'Unlimited revisions',
      '2–3 week delivery',
    ],
  },
]

const hostingFeatures = [
  'We keep your website live and accessible online',
  'We connect your domain to the website',
  'We manage the full hosting setup',
  'SSL so your site loads securely with HTTPS',
  'Basic uptime and hosting monitoring',
  'Move to your own hosting at any time',
]

const faqItems = [
  {
    q: 'How much does a custom website cost in Brisbane?',
    a: 'Wilson Creative Co. websites start from $600 for a single-page Starter site, $1,000 for a multi-page Growth site, and from $2,000 for a full Premium build including e-commerce or booking systems. Optional hosting is available at $25/month.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Starter sites are delivered in 5–7 days. Growth sites take 10–14 days. Premium builds are completed in 2–3 weeks. All timelines include your revision rounds.',
  },
  {
    q: 'Do you use templates or page builders like Wix?',
    a: 'Never. Every Wilson Creative Co. website is fully custom-coded from scratch. No Wix, no Squarespace, no Webflow templates — just clean, fast, custom code built specifically for your business.',
  },
  {
    q: 'Do you work with clients outside of Brisbane?',
    a: "Absolutely. While we're based in Brisbane, we work with clients across Australia and globally. The entire process is handled remotely with clear communication at every stage.",
  },
  {
    q: 'What do I need to provide to get started?',
    a: "Not much. If you have a logo, brand colours, and some idea of what you want — great. If you're starting from scratch, we'll guide you through everything during the Discovery phase.",
  },
]

const marqueeRow1 = [
  'Web Design & Development',
  'Aerial Cinematography',
  'Brand Strategy',
  'Social Media Content',
  'Photography',
  'Custom Code — No Templates',
  'Brisbane Based — Global Reach',
]

const marqueeRow2 = [
  'Conversion Focused',
  'Mobile First',
  'Premium Animations',
  'Lightning Fast',
  'SEO Optimised',
  'Built to Convert',
  '100% Custom Code',
]

export default function App() {
  const [loadPct, setLoadPct] = useState(0)
  const [loaderOut, setLoaderOut] = useState(false)
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProg, setScrollProg] = useState(0)
  const [showFCta, setShowFCta] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [formStatus, setFormStatus] = useState('idle')
  const [flippedCard, setFlippedCard] = useState(null)
  const [livePreviews, setLivePreviews] = useState([])
  const [readyPreviews, setReadyPreviews] = useState([])
const [activeBuild, setActiveBuild] = useState(1)
  const canvasRef = useRef(null)
  const heroRef = useRef(null)
  const heroInnerRef = useRef(null)
  const portTrackRef = useRef(null)
  const portfolioRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const duration = 3200
    const start = performance.now()
    let raf

    const tick = now => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setLoadPct(Math.floor(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setLoaderOut(true), 260)
        setTimeout(() => setLoaderHidden(true), 980)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const tryPlay = () => v.play().catch(() => {})
    if (v.readyState >= 2) {
      tryPlay()
    } else {
      v.addEventListener('loadeddata', tryPlay, { once: true })
    }
    return () => v.removeEventListener('loadeddata', tryPlay)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      setNavScrolled(sy > 60)
      setScrollProg(h > 0 ? (sy / h) * 100 : 0)
      setShowFCta(sy > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        e.target.classList.add('vi')
        io.unobserve(e.target)
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' })
    document.querySelectorAll('.rv,.rl,.rr').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const animateCounter = el => {
      const target = +el.dataset.t
      const suffix = el.dataset.s || ''
      const step = target / 55
      let current = 0
      const timer = setInterval(() => {
        current = Math.min(current + step, target)
        el.textContent = Math.floor(current) + suffix
        if (current >= target) clearInterval(timer)
      }, 22)
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        animateCounter(e.target)
        io.unobserve(e.target)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.cnt').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const handlers = []
    document.querySelectorAll('.tilt').forEach(el => {
      const onMove = e => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`
        el.style.transition = 'transform .05s'
      }
      const onLeave = () => {
        el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)'
        el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)'
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      handlers.push({ el, onMove, onLeave })
    })
    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  useEffect(() => {
    const track = portTrackRef.current
    if (!track) return
    let isDrag = false
    let startX = 0
    let startScroll = 0
    const onDown = e => {
      isDrag = true
      startX = e.pageX - track.offsetLeft
      startScroll = track.scrollLeft
      track.style.cursor = 'grabbing'
    }
    const onUp = () => {
      isDrag = false
      track.style.cursor = 'grab'
    }
    const onMove = e => {
      if (!isDrag) return
      e.preventDefault()
      track.scrollLeft = startScroll - (e.pageX - track.offsetLeft - startX)
    }
    track.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mousemove', onMove)
    return () => {
      track.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  useEffect(() => {
    const section = portfolioRef.current
    if (!section) return
    const timers = []
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      workItems.forEach((item, index) => {
        const timer = setTimeout(() => {
          setLivePreviews(prev => prev.includes(item.src) ? prev : [...prev, item.src])
        }, index * 420)
        timers.push(timer)
      })
      io.disconnect()
    }, { threshold: 0.22 })
    io.observe(section)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const scrollTo = (href, wasOpen = false) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, wasOpen ? 320 : 0)
  }

  const handleNav = (e, href) => {
    e.preventDefault()
    scrollTo(href, menuOpen)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch(e.target.action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      setFormStatus(res.ok ? 'sent' : 'idle')
      if (res.ok) e.target.reset()
    } catch {
      setFormStatus('idle')
    }
  }

  const markPreviewReady = src => {
    setReadyPreviews(prev => prev.includes(src) ? prev : [...prev, src])
  }
const prevBuild =
  activeBuild === 0
    ? workItems.length - 1
    : activeBuild - 1

const nextBuild =
  activeBuild === workItems.length - 1
    ? 0
    : activeBuild + 1

const goPrev = () => {
  setActiveBuild(prevBuild)
}

const goNext = () => {
  setActiveBuild(nextBuild)
}
  const year = new Date().getFullYear()

  return (
    <>
      <div id="spb" style={{ width: `${scrollProg}%` }} />

      {!loaderHidden && (
        <div id="loader" className={loaderOut ? 'out' : ''}>
          <div className="ae-grid" aria-hidden="true" />
          <div className="ae-noise" aria-hidden="true" />
          <div className="ae-scan" aria-hidden="true" />
          <div className="ae-core">
            <div className="ae-code" aria-hidden="true">
              <span>build_attention()</span>
            </div>
            <div className="ae-lock" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            <div className="loader-brand" aria-label="Wilson Creative Co.">
              <span className="loader-word" style={{ '--i': 0 }}>Wilson</span>
              <span className="loader-word gold" style={{ '--i': 1 }}>Creative</span>
              <span className="loader-word" style={{ '--i': 2 }}>Co.</span>
            </div>
            <div className="loader-line">
              <span style={{ width: `${loadPct}%` }} />
            </div>
            <div className="loader-status">
              {loadPct < 35 ? 'Compiling attention' : loadPct < 70 ? 'Calibrating brand signal' : loadPct < 96 ? 'Preparing reveal' : 'Ready'}
            </div>
          </div>
        </div>
      )}

      <nav id="nav" className={navScrolled ? 'sc' : ''} aria-label="Main navigation">
        <a href="/" className="n-logo" aria-label="Wilson Creative Co. Home">
          Wilson <span>Creative</span> Co.
        </a>
        <ul className="n-links">
          {navItems.map(item => (
            <li key={item.label}>
              <a href={item.href} onClick={e => handleNav(e, item.href)}>{item.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="n-cta" onClick={e => handleNav(e, '#contact')}>
          Start a Project
        </a>
        <button
          className={`ham ${menuOpen ? 'on' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <s /><s /><s />
        </button>
      </nav>

      <nav id="mnav" className={menuOpen ? 'on' : ''} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        {navItems.map(item => (
          <a key={item.label} className="mn-link" href={item.href} onClick={e => handleNav(e, item.href)}>
            {item.label}
          </a>
        ))}
        <div className="mn-bottom">
          <div className="mn-contact">
            <a href="tel:+61401609118">📞 0401 609 118</a>
            <a href="mailto:wilsoncreativeco.au@gmail.com">✉️ wilsoncreativeco.au@gmail.com</a>
          </div>
          <a href="#contact" className="mn-cta" onClick={e => handleNav(e, '#contact')}>
            Get a Free Demo →
          </a>
        </div>
      </nav>

      <section className="hero" id="top" ref={heroRef} aria-label="Hero">
        <canvas id="hcanvas" ref={canvasRef} aria-hidden="true" />
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay muted loop playsInline preload="auto"
          poster="/fallback.jpg"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="h-orb h-orb-1" aria-hidden="true" />
        <div className="h-orb h-orb-2" aria-hidden="true" />
        <div className="h-orb h-orb-3" aria-hidden="true" />
        <div className="h-ov" aria-hidden="true" />
        <div className="h-inner" ref={heroInnerRef}>
          <p className="h-eye">Brisbane Based — Global Reach</p>
          <h1 className="h1" aria-label="We Don't Just Build Websites. We Build Attention.">
            <span className="hl"><span className="hw hw1">We Don&apos;t Just</span></span>
            <span className="hl"><span className="hw hw2">Build Websites.</span></span>
            <span className="hl"><span className="hw hw3">We Build</span></span>
            <span className="hl"><span className="hw hw4 gold-line">Attention.</span></span>
          </h1>
          <p className="h-sub">And turn it into customers.</p>
          <div className="h-btns">
            <a href="#contact" className="btn-g" onClick={e => handleNav(e, '#contact')}>Start a Project</a>
            <a href="#work" className="btn-o" onClick={e => handleNav(e, '#work')}>View Our Work →</a>
          </div>
        </div>
        <div className="h-scroll" aria-hidden="true">
          <span className="h-sl" /> Scroll to Explore
        </div>
        <div className="h-stats" aria-label="Key stats">
          <div><span className="hs-val cnt" data-t="47" data-s="+">0</span><span className="hs-lbl">Projects Delivered</span></div>
          <div><span className="hs-val cnt" data-t="100" data-s="%">0</span><span className="hs-lbl">Client Satisfaction</span></div>
          <div><span className="hs-val cnt" data-t="3" data-s="+">0</span><span className="hs-lbl">Years Building</span></div>
        </div>
      </section>

      <div className="mqs" aria-hidden="true">
        <div className="mqr">
          {[...marqueeRow1, ...marqueeRow1].map((t, i) => (
            <span className="mqi" key={i}>{t}<span className="mqd" /></span>
          ))}
        </div>
        <div className="mqr">
          {[...marqueeRow2, ...marqueeRow2].map((t, i) => (
            <span className="mqi" key={i}>{t}<span className="mqd" /></span>
          ))}
        </div>
      </div>

      <section id="services" className="secpad" aria-labelledby="svc-h2">
        <div className="svc-intro">
          <div className="svc-intro-l">
            <p className="stag rv">What We Do</p>
            <h2 className="sh2 rv d1" id="svc-h2">Focused services for<br />brands that want to <em>stand out</em></h2>
          </div>
          <div className="svc-intro-r rv d2">
            <p>We focus on what moves the needle first: a custom website that converts, with cinematic drone content coming next.</p>
            <a href="#contact" className="btn-g" onClick={e => handleNav(e, '#contact')}>Get a Free Demo</a>
          </div>
        </div>
        <div className="svc-grid rv d1">
          {services.map(s => (
            <div className="sc-wrapper" key={s.num}>
              <div className={`sc-flipper ${flippedCard === s.num ? 'flipped' : ''}`}>
                <div className="sc-front">
                  <div className="sc-num">{s.num}</div>
                  <div className="sc-ico" aria-hidden="true">{s.icon}</div>
                  <h3 className="sc-name">{s.name}</h3>
                  <p className="sc-desc">{s.desc}</p>
                  <span className={`sc-badge ${s.statusType}`}>
                    {s.statusType === 'live' && <span>●</span>} {s.statusLabel}
                  </span>
                  <button
                    className="sc-arr"
                    aria-label={`Learn more about ${s.name}`}
                    onClick={() => setFlippedCard(flippedCard === s.num ? null : s.num)}
                  >→</button>
                </div>
                <div className="sc-back">
                  <button className="sc-back-close" onClick={() => setFlippedCard(null)} aria-label="Go back">← Back</button>
                  <div className="sc-ico" aria-hidden="true">{s.icon}</div>
                  <h3 className="sc-back-title">{s.backTitle}</h3>
                  <ul className="sc-back-list">
                    {s.backPoints.map(pt => <li key={pt}>{pt}</li>)}
                  </ul>
                  <a
                    href="#contact"
                    className="btn-g"
                    style={{ marginTop: 'auto', textAlign: 'center', display: 'block', padding: '12px' }}
                    onClick={e => { handleNav(e, '#contact'); setFlippedCard(null) }}
                  >Get Started</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="secpad" aria-labelledby="about-h2">
        <div className="about">
          <div className="about-vis rl" aria-hidden="true">
            <div className="av-frame">
              <div className="av-inner">
                <div className="av-bg">WC</div>
                <p className="av-tagline">Built to<br /><span>dominate</span><br />your market.</p>
                <div className="av-c"><span /><span /><span /><span /></div>
              </div>
            </div>
          </div>
          <div className="about-text">
            <p className="stag rv">Why Creative Co.</p>
            <h2 className="sh2 rv d1" id="about-h2">The studio that<br /><em>does the work</em></h2>
            <p className="rv d2">We&apos;re a Brisbane-based creative studio delivering high-performance content and fully custom-coded websites for brands that want to stand out. Every project is built from the ground up — no templates, no limitations — giving you complete control, faster performance, and a solution tailored exactly to your business.</p>
            <p className="rv d3">Whether you&apos;re local or operating globally, we work with clients anywhere to create digital experiences that not only look premium, but drive real results.</p>
            <div className="about-pills rv d3">
              {aboutPills.map(p => <span className="pill" key={p}>{p}</span>)}
            </div>
            <div className="about-sts rv d4">
              <div><span className="as-val cnt" data-t="47" data-s="+">0</span><span className="as-lbl">Projects Done</span></div>
              <div><span className="as-val cnt" data-t="100" data-s="%">0</span><span className="as-lbl">Satisfaction</span></div>
              <div><span className="as-val cnt" data-t="3" data-s="+">0</span><span className="as-lbl">Years Active</span></div>
            </div>
          </div>
        </div>
      </section>

<section id="work" className="port recent-builds" aria-labelledby="work-h2" ref={portfolioRef}>
  <div className="port-hd recent-builds-hd">
    <div>
      <p className="stag rv">Featured Work</p>

      <h2
        className="sh2 rv d1"
        id="work-h2"
        style={{
          maxWidth: 680,
          textAlign: 'center',
          margin: '0 auto',
        }}
      >
        Recent Builds
      </h2>

      <p
        style={{
          marginTop: 18,
          color: 'rgba(245,242,236,.55)',
          fontSize: '15px',
          lineHeight: 1.7,
          textAlign: 'center',
          maxWidth: 520,
          marginInline: 'auto',
        }}
      >
        A selection of recent websites we&apos;ve designed & developed
        for brands that demand quality.
      </p>
    </div>
  </div>

  <div className="recent-builds-wrap">

<article
  className="build-side build-left"
  onClick={goPrev}
>

  <div className="build-browser-shell side-shell">

    <div className="build-browser-bar">

      <div className="build-dots">
        <span />
        <span />
        <span />
      </div>

      <div className="build-url">
        <span className="build-lock">🔒</span>
        {workItems[prevBuild].displayUrl}
      </div>

    </div>

    <div className="build-iframe-wrap side-wrap">

      <iframe
        src={workItems[prevBuild].src}
        title={workItems[prevBuild].title}
        loading="lazy"
        scrolling="no"
      />

    </div>

  </div>

</article>

{/* CENTER */}
<article className="build-main">

  <button className="build-nav prev" onClick={goPrev}>
    ←
  </button>

  <button className="build-nav next" onClick={goNext}>
    →
  </button>

  <div className="build-glow" />

  <div className="build-browser-shell main-shell">

    <div className="build-browser-bar">

      <div className="build-dots">
        <span />
        <span />
        <span />
      </div>

      <div className="build-url">
        <span className="build-lock">🔒</span>
        {workItems[activeBuild].displayUrl}
      </div>

      <div className="build-expand">↗</div>

    </div>

    <div className="build-iframe-wrap main-wrap">

      <iframe
        src={workItems[activeBuild].src}
        title={workItems[activeBuild].title}
        loading="lazy"
        scrolling="no"
      />

    </div>

  </div>

  <div className="build-meta center-meta">

    <span className="build-tag">
      {workItems[activeBuild].tag}
    </span>

    <h3>
      {workItems[activeBuild].industry.replace('Sample Build — ', '')}
    </h3>

    <p>
      {workItems[activeBuild].title}
    </p>

  </div>

  <div className="build-dots-nav">

    {workItems.map((_, i) => (

      <button
        key={i}
        className={`build-dot ${i === activeBuild ? 'active' : ''}`}
        onClick={() => setActiveBuild(i)}
      />

    ))}

  </div>

</article>

{/* RIGHT */}
<article
  className="build-side build-right"
  onClick={goNext}
>

  <div className="build-browser-shell side-shell">

    <div className="build-browser-bar">

      <div className="build-dots">
        <span />
        <span />
        <span />
      </div>

      <div className="build-url">
        <span className="build-lock">🔒</span>
        {workItems[nextBuild].displayUrl}
      </div>

    </div>

    <div className="build-iframe-wrap side-wrap">

      <iframe
        src={workItems[nextBuild].src}
        title={workItems[nextBuild].title}
        loading="lazy"
        scrolling="no"
      />

    </div>

  </div>

</article>

</div>
  <div className="recent-builds-btn">
    <a
      href="#contact"
      className="btn-o"
      onClick={e => handleNav(e, '#contact')}
    >
      View All Projects →
    </a>
  </div>
</section>
      <section id="process" className="secpad" aria-labelledby="proc-h2">
        <p className="stag rv">How It Works</p>
        <h2 className="sh2 rv d1" id="proc-h2">A process built<br />for <em>results</em></h2>
        <div className="proc-steps">
          {processSteps.map((s, i) => (
            <div className={`ps rv d${i + 1}`} key={s.num}>
              <div className="ps-num" aria-hidden="true">{s.num}</div>
              <div>
                <h3 className="ps-ttl">{s.title}</h3>
                <p className="ps-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="secpad pricing-bg" aria-labelledby="price-h2">
        <p className="stag rv">Investment</p>
        <h2 className="sh2 rv d1" id="price-h2">Transparent pricing.<br />No <em>surprises.</em></h2>
        <p className="rv d2" style={{ maxWidth: 540, fontSize: 14, color: 'var(--w6)', lineHeight: 1.85, marginTop: 14 }}>
          Every package is tailored to your needs — and every site is built from scratch.
        </p>
        <div className="pc-grid">
          {pricingTiers.map((t, i) => (
            <div className={`pc ${t.featured ? 'feat' : ''} rv d${i + 1}`} key={t.name}>
              {t.featured && <div className="pc-badge">Most Popular</div>}
              <h3 className="pc-name">{t.name}</h3>
              <div className="pc-price">{t.price}</div>
              <p className="pc-desc">{t.desc}</p>
              <ul className="pc-feats">
                {t.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a
                href="#contact"
                className={t.featured ? 'btn-g' : 'btn-o'}
                onClick={e => handleNav(e, '#contact')}
                style={{ textAlign: 'center', width: '100%', display: 'block', padding: 14 }}
              >Get Started</a>
            </div>
          ))}
        </div>
        <div className="hosting rv d2">
          <div>
            <p className="h-lbl">Optional Add-On</p>
            <h3 className="h-name">Website Hosting</h3>
            <div className="h-price">$25 / month</div>
            <p className="h-desc">We look after the technical side of keeping your site live. Completely optional — host yourself or let us manage everything.</p>
            <br />
            <a href="#contact" className="btn-o" onClick={e => handleNav(e, '#contact')} style={{ display: 'inline-block', marginTop: 8 }}>
              Ask About Hosting
            </a>
          </div>
          <ul className="h-feats">
            {hostingFeatures.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </section>

      <section className="secpad" aria-labelledby="faq-h2">
        <p className="stag rv">Common Questions</p>
        <h2 className="sh2 rv d1" id="faq-h2">Everything you need<br />to <em>know</em></h2>
        <div className="faq-list rv d2">
          {faqItems.map((f, i) => (
            <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={f.q}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                {f.q}<span className="faq-ico" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="cta-sec" aria-labelledby="cta-h2">
        <div className="cta-glow" aria-hidden="true" />
        <p className="stag rv" style={{ justifyContent: 'center' }}>Ready to Stand Out?</p>
        <h2 className="cta-h2 rv d1" id="cta-h2">Let&apos;s Build<br /><span>Something</span><br />Unforgettable.</h2>
        <p className="cta-sub rv d2">Your competitors are using templates. Your customers deserve better. Let&apos;s make something that stops the scroll.</p>
        <div className="contact-form rv d3">
          {formStatus === 'sent' ? (
            <div className="f-ok" role="alert" aria-live="polite">
              <div className="f-ok-ico">✦</div>
              <h3>Message Received</h3>
              <p>We&apos;ll get back to you shortly. Talk soon.</p>
            </div>
          ) : (
            <>
              <form action="https://formspree.io/f/xojywkwo" method="POST" onSubmit={handleSubmit} noValidate>
                <div className="f-row">
                  <div className="f-fld">
                    <input type="text" name="name" placeholder="Your Name" required autoComplete="name" aria-label="Your Name" />
                  </div>
                  <div className="f-fld">
                    <input type="email" name="email" placeholder="Email Address" required autoComplete="email" aria-label="Email Address" />
                  </div>
                </div>
                <div className="f-fld">
                  <input type="tel" name="phone" placeholder="Phone Number (optional)" autoComplete="tel" aria-label="Phone Number" />
                </div>
                <div className="f-fld">
                  <textarea name="message" placeholder="Tell us about your project — what do you need, what's your vision?" required aria-label="Project details" />
                </div>
                <button type="submit" className="f-sub" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
              <p className="f-note">We&apos;ll get back to you within 24 hours. No obligation, no spam.</p>
            </>
          )}
        </div>
        <div className="cta-ci rv d4">
          <div className="ci">
            <p className="ci-l">Call Us</p>
            <a href="tel:+61401609118" className="ci-v">0401 609 118</a>
          </div>
          <div className="ci-div" aria-hidden="true" />
          <div className="ci">
            <p className="ci-l">Email Us</p>
            <a href="mailto:wilsoncreativeco.au@gmail.com" className="ci-v">wilsoncreativeco.au@gmail.com</a>
          </div>
          <div className="ci-div" aria-hidden="true" />
          <div className="ci">
            <p className="ci-l">Based In</p>
            <span className="ci-v">Brisbane, Australia</span>
          </div>
        </div>
      </section>

      <footer role="contentinfo">
        <div className="ft">
          <div className="fb">
            <p className="fb-name">Wilson <span>Creative</span> Co.</p>
            <p>Websites and content that build attention and turn it into customers. Brisbane-based. Built for the world.</p>
          </div>
          <div className="f-cols">
            <div className="fc">
              <p>Navigate</p>
              {navItems.map(i => (
                <a key={i.label} href={i.href} onClick={e => handleNav(e, i.href)}>{i.label}</a>
              ))}
            </div>
            <div className="fc">
              <p>Follow</p>
              <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
            <div className="fc">
              <p>Contact</p>
              <a href="mailto:wilsoncreativeco.au@gmail.com">wilsoncreativeco.au@gmail.com</a>
              <a href="tel:+61401609118">0401 609 118</a>
              <a href="#contact" onClick={e => handleNav(e, '#contact')}>Start a Project</a>
            </div>
          </div>
        </div>
        <div className="fb-bot">
          <p className="f-copy">© {year} Wilson Creative Co. All rights reserved. | Brisbane, QLD, Australia</p>
          <div className="f-soc">
            <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="mailto:wilsoncreativeco.au@gmail.com" aria-label="Email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <polyline points="22,4 12,13 2,4" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <button id="fcta" className={showFCta ? 'show' : ''} onClick={() => scrollTo('#contact')} aria-label="Start a project">
        Start a Project ✦
      </button>
    </>
  )
}
