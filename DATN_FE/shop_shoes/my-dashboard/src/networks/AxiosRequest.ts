import Axios from "axios";
import { KEY_STORAGE, RESPONSE_CODE } from "../constants/constants";

export const AxiosConfig = {
  baseURL: "http://localhost:8080/api/v1",
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
};

const AxiosRequest = Axios.create(AxiosConfig);

AxiosRequest.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(KEY_STORAGE.TOKEN);
    config.data = { ...config.data };
    if (token) {
      config.data.token = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AxiosRequest.interceptors.response.use(
  async function (response) {
    const { code } = response.data;

    if (code == RESPONSE_CODE.NOT_AUTHOR) {
      return window.location.replace("/sign-in");
    }
    if ([RESPONSE_CODE.NOT_AUTHEN, RESPONSE_CODE.INCORRECT].includes(code)) {
      const getNewToken = await Axios.create(AxiosConfig).post(
        "auth/refresh-token",
        {
          refreshToken: localStorage.getItem(KEY_STORAGE.RF_TOKEN),
        }
      );
      if (getNewToken.data.code === 0) {
        const newToken = getNewToken.data?.data;
        localStorage.setItem(KEY_STORAGE.TOKEN, newToken);
        const reCallRequest = await Axios.create(AxiosConfig).request({
          data: {
            ...JSON.parse(response.config.data),
            token: newToken,
          },
          method: response.config.method,
          url: response.config.url,
        });
        if (reCallRequest.data.code === 0) {
          return reCallRequest.data;
        } else {
          return window.location.replace("/sign-in");
        }
      } else {
        return window.location.replace("/sign-in");
      }
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosRequest;
