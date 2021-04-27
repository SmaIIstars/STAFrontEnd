import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

import "assets/css/index.css";
import "font-awesome/css/font-awesome.css";
import store from "./store";

/*
Although many modules are identical, I don't encapsulate them. It is convenient to write different pages later.
*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
