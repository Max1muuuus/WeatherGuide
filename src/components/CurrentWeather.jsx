import { getWeatherInfo } from '../constants'

function CurrentWeather({ weather }) {
  if (!weather) {
    return null
  }

  const { name, country } = weather.place
  const { current } = weather
  const weatherInfo = getWeatherInfo(current.code)
  const updatedTime = new Date(current.time).toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <article className="weather-card current-weather">
      <div className="weather-header-row">
        <div>
          <p className="eyebrow">Поточна погода</p>
          <h2>
            {name}, {country}
          </h2>
        </div>
        <div className="weather-icon" aria-label={weatherInfo.description}>
          {weatherInfo.emoji}
        </div>
      </div>

      <div className="current-main">
        <div className="temperature-wrap">
          <span className="temperature">{Math.round(current.temperature)}°</span>
        </div>

        <div className="summary-wrap">
          <p className="weather-status">
            {weatherInfo.description} {weatherInfo.emoji}
          </p>
          <p className="updated-time">Оновлено: {updatedTime}</p>
        </div>
      </div>

      <div className="weather-grid">
        <div className="weather-item">
          <span>Відчувається як</span>
          <strong>{Math.round(current.feelsLike)}°</strong>
        </div>
        <div className="weather-item">
          <span>Вологість</span>
          <strong>{current.humidity}%</strong>
        </div>
        <div className="weather-item">
          <span>Вітер</span>
          <strong>{Math.round(current.windSpeed)} км/год</strong>
        </div>
        <div className="weather-item">
          <span>Тиск</span>
          <strong>{Math.round(current.pressure)} гПа</strong>
        </div>
      </div>
    </article>
  )
}

export default CurrentWeather
