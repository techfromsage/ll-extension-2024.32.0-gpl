import { StoreState } from '@/store';
import AppMethods from '@/interfaces/browser/AppMethods';

/**
 * Signs out a sciwheel user, from the background
 *
 * This is used in "SignOut" state which waits until the correct data is present before pushing into another state.
 *
 * @see app-extension/src/modules/shared/stateMachine/StateMachineReferenceManager.ts
 */
const InvokeUserSignOut = (
  signOut: AppMethods['contentScript']['signOut'],
) => (): Promise<StoreState> => {
  return new Promise(resolve => {
    signOut().then(res => {
      const { storeState, status } = res;
      if (!!storeState.user?.id && status === 'success') {
        resolve(storeState);
      }
    });
  });
};

export default InvokeUserSignOut;
