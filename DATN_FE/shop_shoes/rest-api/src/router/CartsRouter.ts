import express from "express";
import CartsController from "../controller/CartsController";
import { checkAuth } from "../middleware/checkAuth";

const cartsRouter = express.Router();

cartsRouter.use(checkAuth);

cartsRouter.post("/create", CartsController.create);

cartsRouter.post("/remove", CartsController.remove);

cartsRouter.post("/lst-carts", CartsController.lstCarts);

export default cartsRouter;
