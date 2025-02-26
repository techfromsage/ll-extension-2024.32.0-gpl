/**
 * Storage interaction methods
 *
 * Be careful. This is used by zustand. See StorageAdapter.ts.
 */
import StorageMethods from '@/interfaces/browser/StorageMethods';

const storage: StorageMethods = {
  getItem: <T>(key: string) => chrome.storage.local.get(key) as T,
  setItem: (key, value) => chrome.storage.local.set({ [key]: value }),
  removeItem: key => chrome.storage.local.remove(key),
  clear: () => chrome.storage.local.clear(),
};

export default storage;
