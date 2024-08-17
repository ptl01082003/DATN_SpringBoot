import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Promotions } from "../models/Promotions";
import { Products } from "../models/Products";

const PromotionsController = {
  addPromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { discountPrice, startDay, endDay, productId, status } = req.body;
      const promotion = await Promotions.create({
        discountPrice,
        startDay: startDay ? new Date(startDay) : undefined,
        endDay: endDay ? new Date(endDay) : undefined,
        productId,
        status,
      });
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: promotion,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getPromotions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const promotions = await Promotions.findAll({
        include: [
          {
            model: Products,
            attributes: ["code"],
          },
        ],
      });
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: promotions,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { promotionId } = req.body;

      const promotion = await Promotions.findByPk(promotionId, {
        include: [
          {
            model: Products,
            attributes: ["code"],
          },
        ],
      });

      if (promotion) {
        res.status(200).json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: promotion,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Khuyến mãi không tồn tại",
          })
        );
      }
    } catch (error) {
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json(
        ResponseBody({
          code: RESPONSE_CODE.ERRORS,
          message: errorMessage,
        })
      );
    }
  },

  updatePromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        promotionId,
        discountPrice,
        startDay,
        endDay,
        productId,
        status,
      } = req.body;
      const promotion = await Promotions.findByPk(promotionId);
      if (promotion) {
        await promotion.update({
          discountPrice,
          startDay: startDay ? new Date(startDay) : undefined,
          endDay: endDay ? new Date(endDay) : undefined,
          productId,
          status,
        });
        res.status(200).json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: promotion,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Khuyến mãi không tồn tại",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

  deletePromotion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { promotionId } = req.body;
      const promotion = await Promotions.findByPk(promotionId);
      if (promotion) {
        await promotion.destroy();
        res.status(200).json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Khuyến mãi không tồn tại",
          })
        );
      }
    } catch (error) {
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json(
        ResponseBody({
          code: RESPONSE_CODE.ERRORS,
          message: errorMessage,
        })
      );
    }
  },
};

export default PromotionsController;
