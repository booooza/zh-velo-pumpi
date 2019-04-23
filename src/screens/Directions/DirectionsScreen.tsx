import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from './styles';
import { NavigationScreenProp } from 'react-navigation';

import { connect } from 'react-redux';
import { IAppState } from '../../store/Store';
import { IFeature } from '../../reducers/featureReducer';

export interface DirectionsScreenProps {
  feature: IFeature;
  navigation: NavigationScreenProp<any>;
}

class DirectionsScreen extends Component<DirectionsScreenProps> {
  static navigationOptions = {
    title: 'Directions',
  };

  public render() {
    const { feature } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>Directions to {feature.properties.bezeichnung}.</Text>
      </View>
    );
  }
}

// Grab the features from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    features: store.featureState.features,
  };
};

export default connect(mapStateToProps)(DirectionsScreen);
