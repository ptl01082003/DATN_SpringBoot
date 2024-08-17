import { Router } from "express";
import SizesController from "../controller/SizeController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerSize = Router();
routerSize.post("/", SizesController.getAllSizes);

routerSize.use(checkAuth);
routerSize.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerSize.post("/create", SizesController.createSize);
routerSize.post("/edit", SizesController.updateSize);
routerSize.post("/remove", SizesController.deleteSize);

export default routerSize;
