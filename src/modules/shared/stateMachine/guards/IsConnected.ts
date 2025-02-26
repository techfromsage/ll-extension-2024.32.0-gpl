/**
 * Checks if `connected` state is valid.
 *
 * Relating to: Access.
 *
 * This state is achieved if a resource domain has the connected state and is a proxy resource domain.
 */
import State from '@/enums/State';
import Connected from '@/modules/shared/stateMachine/context/Connected';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default (context: FeaturesContext) => {
  const accessConnection = context.accessConnections.find(Connected);
  if (!accessConnection || !accessConnection.resource) {
    return false;
  }
  return IsStateAllowed(accessConnection.resource.institution.id, State.Connected, context.allowedStates);
};
