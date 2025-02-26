import browserMethods from '@/browserMethods';
import UniqueList from '@/modules/shared/UniqueList';
import { CacheLedger, CacheLedgerItem } from '@/interfaces/CacheLedger';
import StoreNamespace from '@/enums/StoreNamespace';

/**
 * Get the ledger from local storage.
 * @param ledgerKey
 */
const ledgerFromStore = async () => {
  const item = await browserMethods.storage.getItem<Record<StoreNamespace, CacheLedgerItem[]>>(StoreNamespace.CachedDataLedger);
  return item[StoreNamespace.CachedDataLedger] || [];
};

/**
 * CacheLedger tracks the expiry of cached items.
 * This is useful as we can't easily dispose of cache items when they expire,
 * as we can't query the local storage easily without loading ALL the cached data too.
 *
 * This ledger/tracker just keeps a record if items in cache.
 */
export default (): CacheLedger => {
  return {
    findEntry: async (cacheKey: string) => {
      const existingLedger = await ledgerFromStore();
      return existingLedger.find(entry => entry.key === cacheKey);
    },
    addEntry: async (entry: CacheLedgerItem) => {
      const existingLedger = await ledgerFromStore();

      const newLedger = UniqueList([...existingLedger, entry], 'key');
      await browserMethods.storage.setItem(
        StoreNamespace.CachedDataLedger,
        newLedger,
      );
    },
    allKeys: async () => {
      const existingLedger = await ledgerFromStore();
      return existingLedger.map(entry => entry.key);
    },
    flush: async () => {
      await browserMethods.storage.setItem(StoreNamespace.CachedDataLedger, []);
    },
  };
};
