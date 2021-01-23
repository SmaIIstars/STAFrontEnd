import axios from "axios";
import { TIMEOUT } from "./config";
import store from "../store";

import { changeLoadingStatusAction } from "views/store/actionCreators";
import { message } from "antd";

const instance = axios.create({
  timeout: TIMEOUT,
});

instance.interceptors.request.use((config) => {
  store.dispatch(changeLoadingStatusAction(true));
  return config;
});

instance.interceptors.response.use((config) => {
  store.dispatch(changeLoadingStatusAction(false));
  const { data } = config;
  if (data.code && data.code === 1003) {
    message.error({
      content: data.error,
    });
    message.error({
      content: "请先登录",
    });
    setTimeout(() => {
      window.location.replace("/login");
    }, 3000);
  }

  return config;
});

export default instance;
