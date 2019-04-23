import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

class LoadingScreen extends Component {
  public render() {
    return (
      <View style={styles.container}>
        <Text>This is the LoadingScreen.</Text>
      </View>
    );
  }
}

export default LoadingScreen;
