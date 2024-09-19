import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { ODER_STATUS, OrderItems } from "../models/OrderItems";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import sequelize from "sequelize";
import { Reviewers } from "../models/Reviewers";

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
  getRevenue: async (req: Request, res: Response, next: NextFunction) => {
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();
    const todayRevenues = await OrderItems.sum('amount', {
      where: {
        updatedAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });
    const revenuesTotals = await OrderItems.sum('amount');
    const rejectTotals = await OrderItems.findAll({
      where: {
        status: ODER_STATUS.DA_HUY,
      }
    })
    const reviewers = await Reviewers.findAll();

    return res.json(ResponseBody({
      code: RESPONSE_CODE.SUCCESS,
      message: "Thực hiện thành công",
      data: {
        today: todayRevenues,
        total: revenuesTotals,
        reject: rejectTotals.length || 0,
        reviewer: {
          totals: reviewers?.length || 0,
          avg: (reviewers.reduce((u, v) => u + v.stars, 0) / (reviewers?.length != 0 ? reviewers?.length : 1)).toFixed(1)
        }
      }
    }))
  }
};

export default DashboardCtrl;
