import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";
const API_URL = "/users"; // Đảm bảo rằng URL tương ứng với API của bạn

const UserService = {
  // Lấy tất cả người dùng
  getUsers: async () => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(API_URL, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);  
      return response;
    } catch (error) {
      console.error("Error fetching users", error);
      throw error;
    }
  },

  // Lấy thông tin người dùng theo ID
  getUserById: async (userId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/get`,
        { userId }, // Truyền userId trong request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error fetching user ${userId}`, error);
      throw error;
    }
  },

  // Tạo mới một người dùng
  createUser: async (userData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  },

  updateUser: async (userId: number, userData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/update?id=${userId}`, 
        userData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng", error);
      throw error;
    }
  },

  deleteUser: async (userId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<Response<any>>(
        `${API_URL}/delete`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { id: userId }, // Sửa lỗi nếu backend yêu cầu query params
        }
      );
      return response;
    } catch (error) {
      console.error(`Error deleting user ${userId}`, error);
      throw error;
    }
  }
}

export default UserService;
