import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { fetchWeather, NOT_FOUND } from './api/weather'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ForecastPage from './pages/ForecastPage'
import HistoryPage from './pages/HistoryPage'
import NotFoundPage from './pages/NotFoundPage'

const DEFAULT_CITY = 'Київ'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])

  const addToHistory = (cityName) => {
    setHistory((previous) => {
      const cleaned = previous.filter((item) => item !== cityName)
      return [cityName, ...cleaned].slice(0, 10)
    })
  }

  const clearError = () => setError('')

  const runSearch = async (cityInput) => {
    const query = cityInput.trim()

    if (!query) {
      return
    }

    if (query.length < 2) {
      setError('Введіть щонайменше 2 символи')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await fetchWeather(query)
      setWeather(result)
      addToHistory(result.place.name)
    } catch (caughtError) {
      const message =
        caughtError?.message === NOT_FOUND
          ? `Місто «${query}» не знайдено. Перевірте назву`
          : 'Не вдалося отримати дані. Перевірте інтернет і спробуйте ще раз'

      setWeather(null)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (cityInput) => {
    await runSearch(cityInput)
  }

  const handleLoadCity = async (cityName) => {
    await runSearch(cityName)
  }

  useEffect(() => {
    const loadDefaultCity = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await fetchWeather(DEFAULT_CITY)
        setWeather(result)
        addToHistory(result.place.name)
      } catch (caughtError) {
        const message =
          caughtError?.message === NOT_FOUND
            ? `Місто «${DEFAULT_CITY}» не знайдено. Перевірте назву`
            : 'Не вдалося отримати дані. Перевірте інтернет і спробуйте ще раз'

        setWeather(null)
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadDefaultCity()
  }, [])

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <HomePage
                weather={weather}
                loading={loading}
                error={error}
                onSearch={handleSearch}
                onClearError={clearError}
              />
            }
          />
          <Route path="forecast" element={<ForecastPage weather={weather} />} />
          <Route
            path="history"
            element={
              <HistoryPage
                history={history}
                onSelectCity={handleLoadCity}
                onClearHistory={clearHistory}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
