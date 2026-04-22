import "./App.css";
import { useState, useEffect } from "react";

const services = [
  { title: "Web Design & Development", status: "Now booking" },
  { title: "Aerial Cinematography", status: "Now booking" },
  { title: "Video Production", status: "Now booking" },
  { title: "Photography", status: "Now booking" },
  { title: "Social Media Content", status: "Now booking" },
  { title: "Commercial & Brand Media", status: "Now booking" },
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
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
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
      headers: {
        Accept: "application/json",
      },
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
      {/* HERO */}
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
          <h1>Creative Media & Production</h1>

          <p className="sub">
            Cinematic content designed to elevate brands and capture attention.
          </p>

          <div className="buttons">
            <button
              className="primary"
              onClick={() => setShowModal(true)}
            >
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

      {/* SECTION 1 */}
      <section className="section what-we-do">
        <h2>Featured Services</h2>

        <div className="services">
          {services.map((service) => (
            <article key={service.title} className="service-item">
              <h3>{service.title}</h3>
              <span className={`service-status ${service.status === "Coming soon" ? "soon" : ""}`}>
                {service.status}
              </span>
            </article>
          ))}
        </div>

        <p className="sub">
          Premium production and strategy in one team, built to make your brand
          look elevated and perform online.
        </p>
      </section>

      {/* SECTION 2 */}
      <section className="section statement">
        <h1>
          We don’t just create content.<br />
          We create presence.
        </h1>
      </section>

      {/* SECTION 3 */}
      <section className="section">
        <h2>Why Creative Co.</h2>

        <p className="text">
          We combine cinematic production with strategy to create content that not only looks premium,
          but actually performs—whether that’s attracting clients, building brand presence, or capturing key moments.
        </p>
      </section>
{/* WORK SECTION */}
<section id="work" className="section work">
  <h2>Our Work</h2>

  <p className="text">
    A selection of cinematic projects crafted to elevate brands and capture attention.
  </p>

  <div className="work-grid">
    <div className="work-item">Coming Soon</div>
    <div className="work-item">Coming Soon</div>
    <div className="work-item">Coming Soon</div>
    <div className="work-item">Coming Soon</div>
  </div>
</section>
      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            {submitted ? (
              <>
                <h2>Message Sent</h2>
                <p style={{ opacity: 0.7, marginTop: "10px" }}>
                  We’ll get back to you shortly.
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





