import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native'

const thumb = require('../../assets/baloon.png')

export default class ListItem extends PureComponent {
    onPress = () => {
      this.props.onPressItem(this.props.index)
    }

    render() {
      const { item } = this.props
      return (
        <TouchableHighlight onPress={this.onPress} underlayColor="#dddddd">
          <View>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={thumb} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.type}>{item.type}</Text>
              </View>
              <View style={styles.distanceContainer}>
                <Text style={styles.distance}>
                  {item.distance.text}
                </Text>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      )
    }
}

const styles = StyleSheet.create({
  thumb: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  distanceContainer: {
    flex: 0.35,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#48BBEC',
  },
  type: {
    fontSize: 15,
    color: '#656565',
  },
  distance: {
    fontSize: 15,
    color: '#656565',
    textAlign: 'right',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
})
