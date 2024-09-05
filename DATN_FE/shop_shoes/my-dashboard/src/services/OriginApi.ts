// src/services/OriginService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
const API_URL = "/origins"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const OriginService = {
  // Lấy danh sách tất cả màu sắc
  getOrigins: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách màu sắc", error);
      throw error;
    }
  },

  // Lấy một màu sắc dựa trên ID
  getOriginById: async (originId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${originId}`
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin màu sắc ${originId}`, error);
      throw error;
    }
  },

  // Tạo mới một màu sắc
  createOrigin: async (originData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        originData
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới màu sắc", error);
      throw error;
    }
  },

  updateOrigin: async (params: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        params
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi cập nhật style`, error);
      throw error;
    }
  },


  deleteOrigin: async (originId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          params: { originId },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa origin ${originId}`, error);
      throw error;
    }
  },
};
export default OriginService;
