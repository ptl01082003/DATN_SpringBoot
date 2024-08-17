// routes/returnRequestsRoutes.ts
import express from "express";
import ReturnRequestsController from "../controller/ReturnRequestController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const returnRequestsRouter = express.Router();

// Route không yêu cầu xác thực hoặc phân quyền
returnRequestsRouter.post("/create", ReturnRequestsController.createRequest);

// Route cần xác thực và phân quyền
returnRequestsRouter.use(checkAuth);
returnRequestsRouter.use(checkRoles([ROLE_TYPES.ADMIN]));

// Các route yêu cầu xác thực và phân quyền
returnRequestsRouter.post("/list", ReturnRequestsController.getRequests);
returnRequestsRouter.post("/update", ReturnRequestsController.updateRequest);

export default returnRequestsRouter;
