import * as React from 'react';

import Navigator from './navigator/Navigator';
/* Make the store available to all container 
components in the application without passing it explicitly */
import { Provider } from 'react-redux';

// Store type from Redux
import { Store } from 'redux';

// Import the store function and state
import configureStore, { IAppState } from './store/Store';
import { getAllFeatures } from './actions/FeatureActions';
import { getLocation } from './actions/LocationActions';

interface IProps {
  store: Store<IAppState>;
}

// Generate the store
const store = configureStore();
store.dispatch(getAllFeatures());
store.dispatch(getLocation());

// Render the App
export default class App extends React.Component<IProps> {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
