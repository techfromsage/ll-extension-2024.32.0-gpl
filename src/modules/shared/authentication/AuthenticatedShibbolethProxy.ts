/**
 * Checks if the current URL is the Shibboleth SAML2 POST endpoint.
 * This is used to determine if the user has successfully logged in via SSO on a proxy connection.
 *
 * @param accessDomain
 * @param currentUrl
 */
export default (currentUrl: URL): boolean => {
  const { pathname } = currentUrl;
  return pathname.endsWith('Shibboleth.sso/SAML2/POST');
};
