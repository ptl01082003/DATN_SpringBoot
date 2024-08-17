// routes/styles.ts
import { Router } from "express";
import StylesController from "../controller/StylesController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerStyle = Router();

routerStyle.post("/", StylesController.getStyles);

routerStyle.use(checkAuth);
routerStyle.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerStyle.post("/create", StylesController.addStyle);
routerStyle.post("/edit", StylesController.updateStyle);
routerStyle.post("/remove", StylesController.deleteStyle);

export default routerStyle;
