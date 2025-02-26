import ManagedDomain from '@/interfaces/ManagedDomain';
import AppSettings from '@/interfaces/AppSettings';

/**
 * ManagedDomain determines if a popup should automatically display/open as well as determines
 * if the extension should allow the auto redirect for a user based on the domain which the user is on.
 *
 * isBlocked returns 'true' if the domain is blocked otherwise 'false'.
 */

export default (appSettings: AppSettings, hostname: string): ManagedDomain => {
  return {
    domain: hostname,
    isBlocked: appSettings.managedDomains.domains.includes(hostname),
  };
};
