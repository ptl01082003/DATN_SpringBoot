// routes/productsRoutes.ts
import express from "express";
import ProductsController from "../controller/ProductsController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const productsRouter = express.Router();

productsRouter.post("/lst-products", ProductsController.getLstProducts);

productsRouter.post("/product-details", ProductsController.getProductDeatails);

productsRouter.post("/", ProductsController.getProducts);

productsRouter.use(checkAuth);

productsRouter.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

productsRouter.post("/create", ProductsController.addProduct);

productsRouter.post("/edit", ProductsController.updateProduct);

productsRouter.post("/remove", ProductsController.deleteProduct);

productsRouter.post(
  "/discounted-products",
  ProductsController.getDiscountedProducts
);

export default productsRouter;
