import { sessionStore, SessionStoreState } from '@/store';

/**
 * onAddClosedPopupToHistory adds a popup ID to the closed history session store.
 * The session store is used to determine if the popup should be shown again to the user or not.
 */
export default (popupId: string): Promise<SessionStoreState> => {
  const { addToClosedPopupHistory } = sessionStore.getState();
  addToClosedPopupHistory(popupId);
  return Promise.resolve(sessionStore.getState());
};
