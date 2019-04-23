import * as React from 'react';
import { Text, View } from 'react-native';

import FeatureList from './containers/FeatureList';
/* Make the store available to all container 
components in the application without passing it explicitly */
import { Provider } from 'react-redux';

// Store type from Redux
import { Store } from 'redux';

// Import the store function and state
import configureStore, { IAppState } from './store/Store';
import { getAllFeatures } from './actions/FeatureActions';

interface IProps {
  store: Store<IAppState>;
}

/* 
Create a root component that receives the store via props
and wraps the App component with Provider, giving props to containers
*/
const Root: React.SFC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <View>
        <Text>Features:</Text>
        <FeatureList />
      </View>
    </Provider>
  );
};

// Generate the store
const store = configureStore();
store.dispatch(getAllFeatures());

// Render the App
export default class Index extends React.Component<IProps> {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>Features:</Text>
          <FeatureList />
        </View>
      </Provider>
    );
  }
}
