import axios from "axios";
import { TIMEOUT } from "./config";

const instance = axios.create({
  timeout: TIMEOUT,
});

instance.interceptors.request.use((config) => {
  return config;
});

// instance.interceptors.response.use((config) => {});

export default instance;
