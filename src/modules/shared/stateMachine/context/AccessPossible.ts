/**
 * Provides boolean for determining if user is in the Access possible state
 * for a particular connection type e.g. OpenAthens
 *
 * For use in Array.find() or Array.some()
 * e.g. see app-extension/src/modules/shared/stateMachine/guards/IsAccessPossible.ts
 *
 */
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import AccessConnection from '@/interfaces/access/AccessConnection';

export default (resourceDomainType: ResourceDomainTypes) => (accessConnection: AccessConnection): boolean =>
  accessConnection.supported
    && !accessConnection.connected
    && accessConnection.resource?.accessType === resourceDomainType;
