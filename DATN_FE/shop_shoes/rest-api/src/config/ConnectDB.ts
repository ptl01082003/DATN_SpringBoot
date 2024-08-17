import path from "path";
import { Sequelize } from "sequelize-typescript";

export async function connectDB() {
  const sequelize = new Sequelize({
    logging: false,
    dialect: "mysql",
    host: process.env["DB_HOST"],
    database: process.env["DB_NAME"],
    password: process.env["DB_PASSWORD"],
    username: process.env["DB_USER"],
    models: [path.resolve("./src/models")],
    timezone: "+07:00",
    dialectOptions: {
      timezone: "+07:00",
    },
  });

  await sequelize.authenticate();
  await sequelize.sync({ force: false, alter: true });

  console.log("Connection has been established successfully.");
}
