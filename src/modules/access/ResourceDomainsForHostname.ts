import Institution from '@/interfaces/Institution';
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import HostnameMatch from '@/modules/shared/HostnameMatch';

/**
 * When extracting Proxied URLs with hyphens '-' in them, those hyphens have been replaced with periods '.'.
 * This means that the resource domains will never match. Replacing the resource domains hyphens makes that mach possible.
 */
const convertHyphens = (hostname: string) => hostname.replace(/-/g, '.');

const parseToMatchProxiedUrl = (resourceDomain: ResourceDomain) =>
  ({ ...resourceDomain, domain: convertHyphens(resourceDomain.domain) });

/**
 * Obtains an institution's "resource domain" based on a hostname.
 *
 * @param {string} hostname
 * @param institution
 * @param {ResourceDomain[]} resourceDomains
 * @returns {ResourceDomain | null}
 */
export default (
  hostname: string,
  institution: Institution,
  resourceDomains?: ResourceDomain[],
): ResourceDomain[] => {
  const allowedAccessTypes = institution.access.map(accessConfig => accessConfig.type);
  return resourceDomains ? resourceDomains
    .filter(resourceDomain => resourceDomain.domain) // Prevents malformed ResourceDomain causing app to break
    .filter(
      resourceDomain => allowedAccessTypes.includes(resourceDomain.accessType)
        && HostnameMatch(convertHyphens(hostname)).match(parseToMatchProxiedUrl(resourceDomain)),
    )
    .map(resourceDomain => ({ ...resourceDomain, institution }))
    : [];
};
