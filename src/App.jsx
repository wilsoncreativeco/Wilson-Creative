import "./App.css";
import { useState, useEffect, useRef } from "react";

const services = [
  { title: "Web Design & Development", status: "" },
  { title: "Aerial Cinematography", status: "Coming soon" },
  { title: "Photography", status: "Coming soon" },
  { title: "Social Media Content", status: "Coming soon" },
];

const navItems = [
  { label: "HOME", action: "scroll", target: "top" },
  { label: "ABOUT", action: "scroll", target: "about" },
  { label: "SERVICES", action: "scroll", target: "services" },
  { label: "WORK", action: "scroll", target: "work" },
  { label: "PROCESS", action: "process" },
  { label: "PRICING", action: "pricing" },
  { label: "CONTACT", action: "modal" },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We take the time to understand your business, your goals, and exactly what you want your website to achieve. Whether you have a clear vision or no idea where to start, we'll guide the process and identify what will actually drive results.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "We map out a clear plan for your site — structure, layout, and user flow — all tailored to your business. Every decision is made with one goal: turning visitors into enquiries or customers.",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Your website is fully custom coded from scratch — no Wix, no templates, no shortcuts. Everything is designed and built specifically for your business, giving you a fast, modern, and completely unique site that fits your exact vision.",
  },
  {
    num: "04",
    title: "Launch & Support",
    desc: "Once everything is tested and approved, we launch your site smoothly. After launch, we're here for updates, tweaks, and ongoing support to keep everything running properly.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "From $600",
    desc: "Perfect for small businesses and personal brands getting started online.",
    features: [
      "Custom single-page website",
      "Mobile-responsive design",
      "Contact form + click-to-call integration",
      "Basic SEO setup",
      "1 round of revisions",
      "5–7 day delivery",
    ],
  },
  {
    name: "Growth",
    price: "From $1,000",
    desc: "For established brands ready to scale their digital presence.",
    features: [
      "Multi-page custom website (up to 5)",
      "Advanced animations & interactions",
      "CMS or blog integration",
      "Full SEO optimisation",
      "3 rounds of revisions",
      "Analytics dashboard setup",
      "10-14 day delivery",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "From $2,000",
    desc: "Full-service creative solution for brands that demand the best.",
    features: [
      "Everything in Growth",
      "E-commerce or booking system",
      "Custom brand strategy session",
      "Content creation & copywriting",
      "Priority ongoing support",
      "Unlimited revisions",
      "2-3 week delivery",
    ],
  },
];

const hostingOption = {
  name: "Optional Website Hosting",
  price: "$25 / month",
  desc: "Hosting means we look after the technical side of keeping your website live online. It is completely optional — you can either host the website yourself, use your own provider, or have us manage it for you.",
  features: [
    "We keep your website live and accessible online",
    "We connect your domain to the website",
    "We manage the hosting setup so you do not have to",
    "We set up SSL so your site loads securely with HTTPS",
    "We monitor the site for basic uptime and hosting issues",
    "You can move to your own hosting at any time",
  ],
};

// ── Portfolio work items ────────────────────────────────────────────────────
const workItems = [
  {
    src: "https://noir-cafe-beige.vercel.app",
    displayUrl: "noircafe.com.au",
    tag: "Hospitality",
    industry: "Sample Build — NOIR Café",
    title: "Coffee · Matcha · Culture",
    sub: "Award-worthy café brand & site",
    scrollPx: 4200,
  },
  {
    src: "/meridian.html",
    displayUrl: "meridianproperty.com.au",
    tag: "Real Estate",
    industry: "Sample Build — Luxury Property",
    title: "Where Exceptional Homes Find Their People",
    sub: "Premium real estate agency experience",
    scrollPx: 4000,
  },
  {
    src: "/barber.html",
    displayUrl: "barbershop.com.au",
    tag: "Lifestyle",
    industry: "Sample Build — Barber",
    title: "Sharp · Clean · Classic",
    sub: "Conversion-focused barbershop site",
    scrollPx: 3800,
  },
  {
    src: "/Plumbing.html",
    displayUrl: "plumbingpro.com.au",
    tag: "Trades",
    industry: "Sample Build — Plumbing",
    title: "Fast · Reliable · Professional",
    sub: "Lead-generation trades website",
    scrollPx: 3600,
  },
  {
    src: "/Cafe.html",
    displayUrl: "localcafe.com.au",
    tag: "Hospitality",
    industry: "Sample Build — Café",
    title: "Fresh · Local · Welcoming",
    sub: "Modern café brand & online presence",
    scrollPx: 3800,
  },
];

// ── Icons ───────────────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <polyline points="22,4 12,13 2,4" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// ── Portfolio Card ──────────────────────────────────────────────────────────
function PortfolioCard({ item, isLive, onReady, isReady }) {
  return (
    <article className="pcard">
      {/* Gradient overlay — keeps text readable */}
      <div className="pcard-gradient" aria-hidden="true" />

      {/* Browser chrome */}
      <div className="pcard-browser">
        {/* Traffic light bar */}
        <div className="pcard-bar" aria-hidden="true">
          <div className="pcard-dots">
            <span className="dot-red" />
            <span className="dot-yellow" />
            <span className="dot-green" />
          </div>
          <div className="pcard-url">
            {/* Lock icon */}
            <svg width="7" height="9" viewBox="0 0 10 12" fill="none">
              <rect x="1" y="5" width="8" height="7" rx="1.5" stroke="rgba(40,200,64,.8)" strokeWidth="1.4" />
              <path d="M3 5V3.5a2 2 0 0 1 4 0V5" stroke="rgba(40,200,64,.8)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span>{item.displayUrl}</span>
          </div>
          <a
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className="pcard-ext"
            aria-label={`Open ${item.industry} live site`}
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 8.5L8.5 1.5M8.5 1.5H4.5M8.5 1.5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Iframe viewport */}
        <div className="pcard-screen">
          {/* Shimmer skeleton — shown until iframe loads */}
          <div className={`pcard-shimmer ${isReady ? "pcard-shimmer--hidden" : ""}`} aria-hidden="true">
            <div className="psh-nav" />
            <div className="psh-hero" />
            <div className="psh-body">
              <span /><span /><span /><span />
            </div>
          </div>

          {/* The actual iframe — 1440px wide, scaled down to 360px */}
          {isLive && (
            <div className="pcard-iframe-wrap">
              <iframe
                src={item.src}
                title={item.title}
                loading="lazy"
                tabIndex="-1"
                scrolling="no"
                onLoad={onReady}
                className={`pcard-iframe ${isReady ? "pcard-iframe--ready" : ""}`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Card text */}
      <div className="pcard-info">
        <span className="pcard-tag">{item.tag}</span>
        <p className="pcard-ind">{item.industry}</p>
        <h3 className="pcard-title">{item.title}</h3>
        <p className="pcard-sub">{item.sub}</p>
      </div>
    </article>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  // Portfolio live-load state
  const [liveCards, setLiveCards] = useState([]);
  const [readyCards, setReadyCards] = useState([]);
  const portfolioRef = useRef(null);
  const trackRef = useRef(null);

  // Hero load animation
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-triggered section reveal
  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("show"); }),
      { threshold: 0.12 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Hero parallax scroll
  useEffect(() => {
    const video = document.querySelector(".hero-video");
    const overlay = document.querySelector(".overlay");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!video || !overlay) return;
        const progress = Math.min(window.scrollY / (window.innerHeight * 1.08), 1);
        const eased = progress * progress * (3 - 2 * progress);
        video.style.transform = `translate3d(0,0,0) scale(${1 + eased * 0.04})`;
        video.style.filter = `blur(${eased * 24}px) brightness(${1 - eased * 0.52})`;
        overlay.style.setProperty("--overlay-darkness", String(0.44 + eased * 0.36));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Staggered portfolio iframe loading — only when section is visible
  useEffect(() => {
    const section = portfolioRef.current;
    if (!section) return;
    const timers = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        workItems.forEach((item, i) => {
          const t = setTimeout(() => {
            setLiveCards((prev) => (prev.includes(item.src) ? prev : [...prev, item.src]));
          }, i * 380); // stagger 380ms per card
          timers.push(t);
        });
        io.disconnect();
      },
      { threshold: 0.15 }
    );
    io.observe(section);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  // Drag-scroll portfolio track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let isDragging = false, startX = 0, startScroll = 0;
    const down = (e) => { isDragging = true; startX = e.pageX; startScroll = track.scrollLeft; track.style.cursor = "grabbing"; };
    const up = () => { isDragging = false; track.style.cursor = "grab"; };
    const move = (e) => { if (!isDragging) return; e.preventDefault(); track.scrollLeft = startScroll - (e.pageX - startX); };
    track.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mousemove", move);
    return () => { track.removeEventListener("mousedown", down); document.removeEventListener("mouseup", up); document.removeEventListener("mousemove", move); };
  }, []);

  // Lock body scroll when overlays open
  useEffect(() => {
    document.body.style.overflow = (menuOpen || showProcess || showPricing) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, showProcess, showPricing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(e.target.action, { method: "POST", body: new FormData(e.target), headers: { Accept: "application/json" } });
    if (res.ok) {
      setSubmitted(true);
      e.target.reset();
      setTimeout(() => { setShowModal(false); setSubmitted(false); }, 2200);
    }
  };

  const handleNavClick = (item) => {
    setMenuOpen(false);
    if (item.action === "modal") { setTimeout(() => setShowModal(true), 320); return; }
    if (item.action === "process") { setTimeout(() => setShowProcess(true), 320); return; }
    if (item.action === "pricing") { setTimeout(() => setShowPricing(true), 320); return; }
    if (item.target === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.getElementById(item.target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const markReady = (src) => setReadyCards((prev) => (prev.includes(src) ? prev : [...prev, src]));

  return (
    <>
      <div className="watermark">WILSON CREATIVE CO.</div>

      {/* ── Hamburger ── */}
      <button
        className={`hamburger-btn ${menuOpen || showProcess || showPricing ? "open" : ""}`}
        onClick={() => {
          if (showProcess) { setShowProcess(false); return; }
          if (showPricing) { setShowPricing(false); return; }
          setMenuOpen(!menuOpen);
        }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span className="ham-line" /><span className="ham-line" /><span className="ham-line" />
      </button>

      {/* ── Nav overlay ── */}
      <div className={`nav-overlay ${menuOpen ? "overlay-open" : ""}`} role="dialog" aria-modal="true">
        <nav className="nav-overlay-inner">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="nav-item">
                <button className="nav-link" onClick={() => handleNavClick(item)}>{item.label}</button>
              </li>
            ))}
          </ul>
          <div className="nav-bottom">
            <p className="nav-connect">LET&apos;S CONNECT</p>
            <div className="nav-socials">
              <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer" className="nav-social-link"><InstagramIcon /> Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer" className="nav-social-link"><FacebookIcon /> Facebook</a>
              <a href="mailto:wilsoncreativeco.au@gmail.com" className="nav-social-link"><EmailIcon /> Email</a>
              <a href="tel:+61401609118" className="nav-social-link"><PhoneIcon /> Phone</a>
            </div>
            <button className="nav-cta" onClick={() => { setMenuOpen(false); setTimeout(() => setShowModal(true), 320); }}>
              Get a Free Demo
            </button>
          </div>
        </nav>
      </div>

      {/* ── Hero ── */}
      <div className={`hero ${loaded ? "loaded" : ""}`}>
        <video autoPlay muted loop playsInline preload="auto" poster="/fallback.jpg" className="hero-video">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="overlay" />
        <div className="hero-content">
          <p className="hero-kicker">Wilson Creative Co.</p>
          <h1>
            We Don&apos;t Just Build Websites.
            <br />
            <span className="hero-gold">We Build Attention.</span>
          </h1>
          <p className="sub">And turn it into customers.</p>
          <div className="buttons">
            <button className="primary" onClick={() => setShowModal(true)}>Start a Project</button>
            <button className="secondary" onClick={() => { const s = document.getElementById("work"); if (s) s.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
              View Work
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>

      {/* ── Services ── */}
      <section id="services" className="section what-we-do">
        <h2>Featured Services</h2>
        <div className="services">
          {services.map((service) => (
            <article key={service.title} className="service-item">
              <h3>{service.title}</h3>
              {service.status ? (
                <span className={`service-status ${service.status === "Coming soon" ? "soon" : ""}`}>{service.status}</span>
              ) : null}
            </article>
          ))}
        </div>
        <p className="sub">Premium production and strategy in one team, built to make your brand look elevated and perform online.</p>
      </section>

      {/* ── About ── */}
      <section id="about" className="section">
        <h2>Why Creative Co.</h2>
        <p className="text">
          We&apos;re a Brisbane-based creative studio delivering high-performance content and fully custom-coded websites for brands that want to stand out. Every project is built from the ground up—no templates, no limitations—giving you complete control, faster performance, and a solution tailored exactly to your business. Whether you&apos;re local or operating globally, we work with clients anywhere to create digital experiences that not only look premium, but drive real results.
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WORK SECTION — premium horizontal-scroll portfolio with fixed iframes
         ══════════════════════════════════════════════════════════════════════ */}
      <section id="work" className="section port-section" ref={portfolioRef}>
        <div className="port-header">
          <div>
            <p className="port-eyebrow">Recent Designs</p>
            <h2 className="port-title">What we <em>create</em></h2>
          </div>
          <button className="port-cta-link" onClick={() => setShowModal(true)}>
            Get Your Build →
          </button>
        </div>

        {/* Horizontal scroll track */}
        <div className="port-track" ref={trackRef} role="list">
          {workItems.map((item) => (
            <PortfolioCard
              key={item.src}
              item={item}
              isLive={liveCards.includes(item.src)}
              isReady={readyCards.includes(item.src)}
              onReady={() => markReady(item.src)}
            />
          ))}
        </div>

        <p className="port-hint">
          <span>Hover to scroll · Drag to explore</span>
          <span className="port-hint-arrow">→</span>
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-name">WILSON CREATIVE CO.</p>
            <p className="footer-tagline">Websites and content that build attention and turn it into customers.</p>
          </div>
          <div className="footer-divider" />
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-label">Follow</p>
              <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Contact</p>
              <a href="mailto:wilsoncreativeco.au@gmail.com" className="footer-link">wilsoncreativeco.au@gmail.com</a>
              <a href="tel:+61401609118" className="footer-link">0401 609 118</a>
            </div>
          </div>
          <div className="footer-divider" />
          <p className="footer-copy">&copy; {new Date().getFullYear()} Wilson Creative Co. All rights reserved.</p>
        </div>
      </footer>

      {/* ── Contact Modal ── */}
      {showModal && (
        <div className="modal" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="modal-content">
            <button className="close" onClick={() => setShowModal(false)}>&times;</button>
            {submitted ? (
              <><h2>Message Sent</h2><p style={{ opacity: 0.7, marginTop: "10px" }}>We&apos;ll get back to you shortly.</p></>
            ) : (
              <>
                <h2>Start a Project</h2>
                <form action="https://formspree.io/f/xojywkwo" method="POST" onSubmit={handleSubmit}>
                  <input type="text" name="name" placeholder="Name" required />
                  <input type="email" name="email" placeholder="Email" required />
                  <textarea name="message" placeholder="Tell us about your project" required />
                  <button type="submit" className="primary">Send</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Process Overlay ── */}
      {showProcess && (
        <div className="page-overlay">
          <div className="page-overlay-inner">
            <button className="page-overlay-close" onClick={() => setShowProcess(false)}>&larr; Back</button>
            <div className="page-overlay-content">
              <p className="page-overlay-kicker">How We Work</p>
              <h2 className="page-overlay-title">Our Process</h2>
              <p className="page-overlay-subtitle">Every project follows a proven framework designed to deliver results — on time and on brand.</p>
              <div className="process-steps">
                {processSteps.map((step) => (
                  <div key={step.num} className="process-step">
                    <span className="process-num">{step.num}</span>
                    <div className="process-body">
                      <h3 className="process-title">{step.title}</h3>
                      <p className="process-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="primary page-overlay-cta" onClick={() => { setShowProcess(false); setTimeout(() => setShowModal(true), 320); }}>
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Pricing Overlay ── */}
      {showPricing && (
        <div className="page-overlay">
          <div className="page-overlay-inner">
            <button className="page-overlay-close" onClick={() => setShowPricing(false)}>&larr; Back</button>
            <div className="page-overlay-content">
              <p className="page-overlay-kicker">Investment</p>
              <h2 className="page-overlay-title">Pricing</h2>
              <p className="page-overlay-subtitle">Transparent pricing for every stage of growth. Every package is tailored to your needs.</p>
              <div className="pricing-grid">
                {pricingTiers.map((tier) => (
                  <div key={tier.name} className={`pricing-card ${tier.featured ? "pricing-featured" : ""}`}>
                    <h3 className="pricing-name">{tier.name}</h3>
                    <p className="pricing-price">{tier.price}</p>
                    <p className="pricing-desc">{tier.desc}</p>
                    <ul className="pricing-features">{tier.features.map((f) => <li key={f}>{f}</li>)}</ul>
                    <button className={tier.featured ? "primary" : "secondary"} onClick={() => { setShowPricing(false); setTimeout(() => setShowModal(true), 320); }}>Contact Us</button>
                  </div>
                ))}
              </div>
              <div className="pricing-card pricing-hosting" style={{ marginTop: 20, textAlign: "left" }}>
                <p className="page-overlay-kicker">Optional Add-On</p>
                <h3 className="pricing-name">{hostingOption.name}</h3>
                <p className="pricing-price">{hostingOption.price}</p>
                <p className="pricing-desc">{hostingOption.desc}</p>
                <ul className="pricing-features">{hostingOption.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <button className="secondary" onClick={() => { setShowPricing(false); setTimeout(() => setShowModal(true), 320); }}>Ask About Hosting</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
