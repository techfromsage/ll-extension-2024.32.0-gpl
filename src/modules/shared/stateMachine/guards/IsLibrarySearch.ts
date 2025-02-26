/**
 * Checks if library search is enabled for institutions
 */
import FeaturesContext from '@/interfaces/stateMachine/FeaturesContext';

export default ({ knowledgeBases, storeState: { appSettings } }: FeaturesContext): boolean =>
  knowledgeBases.length > 0 && appSettings.librarySearch;
