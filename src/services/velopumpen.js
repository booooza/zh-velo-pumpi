import axios from 'axios'

const api = axios.create({
  baseURL: 'https://data.stadt-zuerich.ch',
})

const getData = () =>
  api
    .get(
      '/dataset' +
        '/f25cf7cb-e289-4197-a76c-37eee69d8b90' +
        '/resource' +
        '/4cea6136-d927-43b5-b1ae-4fce8a52058f' +
        '/download' +
        '/velopumpstation.json',
    )
    .then(res =>
      res.data.features.map(feature => ({
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        title: feature.properties.bezeichnung,
        type: feature.properties.typ,
      })),
    )
// .catch(error => console.error(error))

export default {
  getData,
}
