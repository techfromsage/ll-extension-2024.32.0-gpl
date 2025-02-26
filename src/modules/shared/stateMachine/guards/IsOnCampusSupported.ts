/**
 * Checks if onCampusSupported state is valid.
 *
 * Relating to: Access.
 *
 * This is badly named it's the 'Supported' state for On Campus users using a proxy.
 *
 * A better name would be onCampusProxySupported.
 *
 */
import Campus from '@/modules/shared/Campus';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default ({ institutions, accessConnections, storeState: { onCampus } }: FeaturesContext): boolean => {
  return institutions.some(institution => institution.enableOnCampusCheck && Campus().get(institution.id, onCampus))
    && accessConnections.length > 0
    && accessConnections.every(accessConnection => accessConnection.supported);
};
