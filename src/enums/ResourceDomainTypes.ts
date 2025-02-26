/**
 * Enum ResourceDomainTypes represents the different ways an institution
 * can have content access set up. Usually, this is done via Proxy but SSO methods are also supported using
 * Open Athens and Shibboleth.
 */
enum ResourceDomainTypes {
  Proxy = 'proxy',
  OpenAthens = 'openAthens',
  Shibboleth = 'shibboleth',
}
export default ResourceDomainTypes;
