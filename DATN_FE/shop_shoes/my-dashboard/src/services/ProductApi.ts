// src/services/ProductService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";

const API_URL = "/products";

const ProductService = {
  updateProductStatus: async (productId: number, status: boolean): Promise<any> => {
    try {
        const token = localStorage.getItem(KEY_STORAGE.TOKEN);
        const response = await AxiosClient.post(`${API_URL}/update-status`, {
            productId,
            status
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái sản phẩm", error);
        throw error;
    }
},

// updateProductStatus : async (productId, status) => {
//     try {
//         const token = localStorage.getItem(KEY_STORAGE.TOKEN);
//         if (!token) {
//             throw new Error("Token không tồn tại");
//         }

//         // Log trước khi gửi request để kiểm tra dữ liệu gửi lên
//         console.log('Sending request to update status for Product ID:', productId, 'with status:', status);

//         const response = await AxiosClient.post(`${API_URL}/update-status`, {
//             productId,
//             status
//         }, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         // Log response từ server để đảm bảo nhận phản hồi đúng
//         console.log('Response from server:', response);

//         return response;
//     } catch (error) {
//         console.error("Lỗi khi cập nhật trạng thái sản phẩm", error);
//         throw error;
//     }
// },

  // Lấy danh sách tất cả sản phẩm
  getProducts: async () => {
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
      console.error("Lỗi khi lấy danh sách sản phẩm", error);
      throw error;
    }
  },

  // Lấy thông tin sản phẩm dựa trên ID
  getProductById: async (productId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/details`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi lấy thông tin sản phẩm ${productId}`, error);
      throw error;
    }
  },

  // Tạo mới một sản phẩm
  createProduct: async (productData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi tạo mới sản phẩm", error);
      throw error;
    }
  },

  // Cập nhật một sản phẩm
  updateProduct: async (params: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/update`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm", error);
      throw error;
    }
  },

  // Xóa một sản phẩm dựa trên ID
  deleteProduct: async (productId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm ${productId}`, error);
      throw error;
    }
  },
};

export default ProductService;
