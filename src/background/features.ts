import { StoreState } from '@/store';
import DomainData from '@/interfaces/messages/DomainData';
import PlatformCheck from '@/modules/shared/platforms/PlatformCheck';
import assist from '@/content-script/assist';
import keywordEnhancements from '@/modules/keywordEnhancements/KeywordEnhancements';
import libraryResources from '@/content-script/libraryResources';
import systemMessage from '@/content-script/systemMessage';
import ProxyURL from '@/modules/shared/ProxyURL';
import InstitutionItems from '@/interfaces/InstitutionItems';
import State from '@/enums/State';
import StateAllowed from '@/modules/shared/stateMachine/guards/StateAllowed';

/**
 * Determine allowed states for each institution.
 *
 * @param storeState
 * @param currentUrl
 */
const allowedStates = (storeState: StoreState, currentUrl: URL): InstitutionItems<State> =>
  storeState.institutes.reduce((all, institution) => {
    return {
      ...all,
      [institution.id]: storeState.notificationsOrder.filter((stateToCheck: State) =>
        StateAllowed(
          currentUrl,
          storeState.institutionsDeniedDomains,
          stateToCheck,
          institution.id,
        )),
    };
  }, {});

/**
 * features - Determine features for the current URL based on the store state.
 */
export default (url: URL, storeState: StoreState) => async (): Promise<DomainData> => {
  const {
    institutes,
    customMessages,
    onCampus,
    keywordPackages,
    librarySearches,
  } = storeState;

  const platform = PlatformCheck(url.href).current();
  return {
    assistMessage: assist(url, customMessages, institutes, onCampus),
    keywordPackages: keywordEnhancements(url, keywordPackages),
    knowledgeBases: librarySearches.filter(knowledgeBase => knowledgeBase.platforms.includes(platform)),
    libraryResources: libraryResources(url, storeState.libraryResources, institutes),
    platform,
    systemMessage: systemMessage(url, institutes),
    isProxyUrl: institutes.some(institute => ProxyURL(institute.access).isProxyUrl(url)),
    allowedStates: allowedStates(storeState, url),
  };
};
