// src/services/SizeService.ts

import { Response } from "../constants/constants";
import AxiosClient from "../networks/AxiosRequest";

const API_URL = "/sizes"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const SizeService = {
  // Lấy danh sách tất cả kích cỡ
  getSizes: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách kích cỡ", error);
      throw error;
    }
  },

  // Lấy một kích cỡ dựa trên ID
  getSizeById: async (sizeID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${sizeID}`
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin kích cỡ ${sizeID}`, error);
      throw error;
    }
  },

  // Tạo mới một kích cỡ
  createSize: async (sizeData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        sizeData
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới kích cỡ", error);
      throw error;
    }
  },

  updateSize: async (params: any) => {
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

  // Xóa một màu sắc dựa trên ID
  deleteSize: async (sizeId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          params: { sizeId },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa style ${sizeId}`, error);
      throw error;
    }
  },
};

export default SizeService;
