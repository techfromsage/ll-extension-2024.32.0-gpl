import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import fetchSciwheelData from '@/background/fetchData/fetchSciwheelData';

/**
 * Fetches the base data and sends response when finished.
 */
export default (): Promise<BackgroundStoreResponse> => {
  return new Promise(resolve => {
    fetchSciwheelData().then(resolve);
  });
};
