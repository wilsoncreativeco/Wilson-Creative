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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      const darkness = 0.34 + eased * 0.36;

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

      maxScroll =
        doc.documentElement.scrollHeight - frame.clientHeight;
    };

    frame.addEventListener("load", init);

    const startScroll = () => {
      if (scroller) return; // prevent stacking

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

  return (
    <>
      <div className="watermark">WILSON CREATIVE CO.</div>
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
          <h1>Creative Media & Production</h1>
          <p className="sub">
            Cinematic content designed to elevate brands and capture attention.
          </p>
          <div className="buttons">
            <button className="primary" onClick={() => setShowModal(true)}>
              Contact Now
            </button>
            <button
              className="secondary"
              onClick={() => {
                const section = document.getElementById("work");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              View Work
            </button>
          </div>
        </div>
      </div>

      <section className="section what-we-do">
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
          Premium production and strategy in one team, built to make your brand
          look elevated and perform online.
        </p>
      </section>

      <section className="section statement">
        <h1>
          We don&apos;t just create content.
          <br />
          We create presence.
        </h1>
      </section>

      <section className="section">
        <h2>Why Creative Co.</h2>
        <p className="text">
          We&apos;re a Brisbane-based creative studio delivering high-performance
          content and fully custom-coded websites for brands that want to stand
          out. Every project is built from the ground up—no templates, no
          limitations—giving you complete control, faster performance, and a
          solution tailored exactly to your business. Whether you&apos;re local or
          operating globally, we work with clients anywhere to create digital
          experiences that not only look premium, but drive real results.
        </p>
      </section>

      <section id="work" className="section work">
        <h2>Sample Builds</h2>
        <p className="text">
        High-performance sample builds demonstrating what we can create for your brand.
        </p>
        <div className="work-grid">
          <div className="work-item" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <iframe
              src="/meridian.html"
              title="Your Agency — Real Estate Mockup"
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
          <div className="work-item" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
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
            <div className="work-item" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <iframe
              src="/Plumbing.html"
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
            <div className="work-item" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <iframe
              src="/Cafe.html"
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
        </div>
      </section>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={() => setShowModal(false)}>
              ×
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
                  <input type="text" name="name" placeholder="Name" required />
                  <input type="email" name="email" placeholder="Email" required />
                  <textarea
                    name="message"
                    placeholder="Tell us about your project"
                    required
                  ></textarea>
                  <button type="submit" className="primary">
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

      
      
