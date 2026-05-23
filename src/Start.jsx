import { useState, useEffect, useRef } from 'react'
import './start.css'

// ── PACKAGES ──────────────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$600',
    tag: 'Single page',
    points: ['1 page', '1 revision round', 'SEO foundations', 'Mobile responsive', 'Contact form'],
    deposit: 120,
    balance: 480,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$1,000',
    tag: 'Multi page',
    points: ['Up to 5 pages', '3 revision rounds', 'SEO foundations', 'CMS integration', 'Contact form'],
    deposit: 200,
    balance: 800,
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'From $2,000',
    tag: 'Full custom',
    points: ['Unlimited pages', 'Unlimited revisions', 'Full CMS', 'E-commerce / booking', 'Priority support'],
    deposit: '20% of agreed total',
    balance: '80% before launch',
  },
]

const INDUSTRIES = [
  'Hospitality / Café / Restaurant',
  'Automotive',
  'Construction / Trades',
  'Health / Fitness / Wellness',
  'Real Estate / Property',
  'E-commerce / Retail',
  'Professional Services',
  'Beauty / Grooming',
  'Photography / Creative',
  'Other',
]

const TIMELINES = [
  { id: 'asap',     label: 'ASAP',           sub: 'As soon as possible' },
  { id: '1month',   label: '~ 1 Month',      sub: 'Within 30 days' },
  { id: '2months',  label: '1–2 Months',     sub: 'No immediate rush' },
  { id: 'flexible', label: 'Flexible',        sub: 'No set deadline' },
]

const CHECKS = [
  'I understand the 20% deposit is non-refundable and is forfeited if I cancel after work commences.',
  'I understand the remaining balance is due before the site goes live — the site will not launch until paid in full.',
  'I understand the revision rounds included in my package, and that requests outside the agreed scope may be quoted separately.',
  'I confirm all content I provide (text, images, logos) is owned by me or properly licensed.',
  'I understand Wilson Creative Co. may display the completed work in its portfolio and marketing materials.',
  'I have read and agree to be bound by Wilson Creative Co.\'s full client agreement terms.',
]

const STEPS = ['You', 'Project', 'Agreement', 'Done']

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function Start() {
  const [step, setStep]       = useState(0)
  const [dir, setDir]         = useState(1)   // 1 = forward, -1 = back
  const [anim, setAnim]       = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError]     = useState('')

  const [you, setYou] = useState({
    name: '', business: '', email: '', phone: '', abn: '',
  })

  const [project, setProject] = useState({
    package: '', industry: '', description: '', timeline: '',
  })

  const [agreement, setAgreement] = useState({
    checks: Array(CHECKS.length).fill(false),
    signature: '',
  })

  const pkg = PACKAGES.find(p => p.id === project.package)

  // ── NAVIGATION ──────────────────────────────────────────────────────────────
  function go(next) {
    if (next === step) return
    setDir(next > step ? 1 : -1)
    setAnim(true)
    setTimeout(() => {
      setStep(next)
      setAnim(false)
    }, 280)
  }

  function next() { if (step < 3) go(step + 1) }
  function back() { if (step > 0) go(step - 1) }

  // ── VALIDATION ───────────────────────────────────────────────────────────────
  function step0Valid() {
    return you.name.trim() && you.business.trim() &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(you.email) &&
           you.phone.trim().length >= 8
  }

  function step1Valid() {
    return project.package && project.industry && project.description.trim().length > 10 && project.timeline
  }

  function step2Valid() {
    return agreement.checks.every(Boolean) && agreement.signature.trim().length >= 2
  }

  // ── SUBMIT ───────────────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    if (!step2Valid()) return
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ you, project, signature: agreement.signature, date: new Date().toLocaleDateString('en-AU') }),
      })
      if (!res.ok) throw new Error('Failed')
      go(3)
    } catch {
      setError('Something went wrong — please email us at wilsoncreativeco.au@gmail.com')
    } finally {
      setSending(false)
    }
  }

  // ── FIELD HELPERS ────────────────────────────────────────────────────────────
  const uf = (k) => (e) => setYou(f => ({ ...f, [k]: e.target.value }))
  const pf = (k) => (e) => setProject(f => ({ ...f, [k]: e.target.value }))

  // ── RENDER ───────────────────────────────────────────────────────────────────
  const animClass = anim ? (dir > 0 ? 'slide-out-left' : 'slide-out-right') : ''

  return (
    <div className="sp-root">

      {/* BG grain */}
      <div className="sp-grain" aria-hidden="true" />

      {/* NAV */}
      <header className="sp-nav">
        <a href="/" className="sp-logo">
          <span className="sp-logo-text">Wilson <em>Creative</em> Co.</span>
        </a>
        {step < 3 && (
          <div className="sp-steps">
            {STEPS.slice(0, 3).map((s, i) => (
              <div
                key={s}
                className={`sp-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                onClick={() => i < step && go(i)}
              >
                <div className="sp-step-dot">
                  {i < step ? '✓' : <span>{i + 1}</span>}
                </div>
                <span className="sp-step-label">{s}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* PROGRESS BAR */}
      {step < 3 && (
        <div className="sp-progress">
          <div className="sp-progress-fill" style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
      )}

      {/* CONTENT */}
      <main className="sp-main">
        <div className={`sp-card ${animClass}`}>

          {/* ── STEP 0: YOU ── */}
          {step === 0 && (
            <div className="sp-step-content">
              <div className="sp-eyebrow">Step 01 of 03</div>
              <h1 className="sp-h1">Tell us about <em>you.</em></h1>
              <p className="sp-lead">We'll use this to set up your agreement and keep things moving.</p>

              <div className="sp-fields">
                <div className="sp-row">
                  <div className="sp-fld">
                    <label className="sp-label">Full Name *</label>
                    <input className="sp-input" value={you.name} onChange={uf('name')} placeholder="Jane Smith" autoComplete="name" />
                  </div>
                  <div className="sp-fld">
                    <label className="sp-label">Business Name *</label>
                    <input className="sp-input" value={you.business} onChange={uf('business')} placeholder="Smith & Co." autoComplete="organization" />
                  </div>
                </div>
                <div className="sp-row">
                  <div className="sp-fld">
                    <label className="sp-label">Email Address *</label>
                    <input className="sp-input" type="email" value={you.email} onChange={uf('email')} placeholder="jane@smithco.com.au" autoComplete="email" />
                  </div>
                  <div className="sp-fld">
                    <label className="sp-label">Phone Number *</label>
                    <input className="sp-input" type="tel" value={you.phone} onChange={uf('phone')} placeholder="04xx xxx xxx" autoComplete="tel" />
                  </div>
                </div>
                <div className="sp-fld" style={{ maxWidth: '50%' }}>
                  <label className="sp-label">ABN <span className="sp-opt">(optional)</span></label>
                  <input className="sp-input" value={you.abn} onChange={uf('abn')} placeholder="12 345 678 901" />
                </div>
              </div>

              <div className="sp-footer">
                <div />
                <button className="sp-btn-next" onClick={next} disabled={!step0Valid()}>
                  Continue <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 1: PROJECT ── */}
          {step === 1 && (
            <div className="sp-step-content">
              <div className="sp-eyebrow">Step 02 of 03</div>
              <h1 className="sp-h1">Your <em>project.</em></h1>
              <p className="sp-lead">Select your package and tell us what you're building.</p>

              {/* Package cards */}
              <div className="sp-pkg-grid">
                {PACKAGES.map(p => (
                  <div
                    key={p.id}
                    className={`sp-pkg ${project.package === p.id ? 'selected' : ''} ${p.featured ? 'featured' : ''}`}
                    onClick={() => setProject(f => ({ ...f, package: p.id }))}
                  >
                    {p.featured && <div className="sp-pkg-badge">Most Popular</div>}
                    <div className="sp-pkg-tag">{p.tag}</div>
                    <div className="sp-pkg-name">{p.name}</div>
                    <div className="sp-pkg-price">{p.price}</div>
                    <ul className="sp-pkg-list">
                      {p.points.map(pt => <li key={pt}>{pt}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="sp-fields" style={{ marginTop: '28px' }}>
                <div className="sp-row">
                  <div className="sp-fld">
                    <label className="sp-label">Industry *</label>
                    <select className="sp-input sp-select" value={project.industry} onChange={pf('industry')}>
                      <option value="">Select your industry…</option>
                      {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="sp-fld">
                    <label className="sp-label">Timeline *</label>
                    <div className="sp-timeline-grid">
                      {TIMELINES.map(t => (
                        <div
                          key={t.id}
                          className={`sp-tl ${project.timeline === t.id ? 'selected' : ''}`}
                          onClick={() => setProject(f => ({ ...f, timeline: t.id }))}
                        >
                          <span className="sp-tl-label">{t.label}</span>
                          <span className="sp-tl-sub">{t.sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sp-fld">
                  <label className="sp-label">Project Description * <span className="sp-opt">(pages, features, anything important)</span></label>
                  <textarea
                    className="sp-input sp-ta"
                    value={project.description}
                    onChange={pf('description')}
                    placeholder="e.g. A 4-page site for my café — home, menu, about, contact. I have a logo and photos ready. Want an online booking system and a gallery section…"
                  />
                </div>
              </div>

              <div className="sp-footer">
                <button className="sp-btn-back" onClick={back}>← Back</button>
                <button className="sp-btn-next" onClick={next} disabled={!step1Valid()}>
                  Continue <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: AGREEMENT ── */}
          {step === 2 && (
            <form className="sp-step-content" onSubmit={handleSubmit}>
              <div className="sp-eyebrow">Step 03 of 03</div>
              <h1 className="sp-h1">The <em>agreement.</em></h1>
              <p className="sp-lead">Read and confirm the key terms before we get started.</p>

              {/* Key terms summary */}
              <div className="sp-terms">
                <div className="sp-terms-hd">Key Terms — {pkg?.name} Package</div>
                <div className="sp-terms-grid">
                  <div className="sp-term">
                    <div className="sp-term-label">Deposit</div>
                    <div className="sp-term-val">
                      {pkg ? (typeof pkg.deposit === 'number' ? `$${pkg.deposit.toLocaleString()}` : pkg.deposit) : '20% of total'}
                    </div>
                    <div className="sp-term-note">Non-refundable · Due now</div>
                  </div>
                  <div className="sp-term">
                    <div className="sp-term-label">Balance</div>
                    <div className="sp-term-val">
                      {pkg ? (typeof pkg.balance === 'number' ? `$${pkg.balance.toLocaleString()}` : pkg.balance) : '80% of total'}
                    </div>
                    <div className="sp-term-note">Before launch</div>
                  </div>
                  <div className="sp-term">
                    <div className="sp-term-label">Revisions</div>
                    <div className="sp-term-val">
                      {pkg?.id === 'starter' ? '1 round' : pkg?.id === 'growth' ? '3 rounds' : 'Unlimited'}
                    </div>
                    <div className="sp-term-note">Consolidated sets</div>
                  </div>
                  <div className="sp-term">
                    <div className="sp-term-label">Jurisdiction</div>
                    <div className="sp-term-val">QLD, AU</div>
                    <div className="sp-term-note">ABN 99 664 433 447</div>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="sp-checks">
                {CHECKS.map((text, i) => (
                  <label
                    key={i}
                    className={`sp-check-row ${agreement.checks[i] ? 'checked' : ''}`}
                    onClick={() => setAgreement(a => {
                      const checks = [...a.checks]
                      checks[i] = !checks[i]
                      return { ...a, checks }
                    })}
                  >
                    <div className="sp-checkbox">
                      {agreement.checks[i] && <span>✓</span>}
                    </div>
                    <span className="sp-check-text">{text}</span>
                  </label>
                ))}
              </div>

              {/* Signature */}
              <div className="sp-sig-block">
                <div className="sp-fld">
                  <label className="sp-label">Digital Signature — type your full name to sign *</label>
                  <input
                    className="sp-input sp-sig-input"
                    value={agreement.signature}
                    onChange={e => setAgreement(a => ({ ...a, signature: e.target.value }))}
                    placeholder="Type your full name…"
                    autoComplete="off"
                  />
                </div>
                <div className="sp-sig-date">
                  Signed: {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              {error && <p className="sp-error">{error}</p>}

              <div className="sp-footer">
                <button type="button" className="sp-btn-back" onClick={back}>← Back</button>
                <button
                  type="submit"
                  className="sp-btn-submit"
                  disabled={!step2Valid() || sending}
                >
                  {sending ? 'Submitting…' : 'Sign & Submit →'}
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 3: DONE ── */}
          {step === 3 && (
            <div className="sp-step-content sp-done">
              <div className="sp-done-icon">✦</div>
              <h1 className="sp-h1">You're all set,<br /><em>{you.name.split(' ')[0]}.</em></h1>
              <p className="sp-lead">Your agreement has been received. We'll be in touch within 24 hours with your deposit invoice and a project kickoff brief.</p>

              <div className="sp-done-summary">
                <div className="sp-done-row">
                  <span>Package</span>
                  <span>{pkg?.name}</span>
                </div>
                <div className="sp-done-row">
                  <span>Confirmation sent to</span>
                  <span>{you.email}</span>
                </div>
                <div className="sp-done-row">
                  <span>Next step</span>
                  <span>Deposit invoice via email</span>
                </div>
              </div>

              <a href="/" className="sp-btn-next" style={{ display: 'inline-block', textAlign: 'center', marginTop: '32px' }}>
                Back to Site
              </a>
            </div>
          )}

        </div>
      </main>

    </div>
  )
}
