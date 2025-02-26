/**
 * Handles embedding scite on pages with valid DOI
 */
import { FeaturesDetermined } from '@/interfaces/browser/AppMethods';
import { Config } from '@/interfaces/Config';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import sciteShadowElement from '@/components/Scite/sciteShadowElement';
import ArticleSearch from '@/interfaces/articleMetadata/ArticleSearch';
import HTMLElementArticle from '@/interfaces/tocAlerts/HTMLElementArticle';
import { StoreState } from '@/store';
import SearchResultItem from '@/interfaces/SearchResultItem';
import eventClickBadges from '@/modules/stats/access/eventClickBadges';
import eventAddBadges from '@/modules/stats/access/eventAddBadges';
import fetchSciteTallies from '@/content-script/listeners/fetchSciteTallies';
import fetchSciteNotices from '@/content-script/listeners/fetchSciteNotices';

/**
 * @param {Config} config
 * @param {DigitalResource[]} resources
 * @param url
 * @returns {(features: FeaturesDetermined) => Promise<FeaturesDetermined>}
 */
export default (
  config: Config,
  searchResults: SearchResultItem[],
  scrapedArticles: HTMLElementArticle<ArticleSearch>[],
  storeState: {
    appActive: StoreState['appActive'],
    institutes: StoreState['institutes'],
    appSettings: StoreState['appSettings'],
  },
): (features: FeaturesDetermined) =>
  Promise<FeaturesDetermined> =>
  async (features: FeaturesDetermined) => {
    const { featureValues } = features;

    const sciteSupported = featureValues[Feature.Scite] === State.SciteOnGoogleScholarSupported;
    const sciteInstitute = storeState.institutes.find(({ scite: { enabled } }) => enabled);
    if (!sciteSupported || !sciteInstitute) {
      return features;
    }

    // At this point we know a Scite badge is supported.
    const dois = searchResults.map(({ metadata }) => metadata.doi);
    const tallies = await fetchSciteTallies(config, dois);
    const notices = await fetchSciteNotices(config, dois);

    const { appSettings: { integrations: { scite } } } = storeState;
    const badgeDois = searchResults.map(searchResult => {
      const scrapedArticle = scrapedArticles[searchResult.position];
      if (scrapedArticle && tallies.tallies[searchResult.metadata.doi]) {
        sciteShadowElement({
          tally: tallies.tallies[searchResult.metadata.doi],
          notices: notices.notices[searchResult.metadata.doi],
          layout: 'horizontal',
          showZero: false,
          clickHandler: () => eventClickBadges(sciteInstitute.id),
          key: `${searchResult.position}`,
          element: scrapedArticle.element,
          enabled: storeState.appActive && scite.enabled && scite.googleScholar,
        });
        return searchResult.metadata.doi;
      }
      return '';
    }).filter(Boolean);

    eventAddBadges(sciteInstitute.id, badgeDois);

    return features;
  };
