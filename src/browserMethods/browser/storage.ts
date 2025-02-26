/**
 * Storage interaction methods
 * Be careful. This is used by zustand. See StorageAdapter.ts.
 */
import StorageMethods from '@/interfaces/browser/StorageMethods';

const storage: StorageMethods = {
  getItem: <T>(key: string) => browser.storage.local.get(key) as T,
  setItem: (key, value) => browser.storage.local.set({ [key]: value }),
  removeItem: key => browser.storage.local.remove(key),
  clear: () => browser.storage.local.clear(),
};

export default storage;
