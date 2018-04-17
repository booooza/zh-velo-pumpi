import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Location, Permissions, MapView } from 'expo';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const GOOGLE_MAPS_APIKEY = 'AIzaSyCsBCVuRulDZe4f3tlGfpVuc_fM0m3iquA';

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

class DirectionScreen extends Component {
	state = {
        region: null,
        errorMessage: null,
        coords: [],
        coordinates: [
            {
              latitude: 37.3317876,
              longitude: -122.0054812,
            },
            {
              latitude: 37.771707,
              longitude: -122.4053769,
            },
          ],
	};

	componentWillMount() {
        this.getLocationAsync();
	}

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
    };
      
	render() {
        const params = this.props.navigation.state.params;

        const { region, coords } = this.state;
		if (!coords) {
			return (
				<View>
					<Text>Waiting...</Text>
				</View>
			);
        }

        return (
            <MapView
            initialRegion={region}
            style={StyleSheet.absoluteFill}
            ref={c => this.mapView = c}
            showsUserLocation
            showsMyLocationButton
        >
            {this.state.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
            )}
            {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
                origin={region}
                waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
                destination={{
                    longitude: params.data.longitude,
                    latitude: params.data.latitude
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
                onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={(result) => {
                this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                    }
                });
                }}
                onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
                }}
            />
            )}
        </MapView>
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
