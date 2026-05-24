import './watch.css'

export default function Watch() {
  return (
    <div className="w-root">
      <header className="w-nav">
        <a href="/" className="w-logo">
          Wilson <em>Creative</em> Co.
        </a>
      </header>

      <main className="w-main">
        <div className="w-eyebrow">Setup Guide</div>
        <h1 className="w-title">GitHub <em>Account</em> Setup</h1>
        <p className="w-lead">
          This short guide walks you through creating a GitHub account and inviting
          us as a collaborator — so your site's code lives under your name.
        </p>

        <div className="w-player">
          <video
            controls
            poster="/github-setup-thumb.jpg"
            preload="metadata"
            className="w-video"
          >
            <source src="/github-setup.mp4" type="video/mp4" />
            Your browser doesn't support video playback.
          </video>
        </div>

        <div className="w-note">
          <span className="w-note-icon">✦</span>
          <p>
            Prefer we handle it? No problem at all — just let us know and we'll
            set everything up on our end. You can take full ownership at any time.
            Reach out at{' '}
            <a href="mailto:wilsoncreativeco.au@gmail.com">wilsoncreativeco.au@gmail.com</a>
            {' '}or{' '}
            <a href="tel:+61401609118">0401 609 118</a>.
          </p>
        </div>
      </main>
    </div>
  )
}
