import { city, coord } from '../features/weather/types'
function getCityIdByCoords(coord: coord, cities: city[]) {
  return cities.find((city) => {
    return (
      Math.abs(city.coord.lon - coord.lon) <= 0.0002 &&
      Math.abs(city.coord.lat - coord.lat) <= 0.002
    )
  })
}
export default getCityIdByCoords
