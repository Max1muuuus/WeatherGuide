import SearchForm from '../components/SearchForm'
import CurrentWeather from '../components/CurrentWeather'

function HomePage({ weather, loading, error, onSearch, onClearError }) {
  const handleSearch = (query) => {
    if (typeof onClearError === 'function') {
      onClearError()
    }
    onSearch(query)
  }

  return (
    <section className="page-section">
      <SearchForm onSearch={handleSearch} loading={loading} error={error} />

      {!loading && !error && !weather && (
        <div className="empty-state" aria-live="polite">
          <p>Даних ще немає</p>
          <a href="/" className="inline-link">
            На головну
          </a>
        </div>
      )}

      {weather && <CurrentWeather weather={weather} />}
    </section>
  )
}

export default HomePage
