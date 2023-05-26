import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

export async function connection() {
    const { 
        DATABASE_USERNAME, 
        DATABASE_PASSWORD, 
        DATABASE_NAME 
    } = process.env;
    const sequelize = new Sequelize(DATABASE_NAME!, DATABASE_USERNAME!, DATABASE_PASSWORD!, {
        dialect: "postgres"
    });

    try {
        await sequelize.authenticate();
        console.log("database connection established successfully.")
    } catch (err) {
        console.error("Unable to connect", err)
    }
}