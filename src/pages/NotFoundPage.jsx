import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page-section">
      <div className="empty-state not-found-state" aria-live="polite">
        <h1>404</h1>
        <p>Сторінку не знайдено</p>
        <Link to="/" className="inline-link">
          На головну
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
