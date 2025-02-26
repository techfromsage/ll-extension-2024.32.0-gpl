/**
 * Checks if {resourceDomainType}AccessAchieved state is valid.
 *
 * Relating to: Access.
 *
 * Not really used.
 *
 * This state is similar the `openAthensAccessPossible` but for logged in SSO and Proxy users.
 *
 * Usually happens when a logged-in users lands on publishers homepage or similar.
 *
 * The domain needs to be licensed to it (resource domain) and the user logged in (connected).
 *
 * Note that if on page with a licensed DOI/ISBN page then the state would be ???.
 */

import ResourceDomainTypes from '@/enums/ResourceDomainTypes';
import State from '@/enums/State';
import AccessAchieved from '@/modules/shared/stateMachine/context/AccessAchieved';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default (resourceDomainType: ResourceDomainTypes, stateToFind: State) =>
  (context: FeaturesContext): boolean => {
    const connection = context.accessConnections.find(AccessAchieved(resourceDomainType));
    if (!connection || !connection.resource) {
      return false;
    }
    return IsStateAllowed(connection.resource.institution.id, stateToFind, context.allowedStates);
  };
