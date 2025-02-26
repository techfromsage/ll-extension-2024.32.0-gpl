import { store } from '@/store';

/**
 * onSignedInDomainsRequest passes the signed in domains to the content script.
 */
export default () => {
  const { signedInDomains } = store.getState();
  return Promise.resolve(signedInDomains || []);
};
