import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@ot-bms-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
