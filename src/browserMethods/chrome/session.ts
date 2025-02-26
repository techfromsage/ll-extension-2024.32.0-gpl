/**
 * Session interaction methods
 */
import StorageMethods from '@/interfaces/browser/StorageMethods';

const session: StorageMethods = {
  getItem: <T>(key: string) => {
    return new Promise<T>((resolve, reject) => {
      chrome.storage.session.get(key, res => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(res as T);
        }
      });
    });
  },
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      chrome.storage.session.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  },
  removeItem: key => {
    return new Promise((resolve, reject) => {
      chrome.storage.session.remove(key, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  },
  clear: () => chrome.storage.session.clear(),
};

export default session;
