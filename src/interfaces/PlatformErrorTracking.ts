import { StoreState } from '@/store';

interface PlatformErrorTracking {
  initialise: (store: StoreState) => void,
}

export default PlatformErrorTracking;
