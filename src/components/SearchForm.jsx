import { useState } from 'react'

function SearchForm({ onSearch, loading, error }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <section className="search-panel">
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="city-search">Місто</label>
          <input
            id="city-search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            disabled={loading}
            placeholder="Введіть назву міста"
            autoComplete="off"
          />
        </div>

        <button type="submit" disabled={loading} className="primary-button">
          {loading ? 'Шукаємо…' : 'Знайти'}
        </button>
      </form>

      <div className="status-block" aria-live="polite">
        {loading && <p className="status-text">Шукаємо…</p>}
        {!loading && error && <p className="status-error">{error}</p>}
      </div>
    </section>
  )
}

export default SearchForm
