import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order, OrderStatus } from "../../models/order";
import {
  Listener,
  PaymentCreatedEvent,
  Subjects,
} from "@ot-bms-tickets/common";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}
