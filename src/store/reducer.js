import { combineReducers } from "redux-immutable";

import { reducer as app } from "../views/store";

const cReducer = combineReducers({
  app,
});

export default cReducer;
