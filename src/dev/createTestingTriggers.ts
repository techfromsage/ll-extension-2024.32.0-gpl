import ShadowList from '@/enums/ShadowList';
import LayoutEvent from '@/enums/stateMachine/LayoutEvent';
import { statStore } from '@/store';
import consoleDev from '@/dev/consoleDev';

/**
 * For generating an HTML button element with
 */
export const createTriggerElement = (
  id: string,
) => {
  const button = document.createElement('button');
  button.id = id;
  button.style.zIndex = '999999';
  button.style.position = 'fixed';
  button.style.left = '0';
  button.style.width = '1px';
  button.style.height = '1px';
  button.style.background = 'none';
  button.style.border = 'none';
  return button;
};

/**
 * In development, add a button element to the page
 * for opening the extension
 */
export default () => {
  const layoutTriggerID = ShadowList.DevTrigger;
  const sendPendingStatsTriggerID = ShadowList.SendPendingStatsTrigger;
  if (process.env.NODE_ENV === 'development') {
    if (!document.getElementById(layoutTriggerID)) {
      const layoutTriggerElement = createTriggerElement(layoutTriggerID);
      layoutTriggerElement.style.top = '50%';
      layoutTriggerElement.addEventListener('click', () => {
        window.stateInterpreterLayout.send(LayoutEvent.Open);
      });
      document.body.appendChild(layoutTriggerElement);
    }
    if (!document.getElementById(sendPendingStatsTriggerID)) {
      const sendPendingStatsTriggerElement = createTriggerElement(sendPendingStatsTriggerID);
      sendPendingStatsTriggerElement.style.top = '53%';
      sendPendingStatsTriggerElement.addEventListener('click', () => {
        const {
          statEventsAccess,
          statEventsFutures,
          clearStatEventsAccess,
          clearStatEventsFutures,
        } = statStore.getState();
        consoleDev({ message: JSON.stringify(statEventsAccess), title: 'Flushed pending stats events - Access' });
        consoleDev({ message: JSON.stringify(statEventsFutures), title: 'Flushed pending stats events - Futures' });
        clearStatEventsAccess();
        clearStatEventsFutures();
      });
      document.body.appendChild(sendPendingStatsTriggerElement);
    }
  }
};
