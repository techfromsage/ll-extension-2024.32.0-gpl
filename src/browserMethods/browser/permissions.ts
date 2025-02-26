/**
 * Browser permissions functions and events.
 */
import PermissionMethods from '@/interfaces/browser/PermissionMethods';

const permissions: PermissionMethods = {
  background: {
    getAll: () => browser.permissions.getAll(),
    request: permission => browser.permissions.request(permission),
  },
};

export default permissions;
