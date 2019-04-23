// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Feature Typing
import { IFeature, IFeatureState } from '../reducers/featureReducer';

// Create Action Constants
export enum FeatureActionTypes {
  GET_ALL = 'GET_ALL',
}

// Interface for Get All Action Type
export interface IFeatureGetAllAction {
  type: FeatureActionTypes.GET_ALL;
  features: IFeature[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type FeatureActions = IGetAllAction | IGetOneAction ... 
*/
export type FeatureActions = IFeatureGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllFeatures: ActionCreator<
  ThunkAction<Promise<any>, IFeatureState, null, IFeatureGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        'https://data.stadt-zuerich.ch/dataset/f25cf7cb-e289-4197-a76c-37eee69d8b90/resource/4cea6136-d927-43b5-b1ae-4fce8a52058f/download/velopumpstation.json'
      );
      dispatch({
        features: response.data.features,
        type: FeatureActionTypes.GET_ALL,
      });
    } catch (err) {
      console.error(err);
    }
  };
};
