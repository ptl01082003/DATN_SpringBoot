import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { ProductDetails } from "../models/ProductDetails";
import { Sizes } from "../models/Sizes";

const SizeController = {
  createSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const newSize = await Sizes.create({ name });

      res.status(201).json({
        message: "Size created successfully",
        code: 0,
        data: newSize,
      });
    } catch (error) {
      console.error("Error creating size:", error);
      res.status(500).json({
        message: "Failed to create size",
        code: 1,
      });
    }
  },

  getAllSizes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sizes = await Sizes.findAll();
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: sizes,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  updateSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeId } = req.body;
      const { name } = req.body;
      const size = await Sizes.findByPk(sizeId);

      if (size) {
        await size.update({ name });

        res.status(200).json({
          message: "Size updated successfully",
          code: 0,
          data: size,
        });
      } else {
        res.status(404).json({
          message: "Size not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(`Error updating size ${req.body.id}:`, error);
      res.status(500).json({
        message: "Failed to update size",
        code: 1,
      });
    }
  },

  deleteSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeId } = req.body;
      const size = await Sizes.findByPk(sizeId);

      if (size) {
        await size.destroy(); // Changed to instance method destroy()

        res.status(200).json({
          message: "Size deleted successfully",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Size not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(`Error deleting size ${req.body.id}:`, error);
      res.status(500).json({
        message: "Failed to delete size",
        code: 1,
      });
    }
  },

  getSizeById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeId } = req.body;
      const size = await Sizes.findByPk(sizeId, {
        // include: [ProductDetails], // Include SizeProductDetails if needed
      });

      if (size) {
        res.status(200).json({
          message: "Size fetched successfully",
          code: 0,
          data: size,
        });
      } else {
        res.status(404).json({
          message: "Size not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(`Error fetching size ${req.body.id}:`, error);
      res.status(500).json({
        message: "Failed to fetch size",
        code: 1,
      });
    }
  },
};

export default SizeController;
