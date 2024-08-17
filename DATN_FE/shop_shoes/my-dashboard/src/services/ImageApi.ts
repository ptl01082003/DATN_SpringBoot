import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";

const API_URL = "/images"; // Đảm bảo rằng URL tương ứng với API của bạn

const ImageService = {
  // Lấy danh sách tất cả các hình ảnh
  getImages: async () => {
    try {
      const response = await AxiosClient.get<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Error fetching images", error);
      throw error;
    }
  },

  // Lấy thông tin một hình ảnh theo ID
  getImageById: async (imageId: number) => {
    try {
      const response = await AxiosClient.get<any, Response<any>>(
        `${API_URL}/${imageId}`
      );
      return response; // Sử dụng response.data để trả về dữ liệu chính xác
    } catch (error) {
      console.error(`Error fetching image ${imageId}`, error);
      throw error;
    }
  },

  // Tạo một hình ảnh mới
  createImage: async (imageData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        imageData
      );
      return response;
    } catch (error) {
      console.error("Error creating image", error);
      throw error;
    }
  },

  // Cập nhật thông tin hình ảnh
  updateImage: async (imageId: number, imageData: any) => {
    try {
      const response = await AxiosClient.put<any, Response<any>>(
        `${API_URL}/update/${imageId}`,
        imageData
      );
      return response;
    } catch (error) {
      console.error(`Error updating image ${imageId}`, error);
      throw error;
    }
  },

  // Xóa một hình ảnh
  deleteImage: async (imageId: number) => {
    try {
      const response = await AxiosClient.delete<any, Response<any>>(
        `${API_URL}/delete/${imageId}`
      );
      return response;
    } catch (error) {
      console.error(`Error deleting image ${imageId}`, error);
      throw error;
    }
  },
};

export default ImageService;
