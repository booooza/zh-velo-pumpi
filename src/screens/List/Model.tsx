import React, { PureComponent } from 'react';
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { ROUTES } from '../../routes';

/**
 * The Modal screen
 */
export class ModalScreen extends PureComponent<NavigationScreenProps> {
  // screen navigation options
  static navigationOptions = (
    screenProps: NavigationScreenProps
  ): NavigationStackScreenOptions => {
    // Close Modal
    const _buttonleftPress = (event: GestureResponderEvent) => {
      screenProps.navigation.navigate(ROUTES.RootMain);
    };

    return {
      headerStyle: {
        elevation: 0,
        backgroundColor: '#F5FCFF',
      },
      headerLeft: (
        <Icon.Button
          name="close"
          backgroundColor="transparent"
          underlayColor="transparent"
          color="black"
          onPress={_buttonleftPress}
        />
      ),
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Modal Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
