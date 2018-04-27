import axios from 'axios'

const api = axios.create({
  baseURL: 'https://maps.googleapis.com',
})
// const APIKEY = process.env.GOOGLE_DIRECTIONS_APIKEY
const APIKEY = 'AIzaSyCsBCVuRulDZe4f3tlGfpVuc_fM0m3iquA'
const mode = 'bicycling'

export default async function getDistanceAsync(origin, destination) {
  return api
    .get('/maps/api/directions' +
            `/json?origin=${origin}` +
            `&destination=${destination}` +
            `&key=${APIKEY}` +
            `&mode=${mode}`)
    .then(res => res.data.routes[0].legs[0].distance.text)
    .catch(err => console.log(err))
}
