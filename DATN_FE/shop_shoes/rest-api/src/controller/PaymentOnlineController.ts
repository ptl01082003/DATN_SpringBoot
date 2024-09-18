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
import { UserVouchers } from "../models/UserVouchers";
import { Vouchers, Vouchers_STATUS } from "../models/Vouchers";
import { sortObject } from "../utils/utils";

import Decimal from 'decimal.js';

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
      vnp_Params["vnp_BankCode"] = "NCB";
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
      console.log(vnp_Params);
      const secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];

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
      return res.json({ data: secureHash === signed });

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

        oderDetails.transId = momoQuery["transId"] as string;

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



  transactionRefund: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { orderItemId } = req.body;

      if (!orderItemId || !userId) {
        return res.status(400).json(ResponseBody({
          code: RESPONSE_CODE.ERRORS,
          message: "Thông tin yêu cầu không hợp lệ",
        }));
      }

      const orderItem = await OrderItems.findOne({ where: { orderItemId, userId } });
      if (!orderItem || (orderItem.status !== ODER_STATUS.CHO_LAY_HANG && orderItem.status !== ODER_STATUS.CHO_XAC_NHAN)) {
        return res.status(404).json(ResponseBody({
          code: RESPONSE_CODE.ERRORS,
          message: "Không tồn tại đơn hàng hoặc đơn hàng không đủ điều kiện hoàn tiền",
        }));
      }

      const orderDetails = await OrderDetails.findOne({ where: { userId, orderDetailId: orderItem.orderDetailId } });
      const paymentDetails = await PaymentDetails.findOne({ where: { orderDetailId: orderDetails?.orderDetailId } });

      if (!orderDetails || !paymentDetails) {
        return res.status(404).json(ResponseBody({
          code: RESPONSE_CODE.ERRORS,
          message: "Thông tin đơn hàng hoặc thanh toán không tồn tại",
        }));
      }

      if (paymentDetails.provider === PAYMENT_PROVIDER.CASH) {
        orderItem.status = ODER_STATUS.DA_HUY;
        await orderItem.save();

        const productDetails = await ProductDetails.findOne({ where: { productDetailId: orderItem.productDetailId } });
        if (productDetails) {
          productDetails.quantity += orderItem.quanity; // Cộng số lượng sản phẩm
          await productDetails.save();
        }

        orderDetails.revenue -= orderItem.amount;
        await orderDetails.save();

        res.json(ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: "Hoàn tiền thành công bằng tiền mặt",
        }));
      } else {
        const partnerCode = "MOMO";
        const accessKey = process.env.MOMO_ACCESS_KEY as string; // Đảm bảo biến môi trường không phải undefined
        const secretKey = process.env.MOMO_SECRET_KEY as string; // Đảm bảo biến môi trường không phải undefined
        const transId = Number(orderDetails.transId);
        const amount = Number(orderItem.amount);
        const requestId = `${uuidv4().slice(0, 8).toUpperCase()}`;
        const orderId = `${uuidv4().slice(0, 8).toUpperCase()}`;
        const description = `Hoàn tiền giao dịch ${orderId}`;

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&description=${description}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}&transId=${transId}`;

        if (!accessKey || !secretKey) {
          throw new Error('Missing access key or secret key');
        }

        const signature = crypto.createHmac("sha256", secretKey)
          .update(rawSignature)
          .digest("hex");

        const refund = await axios.post(process.env.MOMO_REFUND_URL as string, {
          partnerCode,
          orderId,
          requestId,
          amount,
          transId,
          lang: "vi",
          description,
          signature
        });

        if (refund.data?.resultCode === 0) {
          orderItem.status = ODER_STATUS.DA_HUY;
          await orderItem.save();

          orderDetails.revenue -= orderItem.amount;
          await orderDetails.save();

          const productDetails = await ProductDetails.findOne({ where: { productDetailId: orderItem.productDetailId } });
          if (productDetails) {
            productDetails.quantity += orderItem.quanity; // Cộng số lượng sản phẩm
            await productDetails.save();
          }

          res.json(ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Hoàn tiền thành công qua MoMo",
          }));
        } else {
          res.status(500).json(ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: "Hoàn tiền qua MoMo thất bại, có lỗi trong quá trình xử lý",
          }));
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },



  repayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let ordersAmount = 0;
      const userId = req.userId;
      const { orderCode } = req.body;

      // Tìm thông tin đơn hàng
      const orderDetails = await OrderDetails.findOne({
        where: {
          userId,
          orderCode,
        },
      });

      if (orderDetails) {
        // Lấy tất cả sản phẩm trong đơn hàng
        const orderItems = await OrderItems.findAll({
          where: { orderDetailId: orderDetails.orderDetailId },
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

        // Xử lý từng sản phẩm trong đơn hàng
        for (const orderItem of orderItems) {
          // Cập nhật thông tin giá và số lượng
          orderItem.price = orderItem.productDetails.products.price || 0;
          orderItem.priceDiscount =
            orderItem.productDetails.products.priceDiscount || 0;
          ordersAmount +=
            orderItem.quanity *
            Number(orderItem.productDetails.products.priceDiscount);
          await orderItem.save();
        }

        // Tạo mã đơn hàng mới
        const newOrderCode = uuidv4().slice(0, 8).toUpperCase();
        orderDetails.orderCode = newOrderCode;
        orderDetails.amount = ordersAmount;

        await orderDetails.save();

        // Cập nhật thông tin thanh toán
        const paymentDetails = await PaymentDetails.findOne({
          where: {
            orderDetailId: orderDetails.orderDetailId,
          },
        });
        if (paymentDetails) {
          paymentDetails.amount = ordersAmount;
          await paymentDetails.save();
        }

        // Xóa giỏ hàng và cache
        await ShoppingCarts.destroy({
          where: { userId },
        });
        await redis.del(`carts-${userId}`);

        // Xử lý thanh toán
        switch (paymentDetails?.provider) {
          case PAYMENT_PROVIDER.MOMO:
            const paymentUrl = await createMomo({
              amount: ordersAmount,
              orderCode: newOrderCode,
            });
            return res.json(
              ResponseBody({
                data: paymentUrl,
                code: RESPONSE_CODE.SUCCESS,
                message: "Thực hiện thành công",
              })
            );
          case PAYMENT_PROVIDER.VN_PAY:
            // Thêm logic cho VN PAY nếu cần
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
          if (paymentDetails?.status != PAYMENT_STATUS.SUCCESS) {
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


  // createOrder: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId = req.userId;
  //     const { provider, name, address, phone, voucherCode } = req.body;

  //     if (voucherCode) {
  //       const voucher = await Vouchers.findOne({ where: { code: voucherCode } });
  //       if (voucher?.status != Vouchers_STATUS.ISACTIVE) {
  //         return res.json(ResponseBody({
  //           code: RESPONSE_CODE.ERRORS,
  //           message: "Voucher không khả dụng"
  //         }))
  //       }
  //       if (voucher?.quantity && voucher?.quantity <= 0) {
  //         return res.json(ResponseBody({
  //           code: RESPONSE_CODE.ERRORS,
  //           message: "Voucher hết lượt sử dụng"
  //         }))
  //       }
  //     }


  //     let ordersAmount = new Decimal(0); // Sử dụng Decimal để tính toán chính xác

  //     console.log("Tìm giỏ hàng cho người dùng:", userId);
  //     const carts = await ShoppingCarts.findOne({ where: { userId } });
  //     console.log("Giỏ hàng tìm được:", carts);

  //     if (!carts) {
  //       return res.json(
  //         ResponseBody({
  //           code: RESPONSE_CODE.ERRORS,
  //           data: null,
  //           message: "Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm trước khi thanh toán",
  //         })
  //       );
  //     }

  //     const cartItems = await CartItems.findAll({
  //       where: { cartId: carts.cartId },
  //       include: [{ model: ProductDetails, include: [{ model: Products }] }],
  //     });

  //     console.log("Các mặt hàng trong giỏ hàng:", cartItems);

  //     // Tính toán tổng giá trị đơn hàng trước khi áp dụng voucher
  //     const cartTotals = new Decimal(cartItems.reduce((sum, item) => {
  //       const priceDiscount = new Decimal(item.productDetails.products.priceDiscount || 0);
  //       return sum + priceDiscount.times(item.quanity).toNumber();
  //     }, 0));

  //     // Tạo đơn hàng mới
  //     const newOrders = await OrderDetails.create({
  //       userId,
  //       amount: cartTotals.toNumber(),
  //       name,
  //       address,
  //       phone,
  //       totals: cartTotals.toNumber(),
  //       voucherId: undefined,
  //     });

  //     let voucherId: number | undefined = undefined;
  //     let discount = new Decimal(0);

  //     if (voucherCode) {
  //       const voucher = await Vouchers.findOne({ where: { code: voucherCode } });
  //       console.log("Voucher tìm được:", voucher);

  //       if (voucher && voucher.status === Vouchers_STATUS.ISACTIVE) {
  //         const orderValue = cartTotals;
  //         console.log("Giá trị đơn hàng trước khi áp dụng voucher:", orderValue.toNumber());

  //         if (voucher.minOrderValue && orderValue.lessThan(new Decimal(voucher.minOrderValue))) {
  //           return res.status(400).json({
  //             message: "Giá trị đơn hàng không đủ điều kiện áp dụng voucher",
  //           });
  //         }

  //         // Tính toán giá trị giảm giá từ voucher
  //         discount = orderValue.times(new Decimal(voucher.discountValue).dividedBy(100));
  //         discount = Decimal.min(discount, new Decimal(voucher.discountMax));

  //         ordersAmount = Decimal.max(orderValue.minus(discount), new Decimal(0));
  //         console.log("Giá trị đơn hàng sau khi áp dụng voucher:", ordersAmount.toNumber());

  //         voucher.quantity -= 1;
  //         if (voucher.quantity === 0) {
  //           voucher.status = Vouchers_STATUS.EXPIRED;
  //         }
  //         await voucher.save();

  //         await UserVouchers.create({
  //           userId,
  //           voucherId: voucher.voucherId,
  //           status: Vouchers_STATUS.UNUSED,
  //         });

  //         voucherId = voucher.voucherId;
  //       }
  //     }

  //     // Cập nhật đơn hàng với giá trị giảm giá
  //     newOrders.voucherId = voucherId;
  //     newOrders.amount = ordersAmount.toNumber();
  //     await newOrders.save();

  //     // Phân phối giá trị giảm giá cho từng sản phẩm và tạo OrderItems
  //     for (const product of cartItems) {
  //       const priceDiscount = new Decimal(product.productDetails.products.priceDiscount || 0);
  //       const productAmount = new Decimal(product.quanity).times(priceDiscount);

  //       // Tính toán phần giảm giá cho sản phẩm dựa trên tỷ lệ phần trăm giảm giá của đơn hàng
  //       const discountAmount = productAmount.times(discount.dividedBy(cartTotals));
  //       const finalPrice = productAmount.minus(discountAmount);

  //       // Tạo OrderItem
  //       const orderItem = await OrderItems.create({
  //         userId,
  //         amount: finalPrice.toNumber(),
  //         quanity: product.quanity,
  //         orderDetailId: newOrders.orderDetailId,
  //         productDetailId: product.productDetailId,
  //         price: new Decimal(product.productDetails.products.price || 0).toNumber(),
  //         priceDiscount: priceDiscount.toNumber(),
  //         status: provider === PAYMENT_PROVIDER.CASH ? ODER_STATUS.CHO_XAC_NHAN : ODER_STATUS.CHO_THANH_TOAN,
  //       });

  //       console.log("OrderItem đã tạo:", orderItem);

  //       // Cập nhật giá trị của orderItem nếu cần
  //       if (orderItem.amount !== finalPrice.toNumber()) {
  //         await orderItem.update({ amount: finalPrice.toNumber() });
  //       }

  //       await product.destroy();
  //     }

  //     await PaymentDetails.create({
  //       provider,
  //       amount: ordersAmount.toNumber(),
  //       orderDetailId: newOrders.orderDetailId,
  //       status: provider === PAYMENT_PROVIDER.CASH ? PAYMENT_STATUS.CASH : PAYMENT_STATUS.IDLE,
  //     });

  //     await carts.destroy();
  //     await redis.del(`carts-${userId}`);

  //     switch (provider) {
  //       case PAYMENT_PROVIDER.MOMO:
  //         try {
  //           const paymentUrl = await createMomo({
  //             amount: ordersAmount.toNumber(),
  //             orderCode: newOrders.orderCode,
  //           });
  //           return res.json(
  //             ResponseBody({
  //               data: paymentUrl,
  //               code: RESPONSE_CODE.SUCCESS,
  //               message: "Thực hiện thành công",
  //             })
  //           );
  //         } catch (axiosError) {
  //           console.error("Lỗi thanh toán với MoMo:", axiosError);
  //           return res.status(500).json({
  //             message: "Lỗi thanh toán, vui lòng thử lại.",
  //           });
  //         }
  //       case PAYMENT_PROVIDER.CASH:
  //         return res.json(
  //           ResponseBody({
  //             data: null,
  //             code: RESPONSE_CODE.SUCCESS,
  //             message: "Thực hiện thành công",
  //           })
  //         );
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { provider, name, address, phone, voucherCode } = req.body;

      // Xử lý voucher
      let voucherId: number | undefined = undefined;
      let discount = new Decimal(0);
      if (voucherCode) {
        const voucher = await Vouchers.findOne({ where: { code: voucherCode } });
        if (!voucher || voucher.status !== Vouchers_STATUS.ISACTIVE) {
          return res.json(ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: "Voucher không khả dụng"
          }));
        }
        if (voucher.quantity <= 0) {
          return res.json(ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: "Voucher hết lượt sử dụng"
          }));
        }

        const orderValue = new Decimal(0); // Placeholder cho giá trị đơn hàng
        if (voucher.minOrderValue && orderValue.lessThan(new Decimal(voucher.minOrderValue))) {
          return res.status(400).json({
            message: "Giá trị đơn hàng không đủ điều kiện áp dụng voucher",
          });
        }

        // Tính toán giảm giá từ voucher
        discount = orderValue.times(new Decimal(voucher.discountValue).dividedBy(100));
        discount = Decimal.min(discount, new Decimal(voucher.discountMax));

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

      // Tìm giỏ hàng và các mặt hàng trong giỏ
      const carts = await ShoppingCarts.findOne({ where: { userId } });
      if (!carts) {
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            data: null,
            message: "Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm trước khi thanh toán",
          })
        );
      }

      const cartItems = await CartItems.findAll({
        where: { cartId: carts.cartId },
        include: [{ model: ProductDetails, include: [{ model: Products }] }]
      });

      // Tính toán tổng giá trị đơn hàng
      const cartTotals = new Decimal(cartItems.reduce((sum, item) => {
        const priceDiscount = new Decimal(item.productDetails.products.priceDiscount || 0);
        return sum + priceDiscount.times(item.quanity).toNumber();
      }, 0));

      // Tạo đơn hàng mới
      const newOrders = await OrderDetails.create({
        userId,
        amount: cartTotals.toNumber(),
        name,
        address,
        phone,
        totals: 0,
        voucherId
      });

      let ordersAmount = cartTotals.minus(discount);

      // Phân phối giá trị giảm giá cho từng sản phẩm và tạo OrderItems
      for (const product of cartItems) {
        const priceDiscount = new Decimal(product.productDetails.products.priceDiscount || 0);
        const productAmount = new Decimal(product.quanity).times(priceDiscount);

        // Tính toán phần giảm giá cho sản phẩm
        const discountAmount = productAmount.times(discount.dividedBy(cartTotals));
        const finalPrice = productAmount.minus(discountAmount);

        // Tạo hoặc cập nhật OrderItem
        const existingOrderItem = await OrderItems.findOne({
          where: {
            orderDetailId: newOrders.orderDetailId,
            productDetailId: product.productDetailId
          }
        });

        if (existingOrderItem) {
          existingOrderItem.amount = finalPrice.toNumber();
          existingOrderItem.quanity = product.quanity;
          await existingOrderItem.save();
          console.log("OrderItem đã được cập nhật thành công:", existingOrderItem);
        } else {
          await OrderItems.create({
            userId,
            amount: finalPrice.toNumber(),
            quanity: product.quanity,
            orderDetailId: newOrders.orderDetailId,
            productDetailId: product.productDetailId,
            price: new Decimal(product.productDetails.products.price || 0).toNumber(),
            priceDiscount: priceDiscount.toNumber(),
            status: provider === PAYMENT_PROVIDER.CASH ? ODER_STATUS.CHO_XAC_NHAN : ODER_STATUS.CHO_THANH_TOAN,
          });
          console.log("OrderItem mới đã được tạo.");
        }

        // Xóa sản phẩm trong giỏ hàng
        await product.destroy();
      }

      // Cập nhật thông tin thanh toán
      await PaymentDetails.create({
        provider,
        amount: ordersAmount.toNumber(),
        orderDetailId: newOrders.orderDetailId,
        status: provider === PAYMENT_PROVIDER.CASH ? PAYMENT_STATUS.CASH : PAYMENT_STATUS.IDLE,
      });

      // Xóa giỏ hàng
      await carts.destroy();
      await redis.del(`carts-${userId}`);

      // Xử lý thanh toán qua MoMo
      if (provider === PAYMENT_PROVIDER.MOMO) {
        try {
          const paymentUrl = await createMomo({
            amount: ordersAmount.toNumber(),
            orderCode: newOrders.orderCode,
          });
          return res.json(
            ResponseBody({
              data: paymentUrl,
              code: RESPONSE_CODE.SUCCESS,
              message: "Thực hiện thành công",
            })
          );
        } catch (axiosError) {
          console.error("Lỗi thanh toán với MoMo:", axiosError);
          return res.status(500).json({
            message: "Lỗi thanh toán, vui lòng thử lại.",
          });
        }
      }

      return res.json(
        ResponseBody({
          data: null,
          code: RESPONSE_CODE.SUCCESS,
          message: "Thực hiện thành công",
        })
      );

    } catch (error) {
      next(error);
    }
  },

};



export default PaymentOnlineController;
