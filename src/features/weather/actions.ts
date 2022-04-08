import { createAction } from '@reduxjs/toolkit'

export const fetchWeatherSuccess = createAction<object>(
  'fetchWeather/fulfilled'
)

export const fetchWeatherPending = createAction<object>('fetchWeather/pending')
