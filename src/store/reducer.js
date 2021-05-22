import { combineReducers } from "redux-immutable";

import { reducer as app } from "../views/store";
import { reducer as authority } from "../views/Authority/store";
import { reducer as personnel } from "../views/Personnel/store";
import { reducer as project } from "../views/Project/store";
import { reducer as paper } from "../views/Paper/store";
import { reducer as patent } from "../views/Patent/store";
import { reducer as monograph } from "../views/Monograph/store";
import { reducer as srta } from "../views/SRTA/store";
import { reducer as meeting } from "../views/Meeting/store";

const cReducer = combineReducers({
  app,
  personnel,
  authority,
  project,
  paper,
  patent,
  monograph,
  srta,
  meeting,
});

export default cReducer;
