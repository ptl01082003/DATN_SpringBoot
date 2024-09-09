import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { Send } from "express-serve-static-core";
import cron from "node-cron";
import { connectDB } from "./config/ConnectDB";
import { redis } from "./config/ConnectRedis";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "./constants";
import { appRouter } from "./router/appRouter";
import { updateProductPrices } from "../src/utils/utils";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
    interface Response {
      json: Send<
        {
          code: number;
          data: any;
          message: string;
        },
        this
      >;
    }
  }
}

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/public", express.static("public"));

redis.initial();

connectDB();

import "./utils/CronJobs";

//PUBLIC ROUTER
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

appRouter();



app.use("*", (_, res) => {
  res.status(STATUS_CODE.NOT_FOUND).json(
    ResponseBody({
      code: RESPONSE_CODE.ERRORS,
      message: "Đường dẫn không tồn tại",
    })
  );
});

app.listen(process.env.SERVER_PORT, () =>
  console.log("The server is running on port:" + process.env.SERVER_PORT)
);
