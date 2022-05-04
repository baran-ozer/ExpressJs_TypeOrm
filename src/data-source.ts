import "reflect-metadata";
import { DataSource } from "typeorm";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test_user",
  password: "",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User, Order, Product],
  migrations: [],
  subscribers: [],
});
