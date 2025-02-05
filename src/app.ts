import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Technify-Today ⚙");
});

app.use(globalErrorHandler);

export default app;
