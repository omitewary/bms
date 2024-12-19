import express, { Request, Response } from "express";

import { currentUser, requireAuth } from "@ot-bms-tickets/common";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
