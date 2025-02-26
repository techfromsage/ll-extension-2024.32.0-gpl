/**
 * Checks to see if a user is authenticated using an SSO config.
 */

import InstitutionAccess from '@/interfaces/InstitutionAccess';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';

/**
 * @param currentUrl
 * @param signedInResourceDomains
 */
export default (
  accessConfig: InstitutionAccess,
  { hostname, pathname }: URL,
) => {
  if (accessConfig.type !== ResourceDomainTypes.OpenAthens) {
    return false;
  }

  if (hostname === 'login.openathens.net' && pathname.startsWith('/saml/2/sso')) {
    return true;
  }

  // Some identity providers use a different path for the authorize endpoint e.g. Identity Server 4
  // This list may need to grow as issues come up.
  return pathname.startsWith('/identity/connect/authorize');
};
