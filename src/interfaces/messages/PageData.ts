/**
 * PageData is data that is used to determine features based on the page content.
 */
import DigitalResource from '@/interfaces/alternatives/DigitalResource';
import ReferenceManagerState from '@/enums/stateMachine/ReferenceManagerState';

interface PageData {
  alternativeURLs: DigitalResource[],
  accessFromScraper: string,
  tabUuid: string,
  searchPage: boolean,
  referenceManager: {
    state: ReferenceManagerState,
    availableReferences: number,
  },
}

export default PageData;
