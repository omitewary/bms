import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@ot-bms-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
