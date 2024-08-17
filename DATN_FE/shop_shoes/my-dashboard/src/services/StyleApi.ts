// src/services/StyleService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
const API_URL = "/styles"; // Đảm bảo rằng URL này phù hợp với địa chỉ API của bạn

const StyleService = {
  // Lấy danh sách tất cả màu sắc
  getStyles: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách màu sắc", error);
      throw error;
    }
  },

  // Lấy một màu sắc dựa trên ID
  getStyleById: async (styleID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${styleID}`
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin màu sắc ${styleID}`, error);
      throw error;
    }
  },

  // Tạo mới một màu sắc
  createStyle: async (styleData: any) => {
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

  // Cập nhật thông tin một màu sắc đã có
  updateStyle: async (styleID: number, styleData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit/${styleID}`,
        styleData
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi cập nhật màu sắc ${styleID}`, error);
      throw error;
    }
  },

  // Xóa một màu sắc dựa trên ID
  deleteStyle: async (styleID: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove/${styleID}`
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa màu sắc ${styleID}`, error);
      throw error;
    }
  },
};

export default StyleService;
