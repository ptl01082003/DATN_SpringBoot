import express from "express";
import DashboardCtrl from "../controller/DashboardController";
import { checkAuth } from "../middleware/checkAuth";

const routerDashboard = express.Router();

routerDashboard.use(checkAuth);
routerDashboard.post("/get-order-chart", DashboardCtrl.getOrderChart);

export default routerDashboard;
