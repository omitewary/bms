import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@ot-bms-tickets/common";

import { NewOrderRouter } from "./routes/new";
import { ShowOrderRouter } from "./routes/show";
import { IndexOrderRouter } from "./routes";
import { DeleteOrderRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUser);
app.use(NewOrderRouter);
app.use(ShowOrderRouter);
app.use(IndexOrderRouter);
app.use(DeleteOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
