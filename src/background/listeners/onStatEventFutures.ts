import { statStore, store } from '@/store';
import StatFutures from '@/interfaces/StatEventsFutures';

/**
 * Pushes stat events sent from the browser tab in to a cache in the store.
 * The cache is then sent to the server periodically.
 */
export default (stat: StatFutures): Promise<void> => {
  return new Promise<void>(resolve => {
    const { clientId, institutes } = store.getState();
    const { pushStatEventFutures } = statStore.getState();
    pushStatEventFutures({
      ...stat,
      uuid: clientId,
      institute_id: stat.institute_id || institutes[0].id,
    });
    resolve();
  });
};
