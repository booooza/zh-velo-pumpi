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

interface IMarker {
  type: string;
  latitude: number;
  longitude: number;
  bezeichnung: string;
  typ: string;
}

type MapState = {
  isLoading: boolean;
  markers: IMarker[];
};

export interface MapScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

class MapScreen extends Component<MapScreenProps, MapState> {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }: TabScene) => {
      return <Ionicons name="md-map" color={tintColor} size={24} />;
    },
  };

  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      markers: [
        {
          type: 'Point',
          latitude: 47.3760493207135,
          longitude: 8.52563569881196,
          bezeichnung: 'Helvetiaplatz',
          typ: 'Handpumpe',
        },
        {
          type: 'Point',
          latitude: 47.3678913047179,
          longitude: 8.54388787603914,
          bezeichnung: 'Utoquai (Pier 7)',
          typ: 'Handpumpe',
        },
      ],
    };
  }

  onPressItem = (index: number) => {
    console.log(`Pressed marker: ${index}`);
    this.props.navigation.navigate('Directions', { key: 'value' });
  };

  public render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: 47.3678913047179,
            longitude: 8.54388787603914,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.isLoading
            ? null
            : this.state.markers.map((marker: IMarker, index: number) => {
                const coords = {
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                };

                return (
                  <MapView.Marker
                    key={index}
                    coordinate={coords}
                    title={marker.bezeichnung}
                    description={marker.typ}
                    onCalloutPress={(index: number) => this.onPressItem(index)}
                  />
                );
              })}
        </MapView>
      </View>
    );
  }
}

export default MapScreen;
