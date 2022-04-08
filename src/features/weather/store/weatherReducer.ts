import { createSlice } from '@reduxjs/toolkit'
import { fetchWeatherSuccess } from '../actions'
import { day } from '../types'
import getCityIdByCoords from '../../../app/getCityIdByCoords'

const initialState = {
  data: {}
}

export const weatherReducer = createSlice({
  name: 'fetchWeather',
  initialState,
  reducers: {
    clearData(state) {
      state.data = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherSuccess, (state, { payload }) => {
      let cities = localStorage.getItem('cities')
      cities = cities && JSON.parse(cities)

      const city = getCityIdByCoords(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { lat: payload.lat, lon: payload.lon },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cities
      )

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const days = payload.daily.map((d: day) => d.dt)
      days.forEach((day: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!state.data?.[day]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          state.data[day] = []
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const currentValue = payload.daily.find((it) => it.dt === day)
        const current = {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          city: cities.find((c) => c.id === city?.id).name,
          temperature: currentValue.temp.day,
          windSpeed: currentValue.wind_speed,
          weather: currentValue.weather[0].description
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state?.data?.[day].push(current)
      })
    })
  }
})

export const { clearData } = weatherReducer.actions

export default weatherReducer.reducer
