/**
 * Converts the browser.storage/chrome.storage implementation for consumption by zustand persist middleware
 */

import BrowserStorage from '@/interfaces/browser/BrowserStorage';
import StorageMethods from '@/interfaces/browser/StorageMethods';

const StorageAdapter = (driver: StorageMethods): BrowserStorage => {
  return {
    setItem: driver.setItem,
    getItem: async (key: string): Promise<any> => {
      const item = await driver.getItem(key);
      return Promise.resolve((item as Record<string, unknown>)[key] ?? null);
    },
    removeItem: driver.removeItem,
  };
};

export default StorageAdapter;
