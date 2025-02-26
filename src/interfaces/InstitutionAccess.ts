/**
 * Interface InstitutionAccess represents the access options (and their configurations)
 * available for an institution. e.g. proxy, OpenAthens etc..
 */
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';

type InstitutionAccessBase = {
  institution: string,
  authenticated: boolean,
};

type InstitutionAccessProxy = InstitutionAccessBase & {
  type: ResourceDomainTypes.Proxy,
  prefixUrl: string,
  domain: string,
};

type InstitutionAccessOpenAthensSSO = InstitutionAccessBase & {
  type: ResourceDomainTypes.OpenAthens,
  prefixUrl: string,
  automatic: boolean,
};

type InstitutionAccessOpenAthensProxy = InstitutionAccessBase & {
  type: ResourceDomainTypes.OpenAthens,
  prefixUrl: string,
  domain: string,
};

type InstitutionAccessShibboleth = InstitutionAccessBase & {
  type: ResourceDomainTypes.Shibboleth,
  prefixUrl: string | undefined,
};

export type InstitutionAccessOpenAthens = InstitutionAccessOpenAthensSSO | InstitutionAccessOpenAthensProxy;

type InstitutionAccess =
  | InstitutionAccessProxy
  | InstitutionAccessShibboleth
  | InstitutionAccessOpenAthens;

export default InstitutionAccess;
