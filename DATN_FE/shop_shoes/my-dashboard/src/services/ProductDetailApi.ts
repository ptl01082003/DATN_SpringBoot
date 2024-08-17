import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
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
  getAllProductDetails: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Error fetching product details", error);
      throw error;
    }
  },

  getProductDetailById: async (productDetailId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/${productDetailId}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching product detail ${productDetailId}`, error);
      throw error;
    }
  },

  createProductDetail: async (
    productDetailData: Omit<ProductDetail, "productDetailId">
  ) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        productDetailData
      );
      return response;
    } catch (error) {
      console.error("Error creating product detail", error);
      throw error;
    }
  },

  updateProductDetail: async (
    productDetailId: number,
    productDetailData: Partial<ProductDetail>
  ) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit/${productDetailId}`,
        productDetailData
      );
      return response;
    } catch (error) {
      console.error(`Error updating product detail ${productDetailId}`, error);
      throw error;
    }
  },

  deleteProductDetail: async (productDetailId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove/${productDetailId}`
      );
      return response;
    } catch (error) {
      console.error(`Error deleting product detail ${productDetailId}`, error);
      throw error;
    }
  },

  addQuantity: async (
    productDetailId: number,
    sizeId: number,
    quantity: number
  ) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/add-quantity`,
        {
          productDetailId,
          sizeId,
          quantity,
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

  updateQuantity: async (
    productDetailId: number,
    sizeId: number,
    quantity: number
  ) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/update-quantity`,
        {
          productDetailId,
          sizeId,
          quantity,
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

  deleteQuantity: async (productDetailId: number, sizeId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/delete-quantity/${productDetailId}/${sizeId}`
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
