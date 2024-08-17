import express from "express";
import authCtrl from "../controller/AuthController";
import { checkAuth } from "../middleware/checkAuth";

const routerAuth = express.Router();

routerAuth.post("/login", authCtrl.loginWeb);
routerAuth.post("/register", authCtrl.register);
routerAuth.post("/login-dashboard", authCtrl.loginDashboard);
routerAuth.post("/refresh-token", authCtrl.requestRefreshToken);

routerAuth.use(checkAuth);
routerAuth.post("/logout", authCtrl.logOut);

export default routerAuth;
