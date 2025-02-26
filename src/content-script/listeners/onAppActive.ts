/**
 * Listener callback - runs when the app is switched on.
 */
import AppActiveContext from '@/interfaces/stateMachine/AppActiveContext';
import { AppEventSchema } from '@/modules/shared/stateMachine/StateMachineAppActive';
import browserMethods from '@/browserMethods';
import alternatives from '@/content-script/alternatives';
import handleLayout from '@/content-script/listeners/handleLayout';
import consoleDev from '@/dev/consoleDev';
import handleLibrarySearch from '@/content-script/listeners/handleLibrarySearch';
import PlatformCheck from '@/modules/shared/platforms/PlatformCheck';
import keywordEnhancements from '@/modules/keywordEnhancements/KeywordEnhancements';
import handleKeywordEnhancement from '@/content-script/listeners/handleKeywordEnhancement';
import fetchGoogleScholarMetadata from '@/content-script/listeners/fetchGoogleScholarMetadata';
import ScrapeGoogleScholar from '@/modules/shared/scrape/ScrapeGoogleScholar';
import handleSciteGoogleScholar from '@/content-script/listeners/handleSciteGoogleScholar';
import handleSciteArticlePage from '@/content-script/listeners/handleSciteArticlePage';
import handleTocButtons from '@/content-script/listeners/handleTocButtons';
import RemoveSciteBadges from '@/modules/scite/RemoveSciteBadges';
import pageResources from '@/content-script/pageResources';
import ReferenceManagerEvent from '@/enums/stateMachine/ReferenceManagerEvent';
import ConvertScrapeToDigitalResource from '@/modules/shared/scrape/ConvertScrapeToDigitalResource';
import ScrapeNonAcademicResource from '@/modules/shared/scrape/ScrapeNonAcademicResource';
import handleReferenceManagerGoogleScholar from '@/content-script/listeners/handleReferenceManagerGoogleScholar';
import HighlightAndAnnotateEvent from '@/enums/stateMachine/HighlightAndAnnotateEvent';
import AvailableReferences from '@/modules/referenceManager/AvailableReferences';
import UniqueList from '@/modules/shared/UniqueList';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';
import AppActiveEvent from '@/enums/stateMachine/AppActiveEvent';
import PageData from '@/interfaces/messages/PageData';
import AccessFromScrapedContent from '@/modules/access/AccessFromScrapedContent';
import authenticationScraper from '@/modules/access/authenticationScraper';
import GetPageType, { PageType } from '@/modules/shared/GetPageType';

/**
 * Listener callback - runs when the app is switched on.
 */
export default async (context: AppActiveContext, event: AppEventSchema) => {
  const { storeState, tabUuid } = context;
  const {
    institutes,
    institutionsDeniedDomains,
    notificationsOrder,
    appSettings,
    config,
  } = storeState;
  if (!config || !institutes?.length) {
    return;
  }

  const {
    httpRequest, determineAvailableFeatures,
  } = browserMethods.app.contentScript;

  const url = new URL(window.location.href);
  const digitalResources = await pageResources(window.document, institutes, url, config, httpRequest);
  const platform = PlatformCheck(window.location.href).current();
  const keywordPackages = keywordEnhancements(url, storeState.keywordPackages);

  const searchPage = GetPageType(digitalResources) === PageType.SearchPage;

  const scrapedArticles = ScrapeGoogleScholar(document);
  const articlesMetadata = scrapedArticles.length > 0
    ? await fetchGoogleScholarMetadata(config, scrapedArticles)
    : [];

  // Send the digital resources to the Reference Manager and Highlight and Annotate state machines
  const scholarDigitalResources = ConvertScrapeToDigitalResource(scrapedArticles, articlesMetadata);
  const nonAcademicResources = ScrapeNonAcademicResource(url, document);
  const foundResources = scholarDigitalResources.length
    ? UniqueList(scholarDigitalResources, 'identifier')
    : UniqueList(digitalResources, 'identifier');
  // On search page return everything, metadata has not been fetched yet
  const referenceResources = searchPage ? foundResources : AvailableReferences(digitalResources);

  window.stateInterpreterReferenceManager.send(
    ReferenceManagerEvent.DetermineResources,
    {
      resources: {
        digitalResources: referenceResources,
        nonAcademicResources,
        citedArticles: !searchPage ? foundResources : [],
      },
    },
  );
  // }
  window.stateInterpreterHighlightAndAnnotate.send(
    HighlightAndAnnotateEvent.DetermineResources,
    {
      digitalResources: referenceResources,
      nonAcademicResources,
    },
  );

  window.stateInterpreterHighlightAndAnnotate.send(
    HighlightAndAnnotateEvent.FetchHighlights,
  );

  const pageData: PageData = {
    alternativeURLs: await alternatives(
      config,
      institutes,
      institutionsDeniedDomains,
      url,
      notificationsOrder,
      digitalResources,
      appSettings,
    ),
    accessFromScraper: AccessFromScrapedContent(document, url, authenticationScraper),
    tabUuid,
    searchPage,
    referenceManager: {
      availableReferences: referenceResources.length,
      state: window.stateInterpreterReferenceManager.getSnapshot().value as ReferenceManagerState,
    },
  };

  consoleDev({ title: 'Page Data', message: { digitalResources, pageData } });

  RemoveSciteBadges(document);
  window.stateInterpreterAppActive.send(AppActiveEvent.StoreDigitalResourceIds, { digitalResources });

  determineAvailableFeatures(pageData)
    .then(handleLayout(event, url, tabUuid))
    .then(handleLibrarySearch(platform, url))
    .then(handleTocButtons(config, institutes, articlesMetadata, scrapedArticles))
    .then(handleSciteGoogleScholar(config, articlesMetadata, scrapedArticles, storeState))
    .then(handleSciteArticlePage(config, digitalResources, storeState))
    .then(handleKeywordEnhancement(keywordPackages, storeState.appSettings))
    .catch(err => console.error(err));

  handleReferenceManagerGoogleScholar();
};
