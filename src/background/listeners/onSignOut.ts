import BackgroundStoreResponse from '@/enums/BackgroundStoreResponse';
import { store } from '@/store';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import bootstrap from '@bootstrap/index';

/**
 * Signs out a Sciwheel / Reference Manager user and sends response when finished
 */
const onSignOut = async (retries = 3): Promise<BackgroundStoreResponse> => {
  const { user, signOutUser } = store.getState();
  try {
    if (user) {
      await signOutUser(
        `${bootstrap.api.sciwheel.logOut}`,
        `${bootstrap.api.sciwheel.signOut}`,
        HTTPClient,
        user,
      );
    }
    return { storeState: store.getState(), status: 'success' };
  } catch (error) {
    if (retries === 0) {
      console.log('Fetch data failed after 3 attempts');
      return { storeState: store.getState(), status: 'failed' };
    }
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    return onSignOut(retries - 1);
  }
};

export default (): Promise<BackgroundStoreResponse> => {
  return new Promise(resolve => {
    onSignOut().then(resolve);
  });
};
