import { combineReducers } from "redux";

import auth from "./auth/reducer";
import todo from "./todo/reducer";

const appReducer = combineReducers({
  auth,
  todo,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
