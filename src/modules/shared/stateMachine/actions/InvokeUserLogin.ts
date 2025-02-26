import { StoreState } from '@/store';
import AppMethods from '@/interfaces/browser/AppMethods';

/**
 * Refreshes/rehydrates the sciwheel data from background.
 *
 * This is used in "NoUserSelected" state which waits until the correct data is present before pushing into another state.
 *
 * @see app-extension/src/modules/shared/stateMachine/StateMachineReferenceManager.ts
 */
const InvokeUserLogin = (
  fetchUser: AppMethods['contentScript']['fetchUser'],
  timeout: number,
) => (): Promise<StoreState> => {
  return new Promise(resolve => {
    fetchUser().then(res => {
      const { storeState, status } = res;
      if (!!storeState.user && status === 'success') {
        resolve(storeState);
      }
    });
  });
};

export default InvokeUserLogin;
