import axios from "axios";
import { INITIAL_PAGE } from "../constants/routes";
import { removeUserToken } from "../helpers/storage";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  formSerializer: {
    dots: true,
    indexes: null,
  },
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.config && error.response && error.response.status === 401) {
      removeUserToken();
      delete api.defaults.headers.common["Authorization"];
      window.location.href = INITIAL_PAGE;

      return api.request(error.config);
    }

    return Promise.reject(error);
  },
);

export default api;
