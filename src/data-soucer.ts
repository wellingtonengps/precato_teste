import "reflect-metadata";
import { DataSource } from "typeorm";
import { Message_Flow, Subscriptions } from "./entity";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "Precato",
  entities: [Message_Flow, Subscriptions],
  synchronize: true,
  logging: false,
});
