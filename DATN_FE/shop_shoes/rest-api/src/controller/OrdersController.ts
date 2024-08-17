import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Images } from "../models/Images";
import { OrderDetails } from "../models/OrderDetails";
import { ODER_STATUS, OrderItems } from "../models/OrderItems";
import {
  PAYMENT_STATUS,
  PaymentDetails
} from "../models/PaymentDetails";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { Sizes } from "../models/Sizes";
import { Reviewers } from "../models/Reviewers";
import { ReviewerPhoto } from "../models/ReviewerPhoto";

const OrdersController = {

  getLstOders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.body;
      const userId = req.userId;
      const where: any = { userId };
      if (status) {
        where["status"] = status;
      }
      const orderItems = await OrderItems.findAll({
        where,
        include: [
          {
            model: ProductDetails,
            include: [
              {
                model: Products,
                include: [
                  {
                    model: Images,
                  },
                ],
              },
              {
                model: Sizes,
              },
            ],
          },
          {
            model: OrderDetails,
          }
        ],
      });
      if (orderItems) {
        let transferData: any[] = [];
        for await (const orders of orderItems) {
          const payments = await PaymentDetails.findOne({
            where: { orderDetailId: orders.orderDetailId }
          })
          const isPaid = payments?.status === PAYMENT_STATUS.SUCCESS;
          transferData.push({
            status: orders.status,
            isReview: orders.isReview,
            paymentStatus: payments?.status,
            price: isPaid ? orders.price : orders.productDetails.products.price,
            amount: isPaid ? orders?.amount : orders.quanity * Number(orders.productDetails.products.priceDiscount),
            quanity: orders?.quanity,
            priceDiscount: isPaid ? orders.priceDiscount : orders.productDetails.products.priceDiscount,
            productId: orders?.productDetails?.productId,
            productDetailId: orders?.productDetailId,
            orderItemId: orders?.orderItemId,
            name: orders?.productDetails?.products?.name,
            sizeName: orders?.productDetails?.sizes?.name,
            quanityLimit: orders?.productDetails?.quantity,
            path: orders?.productDetails?.products?.gallery?.[0]?.path,
          })
        }

        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Thực hiện thành công",
            data: transferData,
          })
        );
      } else {
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Bạn chưa mua sản phẩm",
            data: [],
          })
        );
      }

    } catch (error) {
      next(error);
    }
  },

  createReview: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { productId, productDetailId, stars, contents, gallery, orderItemId } = req.body;
    const orderItem = await OrderItems.findOne({
      where: { orderItemId }
    })
    if (orderItem?.status === ODER_STATUS.DA_GIAO) {
      if (!orderItem.isReview) {
        const newReviewer = await Reviewers.create({
          stars,
          userId,
          contents,
          productId,
          productDetailId,
        });
        if (Array.isArray(gallery) && gallery?.length > 0) {
          for await (const path of gallery) {
            await ReviewerPhoto.create({
              path,
              reviewerId: newReviewer.reviewerId,
            })
          }
          orderItem.isReview = true;
          await orderItem.save();
          res.json(
            ResponseBody({
              code: RESPONSE_CODE.SUCCESS,
              message: "Đánh giá sản phẩm thành công",
              data: null,
            })
          );
        } else {
          res.json(
            ResponseBody({
              code: RESPONSE_CODE.SUCCESS,
              message: "Bạn đã dánh giá sản phẩm",
              data: null,
            })
          );
        }
      }
    } else {
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: "Đơn hàng chưa hoàn thành",
          data: null,
        })
      );
    }
  }
}

export default OrdersController;
