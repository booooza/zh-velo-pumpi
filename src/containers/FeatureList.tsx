import * as React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { IAppState } from '../store/Store';

import { IFeature } from '../reducers/featureReducer';

// Create the containers interface
interface IProps {
  features: IFeature[];
}

class FeatureList extends React.Component<IProps> {
  public render() {
    const { features } = this.props;
    return (
      <View>
        {features.map((feature, index) => {
          return (
            <Text key={index}>
              {feature.type}
              {feature.properties.bezeichnung}
              {feature.properties.typ}
              {feature.geometry.coordinates[0]}
              {feature.geometry.coordinates[1]}
              {feature.geometry.type}
            </Text>
          );
        })}
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

export default connect(mapStateToProps)(FeatureList);
