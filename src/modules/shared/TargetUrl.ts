import InstitutionAccess from '@/interfaces/InstitutionAccess';

/**
 * Extracts the original URL from an access login URL
 * e.g. https://proxy.bnl.lu/login?url=https://mywebsite.com -> https://mywebsite.com
 */
export default (url: URL, accessConfigs: InstitutionAccess[]) => {
  const fixedMalformedUrl = url.toString().replace('?&', '?');
  const sanitizedUrl = accessConfigs.reduce((theUrl: string, accessConfig) => {
    return decodeURIComponent(theUrl.replace(accessConfig.prefixUrl || '', ''));
  }, fixedMalformedUrl);

  return new URL(sanitizedUrl);
};
