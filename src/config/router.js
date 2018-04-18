import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MapScreen from '../screens/MapScreen';
import ListScreen from '../screens/ListScreen';
import DirectionScreen from '../screens/DirectionScreen';

const TabNav = TabNavigator(
    {
        MapScreen: {
        screen: MapScreen,
        navigationOptions: {
          title: 'Karte',
        },
      },
      ListScreen: {
        screen: ListScreen,
        navigationOptions: {
          title: 'Liste',
        },
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
      navigationOptions: {
        title: 'Navigation',
      },
    },
});

export const Root = StackNavigator({
    Home: {
        screen: StacksOverTabs,
        navigationOptions: {
          title: 'Velopumpen in Zürich',
        },
    },
    Directions: {
      screen: DirectionStack,
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
});
