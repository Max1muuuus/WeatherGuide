export const NOT_FOUND = 'NOT_FOUND'
const API_KEY = 'bd5ed8b4afbdfd041a362db09d83a051'

export async function fetchWeather(city) {
    const query = city.trim()
    const encodedCity = encodeURIComponent(query)

    const geocodingResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodedCity}&limit=1&appid=${API_KEY}`,
    )

    if (!geocodingResponse.ok) {
        throw new Error('NETWORK_ERROR')
    }

    const geocodingData = await geocodingResponse.json()

    if (!Array.isArray(geocodingData) || geocodingData.length === 0) {
        throw new Error(NOT_FOUND)
    }

    const place = geocodingData[0]
    const { name, country, lat, lon } = place

    const [currentResponse, forecastResponse] = await Promise.all([
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=uk`,
        ),
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}&units=metric&lang=uk`,
        ),
    ])

    if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('NETWORK_ERROR')
    }

    const [currentData, forecastData] = await Promise.all([
        currentResponse.json(),
        forecastResponse.json(),
    ])

    const dailyWeather = Array.isArray(forecastData.list)
        ? forecastData.list.map((item) => ({
            date: item.dt_txt,
            code: item.weather?.[0]?.id ?? 800,
            tempMax: item.main?.temp_max ?? 0,
            tempMin: item.main?.temp_min ?? 0,
            precipitation: Number(item.rain?.['3h'] ?? item.snow?.['3h'] ?? 0),
        }))
        : []

    return {
        place: {
            name,
            country,
            latitude: lat,
            longitude: lon,
        },
        current: {
            time: new Date(currentData.dt * 1000).toISOString(),
            temperature: currentData.main?.temp ?? 0,
            feelsLike: currentData.main?.feels_like ?? 0,
            humidity: currentData.main?.humidity ?? 0,
            windSpeed: currentData.wind?.speed ?? 0,
            pressure: currentData.main?.pressure ?? 0,
            code: currentData.weather?.[0]?.id ?? 800,
        },
        daily: dailyWeather,
    }
}
