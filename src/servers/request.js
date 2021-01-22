import axios from "axios";
import { TIMEOUT } from "./config";
import store from "../store";

import { changeLoadingStatusAction } from "views/store/actionCreators";

const instance = axios.create({
  timeout: TIMEOUT,
});

instance.interceptors.request.use((config) => {
  store.dispatch(changeLoadingStatusAction(true));
  return config;
});

instance.interceptors.response.use((config) => {
  store.dispatch(changeLoadingStatusAction(false));
  return config;
});

export default instance;
