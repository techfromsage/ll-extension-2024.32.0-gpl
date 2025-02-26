/**
 * Interface AssistMessage represents a processed Custom message for a given
 * institution.
 * Before processing (i.e. off campus etc...) it is a Custom Message AssistMessage.
 */
import Institution from '@/interfaces/Institution';

interface AssistMessage {
  id: string | number,
  title: string,
  message: string,
  institution: Institution,
  priority?: boolean,
  timeOut?: number | boolean,
}

export default AssistMessage;
