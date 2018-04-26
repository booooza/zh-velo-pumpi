import React from 'react'
import { AppRegistry, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Root } from './src/config/router'
import { Asset, AppLoading } from 'expo'

class App extends React.Component {
  state = {
    isReady: true,
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    const data = require('./assets/velopumpstation.json')
    return <Root screenProps={{ data }} />
  }

  async _cacheResourcesAsync() {
    // TODO
  }
}

export default App
AppRegistry.registerComponent('App', () => App)
