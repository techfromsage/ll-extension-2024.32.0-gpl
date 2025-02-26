/**
 * Checks if ebookFinderMultiple state is valid.
 *
 * Relating to: Alternatives.
 *
 * This state is similar the `fullTextFinder` but for multiple ebooks.
 * In this state, a user has landed on a page with multiple ISBNs,
 * that ISBN is present in the Library's Holding Information system.
 * but is not a Library Resource Domain.
 */

import DigitalResourceType from '@/enums/DigitalResourceType';
import State from '@/enums/State';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import IsOnHomepage from '@/modules/shared/stateMachine/guards/IsOnHomepage';

export default (context: FeaturesContext): boolean => {
  const ebooks = context.alternativeURLs.filter(({ type, urls }) => type === DigitalResourceType.EBook && urls?.length);
  if (ebooks.length < 2) {
    return false;
  }

  return ebooks.some(ebook => {
    return ebook.institution
      && IsStateAllowed(ebook.institution.id, State.EbookFinderMultiple, context.allowedStates)
      && !IsOnHomepage(context.currentUrl);
  });
};
