import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { OrderItems } from "../models/OrderItems";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import sequelize from "sequelize";

const DashboardCtrl = {
  getOrderChart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const startOfDay = moment().startOf('day').toDate();
      const endOfDay = moment().endOf('day').toDate();

      const orderStatus: { [key: string]: number } = {
        "CHO_XAC_NHAN": 0,
        "CHO_THANH_TOAN": 0,
        "CHO_LAY_HANG": 0,
        "CHO_GIAO_HANG": 0,
        "DA_GIAO": 0,
        "DA_HUY": 0,
      }

      const orderCounts = await OrderItems.findAll({
        where: {
          createdAt: {
            [Op.between]: [startOfDay, endOfDay]
          },
        },
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('status')), 'count']
        ],
        group: 'status'
      });
      orderCounts.forEach((order: any) => {
        orderStatus[order.status] = order.dataValues?.count;
      })

      return res.json(ResponseBody({
        code: RESPONSE_CODE.SUCCESS,
        data: orderStatus,
        message: "Thực hiện thành công"
      }))
    } catch (error) {
      next(error);
    }
  },
};

export default DashboardCtrl;
