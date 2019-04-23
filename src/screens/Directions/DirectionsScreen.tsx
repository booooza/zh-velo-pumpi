import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { NavigationScreenProps, NavigationActions } from 'react-navigation';

class DirectionsScreen extends Component {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    headerTitle: 'Navigation',
    headerLeft: (
      <Ionicons
        name="md-arrow-dropleft"
        style={styles.icon}
        onPress={() => navigation.toggleDrawer()}
        // onpress={console.log('back')}
      />
    ),
  });

  public render() {
    return (
      <View style={styles.container}>
        <Text>This is the DirectionsScreen.</Text>
      </View>
    );
  }
}

export default DirectionsScreen;
