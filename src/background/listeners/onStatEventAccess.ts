import { statStore, store } from '@/store';
import StatAccess from '@/interfaces/StatEventsAccess';

/**
 * Pushes stat events sent from the browser tab in to a cache in the store.
 * The cache is then sent to the server periodically.
 */
export const statEventAccess = (stat: StatAccess): void => {
  const { clientId } = store.getState();
  const { pushStatEventAccess } = statStore.getState();
  const { userAgent } = navigator;
  pushStatEventAccess({ ...stat, clientId, userAgent });
};

/**
 * Listener for runtime.onMessage events.
 * @param stat
 */
export default async (stat: StatAccess): Promise<void> => {
  statEventAccess(stat);
  return Promise.resolve();
};
