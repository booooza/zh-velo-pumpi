import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    headerTitle: 'Home',
    headerLeft: (
      <Ionicons
        name="md-menu"
        style={styles.icon}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
  });

  public render() {
    return (
      <View style={styles.container}>
        <Text>This is the HomeScreen.</Text>
      </View>
    );
  }
}

export default HomeScreen;
