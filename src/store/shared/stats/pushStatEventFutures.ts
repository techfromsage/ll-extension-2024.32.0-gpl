import StatFutures from '@/interfaces/StatEventsFutures';
import { EventWithMetadata, StatEventsSlice } from '@/store/shared/stats/stats';

/**
 * Pushes a stat event to the futures stats array.
 *
 * It is possible to set a limit for the stat event, which will be checked before pushing the stat.
 * e.g. if the limit is set to 1, then the stat will only be pushed once, even if the function is
 * called multiple times.
 */
export default (statEvent: EventWithMetadata<StatFutures>, statState: StatEventsSlice): Partial<StatEventsSlice> => {
  if (!('limit' in statEvent)) {
    return { statEventsFutures: [...statState.statEventsFutures, statEvent] };
  }

  const items = statState.statEventsLimitHistory.filter(previousUuid => previousUuid === statEvent.module_uuid);
  if (items.length >= statEvent.limit) {
    return {};
  }

  return {
    statEventsFutures: [...statState.statEventsFutures, statEvent],
    statEventsLimitHistory: [...statState.statEventsLimitHistory, statEvent.module_uuid],
  };
};
