import express from "express";
import FavoritesListController from "../controller/FavoritesListController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerFavoritesList = express.Router();
routerFavoritesList.post("/", FavoritesListController.getFavorites);

routerFavoritesList.use(checkAuth);
routerFavoritesList.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerFavoritesList.post("/create", FavoritesListController.addFavorite);
routerFavoritesList.post("/edit", FavoritesListController.updateFavorite);
routerFavoritesList.post("/remove", FavoritesListController.deleteFavorite);

export default routerFavoritesList;
