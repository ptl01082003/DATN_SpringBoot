import Axios from "axios";
import { KEY_STORAGE, RESPONSE_CODE } from "../constants/constants";
import { AxiosConfig } from "./AxiosRequest";

const AxiosConfigNode = {
  baseURL: "http://localhost:5500/api/v1",
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
};

export const AxiosRequestNode = Axios.create(AxiosConfigNode);

AxiosRequestNode.interceptors.request.use(
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

AxiosRequestNode.interceptors.response.use(
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
        const reCallRequest = await Axios.create(AxiosConfigNode).request({
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

export default AxiosRequestNode;
