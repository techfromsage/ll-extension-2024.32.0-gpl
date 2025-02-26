/**
 * Triggers the Features state machine to determine the available features states for a given URL.
 */
import { interpret } from 'xstate';
import { sessionStore, store } from '@/store';
import Feature from '@/enums/Feature';
import StateMachineFeatures from '@/modules/shared/stateMachine/StateMachineFeatures';
import State from '@/enums/State';
import { FeaturesDetermined, SenderDetails } from '@/interfaces/browser/AppMethods';
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';
import StateSort from '@/modules/shared/StateSort';
import NotificationFactory from '@/modules/shared/notifications/NotificationFactory';
import FeatureStateValues from '@/interfaces/stateMachine/FeatureStateValues';
import notificationNotSupported from '@/modules/shared/notifications/notificationNotSupported';
import GenerateLibraryServices from '@/modules/libraryServices/GenerateLibraryServices';
import IsAccessPromoted from '@/modules/shared/stateMachine/guards/IsAccessPromoted';
import IsAlternativesAchievedPromoted from '@/modules/shared/stateMachine/guards/IsAlternativesAchievedPromoted';
import statesSubsetAccessNeededData from '@/modules/shared/stateMachine/states/statesSubsetAccessNeeded.data';
import statesSubsetAlternativesAchievedPromotedData
  from '@/modules/shared/stateMachine/states/statesSubsetAlternativesAchievedPromoted.data';
import PageData from '@/interfaces/messages/PageData';
import access from '@/content-script/access';
import features from '@/background/features';
import remember from '@/background/cache/remember';
import toolbarIcon from '@/background/toolbarIcon';
import StoreNamespace from '@/enums/StoreNamespace';

/**
 * Generates notifications for each feature state.
 */
const generateNotification = (context: FeaturesContext) => ([feature, state]: [string, any]) =>
  NotificationFactory(context, state as State, feature as Feature)();

/**
 * Generates a cache key for the domain data.
 */
const cacheKey = (url: URL) => [
  StoreNamespace.Cached,
  url.hostname,
  url.pathname,
].join('').replace('/', '_');

/**
 * Behaviour for when the notification states have been determined.
 */
export default async (
  pageData: PageData,
  senderDetails: SenderDetails,
): Promise<FeaturesDetermined> => {
  const storeState = store.getState();
  const currentUrl = new URL(senderDetails.url);
  const domainData = await remember(cacheKey(currentUrl), features(currentUrl, storeState));

  const context: FeaturesContext = {
    ...pageData,
    ...domainData,
    storeState,
    accessConnections: pageData.accessFromScraper
      ? access.accessFromScrapedPageData(pageData.accessFromScraper, storeState)
      : access.accessFromSignedInDomains(
        currentUrl,
        storeState.institutes,
        storeState.resourceDomains,
        storeState.signedInDomains,
      ),
    sessionStoreState: sessionStore.getState(),
    institutions: storeState.institutes,
    currentTabId: senderDetails.tabId,
    currentUrl,
  };

  const stateMachine = StateMachineFeatures(storeState.notificationsOrder).withContext(context);
  return new Promise(resolve => {
    const service = interpret(stateMachine);
    service.onTransition(
      // eslint-disable-next-line complexity
      newStateValues => {
        const featureValues = newStateValues.value as unknown as FeatureStateValues;
        const featureContext = newStateValues.context;
        const notifications = Object.entries(featureValues)
          .flatMap(generateNotification(featureContext))
          .filter(Boolean)
          // We sort again to ensure the most relevant item is at the top.
          .sort(StateSort(storeState.notificationsOrder, 'state'));

        // We need to show Digital Alternatives achieved BEFORE PrintHoldingsAvailable
        // Due to other quirks, it's best to do a sort when needed that change the popup order permanently
        if (IsAlternativesAchievedPromoted(featureContext)) {
          notifications.sort(StateSort(statesSubsetAlternativesAchievedPromotedData, 'state', false));
        }

        // This is a bit tricky. We need to do one final sort to ensure that access is above alternatives with certain flags set
        // See statesSubsetAccessNeededData.data.ts for explanation.
        if (IsAccessPromoted(featureContext)) {
          notifications.sort(StateSort(statesSubsetAccessNeededData, 'state', false));
        }

        toolbarIcon(featureContext.currentTabId, notifications, pageData.referenceManager);

        const items = {
          featureValues,
          libraryServices: GenerateLibraryServices(featureContext, featureValues[Feature.LibraryServices]),
          knowledgeBases: featureContext.knowledgeBases,
        };

        const response = notifications.length
          ? { ...items, notifications }
          : { ...items, notifications: notificationNotSupported(featureContext) };

        service.stop();
        return resolve(response);
      },
    );

    // to prevent a race condition, we start the service after the onTransition handler is set up
    service.start();
  });
};
