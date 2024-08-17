// src/services/ProductService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
const API_URL = "/products";

const ProductService = {
  getProducts: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
      throw error;
    }
  },

  getProductById: async (productId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}`,
        productId
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin sản phẩm ${productId}`, error);
      throw error;
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        productData
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới sản phẩm", error);
      throw error;
    }
  },

  updateProduct: async (params) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        params
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productId: number) => {
    return await AxiosClient.post<any, Response<any>>(`${API_URL}/remove`, {
      productId,
    });
  },
};

export default ProductService;
