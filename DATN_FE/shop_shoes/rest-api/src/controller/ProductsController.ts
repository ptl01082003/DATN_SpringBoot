import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE } from "../constants";
import { Images } from "../models/Images";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { Sizes } from "../models/Sizes";
import { Materials } from "../models/Materials";
import { Origins } from "../models/Origins";
import { Styles } from "../models/Styles";
import { Brands } from "../models/Brands";
import { Op } from "sequelize";
import { Reviewers } from "../models/Reviewers";
import { Users } from "../models/Users";
import { ReviewerPhoto } from "../models/ReviewerPhoto";
import { Promotions } from "../models/Promotions";

const ProductsController = {
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        gallery,
        productDetails,
        description,
      } = req.body;

      const priceDiscount = price;
      // Tạo sản phẩm
      const product = await Products.create({
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        description,
        priceDiscount,
      });

      // Tạo chi tiết sản phẩm
      if (Array.isArray(productDetails)) {
        const productDetailsData = productDetails.map((detail: any) => ({
          productId: product.productId,
          sizeId: detail.sizeId,
          quantity: detail.quantity,
        }));

        await ProductDetails.bulkCreate(productDetailsData);
      }

      // Thêm hình ảnh vào bảng Images
      if (Array.isArray(gallery)) {
        const imagesData = gallery.map((path: string) => ({
          path,
          productId: product.productId,
        }));

        await Images.bulkCreate(imagesData);
      }

      res.json({
        code: RESPONSE_CODE.SUCCESS,
        message: "Thực hiện thành công",
      });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  },
  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Lấy tất cả sản phẩm
      const products = await Products.findAll({
        include: [
          {
            model: Materials,
            attributes: ["name"],
          },
          {
            model: Origins,
            attributes: ["name"],
          },
          {
            model: Styles,
            attributes: ["name"],
          },
          {
            model: Brands,
            attributes: ["name"],
          },
        ],
      });

      // Lấy tất cả khuyến mãi cho các sản phẩm hiện có
      const productIds = products.map((product) => product.productId);
      const promotions = await Promotions.findAll({
        where: { productId: { [Op.in]: productIds } },
      });

      const transferData = [];

      for (const product of products) {
        // Lấy thông tin chi tiết của sản phẩm
        const productDetails = await ProductDetails.findAll({
          where: { productId: product.productId },
          attributes: ["sizeId", "quantity"],
          include: [{ model: Sizes, attributes: ["name"] }],
        });

        // Lấy hình ảnh của sản phẩm
        const images = await Images.findAll({
          where: { productId: product.productId },
          attributes: ["path"],
        });

        // Đảm bảo giá trị price không phải là undefined và luôn là chuỗi
        const originalPrice = parseFloat(product.price?.toString() ?? "0");

        // Tính giá cuối cùng dựa trên khuyến mãi
        let discount = 0;
        const applicablePromotions = promotions.filter(
          (promo) => promo.productId === product.productId
        );
        if (applicablePromotions.length > 0) {
          discount = Math.max(
            ...applicablePromotions.map((promo) =>
              parseFloat(promo.discountPrice?.toString() ?? "0")
            )
          );
        }

        const finalPrice = Math.max(0, originalPrice - discount);

        transferData.push({
          ...product.toJSON(),
          productDetails: productDetails.map((detail) => ({
            productId: detail.productId,
            sizeId: detail.sizeId,
            quantity: detail.quantity,
          })),
          gallery: images,
          finalPrice: finalPrice.toFixed(2), // Giá cuối cùng sau khi áp dụng khuyến mãi, làm tròn đến 2 chữ số thập phân
          originalPrice: originalPrice.toFixed(2), // Giá gốc, làm tròn đến 2 chữ số thập phân
        });
      }

      res.json({
        message: "Thực hiện thành công",
        code: RESPONSE_CODE.SUCCESS,
        data: transferData,
      });
    } catch (error) {
      next(error);
    }
  },

  getLstProducts: async (req: Request, res: Response, next: NextFunction) => {
    const where: any = {};
    const { styleId, materialId, brandId, priceMin, priceMax } = req.body;
    try {
      if (styleId) {
        where.styleId = styleId;
      }
      if (materialId) {
        where.materialId = materialId;
      }
      if (brandId) {
        where.brandId = brandId;
      }
      if (priceMin != undefined) {
        where.priceDiscount[Op.gte] = priceMin;
      }
      if (priceMax != undefined) {
        where.priceDiscount[Op.lte] = priceMax;
      }

      const products = await Products.findAll({
        where,
        include: [
          {
            model: Materials,
            attributes: ["name"],
          },
          {
            model: Origins,
            attributes: ["name"],
          },
          {
            model: Styles,
            attributes: ["name"],
          },
          {
            model: Brands,
            attributes: ["name"],
          },
        ],
      });

      const transferData = [];

      for await (const product of products) {
        const productDetails = await ProductDetails.findAll({
          where: { productId: product.productId },
          attributes: ["sizeId", "quantity"],
          include: [{ model: Sizes, attributes: ["name"] }],
        });

        const productDetailsLevel = productDetails.map((detail) =>
          detail.get({ plain: true })
        );

        const images = await Images.findAll({
          where: { productId: product.productId },
          attributes: ["path"],
        });

        const imagesLevel = images.map((image) => image.get({ plain: true }));

        transferData.push({
          ...product.toJSON(),
          productDetails: productDetailsLevel,
          gallery: imagesLevel,
        });
      }

      res.json({
        message: "Thực hiện thành công",
        code: RESPONSE_CODE.SUCCESS,
        data: transferData,
      });
    } catch (error) {
      next(error);
    }
  },

  getProductDeatails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code } = req.body;
      const products = await Products.findOne({
        where: { code },
        include: [
          {
            model: Materials,
            attributes: ["name"],
          },
          {
            model: Origins,
            attributes: ["name"],
          },
          {
            model: Styles,
            attributes: ["name"],
          },
          {
            model: Brands,
            attributes: ["name"],
          },
        ],
      });

      if (products) {
        const sizes = await ProductDetails.findAll({
          where: { productId: products.productId },
          attributes: ["sizeId", "quantity", "productDetailId"],
          include: [{ model: Sizes, attributes: ["name"] }],
        });

        const gallery = await Images.findAll({
          where: { productId: products.productId },
          attributes: ["path"],
        });

        const reviewers = await Reviewers.findAll({
          where: { productId: products.productId },
          attributes: ["contents", "stars", "reviewerId", "createdAt"],
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Users,
              attributes: ["fullName"],
            },
            {
              model: ReviewerPhoto,
              attributes: ["path"],
            },
          ],
        });

        res.json({
          message: "Thực hiện thành công",
          code: RESPONSE_CODE.SUCCESS,
          data: {
            gallery,
            sizes,
            ...products.toJSON(),
            reviewers,
          },
        });
      } else {
        res.json({
          message: "Không tìm thấy sản phẩm",
          code: RESPONSE_CODE.ERRORS,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        productId,
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        gallery,
        productDetails,
        description,
      } = req.body;

      const product = await Products.findOne({ where: { productId } });

      if (!product) {
        return res.json({
          message: "Sản phẩm không tồn tại",
          code: RESPONSE_CODE.ERRORS,
        });
      }

      await product.update({
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        description,
      });

      if (Array.isArray(productDetails)) {
        for (const detail of productDetails) {
          const productDetail = await ProductDetails.findOne({
            where: {
              productId: product.productId,
              sizeId: detail.sizeId,
            },
          });

          if (productDetail) {
            await productDetail.update({
              quantity: detail.quantity,
            });
          } else {
            await ProductDetails.create({
              productId: detail.productId,
              sizeId: detail.sizeId,
              quantity: detail.quantity,
            });
          }
        }
      }

      // Cập nhật hình ảnh
      await Images.destroy({
        where: { productId },
      });

      if (Array.isArray(gallery)) {
        const imagesData = gallery.map((path) => ({
          path,
          productId,
        }));

        await Images.bulkCreate(imagesData);
      }

      const productInfo = await Products.findOne({
        where: { productId },
        include: [
          {
            model: Materials,
            attributes: ["name"],
          },
          {
            model: Origins,
            attributes: ["name"],
          },
          {
            model: Styles,
            attributes: ["name"],
          },
          {
            model: Brands,
            attributes: ["name"],
          },
        ],
      });

      const productDetailsInfo = await ProductDetails.findAll({
        where: { productId: product.productId },
        attributes: ["sizeId", "quantity"],
        include: [{ model: Sizes, attributes: ["name"] }],
      });

      const images = await Images.findAll({
        where: { productId: product.productId },
        attributes: ["path"],
      });

      res.json({
        code: RESPONSE_CODE.SUCCESS,
        data: {
          ...productInfo?.toJSON(),
          productDetails: productDetailsInfo.map((details) => ({
            productId: details.productId,
            sizeId: details.sizeId,
            quantity: details.quantity,
          })),
          gallery: images,
        },
        message: "Thực hiện thành công",
      });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.body;
      const product = await Products.findOne({ where: { productId } });

      if (!product) {
        return res.status(404).json({
          message: "Sản phẩm không tồn tại",
          code: RESPONSE_CODE.ERRORS,
        });
      }

      await Images.destroy({
        where: { productId },
      });

      await ProductDetails.destroy({
        where: { productId },
      });

      await product.destroy();

      res.json({
        code: RESPONSE_CODE.SUCCESS,
        message: "Thực hiện thành công",
      });
    } catch (error) {
      next(error);
    }
  },
  getDiscountedProducts: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const products = await Products.findAll({
        where: { finalPrice: { [Op.ne]: null } }, // Lọc những sản phẩm đã được cập nhật giá
        include: [
          {
            model: Materials,
            attributes: ["name"],
          },
          {
            model: Origins,
            attributes: ["name"],
          },
          {
            model: Styles,
            attributes: ["name"],
          },
          {
            model: Brands,
            attributes: ["name"],
          },
          {
            model: Images,
            attributes: ["path"],
          },
        ],
      });

      const transferData = [];

      for await (const product of products) {
        const productDetails = await ProductDetails.findAll({
          where: { productId: product.productId },
          attributes: ["sizeId", "quantity"],
          include: [{ model: Sizes, attributes: ["name"] }],
        });

        const productDetailsLevel = productDetails.map((detail) =>
          detail.get({ plain: true })
        );

        transferData.push({
          ...product.toJSON(),
          productDetails: productDetailsLevel,
        });
      }

      res.json({
        message: "Thực hiện thành công",
        code: RESPONSE_CODE.SUCCESS,
        data: transferData,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ProductsController;
