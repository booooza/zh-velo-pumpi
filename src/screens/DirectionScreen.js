import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Location, Permissions, MapView } from 'expo';

import DirectionService from '../services/directions';
import Map from '../components/Map';

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

// const { params } = this.props.navigation.state.params;

class DirectionScreen extends Component {
	state = {
        region: null,
        errorMessage: null,
        coords: []
	};

	componentWillMount() {
        this.getLocationAsync();
	}

    getDirections = async () => {
        const coords = await DirectionService.getData("40.1884979, 29.061018", "41.0082,28.9784");
        this.setState({ coords: coords });
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
        await this.getDirections();
	};

	render() {
        const { region, coords } = this.state;
		if (!coords) {
			return (
				<View>
					<Text>Waiting...</Text>
				</View>
			);
		}
        console.log(JSON.stringify(this.state.coords))
		return (
            <SafeAreaView style={styles.container}>
                <MapView
                style={styles.map}
                initialRegion={region}
                showsUserLocation
                showsMyLocationButton
                >
                <MapView.Polyline
                    style={styles.map}
                    coordinates={coords}
                    strokeWidth={2}
                    strokeColor="red"
                />
                </MapView>
            </SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
        justifyContent: 'flex-start',
        width: '100%',
		height: '100%'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      },
});

export default DirectionScreen;
