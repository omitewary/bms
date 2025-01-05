import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@ot-bms-tickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { Payment } from "../models/payment";

const router = express.Router();
router.post(
  "/api/payments/confirm",
  requireAuth,
  [body("orderId").notEmpty(), body("stripeId").notEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId, stripeId } = req.body;
    console.log("orderId ", orderId);

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot confirm for cancelled order");
    }

    const payment = Payment.build({ orderId, stripeId });
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });
  }
);

export { router as ConfirmChargeRouter };
