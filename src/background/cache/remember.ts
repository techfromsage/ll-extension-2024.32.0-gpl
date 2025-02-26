import browserMethods from '@/browserMethods';
import cacheLedger from '@/background/cache/cacheLedger';
import { CacheLedgerItem } from '@/interfaces/CacheLedger';

export type CacheItem<T> = {
  data: T,
  expiry: number,
};

const cachedDataFromStorage = async <T>(cacheKey: string) => {
  const item = await browserMethods.storage.getItem<Record<string, CacheItem<T>>>(cacheKey);
  return item[cacheKey] || {};
};

/**
 * Check if the cache is still valid.
 */
const isCacheHit = async <T>(cache: CacheItem<T>) => {
  return 'data' in cache && cache.expiry > Date.now();
};

/**
 * cachedFeatures - Get the "pre-calculated" features for the current URL, from cache.
 * If not in cache, calculate and store in cache.
 *
 * Pre-calculated features are things that are determined by the URL only and not page content.
 *
 * We also implement a "ledger" storage to keep track of the expiry of each cache item.
 * This is to prevent the cache from growing indefinitely, and makes it easy to figure out when to clear it.
 */
export default async <T>(cacheKey: string, originalData: () => Promise<T>, expiryInMs = 1_200_000): Promise<T> => {
  const ledger = cacheLedger();
  const cachedData = await cachedDataFromStorage<T>(cacheKey);

  if (await isCacheHit(cachedData)) {
    return cachedData.data;
  }
  const data = await originalData();
  const newLedgerEntry: CacheLedgerItem = { key: cacheKey };
  await ledger.addEntry(newLedgerEntry, expiryInMs);
  const newCacheItem: CacheItem<T> = { data, expiry: Date.now() + expiryInMs };
  await browserMethods.storage.setItem(cacheKey, newCacheItem);
  return data;
};
