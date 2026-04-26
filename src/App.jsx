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
  { label: "HOME",     action: "scroll", target: "top" },
  { label: "ABOUT",   action: "scroll", target: "about" },
  { label: "SERVICES",action: "scroll", target: "services" },
  { label: "WORK",    action: "scroll", target: "work" },
  { label: "PROCESS", action: "scroll", target: "work" },
  { label: "PRICING", action: "modal" },
  { label: "CONTACT", action: "modal" },
];

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    const sections = document.querySelectorAll(".section");
    const video = document.querySelector(".hero-video");
    const overlay = document.querySelector(".overlay");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
          if (pos >= maxScroll) { clearInterval(scroller); scroller = null; return; }
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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
      setTimeout(() => { setShowModal(false); setSubmitted(false); }, 2000);
    }
  };

  const handleNavClick = (item) => {
    setMenuOpen(false);
    if (item.action === "modal") {
      setTimeout(() => setShowModal(true), 320);
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

      {/* Hamburger button */}
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

      {/* Full-screen overlay nav */}
      <div className={`nav-overlay ${menuOpen ? "overlay-open" : ""}`} role="dialog" aria-modal="true">
        <nav className="nav-overlay-inner">
          <ul className="nav-list">
            {navItems.map((item, i) => (
              <li key={item.label} className="nav-item">
                <button className="nav-link" onClick={() => handleNavClick(item)}>
                  {item.label}
                </button>
                <span className="nav-num">0{i + 1}</span>
              </li>
            ))}
          </ul>

          <div className="nav-bottom">
            <p className="nav-connect">LET&apos;S CONNECT</p>
            <div className="nav-socials">
              {/* ↓ Replace YOURUSERNAME with your actual handles */}
              <a href="https://instagram.com/YOURUSERNAME" target="_blank" rel="noopener noreferrer" className="nav-social-link">Instagram</a>
              <a href="https://tiktok.com/@YOURUSERNAME" target="_blank" rel="noopener noreferrer" className="nav-social-link">TikTok</a>
              {/* ↓ Replace with your real email and phone */}
              <a href="mailto:hello@wilsoncreativeco.com" className="nav-social-link">Email</a>
              <a href="tel:+61400000000" className="nav-social-link">Phone</a>
            </div>
            <button
              className="nav-cta"
              onClick={() => { setMenuOpen(false); setTimeout(() => setShowModal(true), 320); }}
            >
              Get a Free Demo
            </button>
          </div>
        </nav>
      </div>

      {/* Hero */}
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
            <button className="primary" onClick={() => setShowModal(true)}>
              Get a Free Demo
            </button>
            <button
              className="secondary"
              onClick={() => {
                const s = document.getElementById("work");
                if (s) s.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              View Work
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <section id="services" className="section what-we-do">
        <h2>Featured Services</h2>
        <div className="services">
          {services.map((service) => (
            <article key={service.title} className="service-item">
              <h3>{service.title}</h3>
              {service.status ? (
                <span className={`service-status ${service.status === "Coming soon" ? "soon" : ""}`}>
                  {service.status}
                </span>
              ) : null}
            </article>
          ))}
        </div>
        <p className="sub">
          Premium production and strategy in one team, built to make your brand look elevated and perform online.
        </p>
      </section>

      {/* About */}
      <section id="about" className="section">
        <h2>Why Creative Co.</h2>
        <p className="text">
          We&apos;re a Brisbane-based creative studio delivering high-performance content and fully
          custom-coded websites for brands that want to stand out. Every project is built from the
          ground up—no templates, no limitations—giving you complete control, faster performance,
          and a solution tailored exactly to your business. Whether you&apos;re local or operating
          globally, we work with clients anywhere to create digital experiences that not only look
          premium, but drive real results.
        </p>
      </section>

      {/* Work */}
      <section id="work" className="section work">
        <h2>Sample Builds</h2>
        <p className="text">High-performance sample builds demonstrating what we can create for your brand.</p>
        <div className="work-grid">
          <div className="work-item" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <iframe src="/meridian.html" title="Real Estate Mockup" scrolling="no" className="work-iframe"
              style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "200%", border: "none", transform: "scale(0.5)", transformOrigin: "top left", pointerEvents: "none" }} />
          </div>
          <div className="work-item" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <iframe src="/barber.html" title="Barber Mockup" scrolling="no" className="work-iframe"
              style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "200%", border: "none", transform: "scale(0.5)", transformOrigin: "top left", pointerEvents: "none" }} />
          </div>
          <div className="work-item" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <iframe src="/Plumbing.html" title="Plumbing Mockup" scrolling="no" className="work-iframe"
              style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "200%", border: "none", transform: "scale(0.5)", transformOrigin: "top left", pointerEvents: "none" }} />
          </div>
          <div className="work-item" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <iframe src="/Cafe.html" title="Cafe Mockup" scrolling="no" className="work-iframe"
              style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "200%", border: "none", transform: "scale(0.5)", transformOrigin: "top left", pointerEvents: "none" }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-name">WILSON CREATIVE CO.</p>
            <p className="footer-tagline">
              Websites and content that build attention and turn it into customers.
            </p>
          </div>
          <div className="footer-divider" />
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-label">Follow</p>
              {/* ↓ Replace with your real URLs */}
              <a href="https://instagram.com/YOURUSERNAME" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
              <a href="https://tiktok.com/@YOURUSERNAME" target="_blank" rel="noopener noreferrer" className="footer-link">TikTok</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-label">Contact</p>
              {/* ↓ Replace with your real email and phone */}
              <a href="mailto:hello@wilsoncreativeco.com" className="footer-link">hello@wilsoncreativeco.com</a>
              <a href="tel:+61400000000" className="footer-link">+61 400 000 000</a>
            </div>
          </div>
          <div className="footer-divider" />
          <p className="footer-copy">© {new Date().getFullYear()} Wilson Creative Co. All rights reserved.</p>
        </div>
      </footer>

      {/* Contact modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setShowModal(false)}>×</button>
            {submitted ? (
              <>
                <h2>Message Sent</h2>
                <p style={{ opacity: 0.7, marginTop: "10px" }}>We&apos;ll get back to you shortly.</p>
              </>
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
    </>
  );
}
