/** Shared site footer. Static — safe on every page. */
export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer role="contentinfo">
      <div className="ft">
        <div className="fb">
          <p className="fb-name">Wilson <span>Creative</span> Co.</p>
          <p className="fb-tag">One studio for film, photography, aerial &amp; web. We make brands impossible to ignore.</p>
          <p className="fb-loc"><span aria-hidden="true">◆</span> Brisbane, QLD · Available Australia-wide</p>
        </div>
        <div className="f-cols">
          <div className="fc">
            <p>What We Do</p>
            <a href="/for-businesses">Film &amp; Video</a>
            <a href="/for-businesses">Photography</a>
            <a href="/for-businesses">Aerial &amp; Drone</a>
            <a href="/web-design-brisbane">Web Design</a>
          </div>
          <div className="fc">
            <p>Explore</p>
            <a href="/for-businesses">For Businesses</a>
            <a href="/for-events">For Events</a>
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href="/blog">Blog</a>
            <a href="/privacy">Privacy</a>
          </div>
          <div className="fc">
            <p>Connect</p>
            <a href="mailto:wilsoncreativeco.au@gmail.com">wilsoncreativeco.au@gmail.com</a>
            <a href="tel:+61401609118">0401 609 118</a>
            <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      <div className="fb-bot">
        <p className="f-copy">© {year} Wilson Creative Co. All rights reserved. | Brisbane, QLD, Australia | ABN 99 664 433 447</p>
        <div className="f-soc">
          <a href="https://instagram.com/wilsoncreativeco.au" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61567993286002" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="mailto:wilsoncreativeco.au@gmail.com" aria-label="Email">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <polyline points="22,4 12,13 2,4" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
