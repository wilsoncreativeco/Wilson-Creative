import { useState } from 'react'
import { Head } from 'vite-react-ssg'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import BookingModal from '../components/BookingModal'
import useReveal from '../components/useReveal'

export default function NotFound() {
  const [booking, setBooking] = useState(false)
  const book = () => setBooking(true)
  useReveal()

  return (
    <>
      <Head>
        <title>Page not found | Wilson Creative Co.</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <SiteNav onBook={book} />

      <main>
        <header className="page-top biz-hero nf-hero">
          <div className="page-top-bg" aria-hidden="true" />
          <div className="h-grain" aria-hidden="true" />
          <div className="page-top-inner">
            <div className="lane-mark rv">
              <span className="lane-idx">404</span>
              <span className="lane-div" aria-hidden="true" />
              <span className="lane-for">Page Not Found</span>
            </div>
            <h1 className="page-h1 rv d1">This one got left <em>on the cutting room floor.</em></h1>
            <p className="page-lead rv d2">
              The page you were after has moved or never existed. Everything we make is still
              a click away.
            </p>
            <div className="page-cta rv d3">
              <a className="btn-g" href="/">Back Home →</a>
              <a className="btn-o" href="/for-businesses">For Businesses →</a>
              <a className="btn-o" href="/for-events">For Events →</a>
            </div>
          </div>
        </header>
      </main>

      <SiteFooter />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  )
}
