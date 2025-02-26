import chunk from 'lodash.chunk';
import StatAccess from '@/interfaces/StatEventsAccess';
import Options from '@/interfaces/http/Options';

export default async (
  httpClient: <Response>(options: Options) => Promise<Response>,
  events: StatAccess[],
  clearStatEvents: () => void,
  chunkSize = 10,
) => {
  if (events.length === 0) {
    return Promise.resolve();
  }
  await chunk(events, chunkSize).reduce(
    async (_: Promise<void>, chunkedEvents) => {
      const body = new URLSearchParams({ data: JSON.stringify(chunkedEvents) });
      await httpClient<{ success: number, error: number }>({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body,
      })
        .catch(() => 'error in request');
    },
    Promise.resolve(),
  );
  return clearStatEvents();
};
