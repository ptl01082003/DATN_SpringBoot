import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Vouchers } from "../models/Vouchers";
import { UserVouchers } from "../models/UserVouchers";
import { VectorAlgorithms } from "redis";

const VouchersController = {
  addVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        code,
        description,
        valueOrder,
        discountMax,
        startDay,
        endDay,
        discountValue,
        quantity,
        status = "ISACTIVE", // default value
        typeValue = "P", // default value
        ruleType,
        minOrderValue,
        validProducts,
        userLevel,
        minOrderCount,
        maxOrderCount,
      } = req.body;

      const voucher = await Vouchers.create({
        code,
        description,
        valueOrder,
        discountMax,
        startDay,
        endDay,
        discountValue,
        quantity,
        status,
        typeValue,
        ruleType,
        minOrderValue,
        validProducts,
        userLevel,
        minOrderCount,
        maxOrderCount,
      });

      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: voucher,
          message: "Voucher created successfully",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getVouchers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vouchers = await Vouchers.findAll();
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: vouchers,
          message: "Fetched vouchers successfully",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  voucherSelected:  async (req: Request, res: Response, next: NextFunction) => {
    const { voucherId, amounts} = req.body;
   },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.body;
      const voucher = await Vouchers.findByPk(voucherId);

      if (voucher) {
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: voucher,
            message: "Voucher fetched successfully",
          })
        );
      } else {
        res.status(404).json({
          message: "Voucher not found",
          code: RESPONSE_CODE.NOT_FOUND,
        });
      }
    } catch (error) {
      let errorMessage = "Fetching voucher failed";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Fetching voucher failed",
        code: RESPONSE_CODE.ERRORS,
        error: errorMessage,
      });
    }
  },

  updateVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.body;
      const {
        code,
        description,
        valueOrder,
        discountMax,
        startDay,
        endDay,
        discountValue,
        quantity,
        status,
        typeValue,
        ruleType,
        minOrderValue,
        validProducts,
        userLevel,
        minOrderCount,
        maxOrderCount,
      } = req.body;

      const voucher = await Vouchers.findByPk(voucherId);

      if (voucher) {
        await voucher.update({
          code,
          description,
          valueOrder,
          discountMax,
          startDay,
          endDay,
          discountValue,
          quantity,
          status,
          typeValue,
          ruleType,
          minOrderValue,
          validProducts,
          userLevel,
          minOrderCount,
          maxOrderCount,
        });

        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: voucher,
            message: "Voucher updated successfully",
          })
        );
      } else {
        res.status(404).json({
          message: "Voucher not found",
          code: RESPONSE_CODE.NOT_FOUND,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.body;
      const voucher = await Vouchers.findByPk(voucherId);

      if (voucher) {
        await voucher.destroy();
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Voucher deleted successfully",
          })
        );
      } else {
        res.status(404).json({
          message: "Voucher not found",
          code: RESPONSE_CODE.NOT_FOUND,
        });
      }
    } catch (error) {
      let errorMessage = "Deleting voucher failed";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Deleting voucher failed",
        code: RESPONSE_CODE.ERRORS,
        error: errorMessage,
      });
    }
  },
  getVoucherByUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(400).json({
          code: RESPONSE_CODE.ERRORS,
          message: "User ID không hợp lệ",
        });
      }

      const userVouchers = await UserVouchers.findAll({
        where: { userId },
        include: [{ model: Vouchers }],
      });

      const vouchersDetails = userVouchers.map((userVoucher) => ({
        id: userVoucher.id,
        userId: userVoucher.userId,
        voucherId: userVoucher.voucherId,
        receivedAt: userVoucher.receivedAt,
        usedAt: userVoucher.usedAt,
        status: userVoucher.status,
        voucher: {
          voucherId: userVoucher.vouchers.voucherId,
          code: userVoucher.vouchers.code,
          description: userVoucher.vouchers.description,
          valueOrder: userVoucher.vouchers.valueOrder,
          discountValue: userVoucher.vouchers.discountValue,
          ruleType: userVoucher.vouchers.ruleType,
          typeValue: userVoucher.vouchers.typeValue,
          endDay: userVoucher.vouchers.endDay,
        },
      }));

      return res.json(
        ResponseBody({
          data: vouchersDetails,
          code: RESPONSE_CODE.SUCCESS,
          message: "Lấy danh sách voucher thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};

export default VouchersController;
