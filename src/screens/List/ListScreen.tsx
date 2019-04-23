import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import {
  NavigationScreenProps,
  NavigationScreenProp,
  TabScene,
} from 'react-navigation';
import ListItem from '../../components/ListItem';

export interface ListScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

class ListScreen extends Component<ListScreenProps> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    tabBarIcon: ({ tintColor }: TabScene) => {
      return <Ionicons name="md-list" color={tintColor} size={24} />;
    },
  });

  constructor(props: any) {
    super(props);

    this.state = {
      markers: [
        {
          type: 'Point',
          latitude: 47.3760493207135,
          longitude: 8.52563569881196,
          bezeichnung: 'Helvetiaplatz',
          typ: 'Handpumpe',
        },
        {
          type: 'Point',
          latitude: 47.3678913047179,
          longitude: 8.54388787603914,
          bezeichnung: 'Utoquai (Pier 7)',
          typ: 'Handpumpe',
        },
      ],
    };
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }: { item: any }) => (
    <ListItem
      data={item}
      index={item.bezeichnung}
      onPressItem={this.onPressItem}
    />
  );

  renderSeparator = () => (
    <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }} />
  );

  onPressItem = (index: string) => {
    console.log(`Pressed row: ${index}`);
    this.props.navigation.navigate('Directions', { key: 'value' });
  };

  public render() {
    const { markers } = this.state;

    return (
      <View>
        <FlatList
          data={this.state.markers}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

export default ListScreen;
