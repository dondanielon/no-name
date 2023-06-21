import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize({
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
    models: [ __dirname + "/models"]
})