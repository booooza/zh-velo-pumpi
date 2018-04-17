import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { Location, Permissions } from 'expo';

import BikeService from '../services/velopumpen';

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

class ListItem extends React.PureComponent {
    _onPress = () => {
      this.props.onPressItem(this.props.index);
    }
  
    render() {
      const item = this.props.item;
      return (
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
              {/* <Image style={styles.thumb} source={require('./Resources/pump.png')} /> */}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.type}>{item.type}</Text>
              </View>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      );
    }
}

class ListScreen extends Component {
	state = {
        region: null,
        places: [],
		errorMessage: null
	};

	componentWillMount() {
		this.getLocationAsync();
	}

    getBikeData = async () => {
        const places = await BikeService.getData();
        this.setState({ places });
    };

	getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}

        let location = await Location.getCurrentPositionAsync({});
        const region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          ...deltas
        };
        await this.setState({ region });
        await this.getBikeData();
	};

    _keyExtractor = (item, index) => index.toString();
  
    _renderItem = ({item, index}) => (
        <ListItem 
          item={item}
          index={index}
          onPressItem={this._onPressItem}
        />
    );
      
    _onPressItem = (index) => {
        console.log("Pressed row: "+index);
        this.props.navigation.navigate(
            'Directions', {
              data: this.state.places[index]
        });
    };

	render() {
        const { region, places } = this.state;
		if (!places) {
			return (
				<View>
					<Text>Waiting...</Text>
				</View>
			);
		}

		return (
          <FlatList
            data={places}
            location={region}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
		);
	}
}

const styles = StyleSheet.create({
    thumb: {
      width: 80,
      height: 80,
      marginRight: 10
    },
    textContainer: {
      flex: 1
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd'
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#48BBEC'
    },
    type: {
      fontSize: 20,
      color: '#656565'
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10
    },
  });

export default ListScreen;
