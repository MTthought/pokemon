import * as types from "../actions/actionTypes";
import { DetailsState, Action } from "../../Types";

const initialState: DetailsState = {
  details: undefined,
  status: undefined,
};

export default function detailsReducer(
  state: DetailsState = initialState,
  action: Action
): DetailsState {
  switch (action.type) {
    case types.SET_DETAILS:
      return {
        ...state,
        details: action.payload,
        status: action.payload ? initialState.status : "Loading...",
      };
    default:
      return state;
  }
}
