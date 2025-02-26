/**
 * Interface SystemMessage represents a processed message
 * delivered by Lean Library in the style of an assist message
 */
import Institution from '@/interfaces/Institution';

interface SystemMessage {
  id: string,
  title: string,
  message: string,
  triggerUrl: string,
  institution: Institution,
}

export default SystemMessage;
