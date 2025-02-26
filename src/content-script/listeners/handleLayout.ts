/**
 * Handles behaviour for when we've determined what "features" are available for the given URL (e.g. Access, Alternatives etc...)
 *
 * This picks whether the Notification / Popup should automatically open based on a boolean and the popup's close history.
 *
 * It does this by sending an open/close "event" to the state machine along with the notifications.
 * The state machine then re-renders the popup/side tray based on this.
 */
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import { FeaturesDetermined } from '@/interfaces/browser/AppMethods';
import { AppEventSchema } from '@/modules/shared/stateMachine/StateMachineAppActive';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import LayoutStateValues from '@/interfaces/stateMachine/LayoutStateValues';
import LayoutState from '@/enums/stateMachine/LayoutState';
import consoleDev from '@/dev/consoleDev';
import eventSetTabState from '@/modules/stats/access/eventSetTabState';
import eventPopupRendered from '@/modules/stats/access/eventPopupRendered';

const isInitialising = (type: AppActiveEvent) => [AppActiveEvent.Init, ''].includes(type);

const popupEvent = (
  popup: NotificationUI,
  event: AppEventSchema,
  layoutOpen: boolean,
): LayoutEvent => {
  // The state AppActiveEvent.Init means the page is loading and deciding what to do.
  // i.e. not specific action from the user (institution, selected or open) has been sent.
  if (layoutOpen || !isInitialising(event.type)) {
    return LayoutEvent.Open;
  }

  return popup?.autoOpen ? LayoutEvent.AutoOpen : LayoutEvent.Close;
};

/**
 * @param appEvent
 * @param url
 * @param tabUuid
 */
export default (
  appEvent: AppEventSchema,
  url: URL,
  tabUuid: string,
) =>
  async (features: FeaturesDetermined): Promise<FeaturesDetermined> => {
    const { notifications, libraryServices } = features;
    const [popup] = notifications;

    const snapshot = window.stateInterpreterLayout.getSnapshot();
    const layout = snapshot.value as unknown as LayoutStateValues;
    const { hasOpened } = snapshot.context;

    const layoutOpen = layout.openedClosed === LayoutState.Opened;
    const firstNotification = notifications[0];
    const event = popupEvent(popup, appEvent, layoutOpen);

    if (!hasOpened) {
      const isOpen = event !== LayoutEvent.Close;
      eventSetTabState(firstNotification, url, isOpen, tabUuid);
      if (isOpen) {
        eventPopupRendered(event, firstNotification, tabUuid);
      }
    }

    window.stateInterpreterLayout.send(event, { notifications, libraryServices });
    window.stateInterpreterAppActive.send(AppActiveEvent.On);

    const states = notifications.map(({ state }) => state);
    consoleDev({
      title: `Available Features: [${states.join(' | ')}]`,
      message: features,
    });

    consoleDev({ title: '-----------------', message: '-----------------' });
    return features;
  };
