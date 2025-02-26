/**
 * Checks if State isn't blocked by the Institution blacklist
 *
 * Relating to: AAA.
 *
 * Although not a state specifically, other states check if it's currently on a resource domain.
 * Abstracting this code into its own file reduces duplication.
 *
 */

import State from '@/enums/State';
import InstitutionItems from '@/interfaces/InstitutionItems';
import { DeniedDomains } from '@/store/shared/institution';
import WildcardUrlMatch from '@/modules/shared/WildcardUrlMatch';

export default (
  currentUrl: URL,
  institutionsDeniedDomains: InstitutionItems<DeniedDomains>,
  currentState: State,
  institution: string,
): boolean => {
  const urlMatch = WildcardUrlMatch(currentUrl);
  const institutionHasBlocked = () => {
    if (Object.entries(institutionsDeniedDomains).length === 0 || !institution) {
      return false;
    }
    const blockedMessages = institutionsDeniedDomains[institution]?.filter(({ domain }) => urlMatch.match(domain));
    const states = blockedMessages.reduce((acc, blockedMessage) => {
      return Object.assign(acc, blockedMessage.states.filter((state: string) => state === currentState));
    }, []);

    return !!states.length;
  };

  return !institutionHasBlocked();
};
