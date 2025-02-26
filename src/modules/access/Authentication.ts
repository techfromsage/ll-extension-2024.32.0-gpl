import Access from '@/modules/access/Access';
import InstitutionAccess from '@/interfaces/InstitutionAccess';
import Institution from '@/interfaces/Institution';
import ResourceDomain from '@/interfaces/access/ResourceDomain';
import InstitutionItems from '@/interfaces/InstitutionItems';
import { PotentialSignInDomain } from '@/store/shared/signedInDomains';

const reduceToFirstMatchingConfig = (urlString: string) => (match: {
  accessConfig: InstitutionAccess,
  institution: Institution,
} | undefined, institution: Institution) => {
  if (match) {
    return match;
  }
  const accessConfig = institution.access.find(({ prefixUrl }) => (prefixUrl ? urlString.startsWith(prefixUrl) : ''));
  return accessConfig ? { accessConfig, institution } : undefined;
};

/**
 * Finds the resource domain for the URL the user is trying to log into, if it exists;
 * i.e. if the user is trying to log into a resource that is proxied, we need to find the corresponding resource domain:
 *
 * Due to the many redirects that happen, we store this for later when we can detect if a login has been successful.
 * At that point, there is no way of knowing the domain they just logged into, so having this allows us track it
 * and add it to the signedIn domains on login success.
 *
 * Example:
 *  - User visits https://login.sagepub.idm.oclc.org/login?url=https://www.jstor.org/ with OCLC proxy.
 *  - if www.jstor.org resource domain exists, we return it. Otherwise, we return null.
 *
 * @param url
 * @param session
 * @param state
 */
const detectSignIn = (
  urlString: string,
  institutes: Institution[],
  resourceDomains: InstitutionItems<ResourceDomain>,
  signedInDomains: ResourceDomain[],
): PotentialSignInDomain | undefined => {
  const result = institutes.reduce(reduceToFirstMatchingConfig(urlString), undefined);

  if (!result?.accessConfig.prefixUrl) {
    return undefined;
  }

  const targetUrl = new URL(decodeURIComponent(urlString.replace(result.accessConfig.prefixUrl, '')));
  const [potential] = Access(result.institution, resourceDomains[result.institution.id], targetUrl, signedInDomains);
  return potential?.resource
    ? { resourceDomain: potential.resource, accessConfig: result.accessConfig }
    : undefined;
};

/**
 * Detects if the user has successfully logged out of the resource.
 * @param url
 * @param session
 */
const detectSignOut = (url: string) => url.startsWith('https://login.openathens.net/signout');

export default {
  detectSignIn,
  detectSignOut,
};
