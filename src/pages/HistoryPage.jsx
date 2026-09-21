import { useNavigate } from 'react-router-dom'

function HistoryPage({ history, onSelectCity, onClearHistory }) {
  const navigate = useNavigate()

  const handleSelect = (cityName) => {
    onSelectCity(cityName)
    navigate('/')
  }

  if (history.length === 0) {
    return (
      <section className="page-section empty-state-wrap" aria-live="polite">
        <div className="empty-state">
          <p>Ви ще нічого не шукали</p>
          <a href="/" className="inline-link">
            На головну
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="section-heading history-header">
        <h1>Історія пошуку</h1>
        <button type="button" className="secondary-button" onClick={onClearHistory}>
          Очистити історію
        </button>
      </div>

      <ul className="history-list">
        {history.map((city) => (
          <li key={city} className="history-item">
            <button type="button" className="history-button" onClick={() => handleSelect(city)}>
              {city}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default HistoryPage
