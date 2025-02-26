/**
 * Checks if the FullTextFinder state is valid.
 *
 * Relating to: Alternatives.
 *
 * In this state, a user has landed on a page with a DOI that is
 * an academic article and has been found in the Library's Holding Information
 * system.
 */

import State from '@/enums/State';
import DigitalResourceType from '@/enums/DigitalResourceType';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import HostnameMatch from '@/modules/shared/HostnameMatch';
import IsOnHomepage from '@/modules/shared/stateMachine/guards/IsOnHomepage';

export default (context: FeaturesContext): boolean => {
  const alternative = context.alternativeURLs.find(
    ({ state, type, urls }) => state === State.FullTextFinder && type === DigitalResourceType.Article && urls?.length,
  );

  // if the current url is in the alternative urls, then we are in a loop (already achieved or access is required)
  // - this guard prevents that state
  const isAchieved = alternative?.urls.some(url =>
    HostnameMatch(context.currentUrl.toString()).match({ domain: url, strict: false }));

  return !!alternative
    && IsStateAllowed(alternative.institution?.id, State.FullTextFinder, context.allowedStates)
    && !IsOnHomepage(context.currentUrl)
    && !isAchieved;
};
