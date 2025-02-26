interface PermissionMethods {
  background: {
    getAll: () => Promise<browser.permissions.AnyPermissions>,
    request: (permission: browser.permissions.Permissions) => Promise<boolean>,
  },
}

export default PermissionMethods;
