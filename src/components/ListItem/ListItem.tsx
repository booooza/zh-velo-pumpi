import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import styles from './styles';

interface ListItemState {
  data: object;
  index: number;
}

interface ListItemProps {
  data?: object;
  onPressItem: any;
  index: number;
}

class ListItem extends PureComponent<ListItemProps, ListItemState> {
  public static defaultProps: Partial<ListItemProps> = {
    data: { key: 'value' },
  };

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
