import { Sequelize } from "sequelize";
// const logger = require("../utils/logger");
// const dotenv = require("dotenv");
// dotenv.config();
import dotenv from "dotenv";

dotenv.config();

const DB_DIALECT = process.env.DB_DIALECT as
  | "mysql"
  | "postgres"
  | "sqlite"
  | "mariadb"
  | "mssql"
  | "db2"
  | "snowflake"
  | "oracle";
const DB_NAME = process.env.DB_NAME as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_USERNAME = process.env.DB_USERNAME as string;
const DB_HOST = process.env.DB_HOST as string;

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect:
    DB_DIALECT /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  logging: false,
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "\x1b[34m%s\x1b[0m",
      `Connection to database ${DB_NAME} has been established.`
    );
    return true;
  } catch (error) {
    console.error(
      "\x1b[36m%s\x1b[0m",
      "Unable to connect to the database:",
      error
    );
    return error;
  }
};

// module.exports = {
//   sequelize,
//   dbConnection,
// };

// export default sequelize;
