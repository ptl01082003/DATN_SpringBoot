import express from "express";
import ImagesController from "../controller/ImagesController";
// import productsRouter from "./ProductsRouter";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerImage = express.Router();

routerImage.post("/", ImagesController.getImages);

routerImage.use(checkAuth);
routerImage.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerImage.post("/create", ImagesController.addImage);
routerImage.post("/edit", ImagesController.updateImage);
routerImage.post("/remove", ImagesController.deleteImage);

export default routerImage;
