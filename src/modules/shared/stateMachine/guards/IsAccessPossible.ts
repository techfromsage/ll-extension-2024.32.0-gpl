/**
 * Checks if `{type}AccessPossible` state is valid.
 *
 * Relating to: Access.
 *
 */
import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import State from '@/enums/State';
import AccessPossible from '@/modules/shared/stateMachine/context/AccessPossible';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Campus from '@/modules/shared/Campus';

export default (resourceDomainType: ResourceDomainTypes, stateToFind: State) => (context: FeaturesContext): boolean => {
  if (resourceDomainType !== ResourceDomainTypes.Proxy && context.isProxyUrl) {
    return false;
  }
  const connection = context.accessConnections.find(AccessPossible(resourceDomainType));
  if (!connection || !connection.resource) {
    return false;
  }
  const { institution } = connection.resource;

  // The enableOnCampusCheck is only concerned with showing the AccessPossible state.
  if (institution.enableOnCampusCheck && Campus().get(institution.id, context.storeState.onCampus)) {
    return false;
  }
  return IsStateAllowed(institution.id, stateToFind, context.allowedStates);
};
