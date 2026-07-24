import { useEffect, useRef } from 'react'

/**
 * Cal.com inline booking calendar.
 * Loads the official Cal embed script client-side only (safe under SSG —
 * nothing here runs during the server prerender).
 */
const NAMESPACE = 'discovery-call'
const CAL_LINK = 'wilsoncreative/discovery-call'
const BRAND = '#C5A44A'

// Injects the Cal.com embed loader once, then returns window.Cal.
function ensureCal() {
  if (typeof window === 'undefined') return null
  if (window.Cal) return window.Cal
  ;(function (C, A, L) {
    const p = function (a, ar) { a.q.push(ar) }
    const d = C.document
    C.Cal = C.Cal || function () {
      const cal = C.Cal
      const ar = arguments
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true }
      if (ar[0] === L) {
        const api = function () { p(api, arguments) }
        const namespace = ar[1]
        api.q = api.q || []
        if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]) }
        else p(cal, ar)
        return
      }
      p(cal, ar)
    }
  })(window, 'https://app.cal.com/embed/embed.js', 'init')
  return window.Cal
}

export default function CalEmbed() {
  const ref = useRef(null)

  useEffect(() => {
    const Cal = ensureCal()
    if (!Cal || !ref.current) return
    Cal('init', NAMESPACE, { origin: 'https://cal.com' })
    Cal.ns[NAMESPACE]('inline', {
      elementOrSelector: ref.current,
      config: { layout: 'month_view', theme: 'dark', overlayCalendar: 'true' },
      calLink: CAL_LINK,
    })
    Cal.ns[NAMESPACE]('ui', {
      theme: 'dark',
      cssVarsPerTheme: { light: { 'cal-brand': BRAND }, dark: { 'cal-brand': BRAND } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  }, [])

  return <div ref={ref} className="cal-embed" />
}
