import React, { Component } from 'react'
import { View, SafeAreaView, StyleSheet, Dimensions, Button, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { Location, Permissions, MapView } from 'expo'
import MapViewDirections from 'react-native-maps-directions'

const { Marker } = MapView
const { width, height } = Dimensions.get('window')
const GOOGLE_MAPS_APIKEY = 'AIzaSyCsBCVuRulDZe4f3tlGfpVuc_fM0m3iquA'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

class DirectionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params ? params.title : 'Navigation',
      headerRight: (
        <Button
          onPress={() => navigation.dispatch(NavigationActions.back())}
          title="Zurück"
        />
      ),
    }
  }

  state = {
    region: null,
  }

  componentWillMount() {
    this.getLocationAsync()
  }

  getLocationAsync = async () => {
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
    await this.setState({ region })
  }

  render() {
    const { params } = this.props.navigation.state

    const { region } = this.state
    if (!region) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          initialRegion={region}
          style={StyleSheet.absoluteFill}
          // ref={c => (this.mapView = c)}
          ref={(c) => {
            this.mapView = c
          }}
          showsUserLocation
          showsMyLocationButton
        >
          <MapViewDirections
            origin={region}
            destination={{
              longitude: params.data.longitude,
              latitude: params.data.latitude,
            }}
            mode="bicycling"
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={(result) => {
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              })
            }}
            onError={() => {
              console.log('GOT AN ERROR')
            }}
          />
          <Marker
            title="test"
            description="test"
            coordinate={{
              longitude: params.data.longitude,
              latitude: params.data.latitude,
            }}
          />
        </MapView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default DirectionScreen
