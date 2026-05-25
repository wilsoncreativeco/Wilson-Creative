import { useState } from 'react'
import './finalise.css'

export default function Finalise() {
  const [sending, setSending] = useState(false)
  const [done,    setDone]    = useState(false)
  const [error,   setError]   = useState('')

  const [form, setForm] = useState({
    // Client
    clientName:    '',
    clientEmail:   '',
    business:      '',
    // Site
    siteUrl:       '',
    adminUrl:      '',
    adminPassword: '',
    // Payment
    balanceAmount: '',
    // What was delivered
    pages:         '',
    features:      '',
    // Credentials
    domainRegistrar:  '',
    domainLogin:      '',
    hostingProvider:  'Vercel',
    hostingNotes:     '',
    analyticsId:      '',
    otherLogins:      '',
    // Personal note
    personalNote:  '',
  })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const valid = form.clientName.trim() && form.clientEmail.trim() &&
                form.business.trim() && form.balanceAmount &&
                parseFloat(form.balanceAmount) > 0

  async function handleSubmit(e) {
    e.preventDefault()
    if (!valid) return
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/finalise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setDone(true)
    } catch {
      setError('Something went wrong — check the console or try again.')
    } finally {
      setSending(false)
    }
  }

  const resetForm = () => {
    setDone(false)
    setForm({
      clientName: '', clientEmail: '', business: '', siteUrl: '',
      adminUrl: '', adminPassword: '', balanceAmount: '', pages: '',
      features: '', domainRegistrar: '', domainLogin: '', hostingProvider: 'Vercel',
      hostingNotes: '', analyticsId: '', otherLogins: '', personalNote: '',
    })
  }

  return (
    <div className="fn-root">
      <header className="fn-nav">
        <a href="/" className="fn-logo">Wilson <em>Creative</em> Co.</a>
        <span className="fn-tag">Internal</span>
      </header>

      <main className="fn-main">
        {done ? (
          <div className="fn-done">
            <div className="fn-done-icon">✦</div>
            <h1 className="fn-h1">Sent.</h1>
            <p className="fn-lead">
              Balance invoice + full handover sent to <strong>{form.clientEmail}</strong>.<br />
              You'll be notified the moment they pay.
            </p>
            <button className="fn-btn" onClick={resetForm}>Send Another</button>
          </div>
        ) : (
          <form className="fn-form" onSubmit={handleSubmit}>
            <div className="fn-eyebrow">Client Handover</div>
            <h1 className="fn-h1">Wrap it <em>up.</em></h1>
            <p className="fn-lead">Fill this out to send the client their balance invoice and complete handover package — logins, credentials, everything in one clean email.</p>

            {/* ── Client ── */}
            <div className="fn-section">
              <div className="fn-section-title">Client</div>
              <div className="fn-row">
                <div className="fn-fld">
                  <label className="fn-label">Full Name *</label>
                  <input className="fn-input" value={form.clientName} onChange={set('clientName')} placeholder="Jane Smith" />
                </div>
                <div className="fn-fld">
                  <label className="fn-label">Email Address *</label>
                  <input className="fn-input" type="email" value={form.clientEmail} onChange={set('clientEmail')} placeholder="jane@smithco.com.au" />
                </div>
              </div>
              <div className="fn-fld">
                <label className="fn-label">Business Name *</label>
                <input className="fn-input" value={form.business} onChange={set('business')} placeholder="Smith & Co. Café" />
              </div>
            </div>

            {/* ── Payment ── */}
            <div className="fn-section">
              <div className="fn-section-title">Payment</div>
              <div className="fn-fld" style={{ maxWidth: '220px' }}>
                <label className="fn-label">Balance Amount (AUD) *</label>
                <div className="fn-amount-wrap">
                  <span className="fn-currency">$</span>
                  <input
                    className="fn-input fn-amount"
                    type="number"
                    min="1"
                    step="0.01"
                    value={form.balanceAmount}
                    onChange={set('balanceAmount')}
                    placeholder="880"
                  />
                </div>
              </div>
            </div>

            {/* ── Site access ── */}
            <div className="fn-section">
              <div className="fn-section-title">Site Access</div>
              <div className="fn-row">
                <div className="fn-fld">
                  <label className="fn-label">Live Site URL</label>
                  <input className="fn-input" value={form.siteUrl} onChange={set('siteUrl')} placeholder="https://smithco.com.au" />
                </div>
                <div className="fn-fld">
                  <label className="fn-label">Admin / Editor URL</label>
                  <input className="fn-input" value={form.adminUrl} onChange={set('adminUrl')} placeholder="https://smithco.com.au/admin" />
                </div>
              </div>
              <div className="fn-fld" style={{ maxWidth: '50%' }}>
                <label className="fn-label">Admin Password</label>
                <input className="fn-input" value={form.adminPassword} onChange={set('adminPassword')} placeholder="their editor password" />
              </div>
            </div>

            {/* ── What was delivered ── */}
            <div className="fn-section">
              <div className="fn-section-title">What Was Delivered</div>
              <div className="fn-fld">
                <label className="fn-label">Pages Built</label>
                <input className="fn-input" value={form.pages} onChange={set('pages')} placeholder="Home, About, Services, Contact, Menu" />
              </div>
              <div className="fn-fld" style={{ marginTop: '12px' }}>
                <label className="fn-label">Features Included</label>
                <input className="fn-input" value={form.features} onChange={set('features')} placeholder="Online booking, contact form, gallery, Google Maps embed" />
              </div>
            </div>

            {/* ── Domain & Hosting ── */}
            <div className="fn-section">
              <div className="fn-section-title">Domain & Hosting</div>
              <div className="fn-row">
                <div className="fn-fld">
                  <label className="fn-label">Domain Registrar</label>
                  <input className="fn-input" value={form.domainRegistrar} onChange={set('domainRegistrar')} placeholder="Crazy Domains, GoDaddy, Cloudflare…" />
                </div>
                <div className="fn-fld">
                  <label className="fn-label">Domain Login Email</label>
                  <input className="fn-input" value={form.domainLogin} onChange={set('domainLogin')} placeholder="jane@gmail.com (login used)" />
                </div>
              </div>
              <div className="fn-row">
                <div className="fn-fld">
                  <label className="fn-label">Hosting Provider</label>
                  <input className="fn-input" value={form.hostingProvider} onChange={set('hostingProvider')} placeholder="Vercel" />
                </div>
                <div className="fn-fld">
                  <label className="fn-label">Hosting Notes</label>
                  <input className="fn-input" value={form.hostingNotes} onChange={set('hostingNotes')} placeholder="Free tier, renews annually, managed by WCC" />
                </div>
              </div>
            </div>

            {/* ── Other credentials ── */}
            <div className="fn-section">
              <div className="fn-section-title">Other Credentials <span className="fn-opt">(optional)</span></div>
              <div className="fn-fld">
                <label className="fn-label">Google Analytics ID</label>
                <input className="fn-input" value={form.analyticsId} onChange={set('analyticsId')} placeholder="G-XXXXXXXXXX (or 'Not set up')" />
              </div>
              <div className="fn-fld" style={{ marginTop: '12px' }}>
                <label className="fn-label">Other Logins / Notes</label>
                <textarea
                  className="fn-input fn-ta"
                  value={form.otherLogins}
                  onChange={set('otherLogins')}
                  placeholder="e.g. Formspree: jane@gmail.com · Instagram connected: @smithcocafe · Stripe account: separate invoice"
                />
              </div>
            </div>

            {/* ── Personal note ── */}
            <div className="fn-section">
              <div className="fn-section-title">Personal Note <span className="fn-opt">(optional)</span></div>
              <textarea
                className="fn-input fn-ta"
                value={form.personalNote}
                onChange={set('personalNote')}
                placeholder="Add a personal message to the client email — replaces the default opener. e.g. 'Really happy with how this one came out. The gallery section especially. Proud of this one.'"
              />
            </div>

            {error && <p className="fn-error">{error}</p>}

            <div className="fn-footer">
              <div className="fn-preview">
                {form.clientName && form.balanceAmount && (
                  <span>
                    Sending <strong>${parseFloat(form.balanceAmount || 0).toLocaleString('en-AU')}</strong> invoice + handover to <strong>{form.clientName.split(' ')[0]}</strong>
                  </span>
                )}
              </div>
              <button className="fn-btn" type="submit" disabled={!valid || sending}>
                {sending ? 'Sending…' : 'Send Handover →'}
              </button>
            </div>

          </form>
        )}
      </main>
    </div>
  )
}
