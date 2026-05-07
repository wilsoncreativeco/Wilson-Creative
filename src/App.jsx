import { useState, useEffect, useRef } from 'react'
import './App.css'

// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'About',   href: '#about'    },
  { label: 'Process', href: '#process'  },
  { label: 'Pricing', href: '#pricing'  },
  { label: 'Contact', href: '#contact'  },
]

const services = [
  {
    num: '01', icon: '🖥', name: 'Web Design & Development',
    desc: 'Fully custom-coded websites built from the ground up. No Wix, no templates, no shortcuts. Fast, modern, and completely unique.',
    statusType: 'live', statusLabel: 'Available Now',
    backTitle: 'What you actually get',
    backPoints: ['100% custom code — no templates ever','Mobile-first, lightning-fast performance','Full SEO setup from day one','Contact forms, click-to-call & analytics','Delivered in as little as 5 days'],
  },
  {
    num: '02', icon: '🚁', name: 'Aerial Cinematography',
    desc: 'Cinematic drone footage that elevates your brand. Hero videos, property showcases, and scroll-stopping content.',
    statusType: 'soon', statusLabel: 'Coming Soon',
    backTitle: "What's coming",
    backPoints: ['Licensed commercial drone operator','RAW + colour-graded footage','Property, events & brand shoots','Hero video edits for your site','Brisbane & surrounds'],
  },
  {
    num: '03', icon: '📷', name: 'Photography',
    desc: 'Premium product and brand photography that communicates quality before a single word is read.',
    statusType: 'soon', statusLabel: 'Coming Soon',
    backTitle: "What's coming",
    backPoints: ['Product & brand photography','Full retouching & colour grading','Web-optimised image delivery','Shot lists & creative direction included','Same-week turnaround available'],
  },
  {
    num: '04', icon: '📱', name: 'Social Media Content',
    desc: 'High-performance content strategy and production designed to build an audience and convert them into customers.',
    statusType: 'soon', statusLabel: 'Coming Soon',
    backTitle: "What's coming",
    backPoints: ['Reels, carousels & static content','Platform-specific strategy','Monthly content calendars','Caption & hashtag copywriting','Performance reporting'],
  },
]

const aboutPills = ['Custom Code','No Templates','Brisbane Based','Global Clients','Conversion First','Mobile First']

const workItems = [
  { src: 'https://noir-cafe-beige.vercel.app', tag: 'Hospitality', industry: 'Sample Build — NOIR Café',       title: 'Coffee · Matcha · Culture',                 sub: 'Award-worthy café brand & site' },
  { src: '/meridian.html',                     tag: 'Real Estate', industry: 'Sample Build — Luxury Property', title: 'Where Exceptional Homes Find Their People', sub: 'Premium real estate agency experience' },
  { src: '/barber.html',                       tag: 'Barbershop',  industry: 'Sample Build — Luxury Barber',   title: 'Precision Cuts. Quiet Confidence.',          sub: 'Premium booking & brand experience' },
  { src: '/Plumbing.html',                     tag: 'Trades',      industry: 'Sample Build — Plumbing Co.',    title: 'The Art of Fluid Infrastructure',            sub: 'Precision engineering meets premium design' },
  { src: '/Cafe.html',                         tag: 'Hospitality', industry: 'Sample Build — Boutique Café',   title: 'Coffee · Culture · Community',              sub: 'Boutique café digital experience' },
]

const processSteps = [
  { num: '01', title: 'Discovery',        desc: "We take the time to understand your business, your goals, and exactly what you want your website to achieve. Whether you have a clear vision or no idea where to start, we'll guide the process and identify what will actually drive results." },
  { num: '02', title: 'Strategy',         desc: "We map out a clear plan for your site — structure, layout, and user flow — all tailored to your business. Every decision is made with one goal: turning visitors into enquiries or customers." },
  { num: '03', title: 'Design & Build',   desc: "Your website is fully custom coded from scratch — no Wix, no templates, no shortcuts. Everything designed and built specifically for your business — fast, modern, and completely unique." },
  { num: '04', title: 'Launch & Support', desc: "Once everything is tested and approved, we launch your site smoothly. After launch, we're here for updates, tweaks, and ongoing support to keep everything running properly." },
]

const pricingTiers = [
  { name: 'Starter', price: 'From $600',   featured: false, desc: 'Perfect for small businesses and personal brands getting started online.',    features: ['Custom single-page website','Mobile-responsive design','Contact form + click-to-call','Basic SEO setup','1 round of revisions','5–7 day delivery'] },
  { name: 'Growth',  price: 'From $1,000', featured: true,  desc: 'For established brands ready to scale their digital presence.',                features: ['Multi-page website (up to 5 pages)','Advanced animations & interactions','CMS or blog integration','Full SEO optimisation','3 rounds of revisions','Analytics dashboard setup','10–14 day delivery'] },
  { name: 'Premium', price: 'From $2,000', featured: false, desc: 'Full-service creative solution for brands that demand the best.',              features: ['Everything in Growth','E-commerce or booking system','Custom brand strategy session','Content creation & copywriting','Priority ongoing support','Unlimited revisions','2–3 week delivery'] },
]

const hostingFeatures = ['We keep your website live and accessible online','We connect your domain to the website','We manage the full hosting setup','SSL so your site loads securely with HTTPS','Basic uptime and hosting monitoring','Move to your own hosting at any time']

const faqItems = [
  { q: 'How much does a custom website cost in Brisbane?',  a: 'Wilson Creative Co. websites start from $600 for a single-page Starter site, $1,000 for a multi-page Growth site, and from $2,000 for a full Premium build including e-commerce or booking systems. Optional hosting is available at $25/month.' },
  { q: 'How long does it take to build a website?',        a: 'Starter sites are delivered in 5–7 days. Growth sites take 10–14 days. Premium builds are completed in 2–3 weeks. All timelines include your revision rounds.' },
  { q: 'Do you use templates or page builders like Wix?',  a: 'Never. Every Wilson Creative Co. website is fully custom-coded from scratch. No Wix, no Squarespace, no Webflow templates — just clean, fast, custom code built specifically for your business.' },
  { q: 'Do you work with clients outside of Brisbane?',    a: "Absolutely. While we're based in Brisbane, we work with clients across Australia and globally. The entire process is handled remotely with clear communication at every stage." },
  { q: 'What do I need to provide to get started?',       a: "Not much. If you have a logo, brand colours, and some idea of what you want — great. If you're starting from scratch, we'll guide you through everything during the Discovery phase." },
]

const marqueeRow1 = ['Web Design & Development','Aerial Cinematography','Brand Strategy','Social Media Content','Photography','Custom Code — No Templates','Brisbane Based — Global Reach']
const marqueeRow2 = ['Conversion Focused','Mobile First','Premium Animations','Lightning Fast','SEO Optimised','Built to Convert','100% Custom Code']

// ═══════════════════════════════════════
// APP
// ═══════════════════════════════════════
export default function App() {
  const [loadPct,      setLoadPct]      = useState(0)
  const [loaderOut,    setLoaderOut]    = useState(false)
  const [loaderHidden, setLoaderHidden] = useState(false)
  const [navScrolled,  setNavScrolled]  = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [scrollProg,   setScrollProg]   = useState(0)
  const [showFCta,     setShowFCta]     = useState(false)
  const [openFaq,      setOpenFaq]      = useState(null)
  const [formStatus,   setFormStatus]   = useState('idle')
  const [flippedCard,  setFlippedCard]  = useState(null)

  const canvasRef    = useRef(null)
  const heroRef      = useRef(null)
  const heroInnerRef = useRef(null)
  const portTrackRef = useRef(null)
  const canvasRef    = useRef(null)
const videoRef     = useRef(null)   // ← ADD THIS

  // LOADER
  useEffect(() => {
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 9 + 3
      if (p >= 100) {
        p = 100; clearInterval(iv)
        setTimeout(() => setLoaderOut(true),    180)
        setTimeout(() => setLoaderHidden(true), 880)
      }
      setLoadPct(Math.floor(p))
    }, 55)
    return () => clearInterval(iv)
  }, [])
// FORCE VIDEO PLAY — handles browser autoplay policy blocks
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
  // SCROLL
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      setNavScrolled(sy > 60)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrollProg((sy / h) * 100)
      setShowFCta(sy > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // LOCK BODY
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // CANVAS PARTICLES
  useEffect(() => {
    const canvas = canvasRef.current
    const hero   = heroRef.current
    if (!canvas || !hero) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    const pts = Array.from({ length: 110 }, () => ({
      x: Math.random() * window.innerWidth,  y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.16,     vy: (Math.random() - 0.5) * 0.16,
      r: Math.random() * 1.1 + 0.2,         o: Math.random() * 0.65 + 0.1,
    }))
    let hmx = window.innerWidth / 2, hmy = window.innerHeight / 2
    const onMove = e => { hmx = e.clientX; hmy = e.clientY }
    hero.addEventListener('mousemove', onMove)
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.vx += (hmx - canvas.width  / 2) * 4e-6
        p.vy += (hmy - canvas.height / 2) * 4e-6
        p.vx *= 0.999; p.vy *= 0.999
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width)  p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(197,164,74,${p.o * 0.5})`; ctx.fill()
      })
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(197,164,74,${(1 - d / 110) * 0.06})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }))
      raf = requestAnimationFrame(draw)
    }
    draw()
    let tick = false
    const onPar = () => {
      if (tick) return; tick = true
      requestAnimationFrame(() => {
        if (heroInnerRef.current)
          heroInnerRef.current.style.transform = `translateY(${window.scrollY * 0.26}px)`
        tick = false
      })
    }
    window.addEventListener('scroll', onPar, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      hero.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll',  onPar)
      window.removeEventListener('resize',  resize)
    }
  }, [])

  // REVEAL
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vi'); io.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' })
    document.querySelectorAll('.rv,.rl,.rr').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // COUNTERS
  useEffect(() => {
    const animCnt = el => {
      const t = +el.dataset.t, s = el.dataset.s || ''; let c = 0; const step = t / 55
      const ti = setInterval(() => { c = Math.min(c + step, t); el.textContent = Math.floor(c) + s; if (c >= t) clearInterval(ti) }, 22)
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animCnt(e.target); io.unobserve(e.target) } })
    }, { threshold: 0.5 })
    document.querySelectorAll('.cnt').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // 3D TILT
  useEffect(() => {
    const handlers = []
    document.querySelectorAll('.tilt').forEach(el => {
      const onMove  = e => { const r = el.getBoundingClientRect(); const x = (e.clientX-r.left)/r.width-.5; const y = (e.clientY-r.top)/r.height-.5; el.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateZ(6px)`; el.style.transition='transform .05s' }
      const onLeave = () => { el.style.transform='perspective(900px) rotateY(0) rotateX(0) translateZ(0)'; el.style.transition='transform .5s cubic-bezier(.16,1,.3,1)' }
      el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave)
      handlers.push({ el, onMove, onLeave })
    })
    return () => handlers.forEach(({ el, onMove, onLeave }) => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) })
  }, [])

  // PORTFOLIO DRAG
  useEffect(() => {
    const pt = portTrackRef.current; if (!pt) return
    let isDrag = false, sx = 0, sl = 0
    const onDown = e => { isDrag=true; sx=e.pageX-pt.offsetLeft; sl=pt.scrollLeft; pt.style.cursor='grabbing' }
    const onUp   = () => { isDrag=false; pt.style.cursor='grab' }
    const onMove = e => { if (!isDrag) return; e.preventDefault(); pt.scrollLeft=sl-(e.pageX-pt.offsetLeft-sx) }
    pt.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)
    document.addEventListener('mousemove', onMove)
    return () => { pt.removeEventListener('mousedown',onDown); document.removeEventListener('mouseup',onUp); document.removeEventListener('mousemove',onMove) }
  }, [])

  // HELPERS
  const scrollTo = (href, wasOpen = false) => {
    setMenuOpen(false)
    setTimeout(() => { const el = document.querySelector(href); if (el) el.scrollIntoView({ behavior:'smooth', block:'start' }) }, wasOpen ? 320 : 0)
  }
  const handleNav   = (e, href) => { e.preventDefault(); scrollTo(href, menuOpen) }
  const handleSubmit = async e => {
    e.preventDefault(); setFormStatus('sending')
    try {
      const r = await fetch(e.target.action, { method:'POST', body: new FormData(e.target), headers:{ Accept:'application/json' } })
      setFormStatus(r.ok ? 'sent' : 'idle')
      if (r.ok) e.target.reset()
    } catch { setFormStatus('idle') }
  }

  const year = new Date().getFullYear()

  return (
    <>
      {/* SCROLL PROGRESS */}
      <div id="spb" style={{ width: `${scrollProg}%` }} />

      {/* LOADER */}
      {!loaderHidden && (
        <div id="loader" className={loaderOut ? 'out' : ''}>
          <div className="l-name">Wilson <b>Creative</b> Co.</div>
          <div className="l-pct">{loadPct}</div>
          <div className="l-bar"><div className="l-fill" style={{ width: `${loadPct}%` }} /></div>
        </div>
      )}

      {/* ── NAV ── FIX 3: white-space nowrap, all links work */}
      <nav id="nav" className={navScrolled ? 'sc' : ''} aria-label="Main navigation">
        <a href="/" className="n-logo" aria-label="Wilson Creative Co. Home">Wilson <span>Creative</span> Co.</a>
        <ul className="n-links">
          {navItems.map(item => (
            <li key={item.label}><a href={item.href} onClick={e => handleNav(e, item.href)}>{item.label}</a></li>
          ))}
        </ul>
        <a href="#contact" className="n-cta" onClick={e => handleNav(e, '#contact')}>Start a Project</a>
        <button className={`ham ${menuOpen ? 'on' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          <s /><s /><s />
        </button>
      </nav>

      {/* MOBILE NAV */}
      <nav id="mnav" className={menuOpen ? 'on' : ''} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        {navItems.map(item => (
          <a key={item.label} className="mn-link" href={item.href} onClick={e => handleNav(e, item.href)}>{item.label}</a>
        ))}
        <div className="mn-bottom">
          <div className="mn-contact">
            <a href="tel:+61401609118">📞  0401 609 118</a>
            <a href="mailto:wilsoncreativeco.au@gmail.com">✉️  wilsoncreativeco.au@gmail.com</a>
          </div>
          <a href="#contact" className="mn-cta" onClick={e => handleNav(e, '#contact')}>Get a Free Demo →</a>
        </div>
      </nav>

<section className="hero" id="top" ref={heroRef} aria-label="Hero">
  <canvas id="hcanvas" ref={canvasRef} aria-hidden="true" />

<video
  ref={videoRef}           {/* ← ADD ref */}
  className="hero-video"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"           {/* ← was "metadata", auto loads the full file */}
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

      {/* MARQUEE */}
      <div className="mqs" aria-hidden="true">
        <div className="mqr">{[...marqueeRow1,...marqueeRow1].map((t,i) => <span className="mqi" key={i}>{t}<span className="mqd"/></span>)}</div>
        <div className="mqr">{[...marqueeRow2,...marqueeRow2].map((t,i) => <span className="mqi" key={i}>{t}<span className="mqd"/></span>)}</div>
      </div>

      {/* ── SERVICES ── FIX 4: Arrow flips card to show detail */}
      <section id="services" className="secpad" aria-labelledby="svc-h2">
        <div className="svc-intro">
          <div className="svc-intro-l">
            <p className="stag rv">What We Do</p>
            <h2 className="sh2 rv d1" id="svc-h2">Services built to make<br />your brand <em>unforgettable</em></h2>
          </div>
          <div className="svc-intro-r rv d2">
            <p>Premium production and strategy in one team, built to make your brand look elevated and perform online.</p>
            <a href="#contact" className="btn-g" onClick={e => handleNav(e, '#contact')}>Get a Free Demo</a>
          </div>
        </div>
        <div className="svc-grid rv d1">
          {services.map(s => (
            <div className="sc-wrapper" key={s.num}>
              <div className={`sc-flipper ${flippedCard === s.num ? 'flipped' : ''}`}>

                {/* FRONT */}
                <div className="sc-front">
                  <div className="sc-num">{s.num}</div>
                  <div className="sc-ico" aria-hidden="true">{s.icon}</div>
                  <h3 className="sc-name">{s.name}</h3>
                  <p className="sc-desc">{s.desc}</p>
                  <span className={`sc-badge ${s.statusType}`}>
                    {s.statusType === 'live' && <span>●</span>} {s.statusLabel}
                  </span>
                  <button className="sc-arr" aria-label={`Learn more about ${s.name}`}
                    onClick={() => setFlippedCard(flippedCard === s.num ? null : s.num)}>
                    →
                  </button>
                </div>

                {/* BACK */}
                <div className="sc-back">
                  <button className="sc-back-close" onClick={() => setFlippedCard(null)} aria-label="Go back">← Back</button>
                  <div className="sc-ico" aria-hidden="true">{s.icon}</div>
                  <h3 className="sc-back-title">{s.backTitle}</h3>
                  <ul className="sc-back-list">
                    {s.backPoints.map(pt => <li key={pt}>{pt}</li>)}
                  </ul>
                  <a href="#contact" className="btn-g"
                    style={{ marginTop:'auto', textAlign:'center', display:'block', padding:'12px' }}
                    onClick={e => { handleNav(e,'#contact'); setFlippedCard(null) }}>
                    Get Started
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
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
            <div className="about-pills rv d3">{aboutPills.map(p => <span className="pill" key={p}>{p}</span>)}</div>
            <div className="about-sts rv d4">
              <div><span className="as-val cnt" data-t="47"  data-s="+">0</span><span className="as-lbl">Projects Done</span></div>
              <div><span className="as-val cnt" data-t="100" data-s="%">0</span><span className="as-lbl">Satisfaction</span></div>
              <div><span className="as-val cnt" data-t="3"   data-s="+">0</span><span className="as-lbl">Years Active</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── FIX 5: pcard-arr removed entirely */}
      <section id="work" className="port" aria-labelledby="work-h2">
        <div className="port-hd">
          <div>
            <p className="stag rv">Recent Designs</p>
            <h2 className="sh2 rv d1" id="work-h2" style={{ maxWidth:420, fontSize:'clamp(32px,4vw,56px)' }}>What we <em>create</em></h2>
          </div>
          <a href="#contact" className="view-all rv" onClick={e => handleNav(e,'#contact')}>Get Your Build →</a>
        </div>
        <div className="port-track" ref={portTrackRef} role="list">
          {workItems.map(w => (
            <article className="pcard" role="listitem" key={w.src}>
              <div className="pcard-preview" aria-hidden="true">
                <iframe src={w.src} title={w.title} scrolling="no" loading="lazy" tabIndex="-1" />
              </div>
              <span className="pcard-tag">{w.tag}</span>
              <p className="pcard-ind">{w.industry}</p>
              <h3 className="pcard-title">{w.title}</h3>
              <p className="pcard-sub">{w.sub}</p>
            </article>
          ))}
        </div>
        <div className="port-hint rv">Swipe to explore more</div>
      </section>

      {/* PROCESS */}
      <section id="process" className="secpad" aria-labelledby="proc-h2">
        <p className="stag rv">How It Works</p>
        <h2 className="sh2 rv d1" id="proc-h2">A process built<br />for <em>results</em></h2>
        <div className="proc-steps">
          {processSteps.map((s, i) => (
            <div className={`ps rv d${i+1}`} key={s.num}>
              <div className="ps-num" aria-hidden="true">{s.num}</div>
              <div><h3 className="ps-ttl">{s.title}</h3><p className="ps-desc">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="secpad pricing-bg" aria-labelledby="price-h2">
        <p className="stag rv">Investment</p>
        <h2 className="sh2 rv d1" id="price-h2">Transparent pricing.<br />No <em>surprises.</em></h2>
        <p className="rv d2" style={{ maxWidth:540, fontSize:14, color:'var(--w6)', lineHeight:1.85, marginTop:14 }}>Every package is tailored to your needs — and every site is built from scratch.</p>
        <div className="pc-grid">
          {pricingTiers.map((t, i) => (
            <div className={`pc ${t.featured?'feat':''} rv d${i+1} tilt`} key={t.name}>
              {t.featured && <div className="pc-badge">Most Popular</div>}
              <h3 className="pc-name">{t.name}</h3>
              <div className="pc-price">{t.price}</div>
              <p className="pc-desc">{t.desc}</p>
              <ul className="pc-feats">{t.features.map(f => <li key={f}>{f}</li>)}</ul>
              <a href="#contact" className={t.featured?'btn-g':'btn-o'} onClick={e => handleNav(e,'#contact')}
                style={{ textAlign:'center', width:'100%', display:'block', padding:14 }}>Get Started</a>
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
            <a href="#contact" className="btn-o" onClick={e => handleNav(e,'#contact')} style={{ display:'inline-block', marginTop:8 }}>Ask About Hosting</a>
          </div>
          <ul className="h-feats">{hostingFeatures.map(f => <li key={f}>{f}</li>)}</ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="secpad" aria-labelledby="faq-h2">
        <p className="stag rv">Common Questions</p>
        <h2 className="sh2 rv d1" id="faq-h2">Everything you need<br />to <em>know</em></h2>
        <div className="faq-list rv d2">
          {faqItems.map((f, i) => (
            <div className={`faq-item ${openFaq===i?'open':''}`} key={i}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i}>
                {f.q}<span className="faq-ico" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="cta-sec" aria-labelledby="cta-h2">
        <div className="cta-glow" aria-hidden="true" />
        <p className="stag rv" style={{ justifyContent:'center' }}>Ready to Stand Out?</p>
        <h2 className="cta-h2 rv d1" id="cta-h2">Let&apos;s Build<br /><span>Something</span><br />Insane.</h2>
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
                  <div className="f-fld"><input type="text"  name="name"  placeholder="Your Name"     required autoComplete="name"  aria-label="Your Name" /></div>
                  <div className="f-fld"><input type="email" name="email" placeholder="Email Address" required autoComplete="email" aria-label="Email Address" /></div>
                </div>
                <div className="f-fld"><input type="tel" name="phone" placeholder="Phone Number (optional)" autoComplete="tel" aria-label="Phone Number" /></div>
                <div className="f-fld"><textarea name="message" placeholder="Tell us about your project — what do you need, what's your vision?" required aria-label="Project details" /></div>
                <button type="submit" className="f-sub" disabled={formStatus==='sending'}>
                  {formStatus==='sending'?'Sending…':'Send Message →'}
                </button>
              </form>
              <p className="f-note">We&apos;ll get back to you within 24 hours. No obligation, no spam.</p>
            </>
          )}
        </div>
        <div className="cta-ci rv d4">
          <div className="ci"><p className="ci-l">Call Us</p><a href="tel:+61401609118" className="ci-v">0401 609 118</a></div>
          <div className="ci-div" aria-hidden="true" />
          <div className="ci"><p className="ci-l">Email Us</p><a href="mailto:wilsoncreativeco.au@gmail.com" className="ci-v">wilsoncreativeco.au@gmail.com</a></div>
          <div className="ci-div" aria-hidden="true" />
          <div className="ci"><p className="ci-l">Based In</p><span className="ci-v">Brisbane, Australia</span></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer role="contentinfo">
        <div className="ft">
          <div className="fb">
            <p className="fb-name">Wilson <span>Creative</span> Co.</p>
            <p>Websites and content that build attention and turn it into customers. Brisbane-based. Built for the world.</p>
          </div>
          <div className="f-cols">
            <div className="fc">
              <p>Navigate</p>
              {navItems.map(i => <a key={i.label} href={i.href} onClick={e => handleNav(e,i.href)}>{i.label}</a>)}
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
              <a href="#contact" onClick={e => handleNav(e,'#contact')}>Start a Project</a>
            </div>
          </div>
        </div>
        <div className="fb-bot">
          <p className="f-copy">© {year} Wilson Creative Co. All rights reserved. | Brisbane, QLD, Australia</p>
          <div className="f-soc">
            <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="mailto:wilsoncreativeco.au@gmail.com" aria-label="Email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="22,4 12,13 2,4"/></svg>
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING MOBILE CTA */}
      <button id="fcta" className={showFCta?'show':''} onClick={() => scrollTo('#contact')} aria-label="Start a project">
        Start a Project ✦
      </button>
    </>
  )
}
