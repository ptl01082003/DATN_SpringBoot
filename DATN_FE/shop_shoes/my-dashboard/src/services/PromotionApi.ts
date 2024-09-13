// src/services/PromotionService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";

const API_URL = "/promotions";

const PromotionService = {
  // Lấy danh sách tất cả các promotions
  getPromotions: async () => {
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
      console.error("Error fetching promotions", error);
      throw error;
    }
  },

  // Lấy thông tin promotion theo ID
  getPromotionById: async (promotionId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/get-by-id`,
        { promotionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response; // Sử dụng response.data để trả về dữ liệu chính xác
    } catch (error) {
      console.error(`Error fetching promotion ${promotionId}`, error);
      throw error;
    }
  },

  // Tạo một promotion mới
  createPromotion: async (promotionData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        promotionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating promotion", error);
      throw error;
    }
  },

  // Cập nhật thông tin promotion
  updatePromotion: async (promotionData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        promotionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating promotion", error);
      throw error;
    }
  },

  // Xóa promotion theo ID
  deletePromotion: async (promotionId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          params: { promotionId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error deleting promotion ${promotionId}`, error);
      throw error;
    }
  },
};

export default PromotionService;
