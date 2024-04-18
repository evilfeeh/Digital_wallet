import "dotenv/config";
import { DataSource } from "typeorm";
import { Orders, Users, Wallet } from "../entities";

const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [Users, Wallet, Orders],
  migrations: [__dirname + "/migrations/*{.js,.ts}"],
});

datasource.initialize();

export default datasource;
