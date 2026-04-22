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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.1;
      if (video && overlay) {
        let progress = scrollY / heroHeight;
        progress = Math.max(0, Math.min(progress, 1));
        const eased = progress * progress * (3 - 2 * progress);
        const scale = 1 + eased * 0.06;
        const blur = eased * 32;
        const brightness = 1 - eased * 0.72;
        const darkness = 0.33 + eased * 0.5;
        video.style.transform = `scale(${scale})`;
        video.style.filter = `blur(${blur}px) brightness(${brightness})`;
        overlay.style.background = `rgba(0,0,0,${darkness})`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      clearTimeout(timer);
    };
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
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
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
                <span
                  className={`service-status ${
                    service.status === "Coming soon" ? "soon" : ""
                  }`}
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
      <section className="section statement">
        <h1>
          We don’t just create content.
          <br />
          We create presence.
        </h1>
      </section>
      <section className="section">
        <h2>Why Creative Co.</h2>
        <p className="text">
          We combine cinematic production with strategy to create content that
          not only looks premium, but actually performs—whether that’s
          attracting clients, building brand presence, or capturing key moments.
        </p>
      </section>
      <section id="work" className="section work">
        <h2>Our Work</h2>
        <p className="text">
          A selection of cinematic projects crafted to elevate brands and
          capture attention.
        </p>
        <div className="work-grid">
          <div className="work-item">Coming Soon</div>
          <div className="work-item">Coming Soon</div>
          <div className="work-item">Coming Soon</div>
          <div className="work-item">Coming Soon</div>
        </div>
      )}
    </>
  );
}
