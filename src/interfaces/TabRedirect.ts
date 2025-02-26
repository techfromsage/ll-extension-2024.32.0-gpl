/**
 * Represents a tab that has been redirected.
 */
import RedirectType from '@/enums/RedirectType';
import Institution from '@/interfaces/Institution';
import { NotificationMetadata } from '@/interfaces/ui/NotificationUI';

interface TabRedirect {
  tabId: number,
  institution: Institution,
  type: RedirectType,
  metadata?: NotificationMetadata,
}

export default TabRedirect;
