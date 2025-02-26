/**
 * Checks if the openAccess state is valid.
 *
 * Relating to: Alternatives.
 *
 * This state is similar the `ebookFinder` but for Open Access Ebooks.
 * In this state, a user has landed on a page with a ISBN and that
 * ISBN is present in our OA DBs (DOAB).
 * but is not a Library Resource Domain.
 */

import State from '@/enums/State';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import Institution from '@/interfaces/Institution';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import IsOnHomepage from '@/modules/shared/stateMachine/guards/IsOnHomepage';

export default (context: FeaturesContext): boolean => {
  const alternative = context.alternativeURLs.find(
    ({ state }) => (state === State.OpenAccessEbook),
  );

  return !!alternative
    && alternative.urls.length > 0
    && IsStateAllowed((alternative.institution as Institution).id, State.OpenAccessEbook, context.allowedStates)
    && !IsOnHomepage(context.currentUrl);
};
