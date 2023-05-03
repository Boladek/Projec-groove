import express, { Response } from "express";
import { dbConnection, sequelize } from "./database/connnection";
import cors from "cors";
import logger from "morgan";
import indexRouter from "./routes";
import errorHandler from "./utils/errorHandler";

const port = process.env.PORT || 9999;

dbConnection();

//Sync models
sequelize
  .sync({ alter: true })
  .then(() => console.log("\x1b[34m%s\x1b[0m", "Models synced successfully."))
  .catch((err) =>
    console.log("\x1b[36m%s\x1b[0m", "Error syncing User model", err)
  );

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(indexRouter);

app.use((error: any, _: any, res: Response, __: any) => {
  errorHandler(error, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
