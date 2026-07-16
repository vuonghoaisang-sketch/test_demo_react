//File này dùng để customize lại axios, có thể thêm các interceptor để xử lý request và response
import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;

    NProgress.start();
    // Do something before the request is sent
    return config;
  },
  function (error) {
    NProgress.start();
    // Do something with the request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  },
);
export default instance;
