import "./App.css";
import { useState, useEffect, useRef } from "react";

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
  const workGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    const sections = document.querySelectorAll(".section");
    const video = document.querySelector(".hero-video") as HTMLVideoElement;
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
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

  // Fixed Iframe Auto-Scroll logic
  useEffect(() => {
    const frames = document.querySelectorAll(".work-iframe") as NodeListOf<HTMLIFrameElement>;

    frames.forEach((frame) => {
      let scroller: any = null;
      let pos = 0;

      const startScroll = () => {
        scroller = setInterval(() => {
          if (frame.contentWindow) {
            pos += 1.5;
            frame.contentWindow.scrollTo(0, pos);
          }
        }, 16);
      };

      const stopScroll = () => {
        clearInterval(scroller);
        pos = 0;
        if (frame.contentWindow) {
          frame.contentWindow.scrollTo(0, 0);
        }
      };

      const parent = frame.parentElement;
      if (parent) {
        parent.addEventListener("mouseenter", startScroll);
        parent.addEventListener("mouseleave", stopScroll);
      }
    });
  }, [loaded]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
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

  const iframeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "200%",
    border: "none",
    transform: "scale(0.5)",
    transformOrigin: "top left",
    pointerEvents: "none",
  };

  return (
    <>
      <div className="watermark font-bold tracking-[1em] fixed top-10 left-10 opacity-10 z-0 pointer-events-none text-xs">WILSON CREATIVE CO.</div>
      
      <div className={`hero relative h-screen overflow-hidden ${loaded ? "loaded" : ""}`}>
        <video autoPlay muted loop playsInline preload="auto" className="hero-video absolute inset-0 w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="overlay absolute inset-0 bg-black/40" />

        <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
          <p className="hero-kicker uppercase tracking-widest text-sm mb-4 opacity-80">Wilson Creative Co.</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 italic">Creative Media & Production</h1>
          <p className="sub text-lg opacity-70 max-w-2xl mx-auto">
            Cinematic content designed to elevate brands and capture attention.
          </p>
          <div className="buttons mt-10 flex gap-4">
            <button className="primary bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform" onClick={() => setShowModal(true)}>
              Contact Now
            </button>
            <button
              className="secondary border border-white/30 px-8 py-4 rounded-full font-bold backdrop-blur-md hover:bg-white/10"
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Work
            </button>
          </div>
        </div>
      </div>

      <section className="section py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif italic mb-16">Featured Services</h2>
        <div className="services grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article key={service.title} className="service-item p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              {service.status && (
                <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full ${service.status === "Coming soon" ? "bg-slate-200 text-slate-500" : ""}`}>
                  {service.status}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="section py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif italic mb-4">Our Work</h2>
          <p className="text-white/50 mb-16">A selection of cinematic projects crafted to elevate brands.</p>
          
          <div className="work-grid grid md:grid-cols-2 gap-8">
            {["meridian", "barber", "cafe", "plumbing"].map((site) => (
              <div key={site} className="work-item aspect-video rounded-3xl overflow-hidden relative group cursor-pointer bg-white/5">
                <iframe
                  src={`/${site}.html`}
                  title={`${site} Mockup`}
                  scrolling="no"
                  className="work-iframe"
                  style={iframeStyle}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-10 w-full max-w-lg relative">
            <button className="absolute top-6 right-6 text-2xl" onClick={() => setShowModal(false)}>×</button>
            {submitted ? (
              <div className="text-center py-10">
                <h2 className="text-3xl font-serif italic">Message Sent</h2>
                <p className="opacity-60 mt-4">We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-serif italic mb-8">Start a Project</h2>
                <form action="https://formspree.io/f/xojywkwo" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-1 ring-black/10" type="text" name="name" placeholder="Name" required />
                  <input className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-1 ring-black/10" type="email" name="email" placeholder="Email" required />
                  <textarea className="p-4 bg-slate-50 rounded-xl outline-none focus:ring-1 ring-black/10 h-32" name="message" placeholder="Tell us about your project" required />
                  <button type="submit" className="bg-black text-white py-4 rounded-xl font-bold mt-4 hover:bg-slate-800">Send</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
      
