import { Ionicons } from '@expo/vector-icons';
import { MapView, Marker } from 'expo';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenProp,
  TabScene,
} from 'react-navigation';
import styles from './styles';

import { connect } from 'react-redux';
import { IAppState } from '../../store/Store';
import { IFeature } from '../../reducers/featureReducer';
import { ILocation } from '../../reducers/locationReducer';

// Create the containers interface
interface MapScreenProps {
  features: IFeature[];
  location: ILocation;
  navigation: NavigationScreenProp<any, any>;
}

class MapScreen extends Component<MapScreenProps> {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }: TabScene) => {
      return <Ionicons name="md-map" color={tintColor} size={24} />;
    },
  };

  onPressItem = (feature: IFeature) => {
    console.log(`Pressed feature: ${feature.properties.bezeichnung}`);

    this.props.navigation.navigate('Directions', { feature });
  };

  public render() {
    const { features } = this.props;
    const { location } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: location.longitudeDelta,
            longitudeDelta: location.latitudeDelta,
          }}
        >
          {features.map((feature, index) => {
            const coords = {
              latitude: feature.geometry.coordinates[1],
              longitude: feature.geometry.coordinates[0],
            };

            return (
              <MapView.Marker
                key={index}
                coordinate={coords}
                title={feature.properties.bezeichnung}
                description={feature.properties.typ}
                onCalloutPress={() => this.onPressItem(feature)}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

// Grab the features from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    features: store.featureState.features,
    location: store.locationState.location,
  };
};

export default connect(mapStateToProps)(MapScreen);
