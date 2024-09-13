// src/services/SizeService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";

const API_URL = "/sizes";

const SizeService = {
  // Lấy danh sách tất cả kích cỡ
  getSizes: async () => {
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
      console.error("Lỗi khi lấy danh sách kích cỡ", error);
      throw error;
    }
  },

  // Lấy một kích cỡ dựa trên ID
  getSizeById: async (sizeID: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${sizeID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        sizeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới kích cỡ", error);
      throw error;
    }
  },

  // Cập nhật một kích cỡ
  updateSize: async (params: any) => {
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
      console.error("Lỗi khi cập nhật kích cỡ", error);
      throw error;
    }
  },

  // Xóa một kích cỡ dựa trên ID
  deleteSize: async (sizeId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          params: { sizeId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa kích cỡ ${sizeId}`, error);
      throw error;
    }
  },
};

export default SizeService;
