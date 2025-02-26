import { StoreState } from '@/store';

/**
 * Standardised response between content script and background script when updating store.
 * Includes a status message to allow us to "retry" the request, if needed.
 */
type BackgroundStoreResponse = {
  storeState: StoreState,
  status: 'failed' | 'success',
};
export default BackgroundStoreResponse;
