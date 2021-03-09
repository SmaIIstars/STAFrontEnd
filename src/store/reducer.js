import { combineReducers } from "redux-immutable";

import { reducer as app } from "../views/store";
import { reducer as personnel } from "../views/Personnel/store";
import { reducer as authority } from "../views/Authority/store";

const cReducer = combineReducers({
  app,
  personnel,
  authority,
});

export default cReducer;
