import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  NavigationScreenProps,
  TabScene,
  DrawerItems,
  SafeAreaView,
  ScrollView,
} from 'react-navigation';
import About from '../screens/About';
import Directions from '../screens/Directions';
import List from '../screens/List';
import Loading from '../screens/Loading';
import Map from '../screens/Map';
import Settings from '../screens/Settings';
import styles from './styles';
import { Text } from 'react-native';

const MainTabs = createBottomTabNavigator(
  { List, Map },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: '#F8F8F8', // active icon color
      inactiveTintColor: '#586589', // inactive icon color
      style: styles.tab,
    },
  }
);

MainTabs.navigationOptions = ({ navigation }: NavigationScreenProps) => ({
  title: 'Velopumpen in Zürich',
  headerLeft: (
    <Ionicons
      name="md-menu"
      style={styles.icon}
      onPress={() => navigation.toggleDrawer()}
    />
  ),
});

const MainTabsStack = createStackNavigator({
  MainTabs,
});

MainTabsStack.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name="md-home" type="ionicon" color={tintColor} size={20} />
  ),
};

const SettingsStack = createStackNavigator({ Settings });

SettingsStack.navigationOptions = {
  drawerLabel: 'Settings',
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name="md-cog" type="ionicon" color={tintColor} size={20} />
  ),
};

const AboutStack = createStackNavigator({ About });

AboutStack.navigationOptions = {
  drawerLabel: 'About',
  drawerIcon: ({ tintColor }: TabScene) => (
    <Ionicons name="md-help" type="ionicon" color={tintColor} size={20} />
  ),
};

const DirectionsStack = createStackNavigator({
  Directions: {
    screen: Directions,
  },
});

DirectionsStack.navigationOptions = ({
  navigation,
}: NavigationScreenProps) => ({
  headerLeft: (
    <Ionicons
      name="md-menu"
      style={styles.icon}
      onPress={() => navigation.goBack()}
    />
  ),
});

const MainNavigator = createDrawerNavigator({
  MainTabsStack,
  SettingsStack,
  AboutStack,
});

const RootSwitch = createSwitchNavigator(
  { Loading, MainNavigator, DirectionsStack },
  { initialRouteName: 'MainNavigator' }
);

const App = createAppContainer(RootSwitch);

// const App = createAppContainer(AboutStack);

export default App;
