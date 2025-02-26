/**
 * Register listener for updating the App on/off state in the background.
 */
import { store, StoreState } from '@/store';

export default (appActive: boolean): Promise<StoreState> => {
  const { setAppActive } = store.getState();
  setAppActive(appActive);
  return Promise.resolve(store.getState());
};
