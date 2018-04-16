import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Tabs } from './src/config/router';
import { StacksOverTabs } from './src/config/router';

class App extends React.Component {

  render() {
    return (
        <StacksOverTabs />
    );
  }
}

export default App;

