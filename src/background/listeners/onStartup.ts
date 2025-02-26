import { store } from '@/store';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import bootstrap from '@bootstrap/index';

/**
 * onStartup - runs when the browser opens.
 *
 * See https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
 */
export default () => {
  const { fetchCurrentIp, fetchDefaultInstitution } = store.getState();
  fetchCurrentIp(bootstrap.api.ip, HTTPClient).then(() => fetchDefaultInstitution(HTTPClient));
};
