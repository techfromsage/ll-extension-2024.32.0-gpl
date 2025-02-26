/**
 * Checks if the OrderForm state is valid.
 *
 * Relating to: Alternatives.
 *
 * In this state, a user has landed on a page with a DOI or ISBN
 * but it is not present in either the Open Access DBs or Library Holding Information
 * System. In this case, we provide the user with a form to request the item from the library.
 * with a form to request the item from the library.
 *
 * Note, not all institution's have this switched on.
 * The logic for this is handled within the Alternatives module
 * (src/modules/alternatives).
 */

import State from '@/enums/State';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import IsOnHomepage from '@/modules/shared/stateMachine/guards/IsOnHomepage';
import Institution from '@/interfaces/Institution';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default (context: FeaturesContext): boolean => {
  const alternative = context.alternativeURLs.find(
    ({ state }) => (state === State.OrderForm),
  );

  return !!alternative
    && IsStateAllowed((alternative.institution as Institution).id, State.OrderForm, context.allowedStates)
    && !IsOnHomepage(context.currentUrl);
};
