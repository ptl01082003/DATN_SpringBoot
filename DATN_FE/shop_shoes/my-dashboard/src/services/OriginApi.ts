// src/services/OriginService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";

const API_URL = "/origins"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const OriginService = {
  // Lấy danh sách tất cả nguồn gốc
  getOrigins: async () => {
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
      console.error("Lỗi khi lấy danh sách nguồn gốc", error);
      throw error;
    }
  },

  // Lấy một nguồn gốc dựa trên ID
  getOriginById: async (originId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${originId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin nguồn gốc ${originId}`, error);
      throw error;
    }
  },

  // Tạo mới một nguồn gốc
  createOrigin: async (originData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        originData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới nguồn gốc", error);
      throw error;
    }
  },

  // Cập nhật một nguồn gốc
  updateOrigin: async (params: any) => {
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
      console.error("Lỗi khi cập nhật nguồn gốc", error);
      throw error;
    }
  },

  // Xóa một nguồn gốc dựa trên ID
  deleteOrigin: async (originId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { originId },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa nguồn gốc ${originId}`, error);
      throw error;
    }
  },
};

export default OriginService;
