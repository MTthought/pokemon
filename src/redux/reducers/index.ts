import { combineReducers } from "redux";
import list from "./listReducers";
import details from "./detailsReducers";

const rootReducer = combineReducers({
  list,
  details,
});

export default rootReducer;
