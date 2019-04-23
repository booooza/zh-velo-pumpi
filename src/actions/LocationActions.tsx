import { Location, Permissions } from 'expo';
// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Import Location Typing
import { ILocation, ILocationState } from '../reducers/locationReducer';

// Create Action Constants
export enum LocationActionTypes {
  GET_LOCATION = 'GET_LOCATION',
}

// Interface for Get Location Action Type
export interface ILocationGetLocationAction {
  type: LocationActionTypes.GET_LOCATION;
  location: ILocation;
}

/* 
Combine the action types with a union (we assume there are more)
example: export type LocationActions = IGetAllAction | IGetOneAction ... 
*/
export type LocationActions = ILocationGetLocationAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getLocation: ActionCreator<
  ThunkAction<Promise<any>, ILocationState, null, ILocationGetLocationAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      try {
        console.log('Asking for permissions');
        await Permissions.askAsync(Permissions.LOCATION);
      } catch (err) {
        console.error(err);
      }

      console.log('Getting current position');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      dispatch({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        type: LocationActionTypes.GET_LOCATION,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
