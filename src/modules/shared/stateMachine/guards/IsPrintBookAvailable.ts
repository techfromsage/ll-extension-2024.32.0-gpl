/**
 * Checks if the isPrintHoldingsAvailable state is valid.
 *
 * Relating to: Alternatives.
 *
 * Check for if the institution has a physical alternative for the resource.
 */

import State from '@/enums/State';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import Institution from '@/interfaces/Institution';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import IsOnHomepage from '@/modules/shared/stateMachine/guards/IsOnHomepage';

export default (context: FeaturesContext): boolean => {
  const alternative = context.alternativeURLs.find(
    ({ state }) => (state === State.PrintBookAvailable),
  );
  return !!alternative
    && alternative.urls?.length > 0
    && IsStateAllowed((alternative.institution as Institution).id, State.PrintBookAvailable, context.allowedStates)
    && !IsOnHomepage(context.currentUrl);
};
