/**
 * Platform Error Tracking e.g. Sentry setup.
 */
import PlatformErrorTracking from '@/interfaces/PlatformErrorTracking';
import { StoreState } from '@/store';

/**
 * Adds Sentry error logging if enabled.
 */
const platformErrorTracking: PlatformErrorTracking = {
  initialise: (store: StoreState) => {},
};

export default platformErrorTracking;
