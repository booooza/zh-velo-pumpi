import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, FlatList, Image } from 'react-native'
import { Location, Permissions } from 'expo'

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index)
  }

  render() {
    const { item } = this.props
    return (
      <TouchableHighlight onPress={this._onPress} underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={require('../../assets/baloon.png')} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }
}

class ListScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      region: null,
      places: [],
      errorMessage: null,
      isLoading: true,
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Liste',
    title: 'Liste',
  }

  componentWillMount() {
    this.getLocationAsync()
    this.getPlacesAsync()
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
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

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item, index }) => (
    <ListItem item={item} index={index} onPressItem={this._onPressItem} />
  )

  _onPressItem = index => {
    console.log(`Pressed row: ${index}`)
    this.props.navigation.navigate('Directions', {
      data: this.state.places[index],
      title: this.state.places[index].title,
    })
  }

  render() {
    const { region, places } = this.state

    return (
      <FlatList
        data={places}
        location={region}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  type: {
    fontSize: 20,
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
})

export default ListScreen
