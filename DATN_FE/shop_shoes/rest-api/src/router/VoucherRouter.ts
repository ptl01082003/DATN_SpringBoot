import { Router } from "express";
import VouchersController from "../controller/VoucherController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerVouchers = Router();
routerVouchers.post(
  "/by-user",
  checkAuth,
  VouchersController.getVoucherByUserId
);
routerVouchers.post("/", VouchersController.getVouchers);

// routerVouchers.use(checkAuth);

// routerVouchers.use(
//   checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN, ROLE_TYPES.USER])
// );

routerVouchers.post("/create", VouchersController.addVoucher);
routerVouchers.post("/edit", VouchersController.updateVoucher);
routerVouchers.post("/remove", VouchersController.deleteVoucher);
// routerVouchers.post("/", VouchersController.getById);
export default routerVouchers;
