// src/services/VoucherService.ts

import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";

// Đảm bảo rằng URL này tương ứng với API của bạn
const API_URL = "/vouchers";

const VoucherService = {
  // Lấy danh sách tất cả các vouchers
  getVouchers: async () => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(API_URL, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching vouchers", error);
      throw error;
    }
  },

  // Lấy thông tin voucher theo ID
  getVoucherById: async (voucherId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/get-by-id`,
        { voucherId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error fetching voucher ${voucherId}`, error);
      throw error;
    }
  },

  // Tạo một voucher mới
  createVoucher: async (voucherData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        voucherData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating voucher", error);
      throw error;
    }
  },

  // Cập nhật thông tin voucher
  updateVoucher: async (voucherData: any) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        voucherData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error updating voucher", error);
      throw error;
    }
  },

  // Xóa voucher theo ID
  deleteVoucher: async (voucherId: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { voucherId },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error deleting voucher ${voucherId}`, error);
      throw error;
    }
  },
};

export default VoucherService;
