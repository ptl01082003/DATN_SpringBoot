import { NextFunction, Request, Response } from "express";
import { ROLE_TYPES } from "../models/Roles";
import { redis } from "../config/ConnectRedis";
import { RESPONSE_CODE, ResponseBody } from "../constants";

export function checkRoles(roles: Array<keyof typeof ROLE_TYPES>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const rolesInRedis = (await redis.get(
      `roles-${userId}`
    )) as keyof typeof ROLE_TYPES;
    if (roles.includes(rolesInRedis)) {
      next();
    } else {
      return res.json(
        ResponseBody({
          data: null,
          code: RESPONSE_CODE.NOT_AUTHOR,
          message: "Không có quyền truy cập",
        })
      );
    }
  };
}
