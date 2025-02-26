/**
 * Checks if the openAccess state is valid.
 *
 * Relating to: Alternatives.
 *
 * This state is similar the `fullTextFinder` but for Open Access articles.
 * In this state, a user has landed on a page with a DOI and that
 * DOI is present in one of the OA DBs (Unpaywall/Core).
 * but is not a Library Resource Domain.
 */

import State from '@/enums/State';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import Institution from '@/interfaces/Institution';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import IsOnHomepage from '@/modules/shared/stateMachine/guards/IsOnHomepage';

export default (context: FeaturesContext): boolean => {
  if (context.searchPage) {
    return false;
  }

  const alternative = context.alternativeURLs.find(
    ({ state }) => (state === State.OpenAccess),
  );

  return !!alternative
    && alternative.urls.length > 0
    && IsStateAllowed((alternative.institution as Institution).id, State.OpenAccess, context.allowedStates)
    && !IsOnHomepage(context.currentUrl);
};
