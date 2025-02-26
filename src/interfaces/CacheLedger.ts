/**
 * Represents an item that has been cached in the browser.
 * This is a ledger entry so we know when to clean up.
 */
export type CacheLedgerItem = {
  key: string,
};

export type CacheLedger = {
  findEntry: (cacheKey: string) => Promise<CacheLedgerItem | undefined>,
  addEntry: (entry: CacheLedgerItem, expiryInMs?: number) => Promise<void>,
  allKeys: () => Promise<string[]>,
  flush: () => Promise<void>,
};
