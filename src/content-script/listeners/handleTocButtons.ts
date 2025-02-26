/**
 * Handles embedding extras onto Google Scholar such as TocAlerts and Scite badges.
 */
import { FeaturesDetermined } from '@/interfaces/browser/AppMethods';
import { Config } from '@/interfaces/Config';
import renderTocAlert from '@/components/TocAlerts';
import TocAlertButtonData from '@/interfaces/tocAlerts/TocAlertButtonData';
import HTMLElementArticle from '@/interfaces/tocAlerts/HTMLElementArticle';
import ArticleSearch from '@/interfaces/articleMetadata/ArticleSearch';
import Institution from '@/interfaces/Institution';
import Feature from '@/enums/Feature';
import State from '@/enums/State';
import TocAlertButtons from '@/modules/tocAlerts/TocAlertButtons';
import browserMethods from '@/browserMethods';
import SearchResultItem from '@/interfaces/SearchResultItem';

/**
 * Render the TocAlert button for an article.
 *
 * @param {HTMLElementArticle<ArticleSearch>[]} scrapedArticles
 */
const renderEachTocAlertButton = (scrapedArticles: HTMLElementArticle<ArticleSearch>[]) => (button: TocAlertButtonData) => {
  const scrapedArticle = scrapedArticles[button.position];
  if (scrapedArticle) {
    renderTocAlert(button, scrapedArticle.element);
  }
};

export const destroyTocAlerts = () => {
  window.document.querySelectorAll('.toc-alert-wrapper').forEach(el => el.remove());
};

/**
 * @param {Config} config
 * @param institutions
 */
export default (
  config: Config,
  institutions: Institution[],
  searchResults: SearchResultItem[],
  scrapedArticles: HTMLElementArticle<ArticleSearch>[],
) =>
  async (features: FeaturesDetermined): Promise<FeaturesDetermined> => {
    const { featureValues } = features;
    const tocAlertsSupported = featureValues[Feature.TocAlerts] === State.Supported;

    // Remove ToC buttons if not supported
    if (!tocAlertsSupported) {
      destroyTocAlerts();
      return features;
    }
    const { httpRequest } = browserMethods.app.contentScript;
    const buttons = await TocAlertButtons(searchResults, institutions, config, httpRequest);
    buttons.forEach(renderEachTocAlertButton(scrapedArticles));

    return features;
  };
