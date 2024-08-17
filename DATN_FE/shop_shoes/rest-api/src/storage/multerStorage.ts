import multer from "multer";
import { genaratorImagesId } from "../utils/utils";

const storage = multer.diskStorage({
  destination: function (_req, _file, _cb) {
    _cb(null, "public/Uploads");
  },
  filename: function (_req, _file, _cb) {
    const ext = _file.mimetype.split("/")[1];
    _cb(null, `image-${genaratorImagesId()}.${ext}`);
  },
});

export const multerStorage = multer({ storage: storage });
