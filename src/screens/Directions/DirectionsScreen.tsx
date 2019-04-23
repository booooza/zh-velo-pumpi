import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from './styles';

class DirectionsScreen extends Component {
  static navigationOptions = {
    title: 'Directions',
  };

  public render() {
    return (
      <View style={styles.container}>
        <Text>This is the DirectionsScreen.</Text>
      </View>
    );
  }
}

export default DirectionsScreen;
