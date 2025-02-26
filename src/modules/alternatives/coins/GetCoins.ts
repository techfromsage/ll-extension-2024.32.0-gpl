import OpenUrl from '@/interfaces/OpenUrl';
import CollectCoins from '@/modules/alternatives/coins/CollectCoins';

/**
 * Scrapes the document for any coins.
 * https://techfromsage.atlassian.net/wiki/spaces/TEC/pages/1107722246/COinS+Scrapper
 */
export default (parentNode: Document): OpenUrl[] => {
  return Array.from(parentNode.querySelectorAll('.Z3988'))
    .reduce(CollectCoins, []);
};
