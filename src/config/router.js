import { TabNavigator, StackNavigator } from 'react-navigation'

import MapScreen from '../screens/MapScreen'
import ListScreen from '../screens/ListScreen'
import DirectionScreen from '../screens/DirectionScreen'

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
    swipeEnabled: false,
  },
)

export const StacksOverTabs = StackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      title: 'Velopumpen in Zürich',
    },
  },
})

export const DirectionStack = StackNavigator({
  Directions: {
    screen: DirectionScreen,
  },
})

export const Root = StackNavigator(
  {
    Home: {
      screen: StacksOverTabs,
    },
    Directions: {
      screen: DirectionStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
)
