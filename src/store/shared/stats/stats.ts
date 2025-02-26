import { StatsStoreSlice } from '@/store';
import StatAccess from '@/interfaces/StatEventsAccess';
import StatFutures from '@/interfaces/StatEventsFutures';
import pushStatEventFutures from '@/store/shared/stats/pushStatEventFutures';

/**
 * The stat event with everything it needs to send in the API.
 */
export type EventWithMetadata<T extends StatAccess | StatFutures> = T extends StatAccess
  ? StatAccess & { clientId: string, userAgent: string }
  : StatFutures & { uuid: string };

export interface StatEventsSlice {
  statEventsAccess: EventWithMetadata<StatAccess>[],
  statEventsFutures: EventWithMetadata<StatFutures>[],
  statEventsLimitHistory: string[],
  pushStatEventAccess: (statEvent: EventWithMetadata<StatAccess>) => void,
  pushStatEventFutures: (statEvent: EventWithMetadata<StatFutures>) => void,
  clearStatEventsAccess: () => void,
  clearStatEventsFutures: () => void,
  statInstalledLastSent: { [institution: string]: Date },
  setStatInstalledLastSent: (date: Date, institution: string) => void,
}

export const createStatEventsSlice: StatsStoreSlice<StatEventsSlice> = set => ({
  statEventsAccess: [],
  statEventsFutures: [],
  statEventsLimitHistory: [],
  statInstalledLastSent: {},
  pushStatEventAccess: statEvent => {
    set(state => ({ statEventsAccess: [...state.statEventsAccess, statEvent] }));
  },
  pushStatEventFutures: statEvent => {
    set(state => pushStatEventFutures(statEvent, state));
  },
  clearStatEventsAccess: () => {
    set({ statEventsAccess: [] });
  },
  clearStatEventsFutures: () => {
    set({ statEventsFutures: [] });
  },
  setStatInstalledLastSent: (date, institution) => {
    set(state => ({ statInstalledLastSent: { ...state.statInstalledLastSent, [institution]: date } }));
  },
});
