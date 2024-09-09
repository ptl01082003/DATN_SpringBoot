import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";

// Đảm bảo rằng URL này tương ứng với API của bạn
const API_URL = "/vouchers";

const VoucherService = {
  // Lấy danh sách tất cả các vouchers
  getVouchers: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Error fetching vouchers", error);
      throw error;
    }
  },

  // Lấy thông tin voucher theo ID
  getVoucherById: async (voucherId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/get-by-id`,
        { voucherId }
      );
      return response; // Sử dụng response.data để trả về dữ liệu chính xác
    } catch (error) {
      console.error(`Error fetching voucher ${voucherId}`, error);
      throw error;
    }
  },

  // Tạo một voucher mới
  createVoucher: async (voucherData: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/create`,
        voucherData
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
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        voucherData
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
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        null,
        {
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
