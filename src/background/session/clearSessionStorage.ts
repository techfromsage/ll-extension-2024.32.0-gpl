import { SessionStoreState, StoreState } from '@/store';
import cacheLedger from '@/background/cache/cacheLedger';
import StorageMethods from '@/interfaces/browser/StorageMethods';

/**
 * clearSessionStorage - clears the session storage for the extension
 * Abstracted into a function as it is called in multiple places.
 */
export default async (sessionStoreState: SessionStoreState, storeState: StoreState, storage: StorageMethods) => {
  sessionStoreState.clearClosedPopupHistory();

  storeState.clearSignedInDomains();
  storeState.clearPotentialSignedInDomain();

  const ledger = cacheLedger();
  const keysToRemove = await ledger.allKeys();

  if (keysToRemove.length > 0) {
    storage.removeItem(keysToRemove);
    await ledger.flush();
  }
};
