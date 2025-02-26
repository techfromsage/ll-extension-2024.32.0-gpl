import AppMethods from '@/interfaces/browser/AppMethods';
import { AppEventSchema } from '@/modules/shared/stateMachine/StateMachineAppActive';
import { StoreState } from '@/store';

/**
 * Refreshes/rehydrates the institution data from background.
 *
 * The background will respond when the institution data has been downloaded.
 *
 * @see app-extension/src/modules/shared/stateMachine/StateMachineAppActive.ts
 */
const InvokeFetchInstitutionData = (
  updateInstitutions: AppMethods['contentScript']['updateInstitutions'],
  timeout: number,
  onInstitutionsUpdated: (storeState: StoreState) => void,
) => (_: unknown, event: AppEventSchema): Promise<StoreState> => {
  return new Promise((resolve, reject) => {
    if (!('institutionIds' in event)) {
      reject(new Error('No institutionIds property in event'));
      return;
    }

    updateInstitutions(event.institutionIds).then(({ storeState, status }) => {
      if (storeState && status === 'success') {
        onInstitutionsUpdated(storeState);
        resolve(storeState);
        return;
      }
      setTimeout(
        () => InvokeFetchInstitutionData(updateInstitutions, timeout, onInstitutionsUpdated)(_, event).then(resolve),
        timeout,
      );
    });
  });
};

export default InvokeFetchInstitutionData;
