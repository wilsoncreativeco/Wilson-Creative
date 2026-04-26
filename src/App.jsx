import "./App.css";
import { useState, useEffect } from "react";

const services = [
  { title: "Web Design & Development", status: "" },
  { title: "Aerial Cinematography", status: "Coming soon" },
  { title: "Video Production", status: "Coming soon" },
  { title: "Photography", status: "Coming soon" },
  { title: "Social Media Content", status: "Coming soon" },
  { title: "Commercial & Brand Media", status: "Coming soon" },
  { title: "Creative Strategy", status: "Coming soon" },
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
    desc: "We start by understanding your brand, your audience, and your goals. Through research and conversation, we uncover what makes your business unique and identify the opportunities that matter most.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "With a clear picture of your brand, we map out a tailored plan — from site architecture and content direction to visual identity and conversion strategy. Every decision is intentional.",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "We bring the strategy to life with custom design and hand-coded development. No templates, no shortcuts — just a premium digital experience built specifically for your business.",
  },
  {
    num: "04",
    title: "Launch & Support",
    desc: "After thorough testing and your final approval, we launch your project to the world. We stick around for ongoing support, updates, and optimisation to keep things running at their best.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "From $1,500",
    desc: "Perfect for small businesses and personal brands getting started online.",
    features: [
      "Custom single-page website",
      "Mobile-responsive design",
      "Contact form integration",
      "Basic SEO setup",
      "1 round of revisions",
      "2 weeks delivery",
    ],
  },
  {
    name: "Growth",
    price: "From $3,500",
    desc: "For established brands ready to scale their digital presence.",
    features: [
      "Multi-page custom website",
      "Advanced animations & interactions",
      "CMS or blog integration",
      "Full SEO optimisation",
      "3 rounds of revisions",
      "Analytics dashboard setup",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "From $7,000",
    desc: "Full-service creative solution for brands that demand the best.",
    features: [
      "Everything in Growth",
      "E-commerce or booking system",
      "Custom brand strategy session",
      "Content creation & copywriting",
      "Priority ongoing support",
      "Unlimited revisions",
    ],
  },
];

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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    const sections = document.querySelectorAll(".section");
    const video = document.querySelector(".hero-video");
    const overlay = document.querySelector(".overlay");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -4% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    let ticking = false;
    const updateHero = () => {
      ticking = false;
      if (!video || !overlay || prefersReducedMotion) return;
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.08;
      let progress = scrollY / heroHeight;
      progress = Math.max(0, Math.min(progress, 1));
      const eased = progress * progress * (3 - 2 * progress);
      const scale = 1 + eased * 0.04;
      const blur = eased * 24;
      const brightness = 1 - eased * 0.52;
      const darkness = 0.44 + eased * 0.36;

      video.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      video.style.filter = `blur(${blur}px) brightness(${brightness})`;
      overlay.style.setProperty("--overlay-darkness", String(darkness));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHero);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHero();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const frames = document.querySelectorAll(".work-iframe");
    frames.forEach((frame) => {
      let scroller = null;
      let pos = 0;
      let maxScroll = 0;

      const init = () => {
        const doc = frame.contentDocument;
        if (!doc) return;
        maxScroll = doc.documentElement.scrollHeight - frame.clientHeight;
      };

      frame.addEventListener("load", init);

      const startScroll = () => {
        if (scroller) return;
        scroller = setInterval(() => {
          pos += 0.6;
          if (pos >= maxScroll) {
            clearInterval(scroller);
            scroller = null;
            return;
          }
          frame.contentWindow.scrollTo(0, pos);
        }, 16);
      };

      const stopScroll = () => {
        clearInterval(scroller);
        scroller = null;
        pos = 0;
        frame.contentWindow.scrollTo(0, 0);
      };

      frame.parentElement.addEventListener("mouseenter", startScroll);
      frame.parentElement.addEventListener("mouseleave", stopScroll);
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || showProcess || showPricing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, showProcess, showPricing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      setSubmitted(true);
      form.reset();
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
      }, 2000);
    }
  };

  const handleNavClick = (item) => {
    setMenuOpen(false);
    if (item.action === "modal") {
      setTimeout(() => setShowModal(true), 320);
    } else if (item.action === "process") {
      setTimeout(() => setShowProcess(true), 320);
    } else if (item.action === "pricing") {
      setTimeout(() => setShowPricing(true), 320);
    } else if (item.target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(item.target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="watermark">WILSON CREATIVE CO.</div>

      <button
        className={`hamburger-btn ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span className="ham-line" />
        <span className="ham-line" />
        <span className="ham-line" />
      </button>

      <div
        className={`nav-overlay ${menuOpen ? "overlay-open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <nav className="nav-overlay-inner">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-bottom">
            <p className="nav-connect">LET&apos;S CONNECT</p>
            <div className="nav-socials">
              <a
                href="https://instagram.com/wilsoncreativeco.au"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-social-link"
              >
                <InstagramIcon /> Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61567993286002"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-social-link"
              >
                <FacebookIcon /> Facebook
              </a>
              <a
                href="mailto:wilsoncreativeco.au@gmail.com"
                className="nav-social-link"
              >
                <EmailIcon /> Email
              </a>
              <a href="tel:+61401609118" className="nav-social-link">
                <PhoneIcon /> Phone
              </a>
            </div>
            <button
              className="nav-cta"
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => setShowModal(true), 320);
              }}
            >
              Get a Free Demo
            </button>
          </div>
        </nav>
      </div>

      <div className={`hero ${loaded ? "loaded" : ""}`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/fallback.jpg"
          className="hero-video"
        >
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
            <button className="primary" onClick={() => setShowModal(true)}>
              Get a Free Demo
            </button>
            <button
              className="secondary"
              onClick={() => {
                const s = document.getElementById("work");
                if (s)
                  s.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              View Work
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">SCROLL</span>
          <span className="scroll-arrow">&darr;</span>
        </div>
      </div>

      <section id="services" className="section what-we-do">
        <h2>Featured Services</h2>
        <div className="services">
          {services.map((service) => (
            <article key={service.title} className="service-item">
              <h3>{service.title}</h3>
              {service.status ? (
                <span
                  className={`service-status ${service.status === "Coming soon" ? "soon" : ""}`}
                >
                  {service.status}
                </span>
              ) : null}
            </article>
          ))}
        </div>
        <p className="sub">
          Premium production and strategy in one team, built to make your brand
          look elevated and perform online.
        </p>
      </section>

      <section id="about" className="section">
        <h2>Why Creative Co.</h2>
        <p className="text">
          We&apos;re a Brisbane-based creative studio delivering
          high-performance content and fully custom-coded websites for brands
          that want to stand out. Every project is built from the ground up—no
          templates, no limitations—giving you complete control, faster
          performance, and a solution tailored exactly to your business. Whether
          you&apos;re local or operating globally, we work with clients anywhere
          to create digital experiences that not only look premium, but drive
          real results.
        </p>
      </section>

      <section id="work" className="section work">
        <h2>Sample Builds</h2>
        <p className="text">
          High-performance sample builds demonstrating what we can create for
          your brand.
        </p>
        <div className="work-grid">
          <div
            className="work-item"
            style={{ padding: 0, overflow: "hidden", position: "relative" }}
          >
            <iframe
              src="/meridian.html"
              title="Real Estate Mockup"
              scrolling="no"
              className="work-iframe"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "200%",
                height: "200%",
                border: "none",
                transform: "scale(0.5)",
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            />
          </div>
          <div
            className="work-item"
            style={{ padding: 0, overflow: "hidden", position: "relative" }}
          >
            <iframe
              src="/barber.html"
              title="Barber Mockup"
              scrolling="no"
              className="work-iframe"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "200%",
                height: "200%",
                border: "none",
                transform: "scale(0.5)",
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            />
          </div>
          <div
            className="work-item"
            style={{ padding: 0, overflow: "hidden", position: "relative" }}
          >
            <iframe
              src="/Plumbing.html"
              title="Plumbing Mockup"
              scrolling="no"
              className="work-iframe"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "200%",
                height: "200%",
                border: "none",
                transform: "scale(0.5)",
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            />
          </div>
          <div
            className="work-item"
            style={{ padding: 0, overflow: "hidden", position: "relative" }}
          >
            <iframe
              src="/Cafe.html"
              title="Cafe Mockup"
              scrolling="no"
              className="work-iframe"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "200%",
                height: "200%",
                border: "none",
                transform: "scale(0.5)",
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-name">WILSON CREATIVE CO.</p>
            <p className="footer-tagline">
              Websites and content that build attention and turn it into
              customers.
            </p>
          </div>
          <div className="footer-divider" />
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-label">Follow</p>
              <a
                href="https://instagram.com/wilsoncreativeco.au"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61567993286002"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Facebook
              </a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Contact</p>
              <a
                href="mailto:wilsoncreativeco.au@gmail.com"
                className="footer-link"
              >
                wilsoncreativeco.au@gmail.com
              </a>
              <a href="tel:+61401609118" className="footer-link">
                0401 609 118
              </a>
            </div>
          </div>
          <div className="footer-divider" />
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} Wilson Creative Co. All rights
            reserved.
          </p>
        </div>
      </footer>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            {submitted ? (
              <>
                <h2>Message Sent</h2>
                <p style={{ opacity: 0.7, marginTop: "10px" }}>
                  We&apos;ll get back to you shortly.
                </p>
              </>
            ) : (
              <>
                <h2>Start a Project</h2>
                <form
                  action="https://formspree.io/f/xojywkwo"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Tell us about your project"
                    required
                  />
                  <button type="submit" className="primary">
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {showProcess && (
        <div className="page-overlay">
          <div className="page-overlay-inner">
            <button
              className="page-overlay-close"
              onClick={() => setShowProcess(false)}
            >
              &larr; Back
            </button>
            <div className="page-overlay-content">
              <p className="page-overlay-kicker">How We Work</p>
              <h2 className="page-overlay-title">Our Process</h2>
              <p className="page-overlay-subtitle">
                Every project follows a proven framework designed to deliver
                results — on time and on brand.
              </p>
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
              <button
                className="primary page-overlay-cta"
                onClick={() => {
                  setShowProcess(false);
                  setTimeout(() => setShowModal(true), 320);
                }}
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      )}

      {showPricing && (
        <div className="page-overlay">
          <div className="page-overlay-inner">
            <button
              className="page-overlay-close"
              onClick={() => setShowPricing(false)}
            >
              &larr; Back
            </button>
            <div className="page-overlay-content">
              <p className="page-overlay-kicker">Investment</p>
              <h2 className="page-overlay-title">Pricing</h2>
              <p className="page-overlay-subtitle">
                Transparent pricing for every stage of growth. Every package is
                tailored to your needs.
              </p>
              <div className="pricing-grid">
                {pricingTiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`pricing-card ${tier.featured ? "pricing-featured" : ""}`}
                  >
                    <h3 className="pricing-name">{tier.name}</h3>
                    <p className="pricing-price">{tier.price}</p>
                    <p className="pricing-desc">{tier.desc}</p>
                    <ul className="pricing-features">
                      {tier.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <button
                      className={tier.featured ? "primary" : "secondary"}
                      onClick={() => {
                        setShowPricing(false);
                        setTimeout(() => setShowModal(true), 320);
                      }}
                    >
                      Contact Us
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

