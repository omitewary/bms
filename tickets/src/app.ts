import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@ot-bms-tickets/common";

import { createTicketRouter } from "./routes/new";
import { ShowTicketRouter } from "./routes/show";
import { IndexTicketRouter } from "./routes";
import { UpdateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);

app.use(currentUser);
app.use(ShowTicketRouter);
app.use(createTicketRouter);
app.use(IndexTicketRouter);
app.use(UpdateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
