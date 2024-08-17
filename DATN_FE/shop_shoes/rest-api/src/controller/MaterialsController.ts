import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Materials } from "../models/Materials";

const MaterialsController = {
  addMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const material = await Materials.create({ name });
      res.json(ResponseBody({
        data: material,
        code: RESPONSE_CODE.SUCCESS,
        message: "Thực hiện thành công",
      }));
    } catch (error) {
      next(error)
    }
  },

  getMaterials: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialId, materialsName } = req.query;
      const whereClause: any = {};

      if (materialId) {
        whereClause.materialId = materialId;
      }
      if (materialsName) {
        whereClause.materialsName = { [Op.like]: `%${materialsName}%` };
      }

      const materialss = await Materials.findAll({ where: whereClause });
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: materialss,
      });
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

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialId } = req.body;
      const materials = await Materials.findByPk(materialId);
      if (materials) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: materials,
        });
      } else {
        res.status(404).json({
          message: "Vật liệu không tồn tại",
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

  updateMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialId, materialsName } = req.body;
      const materials = await Materials.findByPk(materialId);
      if (materials) {
        await materials.update({ materialsName });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: materials,
        });
      } else {
        res.status(404).json({
          message: "Vật liệu không tồn tại",
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

  deleteMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialId } = req.body;
      const materials = await Materials.findByPk(materialId);
      if (materials) {
        await materials.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Vật liệu không tồn tại",
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

export default MaterialsController;
