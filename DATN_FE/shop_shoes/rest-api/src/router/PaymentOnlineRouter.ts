// routes/origins.ts
import { Router } from "express";
import PaymentOnlineController from "../controller/PaymentOnlineController";
import { checkAuth } from "../middleware/checkAuth";

const paymentRouter = Router();

paymentRouter.get("/check-out-momo", PaymentOnlineController.checkoutMomo);
paymentRouter.get("/check-out-vnpay", PaymentOnlineController.checkout);
paymentRouter.get("/", PaymentOnlineController.order);

paymentRouter.use(checkAuth);

paymentRouter.post("/lst-orders", PaymentOnlineController.getLstOders);
paymentRouter.post("/lst-payments", PaymentOnlineController.getLstPayments);
paymentRouter.post("/create-order", PaymentOnlineController.createOrder);
paymentRouter.post("/repayment", PaymentOnlineController.repayment);


export default paymentRouter;
