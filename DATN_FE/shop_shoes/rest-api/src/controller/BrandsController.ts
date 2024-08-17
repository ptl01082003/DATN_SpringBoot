import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Brands } from "../models/Brands";

const BrandsController = {
  addBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const brands = await Brands.create({ name });
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: brands,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getBrands: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brands = await Brands.findAll();
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: brands,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { brandId } = req.body;
      const brands = await Brands.findByPk(brandId);
      if (brands) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: brands,
        });
      } else {
        res.status(404).json({
          message: "Thương hiệu không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  updateBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { brandId, name } = req.body;
      const brands = await Brands.findByPk(brandId);
      if (brands) {
        await brands.update({ name });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: brands,
        });
      } else {
        res.json({
          message: "Thương hiệu không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { brandId } = req.body;
      const brands = await Brands.findByPk(brandId);
      if (brands) {
        await brands.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.json({
          message: "Thương hiệu không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default BrandsController;
