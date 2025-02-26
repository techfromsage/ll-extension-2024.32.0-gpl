import { ContentConfig } from '@/interfaces/Config';
import { store } from '@/store';

/**
 * Fetches content for an institution from the content store
 * Content store is indexed by institution and populated by combining default content config with institution overrides
 *
 * @param  {string} institution
 * @param  {string} key
 * @param state
 * @returns string
 */
export default (institution: string, key: string, storeContent = store.getState().content): string => {
  const content = storeContent[institution];
  if (!content) {
    return '';
  }
  const item = content[key as keyof ContentConfig];
  return item || '';
};
