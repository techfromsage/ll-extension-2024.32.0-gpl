import LLAStatType from '@/enums/LLAStatType';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import browserMethods from '@/browserMethods';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import State from '@/enums/State';
import StatAccess from '@/interfaces/StatEventsAccess';

/**
 * @param layoutEventType
 * @param notification
 * @param referenceId
 */
export default (
  layoutEventType: LayoutEvent,
  notification: NotificationUI | undefined,
  referenceId: string,
) => {
  if (!notification) {
    return;
  }
  const isNotificationAssist = [State.Assist, State.PriorityAssist].includes(notification.state);
  const base = {
    instituteId: notification.institution.id,
    assistMessageId: isNotificationAssist ? `${notification.metadata?.assistMessageId}` : undefined,
    openAccessProvider: notification.openAccess?.source,
    referenceId,
    state: notification.state,
  };
  const stat: StatAccess = (layoutEventType === LayoutEvent.Toggle)
    ? { type: LLAStatType.TOOLBAR_POPUP_RENDERED, source: 'popup', ...base }
    : { type: LLAStatType.CONTENT_POPUP_RENDERED, source: 'content', ...base };

  browserMethods.app.statEventAccess(stat);
};
