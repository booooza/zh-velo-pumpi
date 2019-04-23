import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    headerTitle: 'Settings',
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
        <Text>This is the SettingsScreen.</Text>
      </View>
    );
  }
}

export default SettingsScreen;
