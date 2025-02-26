/**
* Storage interaction methods
*/
import StorageMethods from '@/interfaces/browser/StorageMethods';

const session: StorageMethods = {
  getItem: <T>(key: string) => {
    return new Promise<T>((resolve, reject) => {
      browser.storage.session.get(key).then(res => {
        resolve(res as T);
      }).catch(err => {
        reject(err);
      });
    });
  },
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      browser.storage.session.set({ [key]: value }).then(() => {
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  },
  removeItem: key => {
    return new Promise((resolve, reject) => {
      browser.storage.session.remove(key).then(() => {
        resolve();
      }).catch(reject);
    });
  },
  clear: () => browser.storage.session.clear(),
};

export default session;
