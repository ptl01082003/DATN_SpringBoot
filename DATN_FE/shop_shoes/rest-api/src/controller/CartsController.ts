import Decimal from "decimal.js";
import { NextFunction, Request, Response } from "express";
import { redis } from "../config/ConnectRedis";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "../constants";
import { CartItems } from "../models/CartItems";
import { Images } from "../models/Images";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { ShoppingCarts } from "../models/ShoppingCarts";
import { Sizes } from "../models/Sizes";


const CartsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { productDetailId, quanity } = req.body;

      // Validate quantity
      if (quanity < 0) {
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: `Số lượng sản phẩm không hợp lệ`,
          })
        );
      }

      let cartTotals = new Decimal(0);
      let cartsAmount = new Decimal(0);

      // Find or create cart
      const [carts] = await ShoppingCarts.findOrCreate({
        where: { userId },
      });

      // Find product details
      const productDetails = await ProductDetails.findOne({
        where: { productDetailId },
        include: {
          model: Products,
        },
      });

      if (productDetails) {
        // Check if quantity exceeds stock
        const isExceedQuantity = productDetails.quantity < quanity;
        const actualQuantity = isExceedQuantity
          ? productDetails.quantity
          : quanity;

        // Find or create cart item
        const [cartItems, created] = await CartItems.findOrCreate({
          where: { productDetailId, cartId: carts.cartId },
        });

        if (!cartItems.cartItemId) {
          throw new Error('Cart item does not have a primary key.');
        }

        cartItems.quanity = actualQuantity;
        await cartItems.save();

        // Fetch all cart items
        const lstCartsItems = await CartItems.findAll({
          where: { cartId: carts.cartId },
          attributes: ["productDetailId", "quanity", "amount", "cartItemId"],
          include: [
            {
              model: ProductDetails,
              include: [
                {
                  model: Products,
                  attributes: ["priceDiscount", "name", "price"],
                  include: [
                    {
                      model: Images,
                      attributes: ["path"],
                    },
                  ],
                },
                {
                  model: Sizes,
                  attributes: ["name"],
                },
              ],
            },
          ],
        });

        // Calculate totals
        for (const item of lstCartsItems) {
          const itemPriceDiscount = new Decimal(item.productDetails.products.priceDiscount || 0);
          const amount = itemPriceDiscount.mul(item.quanity).toNumber();
          item.amount = amount;
          await item.update({ amount });
          cartTotals = cartTotals.plus(item.quanity);
          cartsAmount = cartsAmount.plus(amount);
        }

        carts.amount = cartsAmount.toNumber();
        carts.totals = cartTotals.toNumber();

        await carts.save();

        let transferCarts: { [key: string]: any } = {};
        transferCarts = { ...carts?.toJSON() };

        transferCarts["cartItems"] = lstCartsItems.map((cartItems) => {
          return {
            quanity: cartItems?.quanity,
            amount: cartItems?.amount.toFixed(2),
            productDetailId: cartItems?.productDetailId,
            name: cartItems?.productDetails?.products?.name,
            sizeName: cartItems?.productDetails?.sizes?.name,
            price: cartItems?.productDetails?.products?.price,
            quanityLimit: cartItems?.productDetails?.quantity,
            path: cartItems?.productDetails?.products?.gallery?.[0]?.path,
            priceDiscount: cartItems?.productDetails?.products?.priceDiscount,
          };
        });

        await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));

        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: isExceedQuantity
              ? `Bạn chỉ có thể thêm tối đa ${productDetails.quantity} sản phẩm`
              : "Thực hiện thành công",
            data: {
              carts: transferCarts,
            },
          })
        );
      } else {
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: `Sản phẩm không tồn tại`,
          })
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in create cart item:", error);
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: `Có lỗi xảy ra: ${error.message}`,
          })
        );
      } else {
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: `Có lỗi không xác định xảy ra`,
          })
        );
      }
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const { productDetailId } = req.body;

      let cartTotals = new Decimal(0);
      let cartsAmount = new Decimal(0);

      const carts = await ShoppingCarts.findOne({ where: { userId } });

      if (!carts) {
        return res.json(
          ResponseBody({
            data: null,
            code: RESPONSE_CODE.ERRORS,
            message: `Giỏ hàng của bạn đang trống`,
          })
        );
      }

      // Remove the cart item
      await CartItems.destroy({
        where: {
          productDetailId,
          cartId: carts.cartId,
        },
      });

      // Fetch the updated cart and its items
      const currentCarts = await ShoppingCarts.findOne({
        where: { userId },
        attributes: ["totals", "amount", "cartId"],
      });

      if (currentCarts) {
        const lstCartsItems = await CartItems.findAll({
          where: { cartId: currentCarts.cartId },
          attributes: ["productDetailId", "quanity", "amount"],
          include: [
            {
              model: ProductDetails,
              include: [
                {
                  model: Products,
                  attributes: ["priceDiscount", "price"],
                  include: [
                    {
                      model: Images,
                      attributes: ["path"],
                    },
                  ],
                },
                {
                  model: Sizes,
                  attributes: ["name"],
                },
              ],
            },
          ],
        });

        for (const item of lstCartsItems) {
          const itemPriceDiscount = new Decimal(item.productDetails.products.priceDiscount || 0);
          const itemPrice = new Decimal(item.productDetails.products.price || 0);

          if (itemPrice.isNaN() || itemPriceDiscount.isNaN()) {
            throw new Error('Invalid price or discount value');
          }

          const amount = itemPriceDiscount.mul(item.quanity).toNumber();
          item.amount = amount;
          cartTotals = cartTotals.plus(item.quanity);
          cartsAmount = cartsAmount.plus(amount);

          // Update amount directly in the database
          await CartItems.update(
            { amount },
            { where: { cartId: currentCarts.cartId, productDetailId: item.productDetailId } }
          );
        }

        currentCarts.amount = cartsAmount.toNumber();
        currentCarts.totals = cartTotals.toNumber();

        await currentCarts.save();

        const transferCarts = { ...currentCarts.toJSON() };
        transferCarts["cartItems"] = lstCartsItems.map((item) => {
          return {
            quanity: item.quanity,
            amount: item.amount.toFixed(2),
            productDetailId: item.productDetailId,
            name: item.productDetails.products.name,
            sizeName: item.productDetails.sizes.name,
            quanityLimit: item.productDetails.quantity,
            price: item.productDetails.products.price,
            path: item.productDetails.products.gallery?.[0]?.path,
            priceDiscount: item.productDetails.products.priceDiscount,
          };
        });

        await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));

        return res.json(
          ResponseBody({
            data: transferCarts,
            code: RESPONSE_CODE.SUCCESS,
            message: `Thực hiện thành công`,
          })
        );
      } else {
        return res.json(
          ResponseBody({
            data: null,
            code: RESPONSE_CODE.ERRORS,
            message: `Giỏ hàng của bạn đang trống`,
          })
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in remove cart item:", error);
        return res.json(
          ResponseBody({
            data: null,
            code: RESPONSE_CODE.ERRORS,
            message: `Có lỗi xảy ra: ${error.message}`,
          })
        );
      } else {
        return res.json(
          ResponseBody({
            data: null,
            code: RESPONSE_CODE.ERRORS,
            message: `Có lỗi không xác định xảy ra`,
          })
        );
      }
    }
  },

//   create: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.userId;
//         const { productDetailId, quanity } = req.body;

//         // Validate quanity
//         if (quanity < 0) {
//             return res.json(
//                 ResponseBody({
//                     code: RESPONSE_CODE.ERRORS,
//                     message: `Số lượng sản phẩm không hợp lệ`,
//                 })
//             );
//         }

//         let cartTotals = 0;
//         let cartsAmount = 0;

//         // Find or create cart
//         const [carts] = await ShoppingCarts.findOrCreate({
//             where: { userId },
//         });

//         // Find product details
//         const productDetails = await ProductDetails.findOne({
//             where: { productDetailId },
//             include: {
//                 model: Products,
//             },
//         });

//         if (productDetails) {
//             // Check if quantity exceeds stock
//             const isExceedQuanity = productDetails.quantity < quanity;
//             const actualQuanity = isExceedQuanity
//                 ? productDetails.quantity
//                 : quanity;

//             // Find or create cart item
//             const [cartItems] = await CartItems.findOrCreate({
//                 where: { productDetailId, cartId: carts.cartId },
//             });

//             cartItems.quanity = actualQuanity;
//             await cartItems.save();

//             // Fetch all cart items
//             const lstCartsItems = await CartItems.findAll({
//                 where: { cartId: carts.cartId },
//                 attributes: ["productDetailId", "quanity", "amount", "cartItemId"],
//                 include: [
//                     {
//                         model: ProductDetails,
//                         include: [
//                             {
//                                 model: Products,
//                                 attributes: ["priceDiscount", "name", "price"],
//                                 include: [
//                                     {
//                                         model: Images,
//                                         attributes: ["path"],
//                                     },
//                                 ],
//                             },
//                             {
//                                 model: Sizes,
//                                 attributes: ["name"],
//                             },
//                         ],
//                     },
//                 ],
//             });

//             // Calculate totals
//             for (const product of lstCartsItems) {
//                 const amount =
//                     product.quanity *
//                     Number(product.productDetails.products.priceDiscount || 0);
//                 product.amount = amount;
//                 await product.save();
//                 cartTotals += product.quanity;
//                 cartsAmount += product.amount;
//             }

//             carts.amount = cartsAmount;
//             carts.totals = cartTotals;

//             await carts.save();

//             let transferCarts: { [key: string]: any } = {};
//             transferCarts = { ...carts?.toJSON() };

//             transferCarts["cartItems"] = lstCartsItems.map((cartItems) => {
//                 return {
//                     quanity: cartItems?.quanity,
//                     amount: cartItems?.amount,
//                     productDetailId: cartItems?.productDetailId,
//                     name: cartItems?.productDetails?.products?.name,
//                     sizeName: cartItems?.productDetails?.sizes?.name,
//                     price: cartItems?.productDetails?.products?.price,
//                     quanityLimit: cartItems?.productDetails?.quantity,
//                     path: cartItems?.productDetails?.products?.gallery?.[0]?.path,
//                     priceDiscount: cartItems?.productDetails?.products?.priceDiscount,
//                 };
//             });

//             await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));

//             return res.json(
//                 ResponseBody({
//                     code: RESPONSE_CODE.SUCCESS,
//                     message: isExceedQuanity
//                         ? `Bạn chỉ có thể thêm tối đa ${productDetails.quantity} sản phẩm`
//                         : "Thực hiện thành công",
//                     data: {
//                         carts: transferCarts,
//                     },
//                 })
//             );
//         } else {
//             return res.json(
//                 ResponseBody({
//                     code: RESPONSE_CODE.ERRORS,
//                     message: `Sản phẩm không tồn tại`,
//                 })
//             );
//         }
//     } catch (error) {
//         next(error);
//     }
// },
// create: async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.userId;
//     const { productDetailId, quanity } = req.body;

//     // Validate quantity
//     if (quanity < 0) {
//       return res.json(
//         ResponseBody({
//           code: RESPONSE_CODE.ERRORS,
//           message: `Số lượng sản phẩm không hợp lệ`,
//         })
//       );
//     }

//     let cartTotals = 0;
//     let cartsAmount = 0;

//     // Find or create cart
//     const [carts] = await ShoppingCarts.findOrCreate({
//       where: { userId },
//     });

//     // Find product details
//     const productDetails = await ProductDetails.findOne({
//       where: { productDetailId },
//       include: {
//         model: Products,
//       },
//     });

//     if (productDetails) {
//       // Check if quantity exceeds stock
//       const isExceedQuantity = productDetails.quantity < quanity;
//       const actualQuantity = isExceedQuantity
//         ? productDetails.quantity
//         : quanity;

//       // Find or create cart item
//       const [cartItems, created] = await CartItems.findOrCreate({
//         where: { productDetailId, cartId: carts.cartId },
//       });

//       if (!cartItems.cartItemId) {
//         throw new Error('Cart item does not have a primary key.');
//       }

//       cartItems.quanity = actualQuantity;
//       await cartItems.save();

//       // Fetch all cart items
//       const lstCartsItems = await CartItems.findAll({
//         where: { cartId: carts.cartId },
//         attributes: ["productDetailId", "quanity", "amount", "cartItemId"],
//         include: [
//           {
//             model: ProductDetails,
//             include: [
//               {
//                 model: Products,
//                 attributes: ["priceDiscount", "name", "price"],
//                 include: [
//                   {
//                     model: Images,
//                     attributes: ["path"],
//                   },
//                 ],
//               },
//               {
//                 model: Sizes,
//                 attributes: ["name"],
//               },
//             ],
//           },
//         ],
//       });

//       // Calculate totals
//       for (const product of lstCartsItems) {
//         const amount =
//           product.quanity *
//           Number(product.productDetails.products.priceDiscount || 0);
//         product.amount = amount;
//         await product.save();
//         cartTotals += product.quanity;
//         cartsAmount += product.amount;
//       }

//       carts.amount = cartsAmount;
//       carts.totals = cartTotals;

//       await carts.save();

//       let transferCarts: { [key: string]: any } = {};
//       transferCarts = { ...carts?.toJSON() };

//       transferCarts["cartItems"] = lstCartsItems.map((cartItems) => {
//         return {
//           quanity: cartItems?.quanity,
//           amount: cartItems?.amount,
//           productDetailId: cartItems?.productDetailId,
//           name: cartItems?.productDetails?.products?.name,
//           sizeName: cartItems?.productDetails?.sizes?.name,
//           price: cartItems?.productDetails?.products?.price,
//           quanityLimit: cartItems?.productDetails?.quantity,
//           path: cartItems?.productDetails?.products?.gallery?.[0]?.path,
//           priceDiscount: cartItems?.productDetails?.products?.priceDiscount,
//         };
//       });

//       await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));

//       return res.json(
//         ResponseBody({
//           code: RESPONSE_CODE.SUCCESS,
//           message: isExceedQuantity
//             ? `Bạn chỉ có thể thêm tối đa ${productDetails.quantity} sản phẩm`
//             : "Thực hiện thành công",
//           data: {
//             carts: transferCarts,
//           },
//         })
//       );
//     } else {
//       return res.json(
//         ResponseBody({
//           code: RESPONSE_CODE.ERRORS,
//           message: `Sản phẩm không tồn tại`,
//         })
//       );
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error in create cart item:", error);
//       return res.json(
//         ResponseBody({
//           code: RESPONSE_CODE.ERRORS,
//           message: `Có lỗi xảy ra: ${error.message}`,
//         })
//       );
//     } else {
//       return res.json(
//         ResponseBody({
//           code: RESPONSE_CODE.ERRORS,
//           message: `Có lỗi không xác định xảy ra`,
//         })
//       );
//     }
//   }
// },
//   remove: async (req: Request, res: Response) => {
//     try {
//         const userId = req.userId;
//         const { productDetailId } = req.body;

//         let cartTotals = new Decimal(0);
//         let cartsAmount = new Decimal(0);

//         const carts = await ShoppingCarts.findOne({ where: { userId } });

//         if (!carts) {
//             return res.json(
//                 ResponseBody({
//                     data: null,
//                     code: RESPONSE_CODE.ERRORS,
//                     message: `Giỏ hàng của bạn đang trống`,
//                 })
//             );
//         }

//         // Remove the cart item
//         await CartItems.destroy({
//             where: {
//                 productDetailId,
//                 cartId: carts.cartId,
//             },
//         });

//         // Fetch the updated cart and its items
//         const currentCarts = await ShoppingCarts.findOne({
//             where: { userId },
//             attributes: ["totals", "amount", "cartId"],
//         });

//         if (currentCarts) {
//             const lstCartsItems = await CartItems.findAll({
//                 where: { cartId: currentCarts.cartId },
//                 attributes: ["productDetailId", "quanity", "amount"],
//                 include: [
//                     {
//                         model: ProductDetails,
//                         include: [
//                             {
//                                 model: Products,
//                                 attributes: ["priceDiscount", "price"],
//                                 include: [
//                                     {
//                                         model: Images,
//                                         attributes: ["path"],
//                                     },
//                                 ],
//                             },
//                             {
//                                 model: Sizes,
//                                 attributes: ["name"],
//                             },
//                         ],
//                     },
//                 ],
//             });

//             for (const item of lstCartsItems) {
//                 const itemPriceDiscount = new Decimal(item.productDetails.products.priceDiscount || 0);
//                 item.amount = itemPriceDiscount.mul(item.quanity).toNumber();
//                 cartTotals = cartTotals.plus(item.quanity);
//                 cartsAmount = cartsAmount.plus(item.amount);
//                 await item.save();
//             }

//             currentCarts.amount = cartsAmount.toNumber();
//             currentCarts.totals = cartTotals.toNumber();

//             await currentCarts.save();

//             const transferCarts = { ...currentCarts.toJSON() };
//             transferCarts["cartItems"] = lstCartsItems.map((item) => {
//                 return {
//                     quanity: item.quanity,
//                     amount: item.amount.toFixed(2),
//                     productDetailId: item.productDetailId,
//                     name: item.productDetails.products.name,
//                     sizeName: item.productDetails.sizes.name,
//                     quanityLimit: item.productDetails.quantity,
//                     price: item.productDetails.products.price,
//                     path: item.productDetails.products.gallery?.[0]?.path,
//                     priceDiscount: item.productDetails.products.priceDiscount,
//                 };
//             });

//             await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));

//             return res.json(
//                 ResponseBody({
//                     data: transferCarts,
//                     code: RESPONSE_CODE.SUCCESS,
//                     message: `Thực hiện thành công`,
//                 })
//             );
//         } else {
//             return res.json(
//                 ResponseBody({
//                     data: null,
//                     code: RESPONSE_CODE.ERRORS,
//                     message: `Giỏ hàng của bạn đang trống`,
//                 })
//             );
//         }
//     } catch (error) {
//         // Kiểm tra nếu 'error' là instance của Error
//         if (error instanceof Error) {
//             console.error("Error in remove cart item:", error);

//             return res.json(
//                 ResponseBody({
//                     data: null,
//                     code: RESPONSE_CODE.ERRORS,
//                     message: `Có lỗi xảy ra: ${error.message}`,
//                 })
//             );
//         } else {
//             // Nếu error không phải là kiểu Error
//             return res.json(
//                 ResponseBody({
//                     data: null,
//                     code: RESPONSE_CODE.ERRORS,
//                     message: `Có lỗi không xác định xảy ra`,
//                 })
//             );
//         }
//     }
// },

//   // remove: async (req: Request, res: Response) => {
//   //   const userId = req.userId;
//   //   const { productDetailId } = req.body;

//   //   let cartTotals = 0;
//   //   let cartsAmount = 0;

//   //   const carts = await ShoppingCarts.findOne({ where: { userId } });

//   //   await CartItems.destroy({
//   //     where: {
//   //       productDetailId,
//   //       cartId: carts?.cartId,
//   //     },
//   //   });

//   //   let transferCarts: { [key: string]: any } = {};

//   //   const currentCarts = await ShoppingCarts.findOne({
//   //     where: { userId },
//   //     attributes: ["totals", "amount", "cartId"],
//   //   });
//   //   if (currentCarts) {
//   //     const lstCartsItems = await CartItems.findAll({
//   //       where: { cartId: currentCarts.cartId },
//   //     });

//   //     lstCartsItems.forEach((cartItems) => {
//   //       (cartTotals += cartItems.quanity), (cartsAmount += cartItems.amount);
//   //     });

//   //     currentCarts.amount = cartsAmount;
//   //     currentCarts.totals = cartTotals;

//   //     await currentCarts.save();

//   //     transferCarts = { ...currentCarts?.toJSON() };
//   //     delete transferCarts["cartId"];

//   //     const productItems = await CartItems.findAll({
//   //       where: { cartId: currentCarts?.cartId },
//   //       attributes: ["productDetailId", "quanity", "amount"],
//   //       include: [
//   //         {
//   //           model: ProductDetails,
//   //           include: [
//   //             {
//   //               model: Products,
//   //               attributes: ["priceDiscount", "name"],
//   //               include: [
//   //                 {
//   //                   model: Images,
//   //                   attributes: ["path"],
//   //                 },
//   //               ],
//   //             },
//   //             {
//   //               model: Sizes,
//   //               attributes: ["name"],
//   //             },
//   //           ],
//   //         },
//   //       ],
//   //     });

//   //     transferCarts["cartItems"] = productItems.map((products) => {
//   //       return {
//   //         quanity: products?.quanity,
//   //         amount: products?.amount,
//   //         productDetailId: products?.productDetailId,
//   //         name: products?.productDetails?.products?.name,
//   //         sizeName: products?.productDetails?.sizes?.name,
//   //         quanityLimit: products?.productDetails?.quantity,
//   //         price: products?.productDetails?.products?.price,
//   //         path: products?.productDetails?.products?.gallery?.[0]?.path,
//   //         priceDiscount: products?.productDetails?.products?.priceDiscount,
//   //       };
//   //     });

//   //     await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));
//   //     return res.json(
//   //       ResponseBody({
//   //         data: transferCarts,
//   //         code: RESPONSE_CODE.SUCCESS,
//   //         message: `Thực hiện thành công`,
//   //       })
//   //     );
//   //   } else {
//   //     return res.json(
//   //       ResponseBody({
//   //         data: null,
//   //         code: RESPONSE_CODE.ERRORS,
//   //         message: `Giỏ hàng của bạn đang trống`,
//   //       })
//   //     );
//   //   }
//   // },

  lstCarts: async (req: Request, res: Response) => {
    let cartTotals = 0;
    let cartsAmount = 0;
    let transferCarts: { [key: string]: any } = {};

    const userId = req.userId;
    const cartsInRedis = await redis.get(`carts-${userId}`);
    if (cartsInRedis) {
      const transferCarts = JSON.parse(cartsInRedis);
      for await (const cartProduct of transferCarts["cartItems"]) {
        const productDetails = await ProductDetails.findOne({
          where: { productDetailId: cartProduct["productDetailId"] },
          include: {
            model: Products,
          },
        });
        cartProduct["price"] = productDetails?.products.price;
        cartProduct["priceDiscount"] = productDetails?.products.priceDiscount;
        cartProduct["amount"] =
          cartProduct["quanity"] * Number(cartProduct["priceDiscount"]);
        cartsAmount += cartProduct["amount"];
      }
      transferCarts["amount"] = cartsAmount;
      await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));

      return res.status(STATUS_CODE.SUCCESS).json(
        ResponseBody({
          data: transferCarts,
          code: RESPONSE_CODE.SUCCESS,
          message: `Thực hiện thành công`,
        })
      );
    }

    const carts = await ShoppingCarts.findOne({
      where: { userId },
      attributes: ["totals", "amount", "cartId"],
    });

    if (carts) {
      const lstCartsItems = await CartItems.findAll({
        where: { cartId: carts.cartId },
        attributes: ["productDetailId", "quanity", "amount", "cartItemId"],
        include: [
          {
            model: ProductDetails,
            include: [
              {
                model: Products,
                attributes: ["priceDiscount", "name", "price"],
                include: [
                  {
                    model: Images,
                    attributes: ["path"],
                  },
                ],
              },
              {
                model: Sizes,
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      for await (const products of lstCartsItems) {
        const amount =
          products.quanity *
          Number(products.productDetails.products.priceDiscount);
        products.amount = amount;
        await products.save();
        cartTotals += products.quanity;
        cartsAmount += products.amount;
      }

      carts.amount = cartsAmount;
      carts.totals = cartTotals;

      await carts.save();

      transferCarts = { ...carts?.toJSON() };

      transferCarts["cartItems"] = lstCartsItems.map((cartItems) => {
        return {
          quanity: cartItems?.quanity,
          amount: cartItems?.amount,
          productDetailId: cartItems?.productDetailId,
          name: cartItems?.productDetails?.products?.name,
          sizeName: cartItems?.productDetails?.sizes?.name,
          price: cartItems?.productDetails?.products?.price,
          quanityLimit: cartItems?.productDetails?.quantity,
          path: cartItems?.productDetails?.products?.gallery?.[0]?.path,
          priceDiscount: cartItems?.productDetails?.products?.priceDiscount,
        };
      });

      await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));

      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: transferCarts,
          message: `Thực hiện thành công`,
        })
      );
    } else {
      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.ERRORS,
          data: null,
          message: `Giỏ hàng của bạn đang trống`,
        })
      );
    }
  },
};

export default CartsController;
