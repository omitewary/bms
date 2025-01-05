import {
  ExpirationComplete,
  Publisher,
  Subjects,
} from "@ot-bms-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
