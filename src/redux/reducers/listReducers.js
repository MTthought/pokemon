import processData from "../../helpers";

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
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LISTS":
      return {
        ...state,
        rawList: action.pokemon, // pokemon list as served from API
        processedList: processData(
          action.pokemon,
          state.settings.search,
          state.settings.sortBy
        ), // sorted and filtered pokemon list
      };
    case "UPDATE_PROCESSED_LIST":
      return {
        ...state,
        processedList: processData(
          state.rawList,
          state.settings.search,
          state.settings.sortBy
        ),
      };
    case "SET_SETTINGS":
      return { ...state, settings: action.settings };
    case "SET_PAGE":
      return { ...state, page: action.page };
    default:
      return state;
  }
}
