import DateRange from '@/modules/shared/DateRange';
import Campus from '@/modules/shared/Campus';
import Institution from '@/interfaces/Institution';
import InstitutionItems from '@/interfaces/InstitutionItems';
import OnCampus from '@/interfaces/OnCampus';
import CustomMessage from '@/interfaces/assist/CustomMessage';
import LocationAllowed from '@/modules/shared/LocationAllowed';
import WildcardUrlMatch from '@/modules/shared/WildcardUrlMatch';

/**
 * Filters through messages to find results that `UrlMatch`
 * @param  {CustomMessage[]} messages
 * @param  {string} tabUrl
 * @param  {boolean} isOnCampus
 * @return `CustomMessage[]`
 */
const findPossibilities = (
  messages: CustomMessage[],
  tabUrl: URL,
  isOnCampus: boolean,
) => messages
  .filter(
    message =>
      LocationAllowed(message.showOption, isOnCampus)
      && WildcardUrlMatch(tabUrl).match(message.url)
      && DateRange(message.startAt, message.endAt).isInRange(),
  );

/**
 * Reducer function to find the largest path for a custom message.
 * @param {CustomMessage} match
 * @param {CustomMessage} current
 */
const reduceToLongestPath = (match: CustomMessage, current: CustomMessage) =>
  (current.url.length > match.url.length ? current : match);

/**
 * Returns the best match from CustomMessages,
 * after finding the best possibility and doing campus checks
 * Returns a custom object that provides the popup with only necessary information
 * to then generate the Assist message.
 *
 * @param {InstitutionItems<CustomMessage>} allMessages
 * @param {Institution[]} institutes
 * @param {OnCampus} campusStore
 */
export default (
  allMessages: InstitutionItems<CustomMessage>,
  institutes: Institution[],
  campusStore: OnCampus,
) => ({
  bestMatch: (tabUrl: URL): CustomMessage => {
    const matches: CustomMessage[] = institutes.reduce(
      (hits: CustomMessage[], institute: Institution) => {
        if (hits.length) {
          // We have already messages for an institution, no need to check others.
          return hits;
        }
        const isOnCampus = Campus().get(institute.id, campusStore);
        return findPossibilities(allMessages[institute.id], new URL(tabUrl), isOnCampus);
      },
      [],
    );
    return matches.reduce(reduceToLongestPath, matches[0]);
  },
});
