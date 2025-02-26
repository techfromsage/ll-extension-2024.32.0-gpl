import ArticleMetadata from '@/interfaces/alternatives/ArticleMetadata';

/**
 * Represents a search result item in a list of search results.
 * e.g. on Google Scholar. This is used to hold the search result's position and
 * it's associated metadata.
 */
interface SearchResultItem {
  metadata: ArticleMetadata,
  position: number,
}

export default SearchResultItem;
