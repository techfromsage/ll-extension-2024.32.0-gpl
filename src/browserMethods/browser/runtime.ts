/**
 * General functions to interact with browser.
 */
import BrowserStorage from '@/interfaces/browser/BrowserStorage';
import RuntimeMethods from '@/interfaces/browser/RuntimeMethods';
import StorageAdapter from '@/store/StorageAdapter';
import storageDriver from '@/browserMethods/browser/storage';
import sessionDriver from '@/browserMethods/browser/session';

const runtime: RuntimeMethods = {
  storage: (): BrowserStorage => StorageAdapter(storageDriver),
  session: (): BrowserStorage => StorageAdapter(sessionDriver),
  manifest: () => browser.runtime.getManifest(),
  getURL: path => browser.runtime.getURL(path),
  openOptionsPage: () => browser.runtime.openOptionsPage(),
  setUninstallUrl: url => browser.runtime.setUninstallURL(url),
  onUpdateAvailable: callback => {
    // Not available in Safari.
    // @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onUpdateAvailable
    if ('onUpdateAvailable' in browser.runtime) {
      browser.runtime.onUpdateAvailable.addListener(callback);
    }
  },
  reload: () => browser.runtime.reload(),
  onStartup: callback => browser.runtime.onStartup.addListener(callback),
};

export default runtime;
