/**
 * Builds a query URL by replacing the "searchQuery" placeholder with search text.
 *
 * @param {string} urlTemplate
 * @param {string} searchQuery
 * @returns {string}
 */
export default (urlTemplate: string, searchQuery: string): string =>
  urlTemplate.replace(/(\[searchQuery]|\[search_query])/g, searchQuery);
