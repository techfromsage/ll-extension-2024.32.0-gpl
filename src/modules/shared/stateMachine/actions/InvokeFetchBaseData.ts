import { StoreState } from '@/store';
import AppMethods from '@/interfaces/browser/AppMethods';

/**
 * Refreshes/rehydrates the base data from background.
 *
 * The background will respond when the institution data has been downloaded.
 *
 * This is used in "Init" state which waits until the correct data is present before pushing into another state.
 *
 * @see app-extension/src/modules/shared/stateMachine/StateMachineAppActive.ts
 */
const InvokeFetchBaseData = (
  fetchBaseData: AppMethods['contentScript']['fetchBaseData'],
  timeout: number,
) => (): Promise<StoreState> => {
  return new Promise(resolve => {
    fetchBaseData().then(res => {
      const { storeState, status } = res;
      if (!!storeState.config && status === 'success') {
        resolve(storeState);
        return;
      }

      setTimeout(
        () => InvokeFetchBaseData(fetchBaseData, timeout)().then(resolve),
        timeout,
      );
    });
  });
};

export default InvokeFetchBaseData;
