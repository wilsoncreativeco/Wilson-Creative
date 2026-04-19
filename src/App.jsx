import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

useEffect(() => {
  // ✅ LOAD FIX (prevents watermark flash)
  const timer = setTimeout(() => setLoaded(true), 300);

  const sections = document.querySelectorAll(".section");
  const video = document.querySelector(".hero-video");

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
    const heroHeight = window.innerHeight;
    const subText = document.querySelector(".what-we-do .sub");
    const overlay = document.querySelector(".overlay");
    const logo = document.querySelector(".logo-watermark");

    if (video) {
      const start = heroHeight * 0.2;
      const end = heroHeight;

      let progress = (scrollY - start) / (end - start);
      progress = Math.max(0, Math.min(progress, 1));

      const scale = 1 + progress * 0.05;
      video.style.transform = `scale(${scale})`;
    }

    if (video && subText && overlay) {
      const rect = subText.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.4;

      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(progress, 1));

      const blur = progress * 30;
      const brightness = 1 - progress * 0.85;
      const darkness = 0.3 + progress * 0.45;

      video.style.filter = `blur(${blur}px) brightness(${brightness})`;
      overlay.style.background = `rgba(0,0,0,${darkness})`;

if (logo) {
  const base = 0.1; // always slightly visible
  
}
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    clearTimeout(timer); // ✅ important cleanup
  };
}, []);

  // ✅ FORM HANDLER
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
        <img src="/logo.png" className="logo-watermark" />

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
        <h2>What We Do</h2>

        <div className="services">
          <p>Web Design & Development</p>
          <p>             _           </p>
          <p>* COMING SOON  *</p>
          <p>Aerial Cinematography</p>
          <p>Video Production</p>
          <p>Photography</p>
          <p>Social Media Content</p>
          <p>Commercial & Brand Media</p>
        </div>

        <p className="sub">
          Everything you need to make your brand look premium and perform online.
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
