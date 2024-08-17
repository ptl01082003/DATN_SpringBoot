import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { redis } from "../config/ConnectRedis";
import { RESPONSE_CODE, ResponseBody } from "../constants";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    if (token) {
      jwt.verify(
        token,
        process.env.AC_TOKEN_KEY as Secret,
        async (err: any, decoded: any) => {
          if (err) {
            return res.json(
              ResponseBody({
                data: null,
                code: RESPONSE_CODE.NOT_AUTHEN,
                message: "Bạn không có quyền truy cập",
              })
            );
          } else {
            const tokenInRedis = await redis.get(
              `accessToken-${decoded.userId}`
            );
            if (tokenInRedis === token) {
              req.userId = decoded.userId;
              next();
            } else {
              return res.json(
                ResponseBody({
                  data: null,
                  code: RESPONSE_CODE.INCORRECT,
                  message: "Token không hợp lệ",
                })
              );
            }
          }
        }
      );
    } else {
      return res.json(
        ResponseBody({
          data: null,
          code: RESPONSE_CODE.INCORRECT,
          message: "Bạn chưa đăng nhập",
        })
      );
    }
  } catch (error) {
    next(error);
  }
};


