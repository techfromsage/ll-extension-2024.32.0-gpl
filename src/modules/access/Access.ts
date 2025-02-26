/**
 * Provides Streamlined Access for a given resource or domain.
 *
 * @see https://newleanlibrary.atlassian.net/wiki/spaces/TEC/pages/590807041/Feature+Access
 * for full documentation.
 *
 * As an overview, The "Access module" does several things:
 * 1. Streamlines access by checking if the current URL is a part of the institution's predefined resource domain list.
 *
 */
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import AccessConnection from '@/interfaces/access/AccessConnection';
import ResourceDomainsForHostname from '@/modules/access/ResourceDomainsForHostname';
import ProxyURL from '@/modules/shared/ProxyURL';
import Institution from '@/interfaces/Institution';
import HostnameMatch from '@/modules/shared/HostnameMatch';
import AuthenticatedProxy from '@/modules/shared/authentication/AuthenticatedProxy';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';

const parseToMatchProxiedUrl = (resourceDomain: ResourceDomain) => ({
  ...resourceDomain,
  domain: resourceDomain.domain.replace(/-/g, '.'),
});

const findSignedInDomain = (hostname: string, institutionId: string) => (resourceDomain: ResourceDomain) =>
  HostnameMatch(hostname).match(parseToMatchProxiedUrl(resourceDomain))
  && resourceDomain.institution.id === institutionId;

/**
 * Provides Access connection status for a given location.
 *
 * @param institution
 * @param resourceDomains
 * @param url
 * @param tabHistory
 * @param signedInDomains
 * @constructor
 */
const Access = (
  institution: Institution,
  resourceDomains: ResourceDomain[],
  url: URL,
  signedInDomains: ResourceDomain[],
): AccessConnection[] => {
  const targetUrl = ProxyURL(institution.access).extractOriginal(url);
  const signedInDomain = signedInDomains.find(findSignedInDomain(targetUrl.host, institution.id));

  // If were signed in we know we're supported and connected.
  if (signedInDomain) {
    return [{
      resource: signedInDomain,
      supported: true,
      connected: true,
    }];
  }
  const proxyAccessConfig = institution.access.find(access => access.type === ResourceDomainTypes.Proxy);

  // If no signed in domain, we need to check if we're at least supported...
  // and also if we're connected for proxy as we check the URL for this.
  return ResourceDomainsForHostname(targetUrl.host, institution, resourceDomains)
    .map(resourceDomain => {
      const connected = proxyAccessConfig && resourceDomain.accessType === ResourceDomainTypes.Proxy
        ? AuthenticatedProxy(proxyAccessConfig, url)
        : false;
      return {
        resource: resourceDomain,
        supported: true,
        connected,
      };
    });
};

export default Access;
