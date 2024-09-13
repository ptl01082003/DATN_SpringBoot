import { Response } from "../constants/constants";
import AxiosClient from "../networks/AxiosRequest";

const SUB_PATH = "/auth";

const AuthService = {
  login: async (params: any): Promise<Response<any>> => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${SUB_PATH}/login-dashboard`,
        params
      );
      // Kiểm tra phản hồi
      if (!response || !response.data) {
        throw new Error("Dữ liệu phản hồi không hợp lệ.");
      }
      return response;
    } catch (error) {
      // Xử lý lỗi cụ thể hơn
      console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
      throw new Error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
    }
  },
};

export default AuthService;
