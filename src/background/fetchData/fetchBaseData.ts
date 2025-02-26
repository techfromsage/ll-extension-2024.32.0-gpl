import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import { store } from '@/store';
import ClientId from '@/modules/shared/ClientId';
import browserMethods from '@/browserMethods';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import bootstrap from '@bootstrap/index';

/**
 * Fetches most basic data from APIs to bootstrap the app.
 */
const fetchBaseData = async (retries = 3): Promise<BackgroundStoreResponse> => {
  const {
    clientId,
    generateClientId,
    fetchCurrentIp,
    fetchInstitutionsList,
    getConfig,
    fetchGlobalDenylist,
  } = store.getState();
  try {
    ClientId({ clientId, generateClientId }).generate();
    const manifest = browserMethods.runtime.manifest();
    await Promise.all([
      fetchCurrentIp(bootstrap.api.ip, HTTPClient),
      fetchInstitutionsList(bootstrap.api.institutionList, HTTPClient),
      getConfig(bootstrap.api.configUrl, manifest.version, HTTPClient),
      fetchGlobalDenylist(bootstrap.api.globalDeny, HTTPClient),
    ]);

    return { storeState: store.getState(), status: 'success' };
  } catch (error) {
    if (retries === 0) {
      console.log('Fetch data failed after 3 attempts');
      return { storeState: store.getState(), status: 'failed' };
    }
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    return fetchBaseData(retries - 1);
  }
};

export default fetchBaseData;
