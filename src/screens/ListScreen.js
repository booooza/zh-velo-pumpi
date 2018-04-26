import React, { Component } from 'react'
import { FlatList } from 'react-native'
import ListItem from '../components/ListItem'
import getLocationAsync from '../services/location'

class ListScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Liste',
    title: 'Liste',
  }

  constructor(props) {
    super(props)

    this.state = {
      region: null,
      places: [],
    }
  }

  componentWillMount() {
    getLocationAsync().then((region) => {
      this.setState({ region })
    })
    this.getPlacesAsync()
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
    const places = this.props.screenProps.data.features.map(feature => ({
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
      title: feature.properties.bezeichnung,
      type: feature.properties.typ,
    }))
    await this.setState({ places })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => (
    <ListItem item={item} index={index} onPressItem={this.onPressItem} />
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
