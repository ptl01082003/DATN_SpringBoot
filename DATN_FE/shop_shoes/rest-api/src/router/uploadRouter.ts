import express from "express";
import UploadController from "../controller/UploadController";
import { multerStorage } from "../storage/multerStorage";
// import uploadController from "../controller/uploadController";

export const uploadRouter = express.Router();

//Single file
uploadRouter.post(
  "/single",
  multerStorage.single("image"),
  UploadController.single
);

//Multiple file
uploadRouter.post("/multiple", multerStorage.any(), UploadController.multiple);

//Delete file
uploadRouter.post("/delete", UploadController.delete);
