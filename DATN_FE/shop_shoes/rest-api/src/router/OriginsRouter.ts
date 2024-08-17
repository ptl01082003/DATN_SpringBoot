// routes/origins.ts
import { Router } from "express";
import OriginsController from "../controller/OriginsController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerOrigin = Router();

routerOrigin.post("/", OriginsController.getOrigins);

routerOrigin.use(checkAuth);
routerOrigin.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerOrigin.post("/create", OriginsController.addOrigin);
routerOrigin.post("/edit", OriginsController.updateOrigin);
routerOrigin.post("/remove", OriginsController.deleteOrigin);

export default routerOrigin;
