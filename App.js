import React from 'react'
import { AppLoading } from 'expo'
import { AppRegistry } from 'react-native'
import { Root } from './src/config/router'

const data = require('./assets/velopumpstation.json')

class App extends React.Component {
  state = {
    isReady: true,
  }

  async cacheResourcesAsync() {
    // TODO
    return this
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      )
    }

    return <Root screenProps={{ data }} />
  }
}

export default App
AppRegistry.registerComponent('App', () => App)
