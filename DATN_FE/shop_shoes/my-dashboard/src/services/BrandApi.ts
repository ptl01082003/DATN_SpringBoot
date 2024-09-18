// src/services/BrandService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";
const API_URL = "/brands"; 

const BrandService = {
  getBrands: async () => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(API_URL, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching brands", error);
      throw error;
    }
  },
  getBrandById: async (brandId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
          `${API_URL}`,
          brandId
      );
      return response; // Sử dụng response.data để trả về dữ liệu chính xác
    } catch (error) {
      console.error(`Error fetching brand ${brandId}`, error);
      throw error;
    }
  },

  createBrand: async (brandData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
          `${API_URL}/create`,
          brandData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      return response;
    } catch (error) {
      console.error("Error creating brand", error);
      throw error;
    }
  },


  updateBrand: async (brandData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
          `${API_URL}/edit`,
          brandData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      return response;
    } catch (error) {
      console.error("Error updating brand", error);
      throw error;
    }
  },

  // Xóa một thương hiệu dựa trên ID
  deleteBrand: async (brandId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
          `${API_URL}/remove`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { brandId },
          }
      );
      return response;
    } catch (error) {
      console.error(`Error deleting brand ${brandId}`, error);
      throw error;
    }
  },
};
export default BrandService;