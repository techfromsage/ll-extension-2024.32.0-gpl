import browserMethods from '@/browserMethods';
import HostnameMatch from '@/modules/shared/HostnameMatch';
import { store } from '@/store';

/**
 * Check if the popup should render in the toolbar
 * e.g. a reserved page or a domain in the global deny list
 * @param urlString
 */
const shouldRenderInToolbar = (
  url: URL,
  globalDenylist: string[],
) => {
  if (['chrome:', 'about:'].includes(url.protocol) || !globalDenylist.length) {
    return true;
  }
  const hostnameMatch = HostnameMatch(url.hostname);
  return globalDenylist.some(domain => hostnameMatch.match({ domain, strict: false }));
};

/**
 * Toggle the popup based on the url
 * @param urlString
 */
const togglePopup = (urlString: string) => {
  if (!urlString) {
    return;
  }

  const url = new URL(urlString);
  const { globalDenylist } = store.getState();
  const popup = shouldRenderInToolbar(url, globalDenylist) ? 'popup.html' : '';
  browserMethods.toolbar.background.setPopup({ popup });
};

export default togglePopup;
