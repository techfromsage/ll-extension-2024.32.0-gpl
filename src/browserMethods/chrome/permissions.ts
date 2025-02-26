/**
 * Chrome permissions functions and events.
 */
import PermissionMethods from '@/interfaces/browser/PermissionMethods';

const permissions: PermissionMethods = {
  background: {
    getAll: () => new Promise(resolve => {
      chrome.permissions.getAll(resolve);
    }),
    request: permission => new Promise(resolve => {
      chrome.permissions.request(permission, resolve);
    }),
  },
};

export default permissions;
