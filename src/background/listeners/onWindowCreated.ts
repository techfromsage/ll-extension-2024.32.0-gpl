/**
 * Fired when a window is created.
 */
import clearSessionStorage from '@/background/session/clearSessionStorage';
import { sessionStore, store } from '@/store';
import browserMethods from '@/browserMethods';

export default () => {
  // If window open, then clear session storage.
  setTimeout(async () => {
    await clearSessionStorage(
      sessionStore.getState(),
      store.getState(),
      browserMethods.storage,
    );
  }, 2000);
};
