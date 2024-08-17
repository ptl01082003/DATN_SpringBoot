import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";

const API_URL = "/vouchers";

const VoucherService = {
  getVouchers: async () => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(API_URL);
      return response;
    } catch (error) {
      console.error("Error fetching vouchers", error);
      throw error;
    }
  },

  // getVoucherById: async (voucherId: number) => {
  //   try {
  //     const response = await AxiosClient.post<any, Response<any>>(
  //       `${API_URL}/get-by-id`,
  //       { voucherId }
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error(`Error fetching voucher ${voucherId}`, error);
  //     throw error;
  //   }
  // },

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

  updateVoucher: async (params: any) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/edit`,
        params
      );
      return response;
    } catch (error) {
      console.error(`Error updating voucher ${params}`, error);
      throw error;
    }
  },

  deleteVoucher: async (voucherId: number) => {
    try {
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/remove`,
        { voucherId }
      );
      return response;
    } catch (error) {
      console.error(`Error deleting voucher ${voucherId}`, error);
      throw error;
    }
  },
};

export default VoucherService;
