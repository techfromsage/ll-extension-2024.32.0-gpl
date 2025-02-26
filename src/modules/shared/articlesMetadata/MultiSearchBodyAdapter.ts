/**
 * MultiSearchBodyAdapter adapts a set of individual Elasticsearch single queries to work with
 * Elasticsearch's Multiple Search API (aka _msearch)
 *
 * This involves turning the payload to be line-delimited between each query as well as inserting a metadata
 * object between each query:
 *
 * {}
 * { "query": ... }
 * {}
 * { "query": ... }
 *
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html
 *
 * @param {QueryItem[]} items
 * @returns {string}
 */
export default <QueryItem>(items: QueryItem[]): string => {
  return `${items
    .map(item => [{}, item])
    .flat()
    .map(i => JSON.stringify(i))
    .join('\n')}\n`;
};
