/**
 * Interface EventMessage standardizes message sending payloads.
 * Each message needs a pre-defined message type and can have an option message payload.
 */
import BrowserEvent from '@/enums/BrowserEvent';

interface EventMessage<Message> {
  event: BrowserEvent,
  message: Message,
}

export default EventMessage;
