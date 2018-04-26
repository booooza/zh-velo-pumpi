import React, { Component } from 'react'
import { FlatList } from 'react-native'
import ListItem from '../components/ListItem'
import getLocationAsync from '../services/location'
import GoogleDirectionsAPI from '../services/distance'

class ListScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Liste',
    title: 'Liste',
  }

  constructor(props) {
    super(props)

    this.state = {
      region: null,
      places: null,
    }
  }

  componentWillMount() {
    getLocationAsync()
      .then((region) => {
        this.setState({ region })
      })
      .then(() => {
        this.getPlacesAsync()
          .then((places) => {
            this.setState({ places })
          })
      })
      .catch((err) => {
        console.log(`error: ${err}`)
      })
  }

  onPressItem = (index) => {
    console.log(`Pressed row: ${index}`)
    this.props.navigation.navigate('Directions', {
      data: this.state.places[index],
      title: this.state.places[index].title,
      type: this.state.places[index].type,
    })
  }

  getPlacesAsync = async () => {
    const places = this.props.screenProps.data.features.map((feature) => {
      const origin = `${this.state.region.latitude},${this.state.region.longitude}`
      const destination = `${feature.geometry.coordinates[1]},${feature.geometry.coordinates[1]}`
      GoogleDirectionsAPI(origin, destination)
        .then((res) => {
          console.log(res)
        })

      return {
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        title: feature.properties.bezeichnung,
        type: feature.properties.typ,
      }
    })
    return places
  }

  // getDistanceAsync = async () => {
  //   const placesWithDistance = this.state.places.map((place) => {
  //     const origin = `${this.state.region.longitude},${this.state.region.latitude}`
  //     const destination = `${place.longitude},${place.latitude}`
  //     const result = GoogleDirectionsAPI(origin, destination)

  //     return { ...place, distance: result }
  //   })
  //   return placesWithDistance
  // }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this.onPressItem}
    />
  )


  render() {
    const { region, places } = this.state
    return (
      <FlatList
        data={places}
        location={region}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }
}


export default ListScreen
