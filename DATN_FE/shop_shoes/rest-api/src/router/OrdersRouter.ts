// routes/origins.ts
import { Router } from "express";
import OrdersController from "../controller/OrdersController";
import { checkAuth } from "../middleware/checkAuth";

const ordersRouter = Router();


ordersRouter.use(checkAuth);

ordersRouter.post("/lst-orders", OrdersController.getLstOders);
ordersRouter.post("/create-review", OrdersController.createReview);

export default ordersRouter;
