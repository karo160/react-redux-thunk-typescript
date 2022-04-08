export type city = {
  coord: coord
  country: string
  id: number
  name: string
  state: string
}

export type coord = {
  lat: number
  lon: number
}

export interface WeatherState {
  data: any
}
export type citiesListType = {
  value: number
  label: string
  lat: number
  lon: number
}
export type current = {
  clouds: number
  dew_point: number
  dt: number
  feels_like: number
  humidity: number
  pressure: number
  sunrise: number
  sunset: number
  temp: number
  uvi: number
  visibility: number
  weather: []
  wind_deg: number
  wind_speed: number
}
export type day = {
  clouds: number
  dew_point: number
  dt: number
  feels_like: object
  humidity: number
  moon_phase: number
  moonrise: number
  moonset: number
  pop: number
  pressure: number
  rain: number
  sunrise: number
  sunset: number
  temp: object
  uvi: number
  weather: []
  wind_deg: number
  wind_gust: number
  wind_speed: number
}
