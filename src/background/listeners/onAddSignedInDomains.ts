import ResourceDomain from '@/interfaces/access/ResourceDomain';
import { store } from '@/store';

/**
 * onAddSignedInDomains adds an array of signed in domains to the background store.
 */
export default (domains: ResourceDomain[]) => {
  return new Promise<void>(resolve => {
    const { addSignedInDomain } = store.getState();
    domains.forEach(addSignedInDomain);
    resolve();
  });
};
