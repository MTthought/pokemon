import processData from "../../helpers";
import * as types from "../actions/actionTypes";

const initialState = {
  page: {
    current: localStorage.getItem("currentPage"),
    next: null,
    previous: null,
  },
  settings: {
    sortBy: localStorage.getItem("sortBy")
      ? localStorage.getItem("sortBy")
      : "unsorted",
    search: localStorage.getItem("search")
      ? localStorage.getItem("search")
      : "",
  },
  rawList: [],
  processedList: [],
  status: "No search match",
};

export default function listReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SET_LISTS:
      return {
        ...state,
        rawList: action.pokemon, // pokemon list as served from API
        processedList: processData(
          action.pokemon,
          state.settings.search,
          state.settings.sortBy
        ), // sorted and filtered pokemon list
        status: action.pokemon.length ? initialState.status : "Loading...",
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
      return { ...state, settings: action.settings };
    case types.SET_PAGE:
      return { ...state, page: action.page };
    default:
      return state;
  }
}
