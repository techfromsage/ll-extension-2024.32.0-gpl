/**
 * Checks if onCampusNotSupported state is valid.
 *
 * Relating to: Access.
 *
 * This is badly named it's the 'NotSupported' state for On Campus users using a proxy.
 *
 * A better name would be onCampusProxyNotSupported.
 *
 */
import Campus from '@/modules/shared/Campus';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default ({ institutions, accessConnections, storeState: { onCampus } }: FeaturesContext): boolean => {
  const isOnCampus = institutions.some(institution => institution.enableOnCampusCheck && Campus().get(institution.id, onCampus));
  const accessSupported = accessConnections.length > 0
    && accessConnections.every(accessConnection => accessConnection.supported);

  return isOnCampus && !accessSupported;
};
