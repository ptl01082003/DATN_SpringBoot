import { Router } from "express";
import PromotionsController from "../controller/PromotionController";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";
import { checkAuth } from "../middleware/checkAuth";

const routerPromotion = Router();

routerPromotion.post("/", PromotionsController.getPromotions);

// routerPromotion.use(checkAuth);

// routerPromotion.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));
// routerPromotion.post("/", PromotionsController.getById);

routerPromotion.post("/create", PromotionsController.addPromotion);
routerPromotion.post("/edit", PromotionsController.updatePromotion);
routerPromotion.post("/remove", PromotionsController.deletePromotion);

export default routerPromotion;
