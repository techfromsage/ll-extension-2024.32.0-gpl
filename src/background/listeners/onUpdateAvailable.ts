import browserMethods from '@/browserMethods';

/**
 * onUpdateAvailable callback for when an update is available in store.
 * We use this to force a reload.
 *
 * See https://developer.chrome.com/docs/extensions/reference/runtime/#event-onUpdateAvailable
 */
export default (): void => {
  browserMethods.runtime.reload();
};
