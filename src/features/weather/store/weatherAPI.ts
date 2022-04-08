import { API_URL, APP_ID } from '../constants'

export function fetchWeather(lat = 52.374031, lon = 4.88969) {
  return new Promise<{ data: number }>((resolve) =>
    fetch(
      `${API_URL}?lat=${lat}&lon=${lon}&appid=${APP_ID}&exclude=current,minutely,hourly,alerts`
    )
      .then((res) => res.json())
      .then((res) => resolve(res))
  )
}
