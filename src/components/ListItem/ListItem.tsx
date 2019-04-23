import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import styles from './styles';

type ListItemState = {
  data: object;
  index: number;
  //   type: string;
  //   latitude: number;
  //   longitude: number;
  //   bezeichnung: string;
  //   typ: string;
};

class ListItem extends PureComponent<
  { data: object; onPressItem: any; index: number },
  ListItemState
> {
  constructor(props: any) {
    super(props);
  }

  onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  public render() {
    const item = this.props.data;
    const thumb = require('../../../assets/baloon.png');

    return (
      <TouchableHighlight underlayColor="#dddddd" onPress={this.onPress}>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={thumb} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.bezeichnung}</Text>
              <Text style={styles.type}>{item.typ}</Text>
            </View>
            <View style={styles.distanceContainer}>
              <Text style={styles.distance}>1 km</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }
}

export default ListItem;
