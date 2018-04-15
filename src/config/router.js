import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MapScreen from '../screens/MapScreen';
import ListScreen from '../screens/ListScreen';

export const Tabs = TabNavigator({
    MapScreen: {
      screen: MapScreen,
    },
    ListScreen: {
      screen: ListScreen,
    },
});