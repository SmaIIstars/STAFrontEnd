import { combineReducers } from "redux-immutable";

import { reducer as app } from "../views/store";
import { reducer as authority } from "../views/Authority/store";
import { reducer as personnel } from "../views/Personnel/store";
import { reducer as project } from "../views/Project/store";

const cReducer = combineReducers({
  app,
  personnel,
  authority,
  project,
});

export default cReducer;
