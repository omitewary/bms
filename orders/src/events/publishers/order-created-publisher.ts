import { OrderCreatedEvent, Publisher, Subjects } from "@ot-bms-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
