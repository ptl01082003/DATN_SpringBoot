import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";

// Đảm bảo rằng URL này tương ứng với API của bạn
const API_URL = "/promotions";

const PromotionService = {
  // Lấy danh sách tất cả các promotions
  getPromotions: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Error fetching promotions", error);
      throw error;
    }
  },

  // Lấy thông tin promotion theo ID
  getPromotionById: async (promotionId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/get-by-id`,
        { promotionId }
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
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        promotionData
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
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        promotionData
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
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          params: { promotionId },
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
