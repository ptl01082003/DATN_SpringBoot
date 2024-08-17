import { Request, Response, NextFunction } from "express";
import { Origins } from "../models/Origins";
import { Op } from "sequelize";

const OriginsController = {
  addOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const origins = await Origins.create({ name });
      res.status(201).json({
        message: "Thực hiện thành công",
        code: 0,
        data: origins,
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

  getOrigins: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originId, name } = req.query;
      const whereClause: any = {};

      if (originId) {
        whereClause.originId = originId;
      }
      if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
      }

      const originss = await Origins.findAll({ where: whereClause });
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: originss,
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
      const { originId } = req.body;
      const origins = await Origins.findByPk(originId);
      if (origins) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: origins,
        });
      } else {
        res.status(404).json({
          message: "Nguồn gốc không tồn tại",
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

  updateOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originId } = req.params;
      const { name } = req.body;
      const origins = await Origins.findByPk(originId);
      if (origins) {
        await origins.update({ name });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: origins,
        });
      } else {
        res.status(404).json({
          message: "Nguồn gốc không tồn tại",
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

  deleteOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originId } = req.params;
      const origins = await Origins.findByPk(originId);
      if (origins) {
        await origins.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Nguồn gốc không tồn tại",
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

export default OriginsController;
