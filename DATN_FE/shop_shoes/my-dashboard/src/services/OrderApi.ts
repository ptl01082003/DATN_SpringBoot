import AxiosClient from "../networks/AxiosRequest";
import { Response } from "../constants/constants";
import { KEY_STORAGE } from "../constants";

const API_URL = "/orders";

const StatisticsService = {
  // Thống kê doanh thu theo ngày
  getRevenueByDay: async (startDate: string, endDate: string) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/revenue/day`,
        { startDate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching daily revenue", error);
      throw error;
    }
  },

  // Thống kê doanh thu theo tháng
  getRevenueByMonth: async (year: number, month: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/revenue/month`,
        { year, month },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching monthly revenue", error);
      throw error;
    }
  },

  // Thống kê doanh thu theo năm
  getRevenueByYear: async (year: number) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/revenue/year`,
        { year },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching yearly revenue", error);
      throw error;
    }
  },

  // Thống kê số lượng đơn hàng theo trạng thái
  getOrdersByStatus: async (status: string, startDate: string, endDate: string) => {
    try {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post<any, Response<any>>(
        `${API_URL}/orders/status`,
        { status, startDate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching orders by status", error);
      throw error;
    }
  },
};

export default StatisticsService;
