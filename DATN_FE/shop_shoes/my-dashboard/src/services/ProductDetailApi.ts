// src/services/ProductDetailsService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";

const API_URL = "/product-details";

export interface ProductDetail {
  productDetailId: number;
  name: string;
  description: string;
  productId: number;
  sizes: Array<{
    sizeId: number;
    quantity: number;
  }>;
}

const ProductDetailsService = {
  // Lấy danh sách tất cả chi tiết sản phẩm
  getAllProductDetails: async () => {
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
      console.error("Error fetching product details", error);
      throw error;
    }
  },

  // Lấy chi tiết sản phẩm dựa trên ID
  getProductDetailById: async (productDetailId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${productDetailId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error fetching product detail ${productDetailId}`, error);
      throw error;
    }
  },

  // Tạo mới một chi tiết sản phẩm
  createProductDetail: async (
    productDetailData: Omit<ProductDetail, "productDetailId">
  ) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        productDetailData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating product detail", error);
      throw error;
    }
  },

  // Cập nhật chi tiết sản phẩm
  updateProductDetail: async (
    productDetailId: number,
    productDetailData: Partial<ProductDetail>
  ) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit/${productDetailId}`,
        productDetailData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error updating product detail ${productDetailId}`, error);
      throw error;
    }
  },

  // Xóa chi tiết sản phẩm
  deleteProductDetail: async (productDetailId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove/${productDetailId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error deleting product detail ${productDetailId}`, error);
      throw error;
    }
  },

  // Thêm số lượng vào chi tiết sản phẩm
  addQuantity: async (
    productDetailId: number,
    sizeId: number,
    quantity: number
  ) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/add-quantity`,
        {
          productDetailId,
          sizeId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(
        `Error adding quantity to product detail ${productDetailId}, size ${sizeId}`,
        error
      );
      throw error;
    }
  },

  // Cập nhật số lượng trong chi tiết sản phẩm
  updateQuantity: async (
    productDetailId: number,
    sizeId: number,
    quantity: number
  ) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/update-quantity`,
        {
          productDetailId,
          sizeId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(
        `Error updating quantity for product detail ${productDetailId}, size ${sizeId}`,
        error
      );
      throw error;
    }
  },

  // Xóa số lượng trong chi tiết sản phẩm
  deleteQuantity: async (productDetailId: number, sizeId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/delete-quantity/${productDetailId}/${sizeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(
        `Error deleting quantity for product detail ${productDetailId}, size ${sizeId}`,
        error
      );
      throw error;
    }
  },
};

export default ProductDetailsService;
