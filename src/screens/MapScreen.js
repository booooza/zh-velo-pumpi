import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import Map from '../components/Map'
import getLocationAsync from '../services/location'

class MapScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Karte',
  }

  state = {
    region: null,
    places: [],
  }

  componentWillMount() {
    getLocationAsync().then((region) => {
      this.setState({ region })
    })
    this.getPlacesAsync()
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
