/**
 * Enum Store provides a list of all the stores used in the extension.
 *
 * If you change this you MUST write an update migration
 */

enum StoreNamespace {
  PersistedDefault = 'persisted-global-store',
  Session = 'session-store',
  PersistedStat = 'persisted-stat-store',
  InstituteIds = 'instituteIds',
  Sciwheel = 'sciwheel-store',
  CachedDataLedger = 'cached_data_ledger',
  Cached = 'cached_',
}

export default StoreNamespace;
