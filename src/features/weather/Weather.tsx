import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { getWeatherApi } from './store/weatherThunk'
import { city, citiesListType } from './types'
import DataTable, { TableColumn } from 'react-data-table-component'
import CitiesList from './Cities.list'
import {
  Box,
  Tabs,
  Typography,
  Tab,
  Container,
  Button,
  Grid
} from '@mui/material'
import moment from 'moment'
import { clearData } from './store/weatherReducer'
import loadJson from '../../app/loadJson'

interface DataRow {
  city: string
  temperature: string
  windSpeed: string
  weather: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export function Weather() {
  const [cities, setCities] = useState<citiesListType[]>([])
  const [selectedCities, setSelectedCities] = useState<citiesListType[]>([
    {
      value: 2759794,
      label: 'Amsterdam',
      lat: 52.374031,
      lon: 4.88969
    }
  ])

  const dispatch = useAppDispatch()
  const weather = useAppSelector((state) => state.weather.data)
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'City',
      selector: (row) => row.city
    },
    {
      name: 'Temperature',
      selector: (row) => row.temperature,
      sortable: true
    },
    {
      name: 'Wind Speed',
      selector: (row) => row.windSpeed,
      sortable: true
    },

    {
      name: 'Weather',
      selector: (row) => row.weather,
      sortable: true
    }
  ]

  useEffect(() => {
    loadJson('city.list.json').then((res) => {
      localStorage.setItem('cities', JSON.stringify(res))
      const citiesList: citiesListType[] = []
      res.map((city: city) =>
        citiesList.push({
          value: city.id,
          label: city.name,
          lat: city.coord.lat,
          lon: city.coord.lon
        })
      )
      setCities(citiesList)
    })
    dispatch(getWeatherApi())
  }, [])

  function handleChangeCity(cities: any, { action }: any): void {
    if (action === 'remove-value') {
      dispatch(clearData())
      cities.forEach((city: citiesListType) => {
        dispatch(getWeatherApi({ lat: city.lat, lon: city.lon }))
      })
    } else if (action === 'clear') {
      dispatch(clearData())
      setSelectedCities([])
    } else {
      setSelectedCities(cities)
    }
  }

  function renderCities() {
    return (
      <CitiesList
        options={cities}
        onChange={handleChangeCity}
        defaultValue={selectedCities}
      />
    )
  }
  const [tabValue, setTabValue] = React.useState(0)

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  function handleGetWeatherData() {
    dispatch(clearData())
    selectedCities.forEach((city: citiesListType) => {
      dispatch(getWeatherApi({ lat: city.lat, lon: city.lon }))
    })
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} padding={5}>
        <Grid item xs={8}>
          {cities.length && renderCities()}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleGetWeatherData}>
            Get data
          </Button>
        </Grid>
      </Grid>

      {selectedCities && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              aria-label="basic tabs example"
            >
              {Object.keys(weather).map((day: any, key: number) => {
                const date = moment(day * 1000).format('dddd')

                return <Tab label={date} key={uuidv4()} {...a11yProps(key)} />
              })}
            </Tabs>
          </Box>
          {Object.keys(weather).map((day: string, key: number) => (
            <TabPanel key={uuidv4()} value={tabValue} index={key}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/*@ts-ignore*/}
              <DataTable columns={columns} data={weather[day]} />
            </TabPanel>
          ))}
        </>
      )}
    </Container>
  )
}
