import { useEffect, useRef, useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import CalEmbed from './components/CalEmbed'
import './App.css'

const services = [
  {
    num: '01',
    tag: 'Video',
    name: 'Video Production',
    line: 'Stories that move.',
    desc: 'Cinematic brand films, commercials and short-form content that stop the scroll — and stay with people long after.',
    deliverables: ['Brand Films', 'Commercials', 'Social Reels', 'Event Coverage'],
    glow: '197,164,74',
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
    glow: '197,164,74',
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
    glow: '197,164,74',
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
    glow: '197,164,74',
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

const aboutPills = [
  'One Team',
  'Film & Photo',
  'Drone Certified',
  'Custom Web',
  'Brisbane Based',
  'Every Format',
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
    key: 'single',
    tag: 'Pay Per Project',
    name: 'Single Services',
    price: 'Starting from $550',
    line: 'One-off shoots, films and aerials — book exactly what you need, nothing you don\'t.',
    blurb: 'Standalone sessions, each delivered fully edited with commercial rights. Pick the format that fits the brief.',
    breakdown: [
      { name: 'Corporate Headshots', price: '$550', desc: 'Up to 5 people, 3 retouched finals each. +$90 per head beyond five.' },
      { name: 'Aerial Photography', price: '$650', desc: '15+ stills, flown by a CASA-licensed pilot with NOTAM clearance.' },
      { name: 'Social Content & Reels', price: '$750', desc: '1× hero reel (30–60s), 2× 15s cuts, captions and 2 revisions.' },
      { name: 'Brand & Product Shoot', price: '$850', desc: '25+ edited images, 3-hour session, full commercial rights.' },
      { name: 'Aerial Photo + Video', price: '$950', desc: '15+ stills plus a 60-second cinematic aerial clip.' },
      { name: 'Brand Film & Commercial', price: '$2,200', desc: 'Full-day shoot, drone, colour grade — master plus 2 social cuts.' },
    ],
  },
  {
    key: 'packages',
    tag: 'Retainers & Bundles',
    name: 'Packages',
    price: 'From $1,100/mo',
    line: 'Ongoing content on a retainer, or combine shoots into a bundle and save.',
    blurb: 'Built for brands and sites that need a steady stream of content — plus one-off bundles that save you up to $200.',
    breakdown: [
      { name: 'Progress Documentation Retainer', price: '$1,100/mo', desc: '2 site visits, drone each visit, 50+ images monthly. 3-month minimum.' },
      { name: 'Content Retainer', price: '$1,400/mo', desc: 'Half-day shoot each month — 15 photos, 2 reels and captions.' },
      { name: 'Media + Web Retainer', price: '$2,800/mo', desc: 'Content retainer plus monthly web updates and a quarterly brand film.' },
      { name: 'Site Milestone Visit', price: '$550', desc: 'Construction milestone capture — drone included, 25+ images.' },
      { name: 'Headshots + Brand Shoot Combo', price: '$1,200', desc: 'Save $200 — up to 5 headshots plus a full brand shoot.' },
      { name: 'Photo + Reel Combo', price: '$1,400', desc: 'Save $200 — 25+ photos plus a hero reel and 2 short cuts.' },
    ],
  },
  {
    key: 'web',
    tag: 'Web Design',
    name: 'Web',
    price: 'From $600',
    line: 'Custom-coded websites — no templates, built to load fast and convert.',
    blurb: 'Every site is written from scratch and tailored to your business. Pick the scope that fits.',
    breakdown: [
      { name: 'Starter', price: 'From $600', desc: 'Custom-coded single-page site — mobile-first, contact form & SEO basics.' },
      { name: 'Growth', price: 'From $1,000', desc: 'Up to 5 pages, CMS or blog, advanced build & full SEO.' },
      { name: 'Premium', price: 'From $2,000', desc: 'E-commerce or booking system, brand strategy & copywriting.' },
      { name: 'Managed Hosting', price: '$25/mo', desc: 'Optional — domain, SSL, uptime monitoring & full hosting management.' },
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
    a: "We're a full-service creative studio in Brisbane. We shoot brand films, commercials and social content, run professional photography, fly drones for aerial work, and design custom-coded websites — all in-house, under one roof. Most clients come to us for one thing and quickly realise we can handle their entire brand, online and off.",
  },
  {
    cat: 'Pricing',
    q: 'How much does a shoot or project cost?',
    a: "Most brand projects land between $1,500 and $3,000 — a full brand film with a shoot day, colour grade and social cuts sits around $2,200. Ongoing content retainers start from $1,100/mo. Smaller one-off sessions like headshots, aerial stills or a social reel start from $550, and custom websites from $600. Every project is custom-quoted — no padded packages, no surprises — and the pricing section above has the full breakdown.",
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

  const [modal, setModal] = useState(null) // null | 'demo' | 'hosting' | 'project'
  const [modalForm, setModalForm] = useState({ name: '', email: '', business: '', field: '', note: '' })
  const [modalStatus, setModalStatus] = useState('idle')
  const [flippedCard, setFlippedCard] = useState(null)
  const [livePreviews, setLivePreviews] = useState([])
  const [readyPreviews, setReadyPreviews] = useState([])
const [activeBuild, setActiveBuild] = useState(1)
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
  const heroVideoRef = useRef(null)
  const portTrackRef = useRef(null)
  const portfolioRef = useRef(null)
  const ptclRef = useRef(null)

  // Autoplay the hero loop (muted / inline); hold the poster under reduced-motion.
  useEffect(() => {
    const v = heroVideoRef.current
    if (!v) return
    v.muted = true
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return
    const p = v.play?.()
    if (p && typeof p.catch === 'function') p.catch(() => {})
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
        : modal === 'project'
        ? { name: modalForm.name, email: modalForm.email, business: modalForm.business, type: modalForm.field, message: modalForm.note || 'Start a Project enquiry' }
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

      <Head>
        <title>Wilson Creative Co. | Film, Photo &amp; Drone Studio Brisbane</title>
        <meta name="description" content="Wilson Creative Co. is a full-service creative studio in Brisbane — brand films, photography, aerial drone work and custom-coded websites, produced in-house. Projects from $1,500." />
        <meta name="keywords" content="video production Brisbane, brand films Brisbane, commercial videography Brisbane, photography Brisbane, drone videography Brisbane, aerial cinematography Brisbane, social media content Brisbane, creative studio Brisbane, custom web design Brisbane" />
        <link rel="canonical" href="https://wilsoncreativeco.au" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wilsoncreativeco.au" />
        <meta property="og:title" content="Wilson Creative Co. | Brisbane Creative Studio" />
        <meta property="og:description" content="Brand films, photography, aerial drone work and custom websites — produced in-house to make your brand impossible to ignore." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wilson Creative Co. | Brisbane Creative Studio" />
        <meta name="twitter:description" content="Film, photography, aerial &amp; web — produced in-house to make your brand impossible to ignore." />
      </Head>

      <SiteNav onBook={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

      <section className="hero" id="top" ref={heroRef} aria-label="Hero">
        <div className="hero-media">
          <video
            ref={heroVideoRef}
            className="hero-video"
            poster="/hero-drone.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/hero-drone.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="h-ov" aria-hidden="true" />
        <div className="h-grain" aria-hidden="true" />
        <div className="h-inner" ref={heroInnerRef}>
          <p className="h-eye">Brisbane Based</p>
          <h1 className="sr-only">Media Production & Web Design in Brisbane — Wilson Creative Co.</h1>
          <h2 className="h1" aria-label="We make brands unforgettable.">
            <span className="hl"><span className="hw hw1">We Make Brands</span></span>
            <span className="hl"><span className="hw hw2 hgold">Unforgettable.</span></span>
          </h2>
          <p className="h-sub">Cinematic film, photography, aerial &amp; web. For the brands you build — and the moments you keep.</p>
          <div className="hero-doors">
            <a className="hero-door" href="/for-businesses" aria-label="For Businesses">
              <span className="hd-k">For</span>
              <span className="hd-t">Businesses</span>
              <span className="hd-d">Brand films, content &amp; websites that convert.</span>
              <span className="hd-go">Explore <span className="hd-arw" aria-hidden="true">→</span></span>
            </a>
            <a className="hero-door" href="/for-events" aria-label="For Events">
              <span className="hd-k">For</span>
              <span className="hd-t">Events</span>
              <span className="hd-d">Cinematic films &amp; photography, worth reliving.</span>
              <span className="hd-go">Explore <span className="hd-arw" aria-hidden="true">→</span></span>
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="secpad" aria-labelledby="svc-h2">
        <div className="lane-head">
          <p className="stag rv">What We Do</p>
          <h2 className="sh2 rv d1" id="svc-h2">One studio, <em>every format</em></h2>
          <p className="lane-sub rv d2">
            Film, photography, aerial and web — produced in-house by one team, so your brand
            stays consistent across every format and built to make you impossible to ignore.
          </p>
        </div>
        <div className="ind-grid ind-grid-4">
          {services.map((s, i) => (
            <article className="ind-card rv" key={s.num} style={{ transitionDelay: `${(0.05 + i * 0.06).toFixed(2)}s` }}>
              <span className="ind-num" aria-hidden="true">{s.num} — {s.tag}</span>
              <h3 className="ind-t">{s.name}</h3>
              <p className="ind-line">{s.line}</p>
              <p className="ind-d">{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="book" className="secpad" aria-labelledby="book-h2">
        <div className="lane-head">
          <p className="stag rv">Book A Call</p>
          <h2 className="sh2 rv d1" id="book-h2">Pick a time that <em>suits you</em></h2>
          <p className="lane-sub rv d2">
            A quick, no-pressure chat about your project — film, photo, aerial or web.
            Grab a slot below and we&apos;ll take it from there.
          </p>
        </div>
        <div className="cal-wrap rv d2">
          <CalEmbed />
        </div>
      </section>

      <section id="testimonials" className="secpad testi-section" aria-labelledby="testi-h2">
        <p className="stag rv">Client Results</p>
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

      <SiteFooter />

      <button id="fcta" className={showFCta ? 'show' : ''} onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} aria-label="Book a call">
        Book a Call ✦
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
              onClick={e => { e.preventDefault(); closeSvc(); openModal('project') }}
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
              onClick={e => { e.preventDefault(); closePrice(); openModal('project') }}
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
        <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-label={modal === 'demo' ? 'Free demo request' : modal === 'project' ? 'Start a project' : 'Hosting enquiry'}>
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

            {modal === 'project' && (
              <>
                <p className="modal-tag">Start a Project</p>
                <h3 className="modal-title">Let's make<br /><em>something unforgettable</em></h3>
                <p className="modal-sub">Tell us a little about what you have in mind and we'll be back to you within a few hours to map out the next steps.</p>
                {modalStatus === 'sent' ? (
                  <p className="modal-success">✓ Got it — we'll be in touch shortly.</p>
                ) : (
                  <form className="modal-form" onSubmit={handleModalSubmit} noValidate>
                    <div className="modal-row">
                      <input className="modal-input" type="text" placeholder="Your Name *" required value={modalForm.name} onChange={e => setModalForm(f => ({ ...f, name: e.target.value }))} />
                      <input className="modal-input" type="email" placeholder="Email Address *" required value={modalForm.email} onChange={e => setModalForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <input className="modal-input" type="text" placeholder="Business Name" value={modalForm.business} onChange={e => setModalForm(f => ({ ...f, business: e.target.value }))} />
                    <select className="modal-input modal-select" value={modalForm.field} onChange={e => setModalForm(f => ({ ...f, field: e.target.value }))}>
                      <option value="">What do you need?</option>
                      <option>Film &amp; Video</option>
                      <option>Photography</option>
                      <option>Aerial &amp; Drone</option>
                      <option>Web Design</option>
                      <option>Full Brand Package</option>
                      <option>Something Else</option>
                    </select>
                    <textarea className="modal-input modal-textarea" placeholder="Tell us about your project (optional)" value={modalForm.note} onChange={e => setModalForm(f => ({ ...f, note: e.target.value }))} rows={3} />
                    <button className="btn-g modal-submit" type="submit" disabled={modalStatus === 'sending'}>
                      {modalStatus === 'sending' ? 'Sending…' : 'Send Project Brief →'}
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
