/**
 * SelectedTextSearch is also known as "Access Enhancer" and is part of the "Search Enhancers" feature.
 *
 * See https://newleanlibrary.atlassian.net/wiki/spaces/TEC/pages/590807041/Feature+Access#Access-enhancer
 * for product documentation.
 */
import CreateContextProperties from '@/interfaces/browser/CreateContextProperties';
import Institution from '@/interfaces/Institution';
import eventSearchEngineSearch from '../stats/access/eventSearchEngineSearch';

export default {
  /**
   * Create ContextMenu items based on institution's search engines.
   * @param {(properties: CreateContextProperties) => void} createMenu browser specific function to create the menu
   * @param {Institution} institution
   * @param {boolean} isGrouped - Group by institution when multiple institutions
   */
  createMenu: (
    createMenu: (properties: CreateContextProperties) => void,
    institution: Institution,
    isGrouped: boolean,
  ) => {
    const parentId = isGrouped ? `searchEngine-${institution.id}` : '';
    if (isGrouped) {
      createMenu({
        id: parentId,
        title: institution.name,
        contexts: ['selection'],
      });
    }
    institution.searchEngines.forEach(searchEngine => {
      createMenu({
        title: searchEngine.name,
        id: `${institution.id}|${searchEngine.id}`,
        parentId: parentId || null,
        contexts: ['selection'],
      });
    });
  },
  /**
   * Handles the behaviour for when a menu item is clicked.
   *
   * @param {string} compoundId
   * @param {string} selectionText
   * @param {Institution[]} institutions
   * @param {(url: string) => void} createNewTab
   */
  handleClick: (
    compoundId: string,
    selectionText: string,
    institutions: Institution[],
    createNewTab: (url: string) => void,
  ) => {
    const [institutionId, searchEngineId] = compoundId.split('|');

    eventSearchEngineSearch(institutionId, searchEngineId);

    const institution = institutions.find(({ id }) => id === institutionId);
    if (!institution) {
      return;
    }
    const searchEngine = institution.searchEngines.find(
      ({ id }) => id.toString() === searchEngineId,
    );
    if (!searchEngine) {
      return;
    }
    const url = searchEngine.url.replace(/{search-term}/g, encodeURIComponent(selectionText));
    createNewTab(url);
  },
};
