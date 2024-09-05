// src/services/MaterialService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
const API_URL = "/materials"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn


const MaterialService = {
  // Lấy danh sách tất cả màu sắc
  getMaterials: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chất liệu", error);
      throw error;
    }
  },

  // Lấy một màu sắc dựa trên ID
  getMaterialById: async (materialId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}`,
        materialId
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin chất liệu ${materialId}`, error);
      throw error;
    }
  },

  // Tạo mới một màu sắc
  createMaterial: async (styleData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        styleData
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới màu sắc", error);
      throw error;
    }
  },

  updateMaterial: async (params: any) => {
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
  deleteMaterial: async (materialId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          params: { materialId },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa style ${materialId}`, error);
      throw error;
    }
  },
};


export default MaterialService;
