import { useEffect } from 'react'

/**
 * Pauses decorative looping videos while they're off-screen, so only the tiles
 * actually in view decode frames. Saves battery + data on mobile.
 * Safe on SSR — everything runs inside useEffect.
 */
export default function useLazyVideo(selector = '.craft-media video') {
  useEffect(() => {
    const vids = [...document.querySelectorAll(selector)]
    if (!vids.length || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          const v = e.target
          if (e.isIntersecting) {
            const p = v.play()
            if (p && p.catch) p.catch(() => {})
          } else if (!v.paused) {
            v.pause()
          }
        })
      },
      { rootMargin: '200px 0px' }
    )

    vids.forEach(v => io.observe(v))
    return () => io.disconnect()
  }, [selector])
}
