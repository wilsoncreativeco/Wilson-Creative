import { useState } from 'react'
import './brief.css'

// ── Options ───────────────────────────────────────────────────────────────────

const AESTHETICS = [
  { id: 'clean',   label: 'Clean & Minimal',    sub: 'Lots of space, refined, understated' },
  { id: 'bold',    label: 'Bold & Impactful',    sub: 'Strong visuals, confident, striking' },
  { id: 'luxury',  label: 'Luxury & Premium',    sub: 'Sophisticated, dark tones, high-end feel' },
  { id: 'warm',    label: 'Warm & Friendly',     sub: 'Approachable, earthy, community feel' },
  { id: 'modern',  label: 'Modern & Tech',       sub: 'Sharp, forward-thinking, innovative' },
  { id: 'classic', label: 'Classic & Timeless',  sub: 'Traditional, trustworthy, established' },
]

const VIBES = [
  { id: 'dark',    label: 'Dark & Moody' },
  { id: 'light',   label: 'Light & Airy' },
  { id: 'neutral', label: 'Neutral & Natural' },
  { id: 'vibrant', label: 'Vibrant & Colourful' },
  { id: 'mono',    label: 'Black & White' },
  { id: 'unsure',  label: 'Not Sure — You Decide' },
]

const LAYOUTS = [
  { id: 'hero',     label: 'Big Impact Hero',    sub: 'Full-screen opener, strong first impression' },
  { id: 'simple',   label: 'Simple & Direct',    sub: 'Clean, straight to the point, no distractions' },
  { id: 'sections', label: 'Multiple Sections',  sub: 'Scroll through organised content blocks' },
  { id: 'creative', label: 'Creative & Unique',  sub: 'Something unexpected — trust your instincts' },
]

const FEATURES = [
  { id: 'booking',      label: 'Online Booking / Appointments' },
  { id: 'store',        label: 'Online Store / Products' },
  { id: 'portfolio',    label: 'Portfolio / Gallery' },
  { id: 'blog',         label: 'Blog / News' },
  { id: 'testimonials', label: 'Testimonials / Reviews' },
  { id: 'newsletter',   label: 'Newsletter Signup' },
  { id: 'menu',         label: 'Menu (café / restaurant)' },
  { id: 'contact',      label: 'Contact Form' },
  { id: 'map',          label: 'Map / Location' },
  { id: 'chat',         label: 'Live Chat' },
]

const TONE = [
  { id: 'professional', label: 'Professional',  sub: 'Polished and credible' },
  { id: 'friendly',     label: 'Friendly',       sub: 'Warm and approachable' },
  { id: 'bold',         label: 'Confident',      sub: 'Direct and assertive' },
  { id: 'luxury',       label: 'Luxurious',      sub: 'Elevated and exclusive' },
]

const LOGO_STATUS = [
  { id: 'yes',   label: 'Yes, I have one' },
  { id: 'no',    label: 'No logo yet' },
  { id: 'wip',   label: 'In progress' },
]

const PHOTOS_STATUS = [
  { id: 'yes',   label: 'Yes, ready to go' },
  { id: 'some',  label: 'Some, not all' },
  { id: 'no',    label: 'None yet' },
  { id: 'help',  label: 'Need help sourcing' },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function Brief() {
  const [step, setStep]       = useState(0)
  const [dir, setDir]         = useState(1)
  const [anim, setAnim]       = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError]     = useState('')

  const [form, setForm] = useState({
    email:        '',
    aesthetic:    '',
    vibe:         '',
    layout:       '',
    tone:         '',
    features:     [],
    headline:     '',
    subheading:   '',
    cta:          '',
    inspiration:  '',
    logoStatus:   '',
    photosStatus: '',
    avoidColors:  '',
    avoidStyles:  '',
    socials:      { instagram: '', facebook: '', linkedin: '', other: '' },
    notes:        '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleFeature = (id) => setForm(f => ({
    ...f,
    features: f.features.includes(id)
      ? f.features.filter(x => x !== id)
      : [...f.features, id],
  }))

  const STEPS = ['Style', 'Content', 'Assets', 'Submit']

  function go(next) {
    if (next === step) return
    setDir(next > step ? 1 : -1)
    setAnim(true)
    setTimeout(() => { setStep(next); setAnim(false) }, 280)
  }
  const next = () => { if (step < 3) go(step + 1) }
  const back = () => { if (step > 0) go(step - 1) }

  function step0Valid() { return form.aesthetic && form.vibe && form.layout && form.tone }
  function step1Valid() { return form.headline.trim().length > 2 }
  function step2Valid() { return form.logoStatus && form.photosStatus && form.email.trim().length > 4 }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!step2Valid()) return
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      go(3)
    } catch {
      setError('Something went wrong — email us at wilsoncreativeco.au@gmail.com')
    } finally {
      setSending(false)
    }
  }

  const animClass = anim ? (dir > 0 ? 'slide-out-left' : 'slide-out-right') : ''

  return (
    <div className="br-root">
      <div className="br-grain" aria-hidden="true" />

      {/* Nav */}
      <header className="br-nav">
        <a href="/" className="br-logo">Wilson <em>Creative</em> Co.</a>
        {step < 3 && (
          <div className="br-steps">
            {STEPS.slice(0, 3).map((s, i) => (
              <div key={s} className={`br-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                onClick={() => i < step && go(i)}>
                <div className="br-step-dot">{i < step ? '✓' : <span>{i + 1}</span>}</div>
                <span className="br-step-label">{s}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      {step < 3 && (
        <div className="br-progress">
          <div className="br-progress-fill" style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
      )}

      <main className="br-main">
        <div className={`br-card ${animClass}`}>

          {/* ── STEP 0: STYLE ── */}
          {step === 0 && (
            <div className="br-step-content">
              <div className="br-eyebrow">Step 01 of 03</div>
              <h1 className="br-h1">Your <em>style.</em></h1>
              <p className="br-lead">Help me nail the look and feel before we touch a single page.</p>

              {/* Aesthetic */}
              <div className="br-section">
                <label className="br-label">What aesthetic fits your brand? *</label>
                <div className="br-grid-2">
                  {AESTHETICS.map(a => (
                    <div key={a.id} className={`br-card-opt ${form.aesthetic === a.id ? 'selected' : ''}`}
                      onClick={() => set('aesthetic', a.id)}>
                      <span className="br-opt-label">{a.label}</span>
                      <span className="br-opt-sub">{a.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colour vibe */}
              <div className="br-section">
                <label className="br-label">Colour direction? *</label>
                <div className="br-grid-3">
                  {VIBES.map(v => (
                    <div key={v.id} className={`br-pill ${form.vibe === v.id ? 'selected' : ''}`}
                      onClick={() => set('vibe', v.id)}>
                      {v.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Layout */}
              <div className="br-section">
                <label className="br-label">Homepage layout style? *</label>
                <div className="br-grid-2">
                  {LAYOUTS.map(l => (
                    <div key={l.id} className={`br-card-opt ${form.layout === l.id ? 'selected' : ''}`}
                      onClick={() => set('layout', l.id)}>
                      <span className="br-opt-label">{l.label}</span>
                      <span className="br-opt-sub">{l.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div className="br-section">
                <label className="br-label">Tone of voice? *</label>
                <div className="br-grid-2">
                  {TONE.map(t => (
                    <div key={t.id} className={`br-card-opt ${form.tone === t.id ? 'selected' : ''}`}
                      onClick={() => set('tone', t.id)}>
                      <span className="br-opt-label">{t.label}</span>
                      <span className="br-opt-sub">{t.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avoid */}
              <div className="br-section">
                <label className="br-label">Anything to avoid? <span className="br-opt-tag">(optional)</span></label>
                <div className="br-row">
                  <div className="br-fld">
                    <input className="br-input" placeholder="Colours to avoid e.g. bright orange, yellow"
                      value={form.avoidColors} onChange={e => set('avoidColors', e.target.value)} />
                  </div>
                  <div className="br-fld">
                    <input className="br-input" placeholder="Styles to avoid e.g. corporate, childish"
                      value={form.avoidStyles} onChange={e => set('avoidStyles', e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="br-footer">
                <div />
                <button className="br-btn-next" onClick={next} disabled={!step0Valid()}>Continue <span>→</span></button>
              </div>
            </div>
          )}

          {/* ── STEP 1: CONTENT ── */}
          {step === 1 && (
            <div className="br-step-content">
              <div className="br-eyebrow">Step 02 of 03</div>
              <h1 className="br-h1">Your <em>content.</em></h1>
              <p className="br-lead">What goes on the site. Don't overthink it — rough is fine.</p>

              {/* Hero copy */}
              <div className="br-section">
                <label className="br-label">Homepage headline *</label>
                <input className="br-input" value={form.headline}
                  onChange={e => set('headline', e.target.value)}
                  placeholder="e.g. Brisbane's Best Specialty Coffee" />
                <p className="br-hint">The first thing people read. Keep it short and punchy.</p>
              </div>

              <div className="br-section">
                <label className="br-label">Subheading <span className="br-opt-tag">(optional)</span></label>
                <input className="br-input" value={form.subheading}
                  onChange={e => set('subheading', e.target.value)}
                  placeholder="e.g. Hand-crafted espresso, locally sourced beans, Newstead." />
              </div>

              <div className="br-section">
                <label className="br-label">Main call-to-action button <span className="br-opt-tag">(optional)</span></label>
                <input className="br-input" value={form.cta}
                  onChange={e => set('cta', e.target.value)}
                  placeholder="e.g. Book a Table, Shop Now, Get a Quote" />
              </div>

              {/* Features */}
              <div className="br-section">
                <label className="br-label">Features you need <span className="br-opt-tag">(select all that apply)</span></label>
                <div className="br-features">
                  {FEATURES.map(f => (
                    <div key={f.id}
                      className={`br-feature ${form.features.includes(f.id) ? 'selected' : ''}`}
                      onClick={() => toggleFeature(f.id)}>
                      <span className="br-feature-check">{form.features.includes(f.id) ? '✓' : '+'}</span>
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspiration */}
              <div className="br-section">
                <label className="br-label">Sites you love <span className="br-opt-tag">(optional but super helpful)</span></label>
                <textarea className="br-input br-ta" value={form.inspiration}
                  onChange={e => set('inspiration', e.target.value)}
                  placeholder="Paste 2–3 URLs or just describe what you love about them. Can be any industry — just ones you think look great." />
              </div>

              {/* Socials */}
              <div className="br-section">
                <label className="br-label">Social media links <span className="br-opt-tag">(optional)</span></label>
                <div className="br-row">
                  <div className="br-fld">
                    <input className="br-input" placeholder="Instagram URL"
                      value={form.socials.instagram}
                      onChange={e => setForm(f => ({ ...f, socials: { ...f.socials, instagram: e.target.value } }))} />
                  </div>
                  <div className="br-fld">
                    <input className="br-input" placeholder="Facebook URL"
                      value={form.socials.facebook}
                      onChange={e => setForm(f => ({ ...f, socials: { ...f.socials, facebook: e.target.value } }))} />
                  </div>
                </div>
                <div className="br-row" style={{ marginTop: '12px' }}>
                  <div className="br-fld">
                    <input className="br-input" placeholder="LinkedIn URL"
                      value={form.socials.linkedin}
                      onChange={e => setForm(f => ({ ...f, socials: { ...f.socials, linkedin: e.target.value } }))} />
                  </div>
                  <div className="br-fld">
                    <input className="br-input" placeholder="Other (TikTok, etc)"
                      value={form.socials.other}
                      onChange={e => setForm(f => ({ ...f, socials: { ...f.socials, other: e.target.value } }))} />
                  </div>
                </div>
              </div>

              <div className="br-footer">
                <button className="br-btn-back" onClick={back}>← Back</button>
                <button className="br-btn-next" onClick={next} disabled={!step1Valid()}>Continue <span>→</span></button>
              </div>
            </div>
          )}

          {/* ── STEP 2: ASSETS + SUBMIT ── */}
          {step === 2 && (
            <form className="br-step-content" onSubmit={handleSubmit}>
              <div className="br-eyebrow">Step 03 of 03</div>
              <h1 className="br-h1">Your <em>assets.</em></h1>
              <p className="br-lead">Let us know what you've got ready so we can hit the ground running.</p>

              <div className="br-section">
                <label className="br-label">Do you have a logo? *</label>
                <div className="br-grid-3">
                  {LOGO_STATUS.map(s => (
                    <div key={s.id} className={`br-pill ${form.logoStatus === s.id ? 'selected' : ''}`}
                      onClick={() => set('logoStatus', s.id)}>{s.label}</div>
                  ))}
                </div>
              </div>

              <div className="br-section">
                <label className="br-label">Do you have photos / images ready? *</label>
                <div className="br-grid-2" style={{ maxWidth: '480px' }}>
                  {PHOTOS_STATUS.map(s => (
                    <div key={s.id} className={`br-pill ${form.photosStatus === s.id ? 'selected' : ''}`}
                      onClick={() => set('photosStatus', s.id)}>{s.label}</div>
                  ))}
                </div>
              </div>

              <div className="br-section">
                <label className="br-label">Anything else we should know? <span className="br-opt-tag">(optional)</span></label>
                <textarea className="br-input br-ta" value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  placeholder="Specific pages, features, ideas, things that are really important to you — anything at all." />
              </div>

              <div className="br-section">
                <label className="br-label">Your email address *</label>
                <input className="br-input" type="email" value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="So I can match this brief to your project"
                  style={{ maxWidth: '360px' }} />
              </div>

              {error && <p className="br-error">{error}</p>}

              <div className="br-footer">
                <button type="button" className="br-btn-back" onClick={back}>← Back</button>
                <button type="submit" className="br-btn-submit" disabled={!step2Valid() || sending}>
                  {sending ? 'Submitting…' : 'Submit Brief →'}
                </button>
              </div>
            </form>
          )}

          {/* ── DONE ── */}
          {step === 3 && (
            <div className="br-step-content br-done">
              <div className="br-done-icon">✦</div>
              <h1 className="br-h1">Brief received.</h1>
              <p className="br-lead">
                Thanks — this is exactly what I need. I'll review it before we kick off and come prepared.
                Expect to hear from me soon.
              </p>
              <div className="br-done-summary">
                <div className="br-done-row"><span>Aesthetic</span><span>{AESTHETICS.find(a => a.id === form.aesthetic)?.label}</span></div>
                <div className="br-done-row"><span>Colour direction</span><span>{VIBES.find(v => v.id === form.vibe)?.label}</span></div>
                <div className="br-done-row"><span>Layout</span><span>{LAYOUTS.find(l => l.id === form.layout)?.label}</span></div>
                <div className="br-done-row"><span>Features</span><span>{form.features.length > 0 ? `${form.features.length} selected` : 'None'}</span></div>
              </div>
              <a href="/" className="br-btn-next" style={{ display: 'inline-block', textAlign: 'center', marginTop: '32px' }}>
                Back to Site
              </a>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
