import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'expo'

const Marker = MapView.Marker

export default class Map extends Component {
  renderMarkers() {
    _onCalloutPress = data => {
      console.log(
        `Pressed callout: ${data.title} ${data.coordinate.latitude} ${data.coordinate.latitude}`,
      )
      this.props.navigation.navigate('Directions', {
        data: data.coordinate,
        title: data.title,
      })
    }

    return this.props.places.map((place, i) => (
      <Marker
        key={i}
        title={place.title}
        description={place.type}
        coordinate={{
          latitude: place.latitude,
          longitude: place.longitude,
        }}
        onCalloutPress={data =>
          _onCalloutPress({
            title: place.title,
            coordinate: {
              latitude: place.latitude,
              longitude: place.longitude,
            },
          })
        }
        // image={require('../../assets/baloon.png')}
      />
    ))
  }

  render() {
    const { region } = this.props
    return (
      <MapView style={styles.container} region={region} showsUserLocation showsMyLocationButton>
        {this.renderMarkers()}
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
})
