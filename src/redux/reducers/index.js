import { combineReducers } from "redux";
import list from "./listReducers";

const rootReducer = combineReducers({
  list,
});

export default rootReducer;
