import { useEffect } from 'react'

/**
 * Scroll-reveal for pages outside App.jsx.
 * Adds `.vi` to any `.rv`/`.rl`/`.rr` element as it enters the viewport,
 * mirroring the homepage's observer so shared CSS animations work.
 */
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv,.rl,.rr')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('vi'))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('vi')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}
