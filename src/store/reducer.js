import { combineReducers } from "redux-immutable";

import { reducer as app } from "../views/store";
import { reducer as personnel } from "../views/Personnel/store";

const cReducer = combineReducers({
  app,
  personnel,
});

export default cReducer;
