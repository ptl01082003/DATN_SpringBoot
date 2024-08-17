import Axios from "axios";
import {
  KEY_STORAGE,
  PATH_ROUTER,
  removeStorage,
  RESPONSE_CODE,
} from "../constants";

const AxiosConfig = {
  baseURL: "http://localhost:5500/api/v1",
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
};

const AxiosClient = Axios.create(AxiosConfig);

AxiosClient.interceptors.request.use(
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

AxiosClient.interceptors.response.use(
  async function (response) {
    const { code } = response.data;
    if ([RESPONSE_CODE.NOT_AUTHOR, RESPONSE_CODE.INCORRECT].includes(code)) {
      removeStorage();
      return window.location.replace(PATH_ROUTER.SIGN_IN);
    }
    if (RESPONSE_CODE.NOT_AUTHEN == code) {
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
          removeStorage();
          return window.location.replace(PATH_ROUTER.SIGN_IN);
        }
      } else {
        removeStorage();
        return window.location.replace(PATH_ROUTER.SIGN_IN);
      }
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosClient;
