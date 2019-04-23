// Import Reducer type
import { Reducer } from 'redux';
import { FeatureActions, FeatureActionTypes } from '../actions/FeatureActions';

// Define the Geometry type
export interface IGeometry {
  type: string;
  coordinates: number[];
}

// Define the Properties type
export interface IProperties {
  bezeichnung: string;
  typ: string;
}

// Define the Feature type
export interface IFeature {
  type: string;
  geometry: IGeometry;
  properties: IProperties;
}

// Define the Feature State
export interface IFeatureState {
  readonly features: IFeature[];
}

// Define the initial state
const initialFeatureState: IFeatureState = {
  features: [],
};

export const featureReducer: Reducer<IFeatureState, FeatureActions> = (
  state = initialFeatureState,
  action
) => {
  switch (action.type) {
    case FeatureActionTypes.GET_ALL: {
      return {
        ...state,
        features: action.features,
      };
    }
    default:
      return state;
  }
};
