import ResourceDomainTypes from '@/enums/ResourceDomainTypes';

/**
 * AccessLoginUrl constructs the Access Login URL for a particular provider.
 */
export default (accessType: ResourceDomainTypes, prefixUrl: string | undefined, currentUrl: string) => {
  return accessType === ResourceDomainTypes.OpenAthens
    ? `${prefixUrl}${encodeURIComponent(decodeURIComponent(currentUrl))}`
    : `${prefixUrl}${currentUrl}`;
};
