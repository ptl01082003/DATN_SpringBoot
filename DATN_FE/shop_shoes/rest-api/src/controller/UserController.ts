import { NextFunction, Request, Response } from "express";
import { Brands } from "../models/Brands";
import { Users } from "../models/Users";

const UserController = {
  getInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const users = await Users.findOne({
        where: { userId },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      res.json({
        message: "Thực hiện thành công",
        code: 0,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
