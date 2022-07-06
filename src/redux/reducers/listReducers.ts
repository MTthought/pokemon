import processData from "../../helpers";
import * as types from "../actions/actionTypes";
import { ListState, Action, LocalStorage } from "../../Types";
import { baseUrl } from "../../constants";

const initialState: ListState = {
  page: {
    current: baseUrl,
    next: null,
    previous: null,
  },
  settings: {
    sortBy: "unsorted",
    search: "",
  },
  rawList: [],
  processedList: [],
  status: "No search match",
  details: undefined,
};

export default function listReducer(
  state: ListState = initialState,
  action: Action
): ListState {
  switch (action.type) {
    case types.GET_LOCAL_STORAGE:
      const currentPage: LocalStorage = localStorage.getItem("currentPage");
      const sortValue: LocalStorage = localStorage.getItem("sortBy");
      const searchValue: LocalStorage = localStorage.getItem("search");

      return {
        ...state,
        page: {
          ...state.page,
          current: currentPage ? currentPage : initialState.page.current,
        },
        settings: {
          sortBy: sortValue ? sortValue : initialState.settings.sortBy,
          search: searchValue ? searchValue : initialState.settings.search,
        },
      };
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
