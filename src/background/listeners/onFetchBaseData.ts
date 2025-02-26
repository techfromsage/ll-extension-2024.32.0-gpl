import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import fetchBaseData from '@/background/fetchData/fetchBaseData';

/**
 * Fetches the base data and sends response when finished.
 */
export default (): Promise<BackgroundStoreResponse> => {
  return new Promise(resolve => {
    fetchBaseData().then(resolve);
  });
};
