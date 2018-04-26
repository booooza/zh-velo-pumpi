import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { Location, Permissions } from 'expo'

import Map from '../components/Map'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

class MapScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Karte',
  }

  state = {
    region: null,
    places: [],
  }

  componentWillMount() {
    this.getLocationAsync()
    this.getPlacesAsync()
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      console.log('Kein Zugriff auf Standort')
    }

    const location = await Location.getCurrentPositionAsync({})
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas,
    }
    await this.setState({ region })
  }

  getPlacesAsync = async () => {
    const places = this.props.screenProps.data.features.map(feature => ({
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
      title: feature.properties.bezeichnung,
      type: feature.properties.typ,
    }))
    await this.setState({ places })
  }

  render() {
    const { region, places } = this.state
    if (!places) {
      return (
        <View>
          <Text>Waiting...</Text>
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <Map {...this.props} region={region} places={this.state.places} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
})

export default MapScreen
