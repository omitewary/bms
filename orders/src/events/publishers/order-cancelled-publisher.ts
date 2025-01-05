import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@ot-bms-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
