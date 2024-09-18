import { NextFunction, Request, Response } from "express";
import { Images } from "../models/Images";
import { Products } from "../models/Products";

const ImagesController = {
  addImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { path, productId } = req.body;

    
      if (!path) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const images = await Images.create({
        path,
        productId,
      });

      res.json({ data: images, message: "Add new images successfully" });
    } catch (error) {
      
      next(error);
    }
  },

  getImages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.query;
      const whereClause: any = {};

      if (productId) {
        whereClause.productId = productId;
      }

      // Find all imagess with optional Product association
      const imagess = await Images.findAll({
        where: whereClause,
        include: [Products],
      });

      res.json({ data: imagess });
    } catch (error) {
      console.error("Error retrieving imagess:", error);
      next(error);
    }
  },

  getImageById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.body;
      const images = await Images.findByPk(imageId, { include: [Products] });
      if (images) {
        res.json({ data: images });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      
      next(error);
    }
  },

  updateImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.body;
      const { path, productId } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!path) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const imagess = await Images.findByPk(imageId);
      if (imagess) {
        await imagess.update({
          path,
          productId,
        });
        res.json({ message: "Image updated successfully" });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      
      next(error);
    }
  },

  deleteImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.body;
      const images = await Images.findByPk(imageId);
      if (images) {
        await images.destroy();
        res.json({ message: "Image deleted successfully" });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      
      next(error);
    }
  },
};

export default ImagesController;
