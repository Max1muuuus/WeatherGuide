import { getWeatherInfo } from '../constants'

function DayCard({ day }) {
  const weatherInfo = getWeatherInfo(day.code)
  const formattedDate = new Date(day.date).toLocaleDateString('uk-UA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  return (
    <article className="day-card">
      <p className="day-name">{formattedDate}</p>
      <div className="day-emoji" aria-label={weatherInfo.description}>
        {weatherInfo.emoji}
      </div>
      <p className="day-description">{weatherInfo.description}</p>
      <div className="day-temp-row">
        <span className="temp-max">{Math.round(day.tempMax)}°</span>
        <span className="temp-separator">/</span>
        <span className="temp-min">{Math.round(day.tempMin)}°</span>
      </div>
      <p className="precipitation">Опади: {Number(day.precipitation).toFixed(1)} мм</p>
    </article>
  )
}

export default DayCard
