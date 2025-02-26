/**
 * Extracts the relevant information when Access is Possible (via authentication provider).
 *
 * See example usage in app-extension/src/modules/shared/stateMachine/actions/AutoRedirectIfNecessary.ts
 */
import AccessPossible from '@/modules/shared/stateMachine/context/AccessPossible';
import InstitutionAccess from '@/interfaces/InstitutionAccess';
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import AccessConnection from '@/interfaces/access/AccessConnection';
import Institution from '@/interfaces/Institution';

type AccessInfo = { access: InstitutionAccess, institution: Institution, accessConnection: AccessConnection };

export default (
  resourceDomainType: ResourceDomainTypes,
  accessConnections: AccessConnection[],
): AccessInfo => {
  const accessConnection = accessConnections.find(AccessPossible(resourceDomainType));
  const resource = accessConnection?.resource;
  if (!resource) {
    throw new Error('No resource found');
  }

  const access = resource.institution.access.find(({ type }) => type === resource.accessType);
  if (!access?.prefixUrl) {
    throw new Error('No access prefix found');
  }
  return { access, institution: resource.institution, accessConnection };
};
