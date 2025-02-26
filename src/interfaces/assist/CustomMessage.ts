/**
 * Interface CustomMessage represents a raw Assist message for a given institution
 * that comes from the API. This is before any processing.
 * Once processed (i.e. off campus etc...) it becomes an AssistMessage.
 */
import LocationOption from '@/enums/LocationOption';

interface CustomMessage {
  closePopup?: {
    timeOut?: number | boolean,
  },
  id: number,
  message: string,
  onCampusMessage?: string,
  onCampusTitle?: string,
  showOption: LocationOption,
  title: string,
  url: string,
  startAt?: string,
  endAt?: string,
  priority?: boolean,
  institution: string,
}

export default CustomMessage;
