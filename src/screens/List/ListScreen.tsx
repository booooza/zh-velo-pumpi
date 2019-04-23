import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import {
  NavigationScreenProps,
  NavigationScreenProp,
  TabScene,
} from 'react-navigation';
import ListItem from '../../components/ListItem';

import { connect } from 'react-redux';
import { IAppState } from '../../store/Store';
import { IFeature } from '../../reducers/featureReducer';

export interface ListScreenProps {
  features: IFeature[];
  navigation: NavigationScreenProp<any, any>;
}

class ListScreen extends Component<ListScreenProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    tabBarIcon: ({ tintColor }: TabScene) => {
      return <Ionicons name="md-list" color={tintColor} size={24} />;
    },
  });

  renderItem = ({ item }: { item: IFeature }) => (
    // <Text>{item.properties.bezeichnung}</Text>
    <ListItem feature={item} onPressItem={this.onPressItem} />
  );

  keyExtractor = (item: IFeature, index: number) => item.properties.bezeichnung;

  renderSeparator = () => (
    <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }} />
  );

  onPressItem = (feature: IFeature) => {
    console.log(`Pressed feature: ${feature.properties.bezeichnung}`);

    this.props.navigation.navigate('Directions', { feature });
  };

  public render() {
    const { features } = this.props;

    return (
      <View>
        <FlatList
          data={features}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
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

export default connect(mapStateToProps)(ListScreen);
