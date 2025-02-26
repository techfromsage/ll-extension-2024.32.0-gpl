import LLAStatType from '@/enums/LLAStatType';
import NotificationUI from '@/interfaces/ui/NotificationUI';
import State from '@/enums/State';
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import browserMethods from '@/browserMethods';

/**
 * Gets the resource property for the given state.
 * @param state
 */
const resourceProperty = (state: State) => {
  switch (state) {
    case State.FullTextFinder:
      return 'fullText';
    case State.OpenAccess:
      return 'openAccess';
    case State.EbookFinder:
      return 'ebook';
    case State.EbookFinderMultiple:
      return 'ebook';
    default:
      return '';
  }
};

/**
 * Builds the resources object for the state.
 *
 * @param state
 * @param digitalResource
 */
const resources = (state: State, digitalResource?: DigitalResource) => {
  const property = resourceProperty(state);
  return (property && digitalResource?.metadata?.doi)
    ? {
      [property]: [{
        ...digitalResource.metadata,
        referenceId: digitalResource.referenceId,
      }],
    }
    : {};
};

const allowedStates = [
  State.FullTextFinder,
  State.EbookFinder,
  State.EbookFinderMultiple,
  State.OpenAccess,
  State.ProxyAccessAchieved,
  State.OpenAthensAccessAchieved,
  State.ShibbolethAccessAchieved,
  State.Assist,
  State.PriorityAssist,
  State.OnCampusSupported,
  State.AutoRedirected,
  State.SearchEnhanced,
];

/**
 *
 * @param notification
 * @param url
 * @param open
 * @param tabUuid
 */
export default (
  notification: NotificationUI,
  url: URL,
  open: boolean,
  tabUuid: string,
): void => {
  if (!allowedStates.includes(notification.state)) {
    return;
  }
  const { metadata } = notification;
  const alternativesResource = resources(notification.state, metadata?.digitalResource);

  browserMethods.app.statEventAccess({
    type: LLAStatType.SET_TAB_STATE,
    state: notification.state,
    open,
    url: url.hostname,
    referenceId: tabUuid,
    instituteId: notification.institution.id,
    accessResourceDomainId: metadata?.resourceDomain?.id, // Access
    accessInstituteId: metadata?.resourceDomain?.institution.id, // Access
    resources: {
      active: alternativesResource, // Alternatives
    },
    assistMessageId: metadata?.assistMessageId, // Assist
  });
};
