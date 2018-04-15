import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Location, Permissions } from 'expo';

import BikeService from '../services/velopumpen';
import Map from '../components/Map';

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};
  
export default class HomeScreen extends Component {
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
            <SafeAreaView style={styles.container}>
                <Map
                region={region}
                places={this.state.places}
                />
            </SafeAreaView>
		);
	}
}

const styles = {};