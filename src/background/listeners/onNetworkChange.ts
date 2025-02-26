/**
 * Register listener for when the network changes.
 * e.g. user goes from Wi-Fi to mobile. Or campus Wi-Fi to home Wi-Fi.
 *
 * The change of network suggest we need to redetermine if the user is on/off campus.
 */
import Campus from '@/modules/shared/Campus';
import HTTPClient from '@/modules/shared/http/HTTPClient';
import bootstrap from '@bootstrap/index';
import { store } from '@/store';

export default async () => {
  const { fetchCurrentIp, institutes } = store.getState();
  const ip = await fetchCurrentIp(bootstrap.api.ip, HTTPClient);
  Campus().set(institutes, ip);
};
