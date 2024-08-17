import express from "express";
import BrandsController from "../controller/BrandsController";
import { ROLE_TYPES } from "../models/Roles";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";

const routerBrands = express.Router();

routerBrands.post("/", BrandsController.getBrands);

routerBrands.use(checkAuth);

routerBrands.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerBrands.post("/create", BrandsController.addBrand);

routerBrands.post("/edit", BrandsController.updateBrand);

routerBrands.post("/remove", BrandsController.deleteBrand);

export default routerBrands;
