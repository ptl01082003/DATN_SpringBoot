import { Response } from "../constants/constants";
import AxiosClient from "../networks/AxiosRequest";

const SUB_PATH = "/auth";

const AuthService = {
  login: async (params: any): Promise<Response<any>> => {
    const response = await AxiosClient.post<any, Response<any>>(
      `${SUB_PATH}/login-dashboard`,
      params
    );
    return response;
  },
};
export default AuthService;
