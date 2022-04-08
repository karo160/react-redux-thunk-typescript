import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWeather } from './weatherAPI'
import { coord } from '../types'
export const getWeatherApi = createAsyncThunk(
  'fetchWeather',
  (coords: coord | undefined) => {
    return fetchWeather(coords?.lat, coords?.lon)
  }
)
