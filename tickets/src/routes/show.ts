import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@ot-bms-tickets/common";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, response: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  response.send(ticket);
});

export { router as ShowTicketRouter };
