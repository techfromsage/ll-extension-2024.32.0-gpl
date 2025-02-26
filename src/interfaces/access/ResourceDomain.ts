/**
 * Interface ResourceDomain represents a domain/URL that an institution has subscribed access to.
 * For example, www.sciencedirect.com.
 *
 * This is sent through from the resourceDomains endpoint.
 */
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import Institution from '@/interfaces/Institution';

interface ResourceDomain {
  id: string,
  domain: string,
  title: string,
  strict: boolean,
  institution: Institution,
  accessType: ResourceDomainTypes,
}

export default ResourceDomain;
