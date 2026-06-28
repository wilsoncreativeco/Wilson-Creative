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
    tag: 'Video',
    name: 'Video Production',
    line: 'Stories that move.',
    desc: 'Cinematic brand films, commercials and short-form content that stop the scroll — and stay with people long after.',
    deliverables: ['Brand Films', 'Commercials', 'Social Reels', 'Event Coverage'],
    glow: '216,116,60',
    approach: 'From a single hero film to an ongoing content engine, we handle concept, shoot and edit end to end — so all you do is show up.',
    perfectFor: [
      { t: 'Construction', d: 'Timeline, progress & completion films that document the whole build.' },
      { t: 'Real Estate', d: 'Listing & development showcases that sell the lifestyle, not just the floorplan.' },
      { t: 'Hospitality', d: 'Venue, food & atmosphere reels that fill tables and rooms.' },
      { t: 'Events', d: 'Highlight films & recaps you can run for years.' },
      { t: 'Brands', d: 'Commercials & social campaigns built to convert.' },
    ],
  },
  {
    num: '02',
    tag: 'Photography',
    name: 'Photography',
    line: 'Every detail, sharp.',
    desc: 'Editorial brand, product and lifestyle photography — shot to sell, not just to look pretty.',
    deliverables: ['Brand & Product', 'Lifestyle', 'Headshots', 'On-Location'],
    glow: '198,120,150',
    approach: 'Editorial-grade stills for every corner of your brand — shot, retouched and delivered ready to publish.',
    perfectFor: [
      { t: 'Real Estate', d: 'Interiors & listing galleries that make properties impossible to scroll past.' },
      { t: 'Hospitality', d: 'Food, drink & venue shoots that look as good as they taste.' },
      { t: 'Construction', d: 'Site & milestone documentation for reports and marketing.' },
      { t: 'Products & E-commerce', d: 'Clean studio and lifestyle imagery that drives sales.' },
      { t: 'Teams', d: 'Headshots & culture shoots that humanise your brand.' },
    ],
  },
  {
    num: '03',
    tag: 'Aerial',
    name: 'Aerial & Drone',
    line: 'A view they can’t match.',
    desc: 'Licensed drone cinematography that gives your brand a perspective competitors simply can’t reach.',
    deliverables: ['4K Aerial', 'Real Estate', 'Construction', 'Landscapes'],
    glow: '78,140,180',
    approach: 'CASA-licensed drone work that adds scale and cinema to any project — flown safely, legally and beautifully.',
    perfectFor: [
      { t: 'Construction', d: 'Aerial progress capture & site surveys from groundbreak to handover.' },
      { t: 'Real Estate', d: 'Property & land showcases that reveal the full scope.' },
      { t: 'Events', d: 'Sweeping crowd & venue reveals for a cinematic open.' },
      { t: 'Hospitality & Tourism', d: 'Location films that sell the destination.' },
      { t: 'Acreage & Landscapes', d: 'Resorts, golf courses and large sites shown at scale.' },
    ],
  },
  {
    num: '04',
    tag: 'Web',
    name: 'Web Design',
    line: 'Content into customers.',
    desc: 'Fully custom-coded websites — no templates — that turn all of that content into real, paying customers.',
    deliverables: ['Custom Build', 'No Templates', 'SEO Ready', 'Lightning Fast'],
    glow: '150,130,210',
    approach: 'Fully custom-coded sites that turn all this media into enquiries — fast, modern and built to convert.',
    perfectFor: [
      { t: 'Trades & Local Business', d: 'Lead-generation sites that turn clicks into calls.' },
      { t: 'Real Estate', d: 'Listing & agent sites with your photography front and centre.' },
      { t: 'Hospitality', d: 'Booking, menu & enquiry sites that look the part.' },
      { t: 'Brands', d: 'Campaign & portfolio sites that showcase your media.' },
      { t: 'Anyone on a template', d: 'A proper custom build to replace a slow Wix or Squarespace site.' },
    ],
  },
]

const svcIcons = {
  Video: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="15" width="27" height="18" rx="3" />
      <path d="M31 22.5l11-6v15l-11-6" />
      <circle cx="11" cy="24" r="2.6" />
      <circle cx="22" cy="24" r="2.6" />
    </svg>
  ),
  Photography: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16h6.5l3-4h9l3 4H41a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V19a3 3 0 0 1 3-3z" />
      <circle cx="24" cy="27" r="7" />
    </svg>
  ),
  Aerial: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="13" r="5" />
      <circle cx="37" cy="13" r="5" />
      <circle cx="11" cy="35" r="5" />
      <circle cx="37" cy="35" r="5" />
      <rect x="19" y="20" width="10" height="8" rx="2" />
      <path d="M15.5 16.5l4 4M32.5 16.5l-4 4M15.5 31.5l4-4M32.5 31.5l-4-4" />
    </svg>
  ),
  Web: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="9" width="38" height="30" rx="3" />
      <path d="M5 17h38" />
      <path d="M18.5 24l-4.5 4 4.5 4M29.5 24l4.5 4-4.5 4" />
    </svg>
  ),
}

const ROTATOR_WORDS = ['Film', 'Photography', 'Aerial', 'Web']

const aboutPills = [
  'One Team',
  'Film & Photo',
  'Drone Certified',
  'Custom Web',
  'Brisbane Based',
  'Every Format',
]

const aboutCaps = [
  { n: '01', name: 'Film & Video', note: 'Brand films, commercials & social' },
  { n: '02', name: 'Photography', note: 'Brand, product & on-location' },
  { n: '03', name: 'Aerial & Drone', note: 'Cinematic aerials & site surveys' },
  { n: '04', name: 'Web Design', note: 'Custom-coded, no templates' },
]

const workItems = [
  {
    src: 'https://zantara.com.au',
    preview: '/work-zantara.jpg',
    displayUrl: 'zantara.com.au',
    tag: 'Construction',
    industry: 'Live Client — Zantara Formwork',
    title: 'Built · To · Last',
    sub: 'Premium formwork & construction brand, live in Brisbane',
    scroll: 3800,
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
    src: 'https://landscaping-azure.vercel.app',
    preview: '/work-verdant.jpg',
    displayUrl: 'verdantlandscaping.com.au',
    tag: 'Landscaping',
    industry: 'Sample Build — Verdant Landscaping',
    title: 'Inspired · By · Nature',
    sub: 'Premium landscaping brand & modern lead-generation site',
    scroll: 4600,
  },
  {
    src: 'https://n-two-theta-61.vercel.app',
    preview: null,
    displayUrl: 'Apexgym.com.au',
    tag: 'Gym',
    industry: 'Sample Build — Apex Gym',
    title: 'Strength · Performance · Recovery',
    sub: 'High-impact fitness brand & lead-generation site',
    scroll: 4400,
  },
  {
    src: '/meridian.html',
    preview: null,
    displayUrl: 'meridianproperty.com.au',
    tag: 'Real Estate',
    industry: 'Sample Build — Luxury Property',
    title: 'Property · Investment · Lifestyle',
    sub: 'Premium real estate agency experience',
    scroll: 4000,
  },
]

// Lead with Zantara; show three in the gallery.
const featuredBuilds = workItems.slice(0, 3)

// Media reel — placeholder posters use existing /public images for now.
// Swap `poster` (and add real video links) as footage is shot.
const mediaItems = [
  { cat: 'Video', title: 'Brand Films & Commercials', poster: '/brisbane.jpg', video: true },
  { cat: 'Aerial', title: 'Drone Cinematography', poster: '/work-zantara.jpg', video: true },
  { cat: 'Photography', title: 'Brand & Product Shoots', poster: '/work-noir.jpg', video: false },
  { cat: 'Social', title: 'Short-Form Reels', poster: '/work-detailing.jpg', video: true },
  { cat: 'Photography', title: 'On-Location Coverage', poster: '/work-verdant.jpg', video: false },
  { cat: 'Video', title: 'Promo & Event Recaps', poster: '/og.jpg', video: true },
]

const processTracks = {
  media: {
    label: 'Media Production',
    blurb: 'Film, photography and aerial — from first idea to final cut, every frame handled in-house.',
    steps: [
      {
        num: '01',
        phase: 'Brief',
        title: 'The Vision',
        desc: 'We get to know your brand, your audience and exactly what this content needs to do — whether that\'s filling a feed, launching a product or winning bigger clients.',
      },
      {
        num: '02',
        phase: 'Pre-Production',
        title: 'The Plan',
        desc: 'Concept, shot list, locations, talent and schedule — all locked in before a single camera comes out. Nothing is left to chance on shoot day.',
      },
      {
        num: '03',
        phase: 'Production',
        title: 'The Shoot',
        desc: 'Cameras roll. Film, photography and aerial captured by our own team with cinema-grade gear — directed on the day to get exactly what your brand needs.',
      },
      {
        num: '04',
        phase: 'Post',
        title: 'The Edit',
        desc: 'Edited, colour-graded and scored in-house, then delivered in every format you need — ready to publish, advertise and stop the scroll.',
      },
    ],
  },
  web: {
    label: 'Web Design',
    blurb: 'Custom-coded sites to match the content — fast, premium and built to convert.',
    steps: [
      {
        num: '01',
        phase: 'Brief',
        title: 'The Goal',
        desc: 'We map out what your site actually needs to achieve — enquiries, bookings, sales — and how it should sit alongside your content and brand.',
      },
      {
        num: '02',
        phase: 'Design',
        title: 'The Blueprint',
        desc: 'Structure, layout and look and feel, designed around your content. Every page is planned to turn visitors into customers.',
      },
      {
        num: '03',
        phase: 'Build',
        title: 'The Build',
        desc: 'Coded from scratch — no Wix, no templates, no shortcuts. Fast, modern and completely custom to your business.',
      },
      {
        num: '04',
        phase: 'Launch',
        title: 'The Launch',
        desc: 'Tested, approved and taken live smoothly — then we\'re on hand for updates, tweaks and ongoing support whenever you need it.',
      },
    ],
  },
}

const pricingCards = [
  {
    key: 'media',
    tag: 'Media Production',
    name: 'Media',
    price: 'Starting from $399',
    line: 'Film, photography and aerial — produced to make your brand impossible to ignore.',
    blurb: 'Every shoot is custom-quoted to your brand. Below is where our most popular formats start.',
    breakdown: [
      { name: 'Photography', price: 'From $399', desc: 'Brand, product & on-location shoots — fully edited gallery.' },
      { name: 'Social Content & Reels', price: 'From $499', desc: 'Short-form video shot and edited for Instagram, TikTok & ads.' },
      { name: 'Aerial & Drone', price: 'From $499', desc: 'Licensed pilot, 4K cinematic aerials & site progress footage.' },
      { name: 'Brand Films & Commercials', price: 'From $1,200', desc: 'Scripted, cinematic films — concept to final cut.' },
      { name: 'Ongoing Content Packages', price: 'Custom', desc: 'Monthly retainer for brands that need a steady stream of content.' },
    ],
  },
  {
    key: 'web',
    tag: 'Web Design',
    name: 'Web',
    price: 'Starting from $600',
    line: 'Custom-coded websites — no templates, built to load fast and convert.',
    blurb: 'Every site is written from scratch and tailored to your business. Pick the scope that fits.',
    breakdown: [
      { name: 'Starter', price: 'From $600', desc: 'Custom single-page site, mobile-responsive, contact form & basic SEO.' },
      { name: 'Growth', price: 'From $1,000', desc: 'Up to 5 pages, advanced animations, CMS/blog & full SEO.' },
      { name: 'Premium', price: 'From $2,000', desc: 'E-commerce or booking system, brand strategy & copywriting.' },
      { name: 'Managed Hosting', price: '$25 / mo', desc: 'Optional — domain, SSL, uptime monitoring & full hosting management.' },
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
    cat: 'The Studio',
    q: 'What does Wilson Creative actually do?',
    a: "We're a full media production house in Brisbane. We shoot brand films, commercials and social content, run professional photography, fly drones for aerial work, and design custom-coded websites — all in-house, under one roof. Most clients come to us for one thing and quickly realise we can handle their entire brand, online and off.",
  },
  {
    cat: 'Pricing',
    q: 'How much does a shoot or project cost?',
    a: "Media projects start from $399 for photography and from $499 for video and aerial, with full brand films and ongoing content packages quoted to scope. Custom websites start from $600. Every project is different, so we quote on exactly what you need — no padded packages, no surprises. The pricing section above has the full breakdown for both.",
  },
  {
    cat: 'Media',
    q: 'What kinds of businesses do you work with?',
    a: "All sorts — construction and trades, real estate, hospitality, events, gyms, product brands and local businesses. Construction clients love our monthly progress and completion films; real estate and hospitality come to us for photography, aerials and reels; product brands for content that actually sells. If your business has something worth showing, we can capture it.",
  },
  {
    cat: 'Aerial',
    q: 'Is your drone work licensed and insured?',
    a: "Yes. All aerial work is flown by a licensed drone pilot and fully insured, so your shoot is covered and compliant. We capture 4K cinematic aerials, site-progress footage and surveys — whether that's a construction site, acreage, a venue or a property.",
  },
  {
    cat: 'General',
    q: 'Do you only work in Brisbane?',
    a: "We're Brisbane-based and travel across South-East Queensland and beyond for shoots. Web projects are handled remotely, so we build sites for clients anywhere in Australia and internationally. If you'd rather meet in person, we're always happy to.",
  },
  {
    cat: 'General',
    q: 'Who owns the final footage and files?',
    a: "You do — completely. Once a project's delivered, the final films, photos and website are yours to use however you like, with full rights. Nothing is locked to us, there are no lock-in contracts, and we can hand over raw files on request.",
  },
  {
    cat: 'Web',
    q: 'Do you build websites too, or just media?',
    a: "Both — and together is where the magic happens. We can shoot your content and build the site it lives on, so everything looks and feels like one brand. Sites are custom-coded from scratch — no Wix, no templates — fast, premium and built to convert. Optional managed hosting is $25/month.",
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
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '', budget: '' })
  const setF = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleContactSubmit = async e => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    setFormStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: form.service,
          package: form.budget,
          message: form.message,
        }),
      })
      setFormStatus(res.ok ? 'sent' : 'error')
    } catch { setFormStatus('error') }
  }

  const [modal, setModal] = useState(null) // null | 'demo' | 'hosting'
  const [modalForm, setModalForm] = useState({ name: '', email: '', business: '', field: '', note: '' })
  const [modalStatus, setModalStatus] = useState('idle')
  const [flippedCard, setFlippedCard] = useState(null)
  const [livePreviews, setLivePreviews] = useState([])
  const [readyPreviews, setReadyPreviews] = useState([])
const [activeBuild, setActiveBuild] = useState(1)
  const [wordIdx, setWordIdx] = useState(0)
  const [svcDetail, setSvcDetail] = useState(null) // null | service object
  const openSvc = s => { setSvcDetail(s); document.body.style.overflow = 'hidden' }
  const closeSvc = () => { setSvcDetail(null); document.body.style.overflow = '' }
  const [procTrack, setProcTrack] = useState('media') // 'media' | 'web'
  const [priceDetail, setPriceDetail] = useState(null) // null | pricing card object
  const openPrice = c => { setPriceDetail(c); document.body.style.overflow = 'hidden' }
  const closePrice = () => { setPriceDetail(null); document.body.style.overflow = '' }
  const [gallery, setGallery] = useState(null) // null | 'web' | 'media'
  const openGallery = type => { setGallery(type); document.body.style.overflow = 'hidden' }
  const closeGallery = () => { setGallery(null); document.body.style.overflow = '' }
  const heroRef = useRef(null)
  const heroInnerRef = useRef(null)
  const portTrackRef = useRef(null)
  const portfolioRef = useRef(null)
  const ptclRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % ROTATOR_WORDS.length), 1900)
    return () => clearInterval(id)
  }, [])

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

  // handleSubmit removed — homepage form replaced with /start CTA

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
      <a href="#top" className="skip-link">Skip to content</a>
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
        <div className="hero-photo">
          <img src="/brisbane.jpg" alt="Brisbane city skyline — Wilson Creative Co. media production house based in Brisbane, QLD" className="hero-photo-img" width="1800" height="2400" />
        </div>
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
          <p className="h-eye">Brisbane Media Production House</p>
          <h1 className="sr-only">Media Production & Web Design in Brisbane — Wilson Creative Co.</h1>
          <h2 className="h1" aria-label="We Make Businesses Unforgettable.">
            <span className="hl"><span className="hw hw1">We Make</span></span>
            <span className="hl"><span className="hw hw2">Businesses</span></span>
            <span className="hl"><span className="hw hw3 gold-line">Unforgettable.</span></span>
          </h2>
          <p className="h-sub">Every angle. Every format.</p>
          <div className="h-btns">
            <a href="#contact" className="btn-g" onClick={e => handleNav(e, '#contact')}>Get In Touch →</a>
            <a href="#work" className="btn-o" onClick={e => handleNav(e, '#work')}>View Our Work →</a>
          </div>
        </div>
        <div className="h-rotator" aria-label="What we do">
          <span className="hr-pre">One studio —</span>
          <span className="hr-word-wrap">
            <span key={wordIdx} className="hr-word gold-line">{ROTATOR_WORDS[wordIdx]}</span>
          </span>
        </div>
      </section>


      <section id="services" className="secpad services-showcase" aria-labelledby="svc-h2">
        <div className="svc-intro">
          <div className="svc-intro-l">
            <p className="stag rv">What We Do</p>
            <h2 className="sh2 rv d1" id="svc-h2">Focused services for<br />brands that want to <em>stand out</em></h2>
          </div>
          <div className="svc-intro-r rv d2">
            <p>Video, photography, drone and web — produced in-house and built to make your brand impossible to ignore.</p>
            <button className="btn-g" onClick={() => scrollTo('#contact')}>Start a Project →</button>
          </div>
        </div>

        <div className="svc-showcase">
          {services.map((s, i) => (
            <article
              className={`svc-feature ${i % 2 === 1 ? 'rev' : ''} rv`}
              key={s.num}
              style={{ '--glow': s.glow }}
            >
              <div className="svc-feature-stage">
                <span className="svc-feature-num" aria-hidden="true">{s.num}</span>
                <span className="svc-feature-icon" aria-hidden="true">{svcIcons[s.tag]}</span>
                <span className="svc-feature-cat" aria-hidden="true">{s.tag}</span>
              </div>
              <div className="svc-feature-body">
                <p className="svc-feature-eyebrow">{s.num} — {s.tag}</p>
                <h3 className="svc-feature-title">{s.name}</h3>
                <p className="svc-feature-line">{s.line}</p>
                <p className="svc-feature-desc">{s.desc}</p>
                <div className="svc-feature-chips">
                  {s.deliverables.map(d => <span key={d}>{d}</span>)}
                </div>
                <button type="button" className="svc-feature-cta" onClick={() => openSvc(s)}>
                  Learn More <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="secpad work-v2" aria-labelledby="work-h2">
        <div className="workv-head">
          <p className="stag rv">Featured Work</p>
          <h2 className="sh2 rv d1" id="work-h2">Recent <em>work</em></h2>
          <p className="workv-sub rv d2">A look at what we&apos;ve shot, flown and built for brands that demand quality. Take your pick.</p>
        </div>

        <div className="workv-tiles rv d1">
          <button type="button" className="workv-tile" style={{ '--glow': '197,164,74' }} onClick={() => openGallery('web')}>
            <div className="workv-tile-media">
              <img src="/work-zantara.jpg" alt="Custom website built by Wilson Creative Co. for a Brisbane client" loading="lazy" />
              <span className="workv-tile-shade" />
              <span className="workv-tile-badge">{featuredBuilds.length} Live Projects</span>
            </div>
            <div className="workv-tile-panel">
              <span className="workv-tile-eyebrow">Web Design</span>
              <h3 className="workv-tile-title">Website Builds</h3>
              <p className="workv-tile-desc">Custom-coded sites — live and in the wild.</p>
              <span className="workv-tile-cta">View Web Builds <span aria-hidden="true">→</span></span>
            </div>
          </button>

          <button type="button" className="workv-tile" style={{ '--glow': '197,164,74' }} onClick={() => openGallery('media')}>
            <div className="workv-tile-media">
              <img src="/brisbane.jpg" alt="Aerial and film production by Wilson Creative Co. across Brisbane" loading="lazy" />
              <span className="workv-tile-shade" />
              <span className="workv-tile-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="workv-tile-badge">Showreel Soon</span>
            </div>
            <div className="workv-tile-panel">
              <span className="workv-tile-eyebrow">Film · Photo · Aerial</span>
              <h3 className="workv-tile-title">Recent Shoots</h3>
              <p className="workv-tile-desc">Video, photography &amp; aerial — fresh off the camera.</p>
              <span className="workv-tile-cta">View Media Work <span aria-hidden="true">→</span></span>
            </div>
          </button>
        </div>
      </section>
      <section id="about" className="secpad" aria-labelledby="about-h2">
        <div className="about">
          <div className="about-caps rl" aria-hidden="true">
            <p className="ac-label">Under one roof</p>
            <ul className="ac-list">
              {aboutCaps.map(c => (
                <li className="ac-row" key={c.name}>
                  <span className="ac-num">{c.n}</span>
                  <span className="ac-body">
                    <span className="ac-name">{c.name}</span>
                    <span className="ac-note">{c.note}</span>
                  </span>
                  <span className="ac-dot" />
                </li>
              ))}
            </ul>
            <p className="ac-foot"><span>One</span> studio, one team — Brisbane, QLD</p>
          </div>
          <div className="about-text">
            <p className="stag rv">Why Wilson Creative</p>
            <h2 className="sh2 rv d1" id="about-h2">One team.<br /><em>Every format.</em></h2>
            <p className="rv d2">Wilson Creative Co. is a full media production house in Brisbane. Film, photography, aerial and web — all handled by one team that understands your whole brand. No juggling freelancers, no handing your vision to five different people who&apos;ve never spoken.</p>
            <p className="rv d3">From a single shoot to a complete brand rollout, we cover every angle and every format — built to make your business impossible to ignore, online and off.</p>
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
            { initials: 'ZW', name: 'Zach', biz: 'Zantara Workforce Solutions, Gold Coast', quote: 'Absolutely loved working with George from Wilson Creative Co. He created an amazing website for us that looks professional, modern, and perfectly suits our brand. Great communication, easy process, and an outstanding final result. Highly recommend!' },
            { initials: 'MR', name: 'Marcus', biz: 'Apex Construction, Brisbane', quote: 'The monthly drone footage of our site has been a game-changer for keeping clients in the loop — and the final completion film looked like something off a TV ad. Genuinely impressed with the whole team.' },
            { initials: 'SL', name: 'Sophie', biz: 'Nineteen10 Venue, Gold Coast', quote: 'George shot our venue and the difference was night and day. Our reels actually get shared now and the bookings have followed. The quality speaks for itself — couldn\'t recommend them more.' },
          ].map((t, i) => (
            <div className="testi-card rv" style={{ '--d': `${i * 0.12}s` }} key={i}>
              <span className="testi-mark" aria-hidden="true">&ldquo;</span>
              <div className="testi-stars" aria-label="5 stars">{'★'.repeat(5)}</div>
              <p className="testi-quote">{t.quote}</p>
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
        <div className="price-head">
          <p className="stag rv" style={{ justifyContent: 'center' }}>Investment</p>
          <h2 className="sh2 rv d1" id="price-h2" style={{ textAlign: 'center' }}>Transparent pricing.<br />No <em>surprises.</em></h2>
          <p className="price-sub rv d2">Two things we do, no confusing tiers up front. Pick a starting point — see the full breakdown inside.</p>
        </div>
        <div className="price-cards rv d1">
          {pricingCards.map(c => (
            <div className="price-card" key={c.key}>
              <p className="price-card-tag">{c.tag}</p>
              <h3 className="price-card-name">{c.name}</h3>
              <div className="price-card-amt">{c.price}</div>
              <p className="price-card-line">{c.line}</p>
              <div className="price-card-actions">
                <button type="button" className="price-card-cta" onClick={() => openPrice(c)}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="secpad proc-v2" aria-labelledby="proc-h2">
        <div className="proc-head">
          <p className="stag rv" style={{ justifyContent: 'center' }}>How It Works</p>
          <h2 className="sh2 rv d1" id="proc-h2" style={{ textAlign: 'center' }}>From idea to<br /><em>impossible to ignore</em></h2>
          <p className="proc-sub rv d2">{processTracks[procTrack].blurb}</p>
        </div>

        <div className="proc-toggle rv d2" role="tablist" aria-label="Process path">
          {Object.entries(processTracks).map(([key, t]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={procTrack === key}
              className={`proc-tab ${procTrack === key ? 'on' : ''}`}
              onClick={() => setProcTrack(key)}
            >{t.label}</button>
          ))}
        </div>

        <div className="proc-timeline" key={procTrack}>
          {processTracks[procTrack].steps.map(s => (
            <div className="pstep" key={s.num}>
              <div className="pstep-body">
                <p className="pstep-phase"><span className="pstep-phase-n">{s.num}</span>{s.phase}</p>
                <h3 className="pstep-ttl">{s.title}</h3>
                <p className="pstep-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="secpad faq-v2" aria-labelledby="faq-h2">
        <div className="faq-head">
          <p className="stag rv" style={{ justifyContent: 'center' }}>Common Questions</p>
          <h2 className="sh2 rv d1" id="faq-h2" style={{ textAlign: 'center' }}>Everything you need<br />to <em>know</em></h2>
        </div>
        <div className="faq-list rv d2">
          {faqItems.map((f, i) => (
            <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={f.q}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                <span className="faq-q-text">
                  <span className="faq-cat">{f.cat}</span>
                  <span className="faq-q-main">{f.q}</span>
                </span>
                <span className="faq-ico" aria-hidden="true">+</span>
              </button>
              <div className="faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="cta-sec cta-split" aria-labelledby="cta-h2">
        <div className="cta-glow" aria-hidden="true" />

        {/* ── Left col ── */}
        <div className="cta-left">
          <p className="stag rv">Start a Project</p>
          <h2 className="cta-h2 rv d1" id="cta-h2">Let&apos;s Make<br /><span>Something</span><br />Unforgettable.</h2>
          <p className="cta-sub rv d2" style={{ margin: '0 0 52px', textAlign: 'left' }}>
            Tell us what you&apos;re after — a shoot, a website, or the full package. No obligation, just a conversation to see if we&apos;re the right fit.
          </p>

          <div className="cta-ci rv d3" style={{ justifyContent: 'flex-start', marginTop: 0, paddingTop: 0, borderTop: 'none', gap: '36px', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="ci" style={{ textAlign: 'left' }}>
              <p className="ci-l">Call Us</p>
              <a href="tel:+61401609118" className="ci-v">0401 609 118</a>
            </div>
            <div className="ci" style={{ textAlign: 'left' }}>
              <p className="ci-l">Email Us</p>
              <a href="mailto:wilsoncreativeco.au@gmail.com" className="ci-v">wilsoncreativeco.au@gmail.com</a>
            </div>
            <div className="ci" style={{ textAlign: 'left' }}>
              <p className="ci-l">Based In</p>
              <span className="ci-v">Brisbane, Australia</span>
            </div>
          </div>
        </div>

        {/* ── Right col — form ── */}
        <div className="cta-right rv d2">
          {formStatus === 'sent' ? (
            <div className="f-ok">
              <div className="f-ok-ico">✦</div>
              <h3>Message received.</h3>
              <p>We&apos;ll be in touch within 24 hours.<br />Check your inbox — we reply personally, not with a bot.<br /><span style={{fontSize:'0.85em',opacity:0.6}}>Can't see it? Check your spam folder.</span></p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="f-row">
                <div className="f-fld">
                  <input
                    className="fn-input"
                    value={form.name}
                    onChange={setF('name')}
                    placeholder="Your Name *"
                    required
                  />
                </div>
                <div className="f-fld">
                  <input
                    className="fn-input"
                    type="email"
                    value={form.email}
                    onChange={setF('email')}
                    placeholder="Email Address *"
                    required
                  />
                </div>
              </div>
              <div className="f-row">
                <div className="f-fld">
                  <input
                    className="fn-input"
                    type="tel"
                    value={form.phone}
                    onChange={setF('phone')}
                    placeholder="Phone (optional)"
                  />
                </div>
                <div className="f-fld">
                  <select
                    className={`fn-input f-sel${form.service ? ' has-value' : ''}`}
                    value={form.service}
                    onChange={setF('service')}
                  >
                    <option value="">What are you after?</option>
                    <option value="Video &amp; Film">Video &amp; Film</option>
                    <option value="Photography">Photography</option>
                    <option value="Aerial &amp; Drone">Aerial &amp; Drone</option>
                    <option value="Web Design">Web Design</option>
                    <option value="A bit of everything">A bit of everything</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
              </div>
              <div className="f-fld">
                <textarea
                  className="fn-input f-textarea"
                  value={form.message}
                  onChange={setF('message')}
                  placeholder="Tell us about your project…"
                  rows={4}
                />
              </div>
              <div className="f-fld">
                <select
                  className={`fn-input f-sel${form.budget ? ' has-value' : ''}`}
                  value={form.budget}
                  onChange={setF('budget')}
                >
                  <option value="">Budget range (optional)</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000 – $3,000">$1,000 – $3,000</option>
                  <option value="$3,000 – $5,000">$3,000 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              {formStatus === 'error' && (
                <p style={{ fontSize: '12px', color: '#e05a5a', margin: '0 0 10px' }}>Something went wrong — try again or email us directly.</p>
              )}

              <button className="f-sub" type="submit" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>

              <p className="f-note">
                We&apos;ll get back to you within 24 hours. No obligation, no spam.
              </p>

            </form>
          )}
        </div>

      </section>

      <footer role="contentinfo">
        <div className="ft">
          <div className="fb">
            <p className="fb-name">Wilson <span>Creative</span> Co.</p>
            <p className="fb-tag">A full-service media production house — film, photography, aerial &amp; web. We make brands impossible to ignore.</p>
            <p className="fb-loc"><span aria-hidden="true">◆</span> Brisbane, QLD · Available Australia-wide</p>
          </div>
          <div className="f-cols">
            <div className="fc">
              <p>What We Do</p>
              <a href="#services" onClick={e => handleNav(e, '#services')}>Film &amp; Video</a>
              <a href="#services" onClick={e => handleNav(e, '#services')}>Photography</a>
              <a href="#services" onClick={e => handleNav(e, '#services')}>Aerial &amp; Drone</a>
              <a href="#services" onClick={e => handleNav(e, '#services')}>Web Design</a>
            </div>
            <div className="fc">
              <p>Explore</p>
              {navItems.map(i => (
                <a key={i.label} href={i.href} onClick={e => handleNav(e, i.href)}>{i.label}</a>
              ))}
            </div>
            <div className="fc">
              <p>Connect</p>
              <a href="mailto:wilsoncreativeco.au@gmail.com">wilsoncreativeco.au@gmail.com</a>
              <a href="tel:+61401609118">0401 609 118</a>
              <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
        </div>
        <div className="fb-bot">
          <p className="f-copy">© {year} Wilson Creative Co. All rights reserved. | Brisbane, QLD, Australia | ABN 99 664 433 447</p>
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

      {/* ── Service detail modal ── */}
      {svcDetail && (
        <div
          className="svc-modal-overlay"
          onClick={closeSvc}
          role="dialog"
          aria-modal="true"
          aria-label={`${svcDetail.name} details`}
          style={{ '--glow': svcDetail.glow }}
        >
          <div className="svc-modal" onClick={e => e.stopPropagation()}>
            <button className="svc-modal-close" onClick={closeSvc} aria-label="Close">✕</button>
            <div className="svc-modal-head">
              <p className="svc-modal-eyebrow">{svcDetail.num} — {svcDetail.tag}</p>
              <h3 className="svc-modal-title">{svcDetail.name}</h3>
              <p className="svc-modal-approach">{svcDetail.approach}</p>
              <div className="svc-feature-chips">
                {svcDetail.deliverables.map(d => <span key={d}>{d}</span>)}
              </div>
            </div>
            <div className="svc-modal-body">
              <p className="svc-modal-label">Perfect for</p>
              <ul className="svc-perfect">
                {svcDetail.perfectFor.map(p => (
                  <li key={p.t}>
                    <span className="svc-perfect-t">{p.t}</span>
                    <span className="svc-perfect-d">{p.d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              className="btn-g svc-modal-cta"
              onClick={e => { handleNav(e, '#contact'); closeSvc() }}
            >Start a Project →</a>
          </div>
        </div>
      )}

      {/* ── Pricing detail modal ── */}
      {priceDetail && (
        <div
          className="svc-modal-overlay"
          onClick={closePrice}
          role="dialog"
          aria-modal="true"
          aria-label={`${priceDetail.name} pricing`}
          style={{ '--glow': '197,164,74' }}
        >
          <div className="svc-modal price-modal" onClick={e => e.stopPropagation()}>
            <button className="svc-modal-close" onClick={closePrice} aria-label="Close">✕</button>
            <div className="svc-modal-head">
              <p className="svc-modal-eyebrow">{priceDetail.tag}</p>
              <h3 className="svc-modal-title">{priceDetail.name} — {priceDetail.price}</h3>
              <p className="svc-modal-approach">{priceDetail.blurb}</p>
            </div>
            <div className="svc-modal-body">
              <ul className="price-list">
                {priceDetail.breakdown.map(b => (
                  <li key={b.name}>
                    <div className="price-list-top">
                      <span className="price-list-name">{b.name}</span>
                      <span className="price-list-amt">{b.price}</span>
                    </div>
                    <span className="price-list-desc">{b.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              className="btn-g svc-modal-cta"
              onClick={e => { handleNav(e, '#contact'); closePrice() }}
            >Start a Project →</a>
          </div>
        </div>
      )}

      {/* ── Work gallery popup ── */}
      {gallery && (
        <div className="gal-overlay" onClick={closeGallery} role="dialog" aria-modal="true" aria-label={gallery === 'web' ? 'Website builds' : 'Media work'}>
          <div className="gal-box" onClick={e => e.stopPropagation()}>
            <button className="gal-close" onClick={closeGallery} aria-label="Close">✕</button>
            {gallery === 'web' && (
              <div className="gal-head">
                <p className="gal-eyebrow">Website Builds</p>
                <h3 className="gal-title">Sites we&apos;ve <em>built</em></h3>
                <p className="gal-sub">Every one fully custom-coded — no templates. Click any project to visit it live.</p>
              </div>
            )}

            {gallery === 'web' ? (
              <div className="gal-grid gal-grid-3">
                {featuredBuilds.map((item, i) => (
                  <a
                    key={i}
                    className="gal-card"
                    href={item.src.startsWith('http') ? item.src : undefined}
                    target={item.src.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    <div className="gal-card-media">
                      {item.preview
                        ? <img src={item.preview} alt={item.industry} loading="lazy" />
                        : (
                          <div className="gal-card-ph">
                            <span className="gal-card-ph-dots"><i /><i /><i /></span>
                            <span className="gal-card-ph-title">{item.title}</span>
                            <span className="gal-card-ph-url">{item.displayUrl.toLowerCase()}</span>
                          </div>
                        )}
                      <span className="gal-card-visit">Visit Site ↗</span>
                    </div>
                    <div className="gal-card-meta">
                      <span className="gal-card-tag">{item.tag}</span>
                      <p className="gal-card-name">{item.industry.replace('Sample Build — ', '').replace('Live Client — ', '')}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="gal-empty">
                <p className="gal-eyebrow">Recent Shoots</p>
                <span className="gal-empty-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2.5" y="6.5" width="13" height="11" rx="2" />
                    <path d="M15.5 10l6-3.2v10.4l-6-3.2z" />
                  </svg>
                </span>
                <h4 className="gal-empty-title">Fresh footage, <em>rolling soon</em></h4>
                <p className="gal-empty-sub">We&apos;re out shooting now. Our showreel and full media portfolio will live right here — be one of the first brands featured.</p>
                <a href="#contact" className="btn-g gal-empty-cta" onClick={e => { handleNav(e, '#contact'); closeGallery() }}>Work With Us →</a>
              </div>
            )}
          </div>
        </div>
      )}

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
