// Import Reducer type
import { Reducer } from 'redux';
import {
  LocationActions,
  LocationActionTypes,
} from '../actions/LocationActions';

// Define the Location type
export interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

// Define the Location State
export interface ILocationState {
  readonly location: ILocation;
}

// Define the initial state
const initialLocationState: ILocationState = {
  location: {
    latitude: 47.3856660474379,
    longitude: 8.53574403676952,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
};

export const locationReducer: Reducer<ILocationState, LocationActions> = (
  state = initialLocationState,
  action
) => {
  switch (action.type) {
    case LocationActionTypes.GET_LOCATION: {
      return {
        ...state,
        location: action.location,
      };
    }
    default:
      return state;
  }
};
