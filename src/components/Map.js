import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';

const Marker = MapView.Marker;

const deltas = {
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
};

export default class Map extends Component {

    renderMarkers() {
        _onCalloutPress = (data) => {
            console.log("Pressed callout: " 
            + data.coordinate.latitude + " " 
            + data.coordinate.latitude);
            this.props.navigation.navigate(
                'Directions', {
                    coordinate: data.coordinate
                }
            );
        };
        
        return this.props.places.map((place, i) => (
          <Marker {...this.props}
            key={i}
            title={place.title}
            description={place.type}
            coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
            }}
            onCalloutPress={e => _onCalloutPress(e.nativeEvent)}
          />
        ));
    }

	static defaultProps = {
		location: {
			latitude: 37.321996988,
			longitude: -122.0325472123455
		}
	};

	render() {
		const { region } = this.props
		return (
            <MapView
            style={styles.container}
            region={region}
            showsUserLocation
            showsMyLocationButton
            >
              {this.renderMarkers()}
            </MapView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%'
	}
});