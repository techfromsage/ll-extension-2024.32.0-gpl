/**
 * Provides items for determining if user is in the connected state.
 *
 * See IsConnected.ts for more info.
 *
 * For use in Array.find() or Array.some()
 */

import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import AccessConnection from '@/interfaces/access/AccessConnection';

export default (accessConnection: AccessConnection): boolean =>
  accessConnection.connected
  && accessConnection.resource?.accessType === ResourceDomainTypes.Proxy;
