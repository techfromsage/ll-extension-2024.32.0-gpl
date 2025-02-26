import InstitutionAccess from '@/interfaces/InstitutionAccess';

/**
 * Checks to see if a user is authenticated using a proxy config.
 *
 * @param accessDomain
 * @param currentUrl
 */
export default (accessConfig: InstitutionAccess, currentUrl: URL): boolean => {
  const { host } = currentUrl;
  return 'domain' in accessConfig
    && accessConfig.domain.length > 0
    && host.endsWith(accessConfig.domain);
};
