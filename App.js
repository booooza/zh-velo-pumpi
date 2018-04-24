import React from 'react';
import { AppRegistry, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Root } from './src/config/router';
import { Asset, AppLoading } from 'expo';


class App extends React.Component {

  state = {
    isReady: false,
  };
  
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    let data = require('./assets/velopumpstation.json'); 
    return (
        <Root 
        screenProps={{data: data}}
        />
    );
  }

  async _cacheResourcesAsync() {
    const files = [
      require('./assets/velopumpstation.json'),
    ];

    const cacheFiles = files.map((file) => {
      return Asset.fromModule(file).downloadAsync();
    });
    return Promise.all(cacheFiles)
  }

}

export default App;
AppRegistry.registerComponent('App', () => App);
