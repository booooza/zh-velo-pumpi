import { Location, Permissions } from 'expo'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default async function getLocationAsync() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') {
    console.log('No access to location')
  }

  const location = await Location.getCurrentPositionAsync({})
  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    ...deltas,
  }
  return region
}
