import axios from 'axios'
import Polyline from '@mapbox/polyline'

const api = axios.create({
  baseURL: 'https://maps.googleapis.com',
})

const getData = (startLoc, destinationLoc) => {
  const APIKEY = process.env.GOOGLE_DIRECTIONS_APIKEY
  const mode = 'bicycling'
  return api
    .get(
      `/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${APIKEY}&mode=${mode}`,
    )
    .then(res => {
      return Polyline.decode(res.data.routes[0].overview_polyline.points)
    })
    .then(points => {
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        }
      })
      return coords
    })

    .catch(error => console.error(error))
}

export default {
  getData,
}
