import { useEffect, useState } from 'react'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'For Businesses', href: '/for-businesses' },
  { label: 'For Events', href: '/for-events' },
  { label: 'About', href: '/about' },
]

/**
 * Shared site navigation (desktop + mobile).
 * Self-contained: owns its own scroll-shadow + mobile-menu state.
 * @param {() => void} onBook  fired by the "Book a Call" CTA
 */
export default function SiteNav({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const book = () => { setMenuOpen(false); onBook && onBook() }

  return (
    <>
      <nav id="nav" className={scrolled ? 'sc' : ''} aria-label="Main navigation">
        <a href="/" className="n-logo" aria-label="Wilson Creative Co. Home">
          <img src="/wlogo.png" alt="Wilson Creative Co." className="n-logo-img" width="1536" height="1024" />
          <span className="n-logo-text">Wilson <span>Creative</span> Co.</span>
        </a>
        <ul className="n-links">
          {NAV.map(item => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <button type="button" className="n-cta" onClick={book}>
          Book a Call
        </button>
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
        {NAV.map(item => (
          <a key={item.label} className="mn-link" href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <div className="mn-bottom">
          <div className="mn-contact">
            <a className="mn-c" href="tel:+61401609118">
              <span className="mn-c-ico" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="mn-c-txt">
                <span className="mn-c-k">Call</span>
                <span className="mn-c-v">0401 609 118</span>
              </span>
            </a>
            <a className="mn-c" href="mailto:wilsoncreativeco.au@gmail.com">
              <span className="mn-c-ico" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <polyline points="22,4 12,13 2,4" />
                </svg>
              </span>
              <span className="mn-c-txt">
                <span className="mn-c-k">Email</span>
                <span className="mn-c-v">wilsoncreativeco.au@gmail.com</span>
              </span>
            </a>
          </div>
          <div className="mn-soc">
            <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>
          <button type="button" className="mn-cta" onClick={book}>
            Book a Call →
          </button>
        </div>
      </nav>
    </>
  )
}
