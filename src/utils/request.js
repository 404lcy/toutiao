import axios from "axios";
import store from "@/store";
import JSONBig from "json-bigint";
const request = axios.create({
  baseURL: "http://42.192.129.12:8000/",
  transformResponse: [
    function (data) {
      try {
        return JSONBig.parse(data);
      } catch (e) {
        return data;
      }
    },
  ],
});
export default request;
request.interceptors.request.use(
  //拦截器
  (config) => {
    const token = store.state?.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
