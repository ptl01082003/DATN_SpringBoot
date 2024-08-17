import express from "express";
import UserController from "../controller/UserController";
import { checkAuth } from "../middleware/checkAuth";

const userRouter = express.Router();

userRouter.use(checkAuth);

userRouter.post("/get-info", UserController.getInfo);

export default userRouter;
