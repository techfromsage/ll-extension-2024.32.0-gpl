/**
 * Checks if ebookFinder state is valid.
 *
 * Relating to: Alternatives.
 *
 * This state is similar the `fullTextFinder` but for ebooks.
 *
 * In this state, a user has landed on a page with an ISBN,
 * that ISBN is present in the Library's Holding Information system.
 * but is not a Library Resource Domain.
 */

import DigitalResourceType from '@/enums/DigitalResourceType';
import State from '@/enums/State';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import HostnameMatch from '@/modules/shared/HostnameMatch';
import IsOnHomepage from '@/modules/shared/stateMachine/guards/IsOnHomepage';

export default (context: FeaturesContext): boolean => {
  const ebooks = context.alternativeURLs.filter(({ state, type, urls }) =>
    state === State.EbookFinder && type === DigitalResourceType.EBook && urls?.length);
  if (ebooks.length !== 1) {
    return false;
  }

  const [ebook] = ebooks;

  // if the current url is in the alternative urls, then we are in a loop (already achieved or access is required)
  // - this guard prevents that state
  const isAchieved = ebook.urls.some(url => HostnameMatch(context.currentUrl.toString()).match({ domain: url, strict: false }));

  return !!ebook.institution
    && IsStateAllowed(ebook.institution.id, State.EbookFinder, context.allowedStates)
    && !IsOnHomepage(context.currentUrl)
    && !isAchieved;
};
