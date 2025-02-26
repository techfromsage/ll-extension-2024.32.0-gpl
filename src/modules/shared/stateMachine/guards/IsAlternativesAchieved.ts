import State from '@/enums/State';
import IsStateAllowed from '@/modules/shared/stateMachine/guards/IsStateAllowed';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import ProxyURL from '@/modules/shared/ProxyURL';
import Institution from '@/interfaces/Institution';
import HostnameMatch from '@/modules/shared/HostnameMatch';
import WildcardUrlMatch from '@/modules/shared/WildcardUrlMatch';
import TargetUrl from '@/modules/shared/TargetUrl';
import IsOnHomepage from '@/modules/shared/stateMachine/guards/IsOnHomepage';

/**
 * Checks if An Alternatives state is valid.
 *
 * Relating to: Alternatives / Access.
 *
 * Sometimes this state happens for full-text, ebook and open access.
 * Normally, it goes to 'connected' (access achieved). Here's why:
 *
 * The scenario where this can happen is when:
 * - a DOI/ISBN has been found and is present in the holding system.
 * - a user has landed on an ILL order form.
 *
 * The result is that they have access, but as the domain is not in the resource domain list
 * it will never be in 'connected' state. (@see  src/modules/access/Access.ts).
 *
 */
export default (alternativesState: State, allowedState: State) => (context: FeaturesContext) => {
  const { currentUrl, alternativeURLs, allowedStates } = context;
  const alternative = alternativeURLs.find(
    ({ state }) => (state === alternativesState),
  );
  if (!alternative) {
    return false;
  }
  const institution = alternative.institution as Institution;
  if (!IsStateAllowed(institution.id, allowedState, allowedStates) || IsOnHomepage(currentUrl)) {
    return false;
  }

  // The order form is fully within our control, so we can check the URL directly.
  if (alternativesState === State.OrderForm) {
    return alternative.urls.some(url => WildcardUrlMatch(currentUrl).match(url));
  }

  // We always want to check the original URL, as the proxy URL will never match the alternative URL in holdings.
  const originalUrl = ProxyURL(institution.access).extractOriginal(currentUrl);

  // Otherwise we need to check the URL almost matches the alternative URL as they are never quite the same
  // location that is given by the Discovery system.
  return alternative.urls.some(url => {
    try {
      const potential = TargetUrl(ProxyURL(institution.access).extractOriginal(new URL(url)), institution.access);
      return HostnameMatch(originalUrl.hostname).match({ domain: potential.hostname, strict: true });
    } catch (e) {
      return false;
    }
  });
};
