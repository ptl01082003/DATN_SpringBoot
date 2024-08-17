// controllers/OriginsController.ts
import axios from "axios";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import moment from "moment";
import querystring from "querystring";
import { v4 as uuidv4 } from "uuid";
import { redis } from "../config/ConnectRedis";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { CartItems } from "../models/CartItems";
import { Images } from "../models/Images";
import { OrderDetails } from "../models/OrderDetails";
import { ODER_STATUS, OrderItems } from "../models/OrderItems";
import {
  PAYMENT_PROVIDER,
  PAYMENT_STATUS,
  PaymentDetails,
} from "../models/PaymentDetails";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { ShoppingCarts } from "../models/ShoppingCarts";
import { Sizes } from "../models/Sizes";
import { sortObject } from "../utils/utils";
import { Vouchers, Vouchers_STATUS, Vouchers_TYPE } from "../models/Vouchers";
import { UserVouchers } from "../models/UserVouchers";

async function lockProductsById(
  keyName: string,
  expireTimer = 5000,
  retryDelay = 100
): Promise<string> {
  let counter = 0;
  return new Promise(async (resolve) => {
    const delayFunc = setInterval(async () => {
      const isLocker = await redis.get(keyName);
      if (isLocker) {
        resolve(isLocker);
      } else {
        await redis.set(keyName, "locked");
      }
      counter += retryDelay;
      if (counter > expireTimer) {
        clearInterval(delayFunc);
        resolve(isLocker || "");
      }
    }, retryDelay);
  });
}

async function createMomo({
  amount,
  orderCode,
}: {
  amount: number;
  orderCode: string;
}): Promise<string> {
  const partnerCode = "MOMO";
  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";

  const requestId = partnerCode + new Date().getTime();
  const orderId = orderCode;
  const orderInfo = `Thanh toán đơn hàng ${orderCode}`;
  const ipnUrl = process.env["momo_Checkout"];
  const redirectUrl = process.env["momo_Checkout"];
  const requestType = "captureWallet";
  const extraData = "";

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  // Tạo chữ ký
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "vi",
  };

  const payments = await axios.post(
    process.env["momo_Url"] as string,
    requestBody
  );
  return payments.data.payUrl;
}

const PaymentOnlineController = {
  order: async (req: Request, res: Response, next: NextFunction) => {
    try {
      process.env.TZ = "Asia/Ho_Chi_Minh";

      var ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");
      const orderId = moment(date).format("DDHHmmss");

      let vnp_Params: any = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_Locale"] = "vn";
      vnp_Params["vnp_CurrCode"] = "VND";
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_TmnCode"] = process.env["vnp_TmnCode"];
      vnp_Params["vnp_OrderInfo"] = "tuyendev";
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = 100000 * 100;
      vnp_Params["vnp_ReturnUrl"] = process.env["vnpay_Checkout"];
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;

      vnp_Params = sortObject(vnp_Params);

      const signData = querystring.stringify(vnp_Params);
      const hmac = crypto.createHmac(
        "sha512",
        process.env["vnp_HashSecret"] as string
      );
      const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      const vnpUrlWithParams =
        process.env["vnp_Url"] + "?" + querystring.stringify(vnp_Params);
      res.redirect(vnpUrlWithParams);
    } catch (error) {
      next(error);
    }
  },

  checkout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let vnp_Params: any = req.query;

      const secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_ResponseCode"];
      delete vnp_Params["vnp_TransactionStatus"];

      vnp_Params = sortObject(vnp_Params);

      var signData = querystring.stringify(vnp_Params);
      var hmac = crypto.createHmac(
        "sha512",
        process.env["vnp_HashSecret"] as string
      );
      var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      //kiểm tra tính toàn vẹn dữ liệu của giao dịch , sử dụng các tham số trên url trả về
      //thực hiện tuần tự các bước như yêu cầu thanh toán và check với mã băm trả về
      if (secureHash === signed) {
        res.redirect(process.env["payment_Success_Url"] as string);
      } else {
        //check đơn hàng tại đây và lưu vào database
      }
    } catch (error) {
      next(error);
    }
  },

  checkoutMomo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessKey = "F8BBA842ECF85";
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      let momoQuery = req.query;

      const orderId = momoQuery["orderId"];
      const requestId = momoQuery["requestId"];
      const partnerCode = momoQuery["partnerCode"];

      const signature = crypto
        .createHmac("sha256", secretKey)
        .update(
          `accessKey=${accessKey}&orderId=${momoQuery["orderId"]}&partnerCode=${momoQuery["partnerCode"]}&requestId=${momoQuery["requestId"]}`
        )
        .digest("hex");

      const requestBody = {
        partnerCode,
        requestId,
        orderId,
        signature,
        lang: "vi",
      };
      const transaction = await axios.post(
        process.env["momo_query_Url"] as string,
        requestBody
      );

      const { orderId: orderCode, amount } = transaction?.data;
      if (transaction?.data.resultCode == 0) {
        let refundAmount = 0;
        const oderDetails = (await OrderDetails.findOne({
          where: { orderCode },
        })) as OrderDetails;

        const orderItems = (await OrderItems.findAll({
          where: { orderDetailId: oderDetails?.orderDetailId },
        })) as OrderItems[];

        const paymentDetails = (await PaymentDetails.findOne({
          where: { orderDetailId: oderDetails?.orderDetailId },
        })) as PaymentDetails;

        const amountDetails = Number(oderDetails.amount);

        for await (const orders of orderItems) {
          const productLockKey = `products-lock-${orders?.productDetailId}`;

          await lockProductsById(productLockKey);

          const productDetails = (await ProductDetails.findOne({
            where: { productDetailId: orders.productDetailId },
          })) as ProductDetails;

          if (orders.quanity <= productDetails.quantity) {
            productDetails.quantity -= orders.quanity;
            productDetails.sellQuanity = orders.quanity;
            productDetails.save();
            orders.status = ODER_STATUS.CHO_LAY_HANG;
            redis.del(productLockKey);
          } else {
            refundAmount = Number(orders.amount);
            oderDetails.amount = amountDetails - Number(orders.amount);
            orders.status = ODER_STATUS.KHONG_DU_SO_LUONG;
          }
          await oderDetails.save();
          await orders.save();
        }

        paymentDetails.status = PAYMENT_STATUS.SUCCESS;
        await paymentDetails.save();

        //Thực hiện logic refund tiền về momo thanh toán của người dùng
        if (refundAmount > 0) {
        }
      } else {
      }
      res.redirect(`${process.env["paymen_Url"]}?type=success`);
    } catch (error) {
      next(error);
    }
  },

  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { provider, name, address, phone, voucherCode } = req.body;
      let ordersAmount = 0;
      const carts = await ShoppingCarts.findOne({
        where: { userId },
      });

      if (carts) {
        const newOrders = await OrderDetails.create({
          userId,
          amount: ordersAmount,
          name,
          address,
          phone,
          totals: carts.totals,
          voucherId: undefined,
        });

        const cartItems = await CartItems.findAll({
          where: { cartId: carts?.cartId },
          include: [
            {
              model: ProductDetails,
              include: [
                {
                  model: Products,
                },
              ],
            },
          ],
        });
        for await (const products of cartItems) {
          const productsAmount =
            products.quanity *
            Number(products.productDetails.products.priceDiscount);
          await OrderItems.create({
            userId,
            amount: productsAmount,
            quanity: products.quanity,
            orderDetailId: newOrders.orderDetailId,
            productDetailId: products.productDetailId,
            price: products.productDetails.products.price,
            priceDiscount: products.productDetails.products.priceDiscount,
            status:
              provider == PAYMENT_PROVIDER.CASH
                ? ODER_STATUS.CHO_XAC_NHAN
                : ODER_STATUS.CHO_THANH_TOAN,
          });
          ordersAmount += productsAmount;
          await products.destroy();
        }

        let voucherId: number | undefined = undefined;
        let discount = 0;
        if (voucherCode) {
          const voucher = await Vouchers.findOne({
            where: { code: voucherCode },
          });
          console.log(voucher);
          if (voucher && voucher.status === Vouchers_STATUS.ISACTIVE) {
            const orderValue = ordersAmount;
            console.log(ordersAmount);

            if (voucher.minOrderValue && orderValue < voucher.minOrderValue) {
              return res.status(400).json({
                message: "Giá trị đơn hàng không đủ điều kiện áp dụng voucher",
              });
            }

            if (voucher.typeValue === Vouchers_TYPE.MONEY) {
              discount = Math.min(voucher.discountValue, orderValue);
            } else if (voucher.typeValue === Vouchers_TYPE.PERCENT) {
              discount = (orderValue * voucher.discountValue) / 100;
              discount = Math.min(discount, voucher.discountMax);
            }

            ordersAmount -= discount;

            voucher.quantity -= 1;
            if (voucher.quantity === 0) {
              voucher.status = Vouchers_STATUS.EXPIRED;
            }
            await voucher.save();

            await UserVouchers.create({
              userId,
              voucherId: voucher.voucherId,
              status: Vouchers_STATUS.UNUSED,
            });

            voucherId = voucher.voucherId;
          }
        }

        newOrders.voucherId = voucherId;
        newOrders.amount = ordersAmount;
        await newOrders.save();

        await PaymentDetails.create({
          provider,
          amount: ordersAmount,
          orderDetailId: newOrders.orderDetailId,
          status:
            provider == PAYMENT_PROVIDER.CASH
              ? PAYMENT_STATUS.CASH
              : PAYMENT_STATUS.IDLE,
        });

        await newOrders.save();

        await carts.destroy();

        await redis.del(`carts-${userId}`);

        switch (provider) {
          case PAYMENT_PROVIDER.MOMO:
            const paymentUrl = await createMomo({
              amount: ordersAmount,
              orderCode: newOrders.orderCode,
            });
            return res.json(
              ResponseBody({
                data: paymentUrl,
                code: RESPONSE_CODE.SUCCESS,
                message: "Thực hiện thành công",
              })
            );
          case PAYMENT_PROVIDER.VN_PAY:
            break;
          case PAYMENT_PROVIDER.CASH:
            return res.json(
              ResponseBody({
                data: null,
                code: RESPONSE_CODE.SUCCESS,
                message: "Thực hiện thành công",
              })
            );
        }
      } else {
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            data: null,
            message:
              "Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm trước khi thanh toán",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

  repayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let ordersAmount = 0;
      const userId = req.userId;
      const { orderCode } = req.body;

      const oderDetails = await OrderDetails.findOne({
        where: {
          userId,
          orderCode,
        },
      });

      if (oderDetails) {
        const orderItems = await OrderItems.findAll({
          where: { orderDetailId: oderDetails.orderDetailId },
          include: [
            {
              model: ProductDetails,
              include: [
                {
                  model: Products,
                },
              ],
            },
          ],
        });

        for await (const orders of orderItems) {
          orders.price = orders.productDetails.products.price || 0;
          orders.priceDiscount =
            orders.productDetails.products.priceDiscount || 0;
          ordersAmount +=
            orders.quanity *
            Number(orders.productDetails.products.priceDiscount);
          await orders.save();
        }

        const newOderCode = uuidv4().slice(0, 8).toUpperCase();
        oderDetails.orderCode = newOderCode;

        oderDetails.amount = ordersAmount;

        await oderDetails.save();
        const payments = await PaymentDetails.findOne({
          where: {
            orderDetailId: oderDetails?.orderDetailId,
          },
        });
        payments!.amount = ordersAmount;

        await payments?.save();

        switch (payments?.provider) {
          case PAYMENT_PROVIDER.MOMO:
            const paymentUrl = await createMomo({
              amount: ordersAmount,
              orderCode: newOderCode,
            });
            return res.json(
              ResponseBody({
                data: paymentUrl,
                code: RESPONSE_CODE.SUCCESS,
                message: "Thực hiện thành công",
              })
            );
          case PAYMENT_PROVIDER.VN_PAY:
            break;
        }
      } else {
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            data: null,
            message: "Đơn hàng không tồn tại",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

  getLstPayments: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      let transferData: any[] = [];

      const oderDetails = await OrderDetails.findAll({
        where: { userId },
      });
      if (oderDetails) {
        for await (const orders of oderDetails) {
          let ordersAmount = 0;
          const paymentDetails = (await PaymentDetails.findOne({
            where: { orderDetailId: orders?.orderDetailId },
          })) as PaymentDetails;

          const orderItems = await OrderItems.findAll({
            where: { orderDetailId: orders.orderDetailId },
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
            ],
          });
          // Trong trường hợp đơn hàng chưa được thanh toán cập nhật lại giá
          if (paymentDetails.status != PAYMENT_STATUS.SUCCESS) {
            for await (const products of orderItems) {
              const productsAmount =
                products.quanity *
                Number(products.productDetails.products.priceDiscount);
              products.price = products.productDetails.products.price || 0;
              products.amount = productsAmount;
              products.priceDiscount =
                products.productDetails.products.priceDiscount || 0;
              ordersAmount += productsAmount;
              await products.save();
            }

            orders.amount = ordersAmount;
            paymentDetails.amount = ordersAmount;

            await orders.save();
            await paymentDetails.save();
          }

          const mergeProducts = orderItems.map((products) => {
            return {
              price: products.price,
              amount: products?.amount,
              quanity: products?.quanity,
              priceDiscount: products.priceDiscount,
              productDetailId: products?.productDetailId,
              name: products?.productDetails?.products?.name,
              sizeName: products?.productDetails?.sizes?.name,
              quanityLimit: products?.productDetails?.quantity,
              path: products?.productDetails?.products?.gallery?.[0]?.path,
            };
          });

          transferData.push({
            ...orders?.toJSON(),
            ...paymentDetails?.toJSON(),
            orderItems: mergeProducts,
          });
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
            message: "Bạn chưa có hóa đơn",
            data: [],
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

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
          },
        ],
      });
      if (orderItems) {
        let transferData: any[] = [];
        for await (const orders of orderItems) {
          const payments = await PaymentDetails.findOne({
            where: { orderDetailId: orders.orderDetailId },
          });
          const isPaid = payments?.status === PAYMENT_STATUS.SUCCESS;
          transferData.push({
            status: orders.status,
            isReview: orders.isReview,
            paymentStatus: payments?.status,
            price: isPaid ? orders.price : orders.productDetails.products.price,
            amount: isPaid
              ? orders?.amount
              : orders.quanity *
                Number(orders.productDetails.products.priceDiscount),
            quanity: orders?.quanity,
            priceDiscount: isPaid
              ? orders.priceDiscount
              : orders.productDetails.products.priceDiscount,
            productDetailId: orders?.productDetailId,
            name: orders?.productDetails?.products?.name,
            sizeName: orders?.productDetails?.sizes?.name,
            quanityLimit: orders?.productDetails?.quantity,
            path: orders?.productDetails?.products?.gallery?.[0]?.path,
          });
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
};

export default PaymentOnlineController;
