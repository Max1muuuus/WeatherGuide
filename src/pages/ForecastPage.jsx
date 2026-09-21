import DayCard from '../components/DayCard'

function ForecastPage({ weather }) {
  if (!weather) {
    return (
      <section className="page-section empty-state-wrap" aria-live="polite">
        <div className="empty-state">
          <p>Даних ще немає</p>
          <a href="/" className="inline-link">
            На головну
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <h1>Прогноз на 7 днів</h1>
      </div>

      <div className="forecast-grid">
        {weather.daily.map((day) => (
          <DayCard key={day.date} day={day} />
        ))}
      </div>
    </section>
  )
}

export default ForecastPage
