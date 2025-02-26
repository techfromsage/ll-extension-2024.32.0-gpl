import ToolbarActiveFromReferenceManager from '@/modules/shared/toolbar/ToolbarActiveFromReferenceManager';
import ToolbarActiveFromNotifications from '@/modules/shared/toolbar/ToolbarActiveFromNotifications';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import ToolbarActive from '@/interfaces/ui/ToolbarActive';
import PageData from '@/interfaces/messages/PageData';

/**
 * Reducer function to obtain the first active toolbar state.
 * i.e. if referenceManager is active, return referenceManager, else return notifications.
 */
const reduceToFirstActive = (previous: ToolbarActive, next: () => ToolbarActive) => (previous.active ? previous : next());

/**
 * Determines if the toolbar icon should be active and returns the number to display in the dot.
 * e.g. If there are available references, it will return the number of available references.
 */
export default (
  notifications: NotificationUI[],
  referenceManager?: PageData['referenceManager'],
): ToolbarActive => {
  const defaultValues = { active: false, value: '', isDotOnly: false };
  return [
    referenceManager && (() => ToolbarActiveFromReferenceManager(referenceManager.state, referenceManager.availableReferences)),
    () => ToolbarActiveFromNotifications(notifications),
  ]
    .filter(Boolean)
    .reduce(reduceToFirstActive, defaultValues);
};
