/**
 * Stores the app on/off state.
 */
import { StoreSlice } from '@/store';

export interface AppActiveSlice {
  appActive: boolean,
  setAppActive: (appActive: boolean) => void,
}

export const createAppActiveSlice: StoreSlice<AppActiveSlice> = set => ({
  appActive: true,
  setAppActive: appActive => set({ appActive }),
});
