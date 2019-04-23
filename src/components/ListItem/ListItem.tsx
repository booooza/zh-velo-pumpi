import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import styles from './styles';
import { IFeature } from '../../reducers/featureReducer';

interface ListItemProps {
  feature: IFeature;
  onPressItem: any;
}

class ListItem extends PureComponent<ListItemProps> {
  constructor(props: ListItemProps) {
    super(props);
  }

  onPress = () => {
    this.props.onPressItem(this.props.feature);
  };

  public render() {
    const { feature } = this.props;
    const thumb = require('../../../assets/baloon.png');

    return (
      <TouchableHighlight underlayColor="#dddddd" onPress={this.onPress}>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={thumb} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{feature.properties.bezeichnung}</Text>
              <Text style={styles.type}>{feature.properties.typ}</Text>
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
