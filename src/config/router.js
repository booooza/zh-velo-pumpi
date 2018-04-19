import React from 'react';
import { TabNavigator, StackNavigator, ActivityIndicator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MapScreen from '../screens/MapScreen';
import ListScreen from '../screens/ListScreen';
import DirectionScreen from '../screens/DirectionScreen';

const TabNav = TabNavigator(
    {
        MapScreen: {
        screen: MapScreen,
      },
      ListScreen: {
        screen: ListScreen,
      },
    },
    {
      tabBarPosition: 'bottom',
      animationEnabled: false,
      swipeEnabled: false,
    }
  );
  
export const StacksOverTabs = StackNavigator({
    Home: {
      screen: TabNav,
      navigationOptions: {
        title: 'Velopumpen in Zürich',
      },
    },
});

export const DirectionStack = StackNavigator({
    Directions: {
      screen: DirectionScreen,
    },
});

export const Root = StackNavigator({
    Home: {
      screen: StacksOverTabs,
    },
    Directions: {
      screen: DirectionStack,
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
});
