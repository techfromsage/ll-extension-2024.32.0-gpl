import { SessionStoreSlice } from '@/store';

export interface SessionPopupSlice {
  closedPopupHistory: string[],
  addToClosedPopupHistory: (popupIdOrHash: string) => void,
  clearClosedPopupHistory: () => void,
}

export const createSessionPopupSlice: SessionStoreSlice<SessionPopupSlice> = set => {
  return ({
    closedPopupHistory: [],
    addToClosedPopupHistory: popupIdOrHash => set(({ closedPopupHistory }) => {
      return closedPopupHistory.includes(popupIdOrHash)
        ? { closedPopupHistory }
        : { closedPopupHistory: [...closedPopupHistory, popupIdOrHash] };
    }),
    clearClosedPopupHistory: () => set({ closedPopupHistory: [] }),
  });
};
