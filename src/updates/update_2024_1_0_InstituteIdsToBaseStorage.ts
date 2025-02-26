import StoreNamespace from '@/enums/StoreNamespace';
import BrowserMethods from '@/interfaces/browser/BrowserMethods';

/**
 * Migrate zustand instituteIds to bare browser storage.
 */
export default async (previousYear: number, previousMajor: number, browserMethods: BrowserMethods) => {
  if (previousYear === 2023 && previousMajor <= 30) {
    type PersistedStorage = { [StoreNamespace.PersistedDefault]: string };
    const res = await browserMethods.storage.getItem<PersistedStorage>(StoreNamespace.PersistedDefault);
    const { state }: {
      state?: { instituteIds: string[] },
    } = JSON.parse(res ? res[StoreNamespace.PersistedDefault] : '{}');
    await browserMethods.storage.setItem(StoreNamespace.InstituteIds, state?.instituteIds.length ? state.instituteIds : []);
  }
};
