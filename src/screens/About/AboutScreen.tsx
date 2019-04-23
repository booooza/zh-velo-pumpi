import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';

class AboutScreen extends Component {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    headerTitle: 'About',
    headerLeft: (
      <Ionicons
        name="md-menu"
        style={styles.icon}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
  });

  public render() {
    const image = require('../../../assets/marc.png');
    return (
      <View style={styles.container}>
      <Image style={styles.image} source={image} />
        <Text style={styles.header}>Entwicklung</Text>
        <Text>
          Diese App wurde von Marc Bischof als Open-Source Projekt entwickelt.
          Bei Fragen oder Anregungen melde dich unter github.com/booooza.{"\n"}
        </Text>
        <Text style={styles.header}>Credits</Text>
        <Text><Text style={styles.bold}>Expo</Text> (https://exp.host/@booooza/zhvelopumpi)</Text>
        <Text><Text style={styles.bold}>React Native</Text> (https://facebook.github.io/react-native/) </Text>
        <Text>
        <Text style={styles.bold}>React Navigation</Text> (https://github.com/react-navigation/react-navigation)
        </Text>
        <Text><Text style={styles.bold}>React Native Maps
          Directions</Text> (https://github.com/bramus/react-native-maps-directions
        </Text>
        <Text><Text style={styles.bold}>Mapbox/polyline </Text> (https://github.com/mapbox/polyline)</Text>
        <Text><Text style={styles.bold}>Swiss Open Data</Text>      (https://opendata.swiss/de/dataset/velopumpstationen-in-der-stadt-zurich1)
        </Text>
        <Text><Text style={styles.bold}>"Bicycle Pump" Icon by Nicolas
          Molès</Text> 
          (https://thenounproject.com/nicolas.moles/) from the Noun
          Project (https://thenounproject.com)
        </Text>
      </View>
    );
  }
}

export default AboutScreen;
