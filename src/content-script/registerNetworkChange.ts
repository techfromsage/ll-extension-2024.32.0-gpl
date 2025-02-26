import browserMethods from '@/browserMethods';
import bootstrap from '@bootstrap/index';

declare const navigator: any;

/**
 * registerNetworkChange
 */
export default () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const { change } = browserMethods.network.contentScript;
  if (connection) {
    connection.onchange = change;
  } else {
    // Polling fallback
    setInterval(change, bootstrap.onCampusCheckInterval);
  }
};
