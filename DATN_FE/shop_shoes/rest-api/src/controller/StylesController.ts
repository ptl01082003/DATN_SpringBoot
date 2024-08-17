import { Request, Response, NextFunction } from "express";
import { Styles } from "../models/Styles";
import { Op } from "sequelize";

const StylesController = {
  addStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const styles = await Styles.create({ name });
      res.json({ data: styles, message: "Thêm style mới thành công" });
    } catch (error) {
      next(error);
    }
  },

  getStyles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleId, name } = req.query;
      const whereClause: any = {};

      if (styleId) {
        whereClause.styleId = styleId;
      }
      if (name) {
        whereClause.name = { [Op.like]: `%${name}%` };
      }

      const styles = await Styles.findAll({ where: whereClause });
      res.json({ data: styles });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleId } = req.body;
      const styles = await Styles.findByPk(styleId);
      if (styles) {
        res.json({ data: styles });
      } else {
        res.status(404).json({ message: "Không tìm thấy styles" });
      }
    } catch (error) {
      next(error);
    }
  },

  updateStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleId } = req.body;
      const { name } = req.body;
      const styles = await Styles.findByPk(styleId);
      if (styles) {
        await styles.update({ name });
        res.json({ message: "Cập nhật style thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy style" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteStyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { styleId } = req.body;
      const styles = await Styles.findByPk(styleId);
      if (styles) {
        await styles.destroy();
        res.json({ message: "Xóa style thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy style" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default StylesController;
