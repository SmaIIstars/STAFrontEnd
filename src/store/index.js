import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducer";

const reduxDevtools = window.devToolsExtension
  ? window.devToolsExtension()
  : (f) => f;

const store = createStore(
  reducer,
  compose(applyMiddleware(thunkMiddleware), reduxDevtools)
);

export default store;
