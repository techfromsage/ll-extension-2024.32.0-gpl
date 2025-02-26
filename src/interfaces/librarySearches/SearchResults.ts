/**
 * Represents a single search result to be rendered.
 */
export interface SearchResult {
  id: string,
  title: string,
  text: string,
  href: string,
  category: 'document' | 'person',
  metadata?: string,
}

/**
 * Represents and standardises a set of search results and accompanying
 * info needed to render in the UI.
 */
type SearchResults = {
  category: string,
  items: SearchResult[],
  viewMoreUrl?: string,
};

export default SearchResults;
