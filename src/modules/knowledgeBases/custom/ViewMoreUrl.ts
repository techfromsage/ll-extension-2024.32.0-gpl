import ProviderResponseCustom from '@/interfaces/librarySearches/custom/ProviderResponseCustom';

/**
 * View more URL for Custom Library Search
 * @param {string} type
 * @param {ProviderResponseCustom} response
 * @returns {string}
 */
export default (type: string, response: ProviderResponseCustom): string => {
  const { results } = response;
  if (type === 'person') {
    return results.view_more_people_url || results.view_more_url;
  }
  return results.view_more_documents_url || results.view_more_url;
};
