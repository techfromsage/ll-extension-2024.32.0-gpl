import { StoreState } from '@/store';
import { StatEventsSlice } from '@/store/shared/stats/stats';
import FuturesStatType from '@/enums/FuturesStatType';

/**
 * This alarm is used to send a stat event only once a day to the server.
 * However, the alarm actually runs every hour in case a user is not online when the scheduled alarm runs.
 * The browser extension tracks if the stat event has been sent for the day by storing the date in the
 * browser's local storage.
 */

export default (storeState: StoreState, statState: StatEventsSlice) => {
  const { clientId, institutes } = storeState;
  const { pushStatEventFutures, statInstalledLastSent, setStatInstalledLastSent } = statState;

  if (!institutes.length) {
    return;
  }
  const now = new Date();
  institutes.forEach(institute => {
    const lastInstalled = statInstalledLastSent[institute.id];
    if (lastInstalled?.toLocaleDateString() === now.toLocaleDateString()) {
      return;
    }
    pushStatEventFutures({
      type: FuturesStatType.InstitutionInstalled,
      uuid: clientId,
      institute_id: institute.id,
      userAgent: navigator.userAgent,
    });
    setStatInstalledLastSent(now, institute.id);
  });
};
