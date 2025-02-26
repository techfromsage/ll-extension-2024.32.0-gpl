/**
 * General functions to interact with browser.
 */
import BrowserStorage from '@/interfaces/browser/BrowserStorage';
import RuntimeMethods from '@/interfaces/browser/RuntimeMethods';
import StorageAdapter from '@/store/StorageAdapter';
import storageDriver from '@/browserMethods/chrome/storage';
import sessionDriver from '@/browserMethods/chrome/session';

const runtime: RuntimeMethods = {
  storage: (): BrowserStorage => StorageAdapter(storageDriver),
  session: (): BrowserStorage => StorageAdapter(sessionDriver),
  manifest: () => chrome.runtime.getManifest(),
  getURL: path => chrome.runtime.getURL(path),
  openOptionsPage: () => chrome.runtime.openOptionsPage(),
  setUninstallUrl: url => chrome.runtime.setUninstallURL(url),
  onUpdateAvailable: callback => chrome.runtime.onUpdateAvailable.addListener(callback),
  reload: () => chrome.runtime.reload(),
  onStartup: callback => chrome.runtime.onStartup.addListener(callback),
};

export default runtime;
