import ValidIssns from '@/modules/tocAlerts/ValidIssns';
import Intersection from '@/modules/tocAlerts/Intersection';
import ButtonURL from '@/modules/tocAlerts/ButtonURL';
import { Config } from '@/interfaces/Config';
import TocAlertButtonData from '@/interfaces/tocAlerts/TocAlertButtonData';
import { HTTPRequest } from '@/interfaces/browser/AppMethods';
import Institution from '@/interfaces/Institution';
import SearchResultItem from '@/interfaces/SearchResultItem';

/**
 * Generates Toc Alert buttons ready to be rendered for Articles by checking they are valid
 * in the backend constructing TocAlertButtonData items.
 */
export default async (
  searchResults: SearchResultItem[],
  institutions: Institution[],
  config: Config,
  httpRequest: HTTPRequest,
): Promise<TocAlertButtonData[]> => {
  const institution = institutions.find(({ journal_alerts }) => journal_alerts.access);
  if (!institution) {
    return [];
  }
  const validIssns = await ValidIssns(
    config.api.tocAlerts.issnCheckUrl,
    searchResults.map(({ metadata }) => metadata),
    institution.id,
    httpRequest,
  );
  return searchResults
    .filter(item => Intersection([item.metadata.issn], validIssns).length)
    .map(item => {
      return {
        position: item.position,
        title: item.metadata.articleTitle || '',
        journal: item.metadata.journalTitle || '',
        url: ButtonURL(config.api.tocAlerts.buttonUrl, item.metadata.issn || '', institution.id),
        text: institution.journal_alerts.text,
      };
    });
};
