import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import { store } from '@/store';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import bootstrap from '@bootstrap/index';

/**
 * Fetches most basic data from Sciwheel APIs to bootstrap the app.
 */
const fetchSciwheelData = async (retries = 3): Promise<BackgroundStoreResponse> => {
  const { appSettings, fetchUser, fetchProjects } = store.getState();

  if (!appSettings.sciwheelEnabled) {
    return { storeState: store.getState(), status: 'success' };
  }

  try {
    await fetchUser(bootstrap.api.sciwheel.authentication, HTTPClient).then(async res => {
      if (res.id.length) {
        await Promise.all([
          fetchProjects(bootstrap.api.sciwheel.projects, HTTPClient, res),
        ]);
      }
    });
    return { storeState: store.getState(), status: 'success' };
  } catch (error) {
    if (retries === 0) {
      console.log('Fetch data failed after 3 attempts');
      return { storeState: store.getState(), status: 'failed' };
    }
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    return fetchSciwheelData(retries - 1);
  }
};

export default fetchSciwheelData;
