import React from 'react';
import { AppRegistry, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Root } from './src/config/router';
let data = require('./assets/velopumpstation.json'); 

class App extends React.Component {

  render() {
    return (
        <Root 
        screenProps={{data: data}}
        />
    );
  }
}

export default App;
AppRegistry.registerComponent('App', () => App);
