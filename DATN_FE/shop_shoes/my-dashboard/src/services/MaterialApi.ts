// src/services/MaterialService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";
const API_URL = "/materials"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn


const MaterialService = {
  // Lấy danh sách tất cả chất liệu
  getMaterials: async () => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        API_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách chất liệu", error);
      throw error;
    }
  },

  // Lấy một chất liệu dựa trên ID
  getMaterialById: async (materialId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}`,
        { materialId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin chất liệu ${materialId}`, error);
      throw error;
    }
  },

  // Tạo mới một chất liệu
  createMaterial: async (materialData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        materialData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới chất liệu", error);
      throw error;
    }
  },

  // Cập nhật một chất liệu
  updateMaterial: async (params: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi cập nhật chất liệu", error);
      throw error;
    }
  },

  // Xóa một chất liệu dựa trên ID
  deleteMaterial: async (materialId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { materialId },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa chất liệu ${materialId}`, error);
      throw error;
    }
  },
};


export default MaterialService;
