/**
 * Handles the behaviour when a "popup toggle" has been requested.
 * In this instance, we just update the state machine and the state machine handles the render.
 */
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import eventPopupRendered from '@/modules/stats/access/eventPopupRendered';

export default () => {
  window.stateInterpreterLayout.send(LayoutEvent.Toggle);
  const { notifications: [notification] } = window.stateInterpreterLayout.getSnapshot().context;
  const { tabUuid } = window.stateInterpreterAppActive.getSnapshot().context;
  eventPopupRendered(LayoutEvent.Toggle, notification, tabUuid);
  return Promise.resolve();
};
