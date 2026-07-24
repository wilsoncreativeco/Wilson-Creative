import { useEffect, useState } from 'react'

/**
 * Shared "Contact Us" modal — quick enquiry straight to the inbox via /api/contact (Resend).
 * Controlled: render always, pass `open` + `onClose`.
 * Any page can open it by dispatching: window.dispatchEvent(new CustomEvent('wc:contact'))
 */
export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

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

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: 'Contact',
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Contact us">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <p className="modal-tag">Contact</p>
        <h3 className="modal-title">Tell us what<br /><em>you&rsquo;re making</em></h3>
        <p className="modal-sub">Send a note and we&rsquo;ll come back within a few hours.</p>
        {status === 'sent' ? (
          <p className="modal-success">✓ Sent — we&rsquo;ll be in touch shortly.</p>
        ) : (
          <form className="modal-form" onSubmit={submit} noValidate>
            <div className="modal-row">
              <input className="modal-input" type="text" placeholder="Your Name *" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input className="modal-input" type="email" placeholder="Email Address *" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <input className="modal-input" type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            <textarea className="modal-input modal-textarea" placeholder="What are we making together?" rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            <button className="btn-g modal-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message →'}
            </button>
            {status === 'error' && <p className="modal-err">Something went wrong — email us at wilsoncreativeco.au@gmail.com</p>}
          </form>
        )}
      </div>
    </div>
  )
}
