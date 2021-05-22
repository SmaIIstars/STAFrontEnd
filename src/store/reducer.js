import { combineReducers } from "redux-immutable";

import { reducer as app } from "../views/store";
import { reducer as authority } from "../views/Authority/store";
import { reducer as personnel } from "../views/Personnel/store";
import { reducer as project } from "../views/Project/store";
import { reducer as paper } from "../views/Paper/store";
import { reducer as patent } from "../views/Patent/store";

const cReducer = combineReducers({
  app,
  personnel,
  authority,
  project,
  paper,
  patent,
});

export default cReducer;
