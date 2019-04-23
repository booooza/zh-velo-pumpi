import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});

export default styles;
