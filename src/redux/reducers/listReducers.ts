import { processData } from "../../helpers";
import * as types from "../actions/actionTypes";
import { ListState, Action } from "../../Types";
import { baseUrl } from "../../constants";

const initialState: ListState = {
  page: {
    current: baseUrl,
    next: null,
    previous: null,
  },
  settings: {
    sortBy: "--",
    search: "",
  },
  rawList: [],
  processedList: [],
  status: "No search match",
};

export default function listReducer(
  state: ListState = initialState,
  action: Action
): ListState {
  switch (action.type) {
    case types.SET_LISTS:
      return {
        ...state,
        rawList: action.payload, // pokemon list as served from API
        processedList: processData(
          action.payload,
          state.settings.search,
          state.settings.sortBy
        ), // sorted and filtered pokemon list
        status: action.payload.length ? initialState.status : "Loading...",
      };
    case types.CHANGE_LIST:
      return {
        ...state,
        processedList: processData(
          state.rawList,
          state.settings.search,
          state.settings.sortBy
        ),
      };
    case types.SET_SETTINGS:
      return { ...state, settings: action.payload };
    case types.SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
}
