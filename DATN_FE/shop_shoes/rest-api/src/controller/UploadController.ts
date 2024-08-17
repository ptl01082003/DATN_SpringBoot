import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";

const UploadController = {
    single: async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (error) {
            next(error);
        }
    },
    multiple: async (req: any, res: Response, next: NextFunction) => {
        try {
            const data = req.files.map((image: any) => image.path.replaceAll("\\", "/"));
            return res.json(ResponseBody({
                data: data,
                code: RESPONSE_CODE.SUCCESS,
                message: "Thực hiện thành công"
            }));
        } catch (error) {
            next(error);
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body.path.forEach((path: any) => {
                fs.unlinkSync(path)
            })
            res.json({ message: "delete path" });
        } catch (error) {
            next(error);
        }
    },
};

export default UploadController;