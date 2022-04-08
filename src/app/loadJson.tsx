import { citiesListType, city } from '../features/weather/types'

const loadJson = (file: string) => {
  return new Promise<city[]>((res, rej) => {
    import(`../docs/${file}`)
      .then((data) => {
        res(data.default)
      })
      .catch((error) => {
        rej(error)
      })
  })
}

export default loadJson
