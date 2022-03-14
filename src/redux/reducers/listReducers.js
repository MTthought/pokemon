export default function listReducer(state = { processed: [] }, action) {
  switch (action.type) {
    case "GET_LIST":
      return { ...state, processed: action.list };
    default:
      return state;
  }
}
