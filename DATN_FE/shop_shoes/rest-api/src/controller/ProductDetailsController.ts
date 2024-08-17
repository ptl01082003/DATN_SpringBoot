import { NextFunction, Request, Response } from "express";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { Sizes } from "../models/Sizes";

const ProductDetailsController = {
  // Create a new ProductDetail
  createProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { sizeId, productId, quantity } = req.body;

      const productDetail = await ProductDetails.create({
        sizeId,
        productId,
        quantity,
      });

      res.status(201).json({
        message: "Product detail created successfully",
        code: 0,
        data: productDetail,
      });
    } catch (error) {
      console.error(error);
      res.json({
        message: "Failed to create product detail",
        code: 1,
      });
    }
  },

  // Get all ProductDetails
  getProductDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productDetails = await ProductDetails.findAll({
        include: [Sizes, Products],
      });

      res.status(200).json({
        message: "Product details retrieved successfully",
        code: 0,
        data: productDetails,
      });
    } catch (error) {
      console.error(error);
      res.json({
        message: "Failed to retrieve product details",
        code: 1,
      });
    }
  },

  // Get a single ProductDetail by ID
  getProductDetailById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productdetailId } = req.params;
      const productDetail = await ProductDetails.findByPk(productdetailId, {
        include: [Sizes, Products],
      });

      if (productDetail) {
        res.status(200).json({
          message: "Product detail retrieved successfully",
          code: 0,
          data: productDetail,
        });
      } else {
        res.status(404).json({
          message: "Product detail not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        message: "Failed to retrieve product detail",
        code: 1,
      });
    }
  },

  // Update a ProductDetail
  updateProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productdetailId } = req.params;
      const { sizeId, productId, quantity } = req.body;

      const productDetail = await ProductDetails.findByPk(productdetailId);

      if (productDetail) {
        await productDetail.update({
          sizeId,
          productId,
          quantity,
        });

        res.status(200).json({
          message: "Product detail updated successfully",
          code: 0,
          data: productDetail,
        });
      } else {
        res.status(404).json({
          message: "Product detail not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        message: "Failed to update product detail",
        code: 1,
      });
    }
  },

  // Delete a ProductDetail
  deleteProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productdetailId } = req.params;

      const productDetail = await ProductDetails.findByPk(productdetailId);

      if (productDetail) {
        await productDetail.destroy();

        res.status(200).json({
          message: "Product detail deleted successfully",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Product detail not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        message: "Failed to delete product detail",
        code: 1,
      });
    }
  },
};

export default ProductDetailsController;
