import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MapScreen from '../screens/MapScreen';
import ListScreen from '../screens/ListScreen';

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
