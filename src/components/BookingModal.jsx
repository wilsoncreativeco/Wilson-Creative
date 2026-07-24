import { useEffect } from 'react'
import CalEmbed from './CalEmbed'

/**
 * Shared "Book a Call" modal — opens the Cal.com discovery-call calendar.
 * Controlled: render always, pass `open` + `onClose`.
 */
export default function BookingModal({ open, onClose }) {
  // Lock scroll while open; close on Escape.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Book a call">
      <div className="modal-box modal-cal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <p className="modal-tag">Book a Call</p>
        <h3 className="modal-title">Pick a time that<br /><em>suits you</em></h3>
        <div className="modal-cal-wrap">
          <CalEmbed />
        </div>
      </div>
    </div>
  )
}
