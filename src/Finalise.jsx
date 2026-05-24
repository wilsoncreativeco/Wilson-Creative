import { useState } from 'react'
import './finalise.css'

export default function Finalise() {
  const [sending, setSending] = useState(false)
  const [done,    setDone]    = useState(false)
  const [error,   setError]   = useState('')

  const [form, setForm] = useState({
    clientName:    '',
    clientEmail:   '',
    business:      '',
    siteUrl:       '',
    balanceAmount: '',
    pages:         '',
    features:      '',
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
              Balance payment link sent to <strong>{form.clientEmail}</strong>.<br />
              You'll get a notification the second they pay.
            </p>
            <button className="fn-btn" onClick={() => { setDone(false); setForm({ clientName:'', clientEmail:'', business:'', siteUrl:'', balanceAmount:'', pages:'', features:'', personalNote:'' }) }}>
              Send Another
            </button>
          </div>
        ) : (
          <form className="fn-form" onSubmit={handleSubmit}>
            <div className="fn-eyebrow">Project Finalisation</div>
            <h1 className="fn-h1">Wrap it <em>up.</em></h1>
            <p className="fn-lead">Fill this out to send the client their balance invoice and kick off the handover.</p>

            {/* Client details */}
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
              <div className="fn-row">
                <div className="fn-fld">
                  <label className="fn-label">Business Name *</label>
                  <input className="fn-input" value={form.business} onChange={set('business')} placeholder="Smith & Co. Café" />
                </div>
                <div className="fn-fld">
                  <label className="fn-label">Live Site URL</label>
                  <input className="fn-input" value={form.siteUrl} onChange={set('siteUrl')} placeholder="https://smithco.com.au" />
                </div>
              </div>
            </div>

            {/* Balance */}
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

            {/* What was delivered */}
            <div className="fn-section">
              <div className="fn-section-title">What Was Delivered</div>
              <div className="fn-fld">
                <label className="fn-label">Pages Built</label>
                <input className="fn-input" value={form.pages} onChange={set('pages')} placeholder="Home, About, Services, Contact, Menu" />
              </div>
              <div className="fn-fld" style={{ marginTop: '12px' }}>
                <label className="fn-label">Features Included</label>
                <input className="fn-input" value={form.features} onChange={set('features')} placeholder="Online booking, contact form, gallery, Google Maps" />
              </div>
            </div>

            {/* Personal note */}
            <div className="fn-section">
              <div className="fn-section-title">Personal Note <span className="fn-opt">(optional)</span></div>
              <textarea
                className="fn-input fn-ta"
                value={form.personalNote}
                onChange={set('personalNote')}
                placeholder="Add a personal message to the client email — replaces the default opener. e.g. 'This one came out really well — the gallery section especially. Stoked with how it turned out.'"
              />
            </div>

            {error && <p className="fn-error">{error}</p>}

            <div className="fn-footer">
              <div className="fn-preview">
                {form.clientName && form.balanceAmount && (
                  <span>Sending <strong>${parseFloat(form.balanceAmount || 0).toLocaleString('en-AU')}</strong> invoice to <strong>{form.clientName.split(' ')[0]}</strong></span>
                )}
              </div>
              <button className="fn-btn" type="submit" disabled={!valid || sending}>
                {sending ? 'Sending…' : 'Send Finalisation →'}
              </button>
            </div>

          </form>
        )}
      </main>
    </div>
  )
}
