import { useEffect, useRef, useState } from 'react'
import './App.css'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
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
    icon: '📸',
    name: 'Full-Service Media Production',
    desc: 'Full-scale media production including cinematic filming, drone coverage, photography, reels, and promotional content built to elevate your brand.',
    statusType: 'soon',
    statusLabel: 'Coming Soon',
    backTitle: "What's coming",
    backPoints: [
  'Premium video production',

  'Aerial cinematography',

  'Brand & commercial photography',

  'Short-form social content',

  'Professional post-production',

  'Campaign-ready creative assets',
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
    displayUrl: 'phantomdetailing.com.au',
    tag: 'Automotive',
    industry: 'Sample Build — Phantom Detailing',
    title: 'Precision · Protection · Perfection',
    sub: 'High-end detailing experience & conversion-focused site',
    scroll: 4800,
  },
  {
    src: 'https://landscaping-azure.vercel.app',
    preview: '/work-landscaping.jpg',
    displayUrl: 'verdantlandscaping.com.au',
    tag: 'Landscaping',
    industry: 'Sample Build — Verdant Landscaping',
    title: 'Inspired · By · Nature',
    sub: 'Premium landscaping brand & modern lead-generation site',
    scroll: 4600,
  },
  {
    src: 'https://n-two-theta-61.vercel.app',
    preview: '/work-gym.jpg',
    displayUrl: 'Apexgym.com.au',
    tag: 'Gym',
    industry: 'Sample Build — Apex Gym',
    title: 'Strength · Performance · Recovery',
    sub: 'High-impact fitness brand & lead-generation site',
    scroll: 4400,
  },
  {
    src: '/meridian.html',
    preview: '/work-meridian.jpg',
    displayUrl: 'meridianproperty.com.au',
    tag: 'Real Estate',
    industry: 'Sample Build — Luxury Property',
    title: 'Property · Investment · Lifestyle',
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
    a: "Wilson Creative Co. websites start from $600 for a single-page Starter site, $1,000 for a multi-page Growth site, and from $2,000 for a full Premium build including e-commerce or booking systems. Optional managed hosting is available at $25/month — that covers your domain connection, SSL certificate, uptime monitoring and full hosting management. To put that in perspective, most Brisbane web agencies charge $3,000–$8,000+ for a comparable custom build, and many lock you into ongoing retainers on top. We keep our pricing straightforward so quality isn't out of reach for growing businesses.",
  },
  {
    q: 'How long does it take to build a website?',
    a: "Starter sites are delivered in 5–7 business days. Growth sites take 10–14 days. Premium builds — including e-commerce, booking systems or complex integrations — are completed in 2–3 weeks. Every timeline includes revision rounds, so you're not being rushed through feedback. Compare that to most agencies who quote 6–12 weeks for a similar scope. We move fast without cutting corners because we're not juggling 30 projects at once.",
  },
  {
    q: 'Do you use templates or page builders like Wix?',
    a: "Never. Every Wilson Creative Co. website is written from scratch in clean, custom code — no Wix, no Squarespace, no Webflow templates, no WordPress page builders. Template-based sites look like every other business in your industry, load slower, and limit what you can actually do. Custom code means your site is built exactly for your business, loads faster, ranks better in Google, and gives you complete flexibility as you grow. It's the difference between a suit off the rack and one made for you.",
  },
  {
    q: 'Do you work with clients outside of Brisbane?',
    a: "Absolutely. While we're based in Brisbane, we work with clients across Australia and internationally. Everything is handled remotely — discovery, design, development, feedback and launch — with clear communication at every stage. If you're local and want to meet in person, we're happy to arrange that too. Location has never been a barrier for delivering great work.",
  },
  {
    q: 'What do I need to provide to get started?',
    a: "Less than you'd think. If you have a logo, brand colours and a rough idea of what you want — perfect, we'll take it from there. If you're starting from scratch with nothing, that's completely fine too. We'll walk you through a short discovery process to understand your business, your customers and your goals, then handle the rest. You don't need to know anything about web design or code — that's our job.",
  },
  {
    q: 'Will my website show up on Google?',
    a: "Every website we build includes solid SEO foundations — semantic HTML structure, fast page speed, mobile optimisation, meta tags, Open Graph, structured data (schema markup), an XML sitemap and a robots.txt. These are the technical foundations that Google needs to properly index and rank your site. We also connect your site to Google Search Console so you can track performance from day one. Full SEO content strategy and ongoing ranking campaigns are available as an add-on.",
  },
  {
    q: 'What happens after my site goes live?',
    a: "You own everything — the code, the domain, the content. Nothing is locked to us. If you want to take your site to another developer down the track, you can. We offer optional ongoing support at $25/month which covers hosting, SSL, uptime monitoring and minor content updates. For larger changes or new features, we quote those separately so you only pay for what you actually need. No surprise invoices, no lock-in contracts.",
  },
]


const LOADER_TEXT = 'WILSON CREATIVE CO.'

// Generated once at module load — stable across re-renders, no canvas needed
const HERO_STARS = Array.from({ length: 65 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: Math.random() * 1.4 + 0.4,
  a: Math.random() * 0.28 + 0.08,
  delay: Math.random() * 6,
  dur: Math.random() * 4 + 2.5,
}))

const StatCounter = ({ target, label, suffix = '' }) => {
  const [display, setDisplay] = useState(target)
  const ref = useRef(null)

  useEffect(() => {
    setDisplay(0)
    const step = target / 55
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      io.disconnect()
      let current = 0
      const timer = setInterval(() => {
        current = Math.min(current + step, target)
        setDisplay(Math.round(current))
        if (current >= target) clearInterval(timer)
      }, 22)
    }, { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [target])

  return (
    <div ref={ref}>
      <span className="hs-val">{display}{suffix}</span>
      <span className="hs-lbl">{label}</span>
    </div>
  )
}

export default function App() {
  const [scrambled, setScrambled] = useState(LOADER_TEXT)
  const [loaderOut, setLoaderOut] = useState(false)
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProg, setScrollProg] = useState(0)
  const [showFCta, setShowFCta] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [formStatus, setFormStatus] = useState('idle')
  const [modal, setModal] = useState(null) // null | 'demo' | 'hosting'
  const [modalForm, setModalForm] = useState({ name: '', email: '', business: '', field: '', note: '' })
  const [modalStatus, setModalStatus] = useState('idle')
  const [flippedCard, setFlippedCard] = useState(null)
  const [livePreviews, setLivePreviews] = useState([])
  const [readyPreviews, setReadyPreviews] = useState([])
const [activeBuild, setActiveBuild] = useState(1)
  const heroRef = useRef(null)
  const heroInnerRef = useRef(null)
  const portTrackRef = useRef(null)
  const portfolioRef = useRef(null)
  const ptclRef = useRef(null)

  useEffect(() => {
    const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#$@!%&*'
    const NON_SPACES = [...LOADER_TEXT].reduce((a, c, i) => c !== ' ' ? [...a, i] : a, [])
    const start = Date.now()

    const iv = setInterval(() => {
      const locked = new Set(NON_SPACES.slice(0, Math.min(
        Math.floor((Date.now() - start) / 62),
        NON_SPACES.length
      )))
      setScrambled(
        [...LOADER_TEXT].map((c, i) => {
          if (c === ' ') return ' '
          if (locked.has(i)) return c
          return POOL[Math.floor(Math.random() * POOL.length)]
        }).join('')
      )
      if (locked.size >= NON_SPACES.length) {
        clearInterval(iv)
        setScrambled(LOADER_TEXT)
      }
    }, 30)

    const t1 = setTimeout(() => setLoaderOut(true), 2600)
    const t2 = setTimeout(() => setLoaderHidden(true), 3300)
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2) }
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
    if (menuOpen) {
      const y = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${y}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      const top = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (top) window.scrollTo(0, parseInt(top) * -1)
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ptclRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, frame, nodes = []

    // 5 large drifting orbs — each orbits a base position sinusoidally
    const CFG = [
      { xf: 0.15, yf: 0.82, r: 720, c: '197,164,74',  a: 0.030 },
      { xf: 0.85, yf: 0.70, r: 580, c: '178,122,42',  a: 0.024 },
      { xf: 0.50, yf: 0.96, r: 800, c: '215,182,88',  a: 0.020 },
      { xf: 0.90, yf: 0.44, r: 500, c: '145,95,25',   a: 0.016 },
      { xf: 0.22, yf: 0.64, r: 640, c: '200,152,58',  a: 0.022 },
      { xf: 0.62, yf: 0.26, r: 520, c: '197,164,74',  a: 0.012 },
    ]

    const init = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      nodes = CFG.map((n, i) => ({
        bx: W * n.xf,
        by: H * n.yf,
        phase: (i / CFG.length) * Math.PI * 2,
        orb: 80 + Math.random() * 110,
        spd: 0.00005 + Math.random() * 0.00012,
        r: n.r, c: n.c, a: n.a,
      }))
    }

    init()
    window.addEventListener('resize', init)

    const onScroll = () => {
      canvas.style.opacity = window.scrollY > window.innerHeight * 0.38 ? '1' : '0'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t++
      for (const n of nodes) {
        const x = n.bx + Math.sin(t * n.spd + n.phase) * n.orb
        const y = n.by + Math.cos(t * n.spd * 0.7 + n.phase) * n.orb * 0.6
        const g = ctx.createRadialGradient(x, y, 0, x, y, n.r)
        g.addColorStop(0, `rgba(${n.c},${n.a})`)
        g.addColorStop(1, `rgba(${n.c},0)`)
        ctx.beginPath()
        ctx.arc(x, y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', init)
      window.removeEventListener('scroll', onScroll)
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
    const fd = new FormData(e.target)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          business: fd.get('business'),
          type: fd.get('type'),
          package: fd.get('package'),
          style: fd.get('style'),
          timeline: fd.get('timeline'),
          message: fd.get('message'),
        }),
      })
      setFormStatus(res.ok ? 'sent' : 'idle')
      if (res.ok) e.target.reset()
    } catch {
      setFormStatus('idle')
    }
  }

  const openModal = (type) => {
    setModal(type)
    setModalStatus('idle')
    setModalForm({
      name: '', email: '', business: '', field: '',
      note: type === 'hosting' ? "Hi, I'm interested in your $25/month hosting — can you tell me more about what's included?" : '',
    })
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModal(null)
    document.body.style.overflow = ''
  }

  const handleModalSubmit = async e => {
    e.preventDefault()
    setModalStatus('sending')
    try {
      const body = modal === 'demo'
        ? { name: modalForm.name, email: modalForm.email, business: modalForm.business, type: modalForm.field, message: 'Free Demo Request' }
        : { name: modalForm.name, email: modalForm.email, message: modalForm.note }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setModalStatus(res.ok ? 'sent' : 'error')
    } catch {
      setModalStatus('error')
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
      <canvas ref={ptclRef} id="ptcl" aria-hidden="true" />
      <div id="spb" style={{ width: `${scrollProg}%` }} />

      {!loaderHidden && (
        <div id="loader" className={loaderOut ? 'out' : ''} aria-label="Wilson Creative Co.">
          <div className="ld-card">
            <p className="ld-name ld-desktop">
              {[...scrambled].map((char, i) => (
                <span key={i} className={i >= 7 && i <= 14 && char === LOADER_TEXT[i] ? 'gold' : undefined}>
                  {char === ' ' ? ' ' : char}
                </span>
              ))}
            </p>
            <div className="ld-mobile" aria-hidden="true">
              <span className="ld-w ld-w1">Wilson</span>
              <span className="ld-w ld-w2 ld-gold">Creative</span>
              <span className="ld-w ld-w3">Co.</span>
            </div>
            <div className="ld-line" aria-hidden="true" />
            <p className="ld-loc">Brisbane · Australia</p>
          </div>
        </div>
      )}

      <nav id="nav" className={navScrolled ? 'sc' : ''} aria-label="Main navigation">
        <a href="/" className="n-logo" aria-label="Wilson Creative Co. Home">
          <img src="/wlogo.png" alt="Wilson Creative Co." className="n-logo-img" width="1536" height="1024" />
          <span className="n-logo-text">Wilson <span>Creative</span> Co.</span>
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
          <button className="mn-cta" onClick={() => { setMenuOpen(false); openModal('demo') }}>
            Get a Free Demo →
          </button>
        </div>
      </nav>

      <section className="hero" id="top" ref={heroRef} aria-label="Hero">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-stars" aria-hidden="true">
          {HERO_STARS.map((s, i) => (
            <span key={i} className="h-star" style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.r * 2}px`,
              height: `${s.r * 2}px`,
              '--a': s.a,
              '--delay': `${s.delay}s`,
              '--dur': `${s.dur}s`,
            }} />
          ))}
        </div>
        <div className="h-ov" aria-hidden="true" />
        <div className="h-inner" ref={heroInnerRef}>
          <p className="h-eye">Brisbane Based — Global Reach</p>
          <h1 className="sr-only">Custom Web Design in Brisbane — Wilson Creative Co.</h1>
          <h2 className="h1" aria-label="We Don't Just Build Websites. We Build Attention.">
            <span className="hl"><span className="hw hw1">We Don&apos;t Just</span></span>
            <span className="hl"><span className="hw hw2">Build Websites.</span></span>
            <span className="hl"><span className="hw hw3">We Build</span></span>
            <span className="hl"><span className="hw hw4 gold-line">Attention.</span></span>
          </h2>
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
          <StatCounter target={47} label="Projects Delivered" suffix="+" />
          <StatCounter target={100} label="Client Satisfaction" suffix="%" />
          <StatCounter target={3} label="Years Building" suffix="+" />
        </div>
      </section>


      <section id="services" className="secpad" aria-labelledby="svc-h2">
        <div className="svc-intro">
          <div className="svc-intro-l">
            <p className="stag rv">What We Do</p>
            <h2 className="sh2 rv d1" id="svc-h2">Focused services for<br />brands that want to <em>stand out</em></h2>
          </div>
          <div className="svc-intro-r rv d2">
            <p>We focus on what moves the needle first: a custom website that converts, with cinematic drone content coming next.</p>
            <button className="btn-g" onClick={() => openModal('demo')}>Get a Free Demo</button>
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

  <button className="build-nav prev" onClick={goPrev} aria-label="Previous project">
    ←
  </button>

  <button className="build-nav next" onClick={goNext} aria-label="Next project">
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
        aria-label={`View project ${i + 1}: ${workItems[i].industry}`}
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
          </div>
        </div>
      </section>

      {/* ── Testimonials — add real reviews here when ready ────────────── */}
      <section id="testimonials" className="secpad testi-section" aria-labelledby="testi-h2">
        <p className="stag rv" style={{ justifyContent: 'center' }}>Client Results</p>
        <h2 className="sh2 rv d1 testi-h2" id="testi-h2">What our clients<br />are <em>saying</em></h2>
        <div className="testi-grid rv d2">
          {[
            { initials: 'JM', name: 'James M.', biz: 'Phantom Detailing, Brisbane', quote: 'George built us a site that actually converts. Enquiries went up almost immediately after launch — it looks premium and loads incredibly fast. Best investment we\'ve made for the business.' },
            { initials: 'SC', name: 'Sarah C.', biz: 'Verdant Landscaping, QLD', quote: 'We went from a basic template site to something that genuinely represents our brand. Clients comment on it all the time. The whole process was smooth and George delivered exactly what he promised.' },
            { initials: 'AK', name: 'Alex K.', biz: 'Apex Gym, Brisbane', quote: 'Completely custom, fast, and looks elite. Wilson Creative understood exactly what we needed without us having to explain it twice. Would recommend to any business serious about their online presence.' },
          ].map((t, i) => (
            <div className="testi-card rv" style={{ '--d': `${i * 0.12}s` }} key={i}>
              <div className="testi-stars" aria-label="5 stars">{'★'.repeat(5)}</div>
              <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testi-author">
                <div className="testi-av" aria-hidden="true">{t.initials}</div>
                <div>
                  <p className="testi-name">{t.name}</p>
                  <p className="testi-biz">{t.biz}</p>
                </div>
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
            <button className="btn-o" onClick={() => openModal('hosting')} style={{ marginTop: 8 }}>
              Ask About Hosting
            </button>
          </div>
          <ul className="h-feats">
            {hostingFeatures.map(f => <li key={f}>{f}</li>)}
          </ul>
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

      <section id="faq" className="secpad" aria-labelledby="faq-h2">
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
              <form onSubmit={handleSubmit} noValidate>
                <div className="f-row">
                  <div className="f-fld">
                    <input type="text" name="name" placeholder="Your Name *" required autoComplete="name" aria-label="Your Name" />
                  </div>
                  <div className="f-fld">
                    <input type="text" name="business" placeholder="Business Name" autoComplete="organization" aria-label="Business Name" />
                  </div>
                </div>
                <div className="f-row">
                  <div className="f-fld">
                    <input type="email" name="email" placeholder="Email Address *" required autoComplete="email" aria-label="Email Address" />
                  </div>
                  <div className="f-fld">
                    <input type="tel" name="phone" placeholder="Phone Number" autoComplete="tel" aria-label="Phone Number" />
                  </div>
                </div>
                <div className="f-row">
                  <div className="f-fld">
                    <select name="type" aria-label="Website Type" onChange={e => e.target.style.color = e.target.value ? 'var(--w)' : ''}>
                      <option value="">Website Type</option>
                      <option value="New Website">New Website</option>
                      <option value="Redesign">Redesign Existing Site</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Not sure">Not Sure Yet</option>
                    </select>
                  </div>
                  <div className="f-fld">
                    <select name="package" aria-label="Package Interest" onChange={e => e.target.style.color = e.target.value ? 'var(--w)' : ''}>
                      <option value="">Package Interest</option>
                      <option value="Starter">Starter — From $600</option>
                      <option value="Growth">Growth — From $1,000</option>
                      <option value="Premium">Premium — From $2,000</option>
                      <option value="Not sure">Not Sure Yet</option>
                    </select>
                  </div>
                </div>
                <div className="f-row">
                  <div className="f-fld">
                    <select name="style" aria-label="Style Preference" onChange={e => e.target.style.color = e.target.value ? 'var(--w)' : ''}>
                      <option value="">Style Preference</option>
                      <option value="Minimal & Clean">Minimal &amp; Clean</option>
                      <option value="Bold & Striking">Bold &amp; Striking</option>
                      <option value="Luxury & Premium">Luxury &amp; Premium</option>
                      <option value="Playful & Creative">Playful &amp; Creative</option>
                      <option value="Open to direction">Open to Direction</option>
                    </select>
                  </div>
                  <div className="f-fld">
                    <select name="timeline" aria-label="Timeline" onChange={e => e.target.style.color = e.target.value ? 'var(--w)' : ''}>
                      <option value="">Timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="Within 1 month">Within 1 Month</option>
                      <option value="1–3 months">1–3 Months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="f-fld">
                  <textarea name="message" placeholder="Anything else you'd like us to know about your project?" aria-label="Additional details" />
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

      {/* ── Quick modals ── */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-label={modal === 'demo' ? 'Free demo request' : 'Hosting enquiry'}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>

            {modal === 'demo' && (
              <>
                <p className="modal-tag">Free Demo</p>
                <h3 className="modal-title">See your site<br /><em>before you pay</em></h3>
                <p className="modal-sub">Tell us a bit about your business and we'll put together a free demo tailored to your industry — no commitment required.</p>
                {modalStatus === 'sent' ? (
                  <p className="modal-success">✓ Done — we'll have your demo ready shortly.</p>
                ) : (
                  <form className="modal-form" onSubmit={handleModalSubmit} noValidate>
                    <div className="modal-row">
                      <input className="modal-input" type="text" placeholder="Your Name *" required value={modalForm.name} onChange={e => setModalForm(f => ({ ...f, name: e.target.value }))} />
                      <input className="modal-input" type="email" placeholder="Email Address *" required value={modalForm.email} onChange={e => setModalForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <input className="modal-input" type="text" placeholder="Business Name" value={modalForm.business} onChange={e => setModalForm(f => ({ ...f, business: e.target.value }))} />
                    <select className="modal-input modal-select" value={modalForm.field} onChange={e => setModalForm(f => ({ ...f, field: e.target.value }))}>
                      <option value="">What industry are you in?</option>
                      <option>Trades &amp; Construction</option>
                      <option>Health &amp; Wellness</option>
                      <option>Hospitality &amp; Food</option>
                      <option>Real Estate &amp; Property</option>
                      <option>Retail &amp; E-commerce</option>
                      <option>Professional Services</option>
                      <option>Fitness &amp; Sport</option>
                      <option>Beauty &amp; Personal Care</option>
                      <option>Other</option>
                    </select>
                    <button className="btn-g modal-submit" type="submit" disabled={modalStatus === 'sending'}>
                      {modalStatus === 'sending' ? 'Sending…' : 'Request My Free Demo →'}
                    </button>
                    {modalStatus === 'error' && <p className="modal-err">Something went wrong — email us at wilsoncreativeco.au@gmail.com</p>}
                  </form>
                )}
              </>
            )}

            {modal === 'hosting' && (
              <>
                <p className="modal-tag">Hosting Enquiry</p>
                <h3 className="modal-title">$25 / month<br /><em>Managed Hosting</em></h3>
                <p className="modal-sub">We'll get back to you within a few hours with everything you need to know.</p>
                {modalStatus === 'sent' ? (
                  <p className="modal-success">✓ Got it — we'll be in touch shortly.</p>
                ) : (
                  <form className="modal-form" onSubmit={handleModalSubmit} noValidate>
                    <div className="modal-row">
                      <input className="modal-input" type="text" placeholder="Your Name *" required value={modalForm.name} onChange={e => setModalForm(f => ({ ...f, name: e.target.value }))} />
                      <input className="modal-input" type="email" placeholder="Email Address *" required value={modalForm.email} onChange={e => setModalForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <textarea className="modal-input modal-textarea" value={modalForm.note} onChange={e => setModalForm(f => ({ ...f, note: e.target.value }))} rows={3} />
                    <button className="btn-g modal-submit" type="submit" disabled={modalStatus === 'sending'}>
                      {modalStatus === 'sending' ? 'Sending…' : 'Send Enquiry →'}
                    </button>
                    {modalStatus === 'error' && <p className="modal-err">Something went wrong — email us at wilsoncreativeco.au@gmail.com</p>}
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
