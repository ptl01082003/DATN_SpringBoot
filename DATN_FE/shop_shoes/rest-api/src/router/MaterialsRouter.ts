import { Router } from "express";
import MaterialsController from "../controller/MaterialsController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerMaterial = Router();

routerMaterial.post("/", MaterialsController.getMaterials);

routerMaterial.use(checkAuth);
routerMaterial.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerMaterial.post("/create", MaterialsController.addMaterial);
routerMaterial.post("/edit", MaterialsController.updateMaterial);
routerMaterial.post("/remove", MaterialsController.deleteMaterial);

export default routerMaterial;
