import BrowserStorage from '@/interfaces/browser/BrowserStorage';

interface RuntimeMethods {
  /**
   * Converts a relative path within an app/extension install
   * directory to a fully-qualified URL.
   */
  getURL: (path: string) => string,
  storage: () => BrowserStorage,
  manifest: () => chrome.runtime.Manifest | browser._manifest.WebExtensionManifest,
  session: () => BrowserStorage,
  openOptionsPage: () => Promise<void> | void,
  setUninstallUrl: (url: string) => Promise<void> | void,
  onUpdateAvailable: (callback: (details: { version: string }) => void) => void,
  reload: () => void,
  onStartup: (callback: () => void) => void,
}

export default RuntimeMethods;
